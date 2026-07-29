// Aboutページの「Missionブロック」。見出し+箇条書きのリスト。
// 自由入力のリッチテキストではなく、短い文字列の配列にすることで、
// 見た目のバラつき(改行や装飾の混在)を防いでいる。

import { defineField, defineType } from "sanity";

export const missionSectionType = defineType({
  name: "missionSection",
  title: "Missionブロック",
  type: "object",
  fields: [
    defineField({ name: "title", title: "見出し", type: "string" }),
    defineField({
      name: "items",
      title: "理念の項目",
      type: "array",
      of: [{ type: "string" }],
      description: "1項目1行の短い文章がおすすめです。",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "(見出し未設定)", subtitle: "Missionブロック" };
    },
  },
});
