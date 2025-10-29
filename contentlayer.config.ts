// contentlayer.config.ts
import { makeSource, defineDocumentType } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import readingTime from "reading-time";


const words = (s: string) => s.trim().split(/\s+/g).length;

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: false },      // <- nuevo
    tags: { type: "list", of: { type: "string" }, required: false }, // <- nuevo
    cover: { type: "string", required: false },         // <- nuevo
    description: { type: "string", required: false },
    draft: { type: "boolean", required: false, default: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\//, ""),
    },
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace(/^blog\//, "")}`,
    },
    readingTime: { 
      type: "number",
       resolve: (doc) =>
        Math.max(1, Math.round(readingTime(doc.body.raw).minutes)),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});
