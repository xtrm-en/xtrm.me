import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import prism from "lume/plugins/prism.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import readInfo from "lume/plugins/reading_info.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import jsx from "lume/plugins/jsx.ts";
import mdx from "lume/plugins/mdx.ts";

import "npm:prismjs/components/prism-markdown.js";
import "npm:prismjs/components/prism-yaml.js";
import "npm:prismjs/components/prism-markup-templating.js";
import "npm:prismjs/components/prism-liquid.js";
import "npm:prismjs/components/prism-typescript.js";
import "npm:prismjs/components/prism-json.js";
import "npm:prismjs/components/prism-rust.js";
import "npm:prismjs/components/prism-java.js";
import "npm:prismjs/components/prism-kotlin.js";
import "npm:prismjs/components/prism-python.js";
import "npm:prismjs/components/prism-c.js";

import { format } from "lume/deps/date.ts";

import a11yEmoji from 'npm:@fec/remark-a11y-emoji';
import emoji from 'npm:remark-emoji';

const site = lume({
  location: new URL("https://blog.xtrm.me/"),
});

// Load the content in /css/prism.css
site.remoteFile("/prism.css", "https://cdn.jsdelivr.net/gh/PrismJS/prism-themes/themes/prism-vsc-dark-plus.min.css");

// Copy the file
site.copy("/prism.css");

site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    // Post hierarchy based on date
    if (page.data.url.startsWith("/posts/")) {
      if (page.data.type === undefined) {
        page.data.type = "post";
      }
      page.data.url = page.data.url.replace("/posts/", `/${format(page.data.date, "yyyy/MM/dd")}/`);
    }
    if (page.src.path.startsWith("/pages/")) {
      page.data.url = page.data.url.replace("/pages/", "/");
    }
    if (page.src.path.startsWith("/projects/")) {
      // idk
    }
    /* nevermind this breaks everything
    if (page.data.url.endsWith("/") && page.data.url !== "/") {
      page.data.url = page.data.url.replace(/\/$/, "");
    }*/
  }
});
// Fix post headings: if we detect usage of a # heading, we replace all subsequent headings with a lower level
site.preprocess([".md", ".mdx"], (pages) => {
  for (const page of pages) {
    if (page.data.type === "post") {
      if (page.data.content !== undefined) {
        const content: string = page.data.content?.toString() || "";
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
site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    if (page.data.title === undefined) {
      throw new Error(`Page ${page.src.path} has no title`);
    }
    if (page.data.desc === undefined) {
      throw new Error(`Page ${page.src.path} has no description`);
    }
  }
});
site.process([".html"], (pages) => {
  for (const page of pages) {
    // Add a class to all inline code blocks
    for (const elem of page.document?.getElementsByTagName("code") ?? []) {
      if (elem.className === "") elem.className = "language-none";
    }
  }
});

site
  .ignore("README.md")
  .copy("static", ".")
  .use(tailwindcss({
    options: {
      corePlugins: {
        preflight: false,
      },
      theme: {
        colors: {
          x: {
            DEFAULT: "#b049c5"
          }
        },
        extend: {
          keyframes: {
            boinge: {
              "0%": { transform: "scale(1, 1)" },
              "35%": { transform: "scale(1.2, 0.8)" },
              "70%": { transform: "scale(0.95, 1.1)" },
              "100%": { transform: "scale(1, 1)" },
            }
          },
          animation: {
            boinge: "boinge .825s forwards"
          }
        }
      }
    }
  }))
  .use(prism({
    extensions: [".md", ".vto", ".html", ".mdx"],
  }))
  .use(postcss())
  .use(date())
  .use(basePath())
  .use(readInfo({
    extensions: [".md", ".vto", ".html", ".mdx"],
  }))
  .use(sitemap())/*
  .use(pageFind({
    ui: {
      resetStyles: false,
    },
  }))*/
  .use(slugifyUrls({ alphanumeric: false }))
  .use(feed({
    output: ["/feed.json", "/feed.xml"],
    query: "type=post",
    // info: {
    //   title: "=site.title",
    //   description: "=site.description",
    // },
    // items: {
    //   title: "=title",
    //   content: "$.post-body",
    // },
  }))
  .use(jsx())
  .use(mdx({
    remarkPlugins: [emoji, a11yEmoji],
    rehypePlugins: [],
  }))
  .use(metas())
  .use(resolveUrls())
  .use(lightningCss())
  /*.use(multilanguage({
    languages: ["en", "fr"],
  }))*/
  ;

export default site;
