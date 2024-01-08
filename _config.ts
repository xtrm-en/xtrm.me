import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import postcss from "lume/plugins/postcss.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import prism from "lume/plugins/prism.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import pageFind from "lume/plugins/pagefind.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
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
import "npm:prismjs/components/prism-c.js";
import "https://deno.land/x/vento@v0.9.1/prism-vento.js";


import { format } from "lume/deps/date.ts";

import a11yEmoji from 'npm:@fec/remark-a11y-emoji';
import emoji from 'npm:remark-emoji';

const site = lume({
  location: new URL("https://blog.xtrm.me/"),
});

site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    if (page.data.url.startsWith("/posts/")) {
      page.data.url = page.data.url.replace("/posts/", `/${format(page.data.date, "yyyy/MM/dd")}/`);
    }
    /* nevermind this breaks everything
    if (page.data.url.endsWith("/") && page.data.url !== "/") {
      page.data.url = page.data.url.replace(/\/$/, "");
    }*/
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
    }
  }))
  .use(prism({
    extensions: [".vto", ".html"],
  }))
  .use(postcss())
  .use(date())
  .use(codeHighlight())
  .use(basePath())
  .use(sitemap())/*
  .use(pageFind({
    ui: {
      resetStyles: false,
    },
  }))*/
  .use(slugifyUrls({ alphanumeric: false }))
  .use(feed({
    output: ["/feed.json", "/feed.xml"],
    query: "type=posts",
    info: {
      title: "=site.title",
      description: "=site.description",
    },
    items: {
      title: "=title",
      content: "$.post-body",
    },
  }))
  .use(jsx())
  .use(mdx({
    remarkPlugins: [a11yEmoji, emoji],
    rehypePlugins: [],
  }))
  .use(resolveUrls())
  //.use(lightningCss())
  /*.use(multilanguage({
    languages: ["en", "fr"],
  }))*/
  ;

export default site;
