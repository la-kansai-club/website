// 「お知らせ(News)」ドキュメントのスキーマ。
//
// 設計方針(2026-07-23承認):
// - 必須項目はタイトルと本文の2つだけにする(最もシンプルな更新画面にするため)
// - 「NEW」バッジは手動フィールドを作らず、publishedAtが直近14日以内かどうかを
//   フロントエンド側で判定して自動表示する(このスキーマにisNewは持たせない)
// - externalUrlが空欄の場合、buttonLabelを入力してもボタンは表示しない設計。
//   その判定と「空欄なら『詳しく見る』を使う」というデフォルト処理はフロントエンド側の責務とし、
//   スキーマ側では単純に2つの任意項目として保持するだけにする

import { defineField, defineType } from "sanity";

export const newsType = defineType({
  name: "news",
  title: "お知らせ",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      description: "例: 新年会の日程が決定しました",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "掲載日",
      type: "datetime",
      description: "通常は投稿日のままで問題ありません。",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "本文",
      type: "array",
      description: "太字・箇条書きが使えます。",
      of: [
        {
          type: "block",
          // 見出しやイタリックなど、サイトのデザインルールに合わない装飾は選べないように絞る
          styles: [{ title: "標準", value: "normal" }],
          marks: {
            decorators: [{ title: "太字", value: "strong" }],
          },
          lists: [{ title: "箇条書き", value: "bullet" }],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "externalUrl",
      title: "外部リンクURL",
      type: "url",
      description: "例: 申込みフォームや詳細ページのURL",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "buttonLabel",
      title: "ボタン名",
      type: "string",
      description: "空欄の場合「詳しく見る」と表示されます。外部リンクURLが空欄のときはボタン自体表示されません。",
    }),
  ],
  orderings: [
    {
      title: "掲載日が新しい順",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "publishedAt" },
    prepare({ title, date }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })
        : "日付未設定";
      return { title, subtitle: formattedDate };
    },
  },
});
