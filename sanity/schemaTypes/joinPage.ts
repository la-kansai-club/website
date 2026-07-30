// 「Joinページ」シングルトン(サイト全体で1つだけ存在するドキュメント)。
//
// 設計方針(2026-07-30承認):
// - 確定済みの構成(メリット→会費・条件→入会までの流れ→申込ボタン)を、
//   Aboutページのような自由なブロック形式ではなく固定フィールドにしている。
//   Joinはページ構成自体を変える運用ニーズが低いため、
//   理事の入力項目をシンプルにすることを優先した。
// - 申込ボタンのリンク先(applyUrl)は外部の申込フォームを想定した任意URL。
//   空欄の場合はボタン自体を表示しない(event.applyUrlと同じ設計)。

import { defineField, defineType } from "sanity";

export const joinPageType = defineType({
  name: "joinPage",
  title: "Joinページ",
  type: "document",
  groups: [
    { name: "benefits", title: "メリット" },
    { name: "fee", title: "会費・条件" },
    { name: "steps", title: "入会までの流れ" },
    { name: "apply", title: "申込ボタン" },
  ],
  fields: [
    defineField({
      name: "pageTitle",
      title: "ページ見出し",
      type: "string",
      description: "空欄の場合は「Join」と表示されます。",
    }),
    defineField({ name: "benefitsTitle", title: "見出し", type: "string", group: "benefits" }),
    defineField({
      name: "benefits",
      title: "メリットの項目",
      type: "array",
      of: [{ type: "string" }],
      description: "1項目1行の短い文章がおすすめです。",
      group: "benefits",
    }),
    defineField({ name: "feeTitle", title: "見出し", type: "string", group: "fee" }),
    defineField({
      name: "feeBody",
      title: "会費・条件の説明",
      type: "array",
      description: "太字・箇条書きが使えます。",
      of: [
        {
          type: "block",
          styles: [{ title: "標準", value: "normal" }],
          marks: { decorators: [{ title: "太字", value: "strong" }] },
          lists: [{ title: "箇条書き", value: "bullet" }],
        },
      ],
      group: "fee",
    }),
    defineField({ name: "stepsTitle", title: "見出し", type: "string", group: "steps" }),
    defineField({
      name: "steps",
      title: "ステップ",
      type: "array",
      description: "入会までの流れを順番に登録します。ドラッグで順番を入れ替えられます。",
      of: [
        {
          type: "object",
          name: "joinStep",
          title: "ステップ",
          fields: [
            defineField({
              name: "title",
              title: "タイトル",
              type: "string",
              description: "例: お申し込みフォームを送信",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "description", title: "説明", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
      group: "steps",
    }),
    defineField({
      name: "applyButtonLabel",
      title: "申込ボタンの文言",
      type: "string",
      description: "空欄の場合は「入会申し込む」と表示されます。",
      group: "apply",
    }),
    defineField({
      name: "applyUrl",
      title: "申込みURL",
      type: "url",
      description: "例: 入会申込フォームのリンク。空欄の場合ボタン自体が表示されません。",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
      group: "apply",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Joinページ" };
    },
  },
});
