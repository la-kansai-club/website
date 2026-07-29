// Aboutページの「写真ブロック」。見出し+複数枚の写真をグリッドで並べる。

import { defineField, defineType } from "sanity";

export const photoGallerySectionType = defineType({
  name: "photoGallerySection",
  title: "写真ブロック",
  type: "object",
  fields: [
    defineField({ name: "title", title: "見出し", type: "string" }),
    defineField({
      name: "photos",
      title: "写真",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "(見出し未設定)", subtitle: "写真ブロック" };
    },
  },
});
