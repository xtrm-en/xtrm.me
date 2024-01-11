import { format } from "lume/deps/date.ts";
import { Page } from "lume/core/file.ts";
import type Site from "lume/core/site.ts";
import { merge } from "lume/core/utils/object.ts";

export interface Options {
  extensions?: string[];
  dateFormat?: string;

  filter?: (page: Page) => boolean;
  mutator?: (page: Page, date: string) => string;
}

export const defaults: Options = {
  extensions: [".html"],
  dateFormat: "yyyy/MM/dd",
  filter: (_) => true,
  mutator: (page, date) => {
    return page.data.url.replace(page.src.path, date);
  },
}

export default function dateInPath(userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.preprocess(options.extensions, (pages) => {
      for (const page of pages) {
        if (options.filter(page)) {
          page.data.url = options.mutator(page, format(page.data.date, options.dateFormat));
        }
      }
    });
  };
}