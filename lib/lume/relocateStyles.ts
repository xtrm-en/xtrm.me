import { Page } from "lume/core/file.ts";
import Site from "lume/core/site.ts";

// there is definitely a 3000% better way to do this
// idk man.

export default function relocateStyles() {
  return (site: Site) => {
    site.process([".css", ".css.map"], (pages: Page[]) => {
      for (const page of pages) {
        if (page?.data?.url !== undefined) {
          if (!page.data.url.startsWith("/assets/css/")) {
            page.data.url = `/assets/css${page.data.url}`;
          }
        }
      }
    });
    site.process([".html"], (pages: Page[]) => {
      for (const page of pages) {
        const { document } = page;
        if (!document) {
          return;
        }
        for (const link of document.querySelectorAll("link[rel=stylesheet]")) {
          const href = link.getAttribute("href");
          if (href !== null && !href.startsWith("/assets/css/")) {
            link.setAttribute("href", `/assets/css${href}`);
          }
        }
      }
    });
  };
}

// vim: ts=2:sw=2:et
