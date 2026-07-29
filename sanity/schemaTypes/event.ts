// 「イベント」ドキュメントのスキーマ。
//
// 設計方針(2026-07-23承認):
// - 理事が毎月更新する画面のため、入力項目は必要最小限にする
// - 終了したイベントを「アーカイブ」に移す作業は手動フィールドを作らず、
//   endDateTime (未入力なら eventDate の翌日) を基準にフロントエンド側で自動判定する。
//   そのため、このスキーマには isArchived のような手動フラグを持たせない。
// - name(フィールドのAPI識別子)は将来ラベルの日本語表現が変わっても崩れないよう、
//   意味が安定した英語にしている。表示ラベルはすべて title で日本語化する。

// 補足:
// - 終了判定の実際の条件式は sanity/lib/queries.ts の NOT_ARCHIVED_FILTER に集約している
// - tag の選択肢(value)は sanity/lib/tags.ts の eventTagLabels と対応させる必要がある。
//   選択肢を増減する場合は両方のファイルを更新すること。

import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "イベント",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      description: "例: 8月お花見会",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL(スラッグ)",
      type: "slug",
      description: "詳細ページのURLに使われます。通常はタイトルから自動生成で問題ありません。",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventDate",
      title: "開催日",
      type: "datetime",
      description: "この日付を基準にEventsページの並び順が決まります。",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDateTime",
      title: "終了日時",
      type: "datetime",
      description:
        "空欄の場合、開催日の翌日を過ぎた時点で自動的に「過去のイベント」として扱われます。",
    }),
    defineField({
      name: "location",
      title: "場所",
      type: "string",
      description: "例: Little Tokyo, Los Angeles",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "写真",
      type: "image",
      description: "横長の写真がきれいに表示されます。",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "説明",
      type: "text",
      rows: 3,
      description: "2〜3行程度がおすすめです。",
    }),
    defineField({
      name: "tag",
      title: "タグ",
      type: "string",
      description: "カードに小さく表示される案内タグです。",
      options: {
        list: [
          { title: "初めての方歓迎", value: "beginner-friendly" },
          { title: "会員限定", value: "members-only" },
          { title: "雨天中止", value: "cancel-if-rain" },
        ],
      },
    }),
    defineField({
      name: "applyUrl",
      title: "申込みURL",
      type: "url",
      description: "例: 申込みフォームのリンク。入力すると詳細ページに「申し込む」ボタンが表示されます。",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  // 一覧画面での並び順(新しい開催日が上にくるようにする)
  orderings: [
    {
      title: "開催日が新しい順",
      name: "eventDateDesc",
      by: [{ field: "eventDate", direction: "desc" }],
    },
  ],
  // Studioの一覧に出すサムネイル・タイトル・日付
  preview: {
    select: { title: "title", date: "eventDate", location: "location", media: "image" },
    prepare({ title, date, location, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })
        : "日付未設定";
      return {
        title,
        subtitle: `${formattedDate}${location ? " ・ " + location : ""}`,
        media,
      };
    },
  },
});
