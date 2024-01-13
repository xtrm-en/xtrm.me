import { merge } from "lume/core/utils/object.ts";
import Site from "lume/core/site.ts";
import { Page } from "lume/core/file.ts";
import { concurrent } from "lume/core/utils/concurrent.ts";
import { sha256 } from "https://deno.land/x/sha256@v1.0.2/mod.ts";

interface Options {
  /**
   * The extensions of the files to process.
   * @default [".html"]
   */
  extensions?: string[];

  /**
   * The extensions of the files to cache.
   * @default [".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp"]
   */
  contentExtensions?: string[];

  /**
   * The folder where the images will be cached.
   * @default "cache"
   */
  folder?: string;
}

export const defaults: Options = {
  extensions: [".html"],
  contentExtensions: [".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp"],
  folder: "cache",
};

/** A plugin to modify all URLs found in the HTML documents */
export default function cacheContent(userOptions?: Options) {
  const options = merge(defaults, userOptions);

  function replace(
    site: Site,
    url: string | null,
    _p: Page,
    _e: Element,
  ): string | Promise<string> {
    if (!url) {
      return "";
    }
    console.log(`Replacing ${url}`);
    const extension = url.split(".").pop()!;
    if (!options.contentExtensions?.includes("." + extension)) {
      return url;
    }
    const hash = sha256(url, "utf8", "hex");
    const folder = options.folder!.replace(/\/$/, "");
    const path = `${folder}/${hash}.${extension}`;
    console.log(`Caching ${url} in ${path}`);
    site.remoteFile(path, url);
    return "/" + path;
  }

  async function replaceSrcset(
    site: Site,
    attr: string | null,
    page: Page,
    element: Element,
  ): Promise<string> {
    const srcset = attr ? attr.trim().split(",") : [];
    const replaced: string[] = [];
    for (const src of srcset) {
      const [, url, rest] = src.trim().match(/^(\S+)(.*)/)!;
      replaced.push(await replace(site, url, page, element) + rest);
    }

    return replaced.join(", ");
  }

  return (site: Site) => {
    site.process(
      options.extensions,
      async (pages) =>
        await concurrent(pages, async (page: Page) => {
          const { document } = page;

          if (!document) {
            return;
          }

          for (const element of document.querySelectorAll("[href]")) {
            element.setAttribute(
              "href",
              await replace(site, element.getAttribute("href"), page, element),
            );
          }

          for (const element of document.querySelectorAll("[src]")) {
            element.setAttribute(
              "src",
              await replace(site, element.getAttribute("src"), page, element),
            );
          }

          for (const element of document.querySelectorAll("video[poster]")) {
            element.setAttribute(
              "poster",
              await replace(site, element.getAttribute("poster"), page, element),
            );
          }

          for (const element of document.querySelectorAll("[srcset]")) {
            element.setAttribute(
              "srcset",
              await replaceSrcset(
                site,
                element.getAttribute("srcset"),
                page,
                element,
              ),
            );
          }

          for (const element of document.querySelectorAll("[imagesrcset]")) {
            element.setAttribute(
              "imagesrcset",
              await replaceSrcset(
                site,
                element.getAttribute("imagesrcset"),
                page,
                element,
              ),
            );
          }
        }),
    );
  };
}
