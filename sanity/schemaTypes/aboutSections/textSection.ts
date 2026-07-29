// Aboutページの「文章ブロック」。見出し+本文(+任意で写真)。
// 写真を付けると「写真+文章」のレイアウトになり、ページ冒頭の紹介文などに使える。
// 本文は太字・箇条書きのみに制限し、デザインが崩れないようにしている。

import { defineField, defineType } from "sanity";

export const textSectionType = defineType({
  name: "textSection",
  title: "文章ブロック",
  type: "object",
  fields: [
    defineField({ name: "title", title: "見出し", type: "string" }),
    defineField({
      name: "body",
      title: "本文",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "標準", value: "normal" }],
          marks: { decorators: [{ title: "太字", value: "strong" }] },
          lists: [{ title: "箇条書き", value: "bullet" }],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "写真(任意)",
      type: "image",
      description: "写真を追加すると、写真+文章のレイアウトになります。",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "(見出し未設定)", subtitle: "文章ブロック" };
    },
  },
});
