// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string" },
    summary: { type: "string" },
    tags: { type: "list", of: { type: "string" } },
    cover: { type: "string" }
  },
  computedFields: {
    slug: { type: "string", resolve: (d) => d._raw.flattenedPath.replace(/^blog\//, "") }
  }
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post],
  // opcional si ya agregaste el alias
  disableImportAliasWarning: true
});
