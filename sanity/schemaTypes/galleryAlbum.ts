// 「ギャラリーアルバム」ドキュメントのスキーマ。
//
// 設計方針(2026-07-23承認):
// - Galleryは単純な写真の羅列ではなく、イベントごとのアルバム形式で見せる
// - tagは表記ゆれ・入力ミスを防ぐため選択式(list)にしている。
//   新しい活動カテゴリが増えた場合は、開発者がこのファイルのlistに1行追加するだけでよい
//   (理事が自由入力するとカテゴリ名がバラバラになりやすいため、あえて選択式に固定している)

// 補足: tagの選択肢(value)は sanity/lib/tags.ts の galleryTagLabels と対応させる必要がある。
// listに項目を追加・変更した場合は、必ず両方のファイルを更新すること。

import { defineField, defineType } from "sanity";

export const galleryAlbumType = defineType({
  name: "galleryAlbum",
  title: "ギャラリーアルバム",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "アルバム名",
      type: "string",
      description: "例: 7月納涼祭",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL(スラッグ)",
      type: "slug",
      description: "アルバム詳細ページのURLに使われます。通常はアルバム名から自動生成で問題ありません。",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventDate",
      title: "開催日",
      type: "date",
      description: "この日付を基準にGalleryページの並び順が決まります。",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "カバー写真",
      type: "image",
      description: "アルバム一覧のサムネイルに使われる代表写真です。",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photos",
      title: "写真",
      type: "array",
      description: "複数枚まとめてドラッグ&ドロップで追加できます。",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "tag",
      title: "タグ",
      type: "string",
      description: "アルバムの分類タグです。",
      options: {
        list: [
          { title: "文化", value: "culture" },
          { title: "交流", value: "exchange" },
          { title: "懇親", value: "social" },
          { title: "学び", value: "learning" },
        ],
      },
    }),
    defineField({
      name: "relatedEvent",
      title: "関連イベント",
      type: "reference",
      description: "対応するイベントを選ぶと、Eventsページと自動的に相互リンクされます。",
      to: [{ type: "event" }],
    }),
  ],
  orderings: [
    {
      title: "開催日が新しい順",
      name: "eventDateDesc",
      by: [{ field: "eventDate", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "eventDate", media: "coverImage" },
    prepare({ title, date, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })
        : "日付未設定";
      return { title, subtitle: formattedDate, media };
    },
  },
});
