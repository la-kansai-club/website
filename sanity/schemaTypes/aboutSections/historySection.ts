// Aboutページの「Historyブロック」。見出し+本文(太字・箇条書きのみ)。
// データの形は文章ブロックと似ているが、Studio上で「これは沿革を書く場所」と
// 分かりやすくするために別のブロック種類にしている。

import { defineField, defineType } from "sanity";

export const historySectionType = defineType({
  name: "historySection",
  title: "Historyブロック",
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
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "(見出し未設定)", subtitle: "Historyブロック" };
    },
  },
});
