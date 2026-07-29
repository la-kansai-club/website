// Aboutページの「活動紹介ブロック」。見出し+活動項目(名前・説明・写真)を複数登録できる。
// 河内音頭・学生研修・新年会・セミナーのような、クラブの活動を1件ずつカードで紹介する。

import { defineField, defineType } from "sanity";

export const activitiesSectionType = defineType({
  name: "activitiesSection",
  title: "活動紹介ブロック",
  type: "object",
  fields: [
    defineField({ name: "title", title: "見出し", type: "string" }),
    defineField({
      name: "activities",
      title: "活動項目",
      type: "array",
      of: [
        {
          type: "object",
          name: "activityItem",
          title: "活動項目",
          fields: [
            defineField({ name: "name", title: "活動名", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "説明", type: "text", rows: 3 }),
            defineField({
              name: "image",
              title: "写真",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "name", media: "image" },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "(見出し未設定)", subtitle: "活動紹介ブロック" };
    },
  },
});
