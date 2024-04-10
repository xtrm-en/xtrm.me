import type Site from "lume/core/site.ts";
import { merge } from "lume/core/utils/object.ts";

export interface Options {
  extensions?: string[];

  requiredMetas?: string[];
}

export const defaults: Options = {
  extensions: [".html"],
  requiredMetas: ["title", "description"],
}

export default function ensurePageMeta(userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.preprocess(options.extensions, (pages) => {
      for (const page of pages) {
        if (page.data["type"] === "project") {
          continue;
        }
        for (const meta of options.requiredMetas!) {
          if (!page.data[meta]) {
            throw new Error(`Missing required meta '${meta}' for page '${page.src.path}'`);
          }
        }
      }
    });
  };
}
