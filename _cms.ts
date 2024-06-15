import lumeCMS from "lume/cms/mod.ts";

import blocks from "lume/cms/fields/blocks.ts";

const cms = lumeCMS({
  root: "src",
  site: {
    name: "x's website management",
    description: "imagine having proper content management lmao"
  },
  log: {
    filename: "errors.log"
  }
}).use(blocks);

cms.storage("pages", "pages");
cms.storage("posts", "posts");

cms.collection("pages: Markdown", "pages:*.md", [
  "title: text!",
  "description: text!",
  "content: markdown!",
]);
cms.collection("pages_Templates: Vento", "pages:*.vto", [
  "title: text!",
  "description: text!",
  "content: textarea!",
]);

cms.collection("posts: Blog Posts", "posts:*.md", [
  "title: text!",
  "description: text!",
  "draft: checkbox",
  "date: date!",
  {
    name: "link",
    label: "Additional Link",
    description: "Link to a resource or a related project",
    type: "url",
  },
  {
    name: "tags",
    label: "Tags",
    type: "list",
    init(field) {
      const lume = field.data.lume;
      const allTags = lume.search.values("tags");
      field.options = allTags;
    }
  },
  "content: markdown!",
]);

cms.upload("posts_Data: Support assets (images, videos, etc..)", "src:static/data/posts/");

export default cms;

// vim: sw=2 ts=2 sts=2 et
