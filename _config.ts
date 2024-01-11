// Lume & imports
import lume from "lume/mod.ts";
import { Page } from "lume/core/file.ts";

// Lume internal plugins
import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import readInfo from "lume/plugins/reading_info.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import jsx from "lume/plugins/jsx.ts";
import mdx from "lume/plugins/mdx.ts";
import remark from "lume/plugins/remark.ts";

// Custom Lume plugins
import dateInPath from "./lib/lume/dateInPath.ts";
import ensureProperMeta from "./lib/lume/ensureProperMeta.ts";
import fixupInlineCodeBlocks from "./lib/lume/fixupInlineCodeBlocks.ts";
import hideToc from "./lib/lume/hideToc.ts";
import mdShiftHeadings from "./lib/lume/mdShiftHeadings.ts";

// Remark / Rehype plugins
import a11yEmoji from 'npm:@fec/remark-a11y-emoji';
import emoji from 'npm:remark-emoji';
import slugs from 'npm:rehype-slug';
import toc from 'npm:@jsdevtools/rehype-toc';
import rehypePrism from 'npm:@mapbox/rehype-prism';

// Begin Lume config
const site = lume({
  location: new URL("https://xtrm.me/"),
});

site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    // Remove /pages/ from the URL (put at the root)
    if (page.src.path.startsWith("/pages/")) {
      page.data.url = page.data.url.replace("/pages/", "/");

      // Replaces /404/ with /404.html since we moved it
      const match = page.data.url.match(/\/(\d{3})\/$/);
      if (match !== null) {
        page.data.url = page.data.url.replace(match[0], `/${match[1]}.html`);
      }
    }
  }
});

site.ignore("README.md");
site.copy("static", ".");

site
  .use(ensureProperMeta({
    requiredMetas: ["title", "desc"],
  }))
  .use(dateInPath({
    dateFormat: "yyyy/MM",
    filter: (page: Page) => page.data.type === "post",
    mutator: (page: Page, date: string) => page.data.url.replace("/posts/", `/${date}/`),
  }))
  .use(fixupInlineCodeBlocks())
  .use(mdShiftHeadings({
    filter: (page: Page) => page.data.type === "post"
  }))
  .use(hideToc())
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
  .use(postcss())
  .use(date())
  .use(basePath())
  .use(readInfo({
    extensions: [".md", ".vto", ".html", ".mdx"],
    wordsPerMinute: 175
  }))
  .use(sitemap())
  /*.use(pageFind({
    ui: {
      resetStyles: false,
    },
  }))*/
  .use(slugifyUrls({ alphanumeric: false }))
  .use(metas())
  .use(resolveUrls())
  .use(lightningCss())
  .use(minifyHTML())
  .use(feed({
    output: ["/feed.json", "/feed.xml", "/feed.rss"],
    query: "type=post",
    info: {
      title: "=site_title",
      description: "=site_desc",
      published: new Date(),
    },
    items: {
      title: "=title",
      description: "=desc",
      content: "$ #post-content",
    },
  }))
  // Template engines / language support
  .use(remark({
    useDefaultPlugins: true,
    remarkPlugins: [emoji, a11yEmoji],
    rehypePlugins: [slugs, rehypePrism, toc],
    rehypeOptions: {
      clobberPrefix: "",
    }
  }))
  .use(jsx())
  .use(mdx({
    useDefaultPlugins: true,
    remarkPlugins: [emoji, a11yEmoji],
    rehypePlugins: [slugs, rehypePrism, toc],
  }))
  ;

export default site;
