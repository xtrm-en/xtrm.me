import type Site from "lume/core/site.ts";

/**
 * Add a class to all inline code blocks
 */
export default function fixupInlineCodeBlocks() {
  return (site: Site) => {
    site.process([".html"], (pages) => {
      for (const page of pages) {
        for (const elem of page.document?.getElementsByTagName("code") ?? []) {
          if (elem.className === "") elem.className = "language-none";
          if (elem.parentElement?.tagName === "PRE") {
            elem.parentElement.className = "language-none";
          }
        }
      }
    });
  }
}