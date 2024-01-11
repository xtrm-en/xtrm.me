import { Page } from "lume/core/file.ts";
import type Site from "lume/core/site.ts";
import { merge } from "lume/core/utils/object.ts";

export interface Options {
  extensions?: string[];

  filter?: (page: Page) => boolean;
}

export const defaults: Options = {
  extensions: [".md", ".mdx"],
  filter: (_) => true,
}

/**
 * Fix markdown headings that are too big: only allow up to h2.
 * 
 * @param userOptions
 *  The options to use.
 * @returns 
 *  A plugin that fixes markdown headings that are too big.
 */
export default function mdShiftHeadings(userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.preprocess(options.extensions, (pages) => {
      for (const page of pages) {
        if (options.filter(page)) {
          if (page.data.content !== undefined) {
            const content = page.data.content!.toString();
            const lines = content.split("\n");
            let shouldReplace = false;
            for (const line of lines) {
              if (line.startsWith("# ")) {
                shouldReplace = true;
                break
              }
            }
            if (shouldReplace) {
              let newContent = "";
              for (const line of lines) {
                if (line.includes("######")) {
                  throw new Error(`Heading level too low in ${page.src.path}`);
                }
                if (line.startsWith("#")) {
                  newContent += line.replace("# ", "## ") + "\n";
                } else {
                  newContent += line + "\n";
                }
              }
              page.data.content = newContent;
            }
          }
        }
      }
    });
  };
}