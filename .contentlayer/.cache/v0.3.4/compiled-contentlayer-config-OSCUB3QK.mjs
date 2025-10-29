// contentlayer.config.ts
import { makeSource, defineDocumentType } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
var words = (s) => s.trim().split(/\s+/g).length;
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: false },
    // <- nuevo
    tags: { type: "list", of: { type: "string" }, required: false },
    // <- nuevo
    cover: { type: "string", required: false },
    // <- nuevo
    description: { type: "string", required: false },
    draft: { type: "boolean", required: false, default: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\//, "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace(/^blog\//, "")}`
    },
    readingTime: {
      // <- nuevo
      type: "number",
      resolve: (doc) => Math.max(1, Math.ceil(words(doc.body.raw) / 220))
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug]
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-OSCUB3QK.mjs.map
