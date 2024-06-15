import type Site from "lume/core/site.ts";
import type Page from "lume/core/page.ts";
import { merge } from "lume/core/utils/object.ts";

export interface Options {
  extensions?: string[];

  requiredMetas?: string[];

  ignorePredicate?: (page: Page) => boolean;
}

export const defaults: Options = {
  extensions: [".html"],
  requiredMetas: ["title", "description"],
  ignorePredicate: _ => false,
}

export default function ensurePageMeta(userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.preprocess(options.extensions, (pages: Page[]) => {
      for (const page of pages) {
        if (options.ignorePredicate!(page)) {
          continue;
        }
        for (const meta of options.requiredMetas!) {
          if (!page.data[meta]) {
            throw new Error(`Missing required meta '${meta}' for page '${page.src.path}' (type: '${page.data["type"]}')`);
          }
        }
      }
    });
  };
}
