import { Page } from "lume/core/file.ts";
import Site from "lume/core/site.ts";

export default function twemojiLoadSync() {
  return (site: Site) => {
    site.process([".html"], (pages: Page[]) => {
      for (const page of pages) {
        const preloadSrcs = [];
        const { document } = page;

        if (!document) {
          return;
        }

        for (const element of document.querySelectorAll("img.emoji")) {
          element.setAttribute("decoding", "sync");
          preloadSrcs.push(element.getAttribute("src"));
        }
      }
    });
  };
}