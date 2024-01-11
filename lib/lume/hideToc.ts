//TODO: this should be a rehype plugin

import type Site from "lume/core/site.ts";

/**
 */
export default function hideToc() {
  return (site: Site) => {
    site.process([".html"], (pages) => {
      const elems = [];
      for (const page of pages) {
        let pageToc = undefined;
        for (const elem of page.document?.getElementsByTagName("nav") ?? []) {
          if (pageToc === undefined && elem.className === "toc") {
            pageToc = elem;
          }
          elems.push(elem);
        }
        if (pageToc !== undefined) {
          page.document?.getElementById("toc")?.replaceWith(pageToc.cloneNode(true));
        }
      }
      for (const elem of elems) {
        elem.remove();
      }
    });
  }
}