// 「Donateページ」シングルトン(サイト全体で1つだけ存在するドキュメント)。
//
// 設計方針:
// - 2026-07-30承認(初版): 具体的な寄付導線が未確定だったため、案内文のみの最小限ページとした。
// - 2026-07-30承認(更新): 実際の運用に合わせて寄付方法(Zelle・チェック郵送)を追加。
//   ZelleのQRコード画像・チェックの送付先はいずれも理事が差し替えやすいよう、
//   固定フィールド(画像1点+説明文)にしている。今後の入金手段追加(例: PayPal等)は、
//   同じ形の「見出し+画像(任意)+説明文」フィールドを追加すれば拡張できる。

import { defineField, defineType } from "sanity";

export const donatePageType = defineType({
  name: "donatePage",
  title: "Donateページ",
  type: "document",
  groups: [
    { name: "intro", title: "案内文" },
    { name: "zelle", title: "Zelle" },
    { name: "check", title: "チェック(郵送)" },
  ],
  fields: [
    defineField({
      name: "pageTitle",
      title: "ページ見出し",
      type: "string",
      description: "空欄の場合は「Donate」と表示されます。",
      group: "intro",
    }),
    defineField({
      name: "body",
      title: "案内文",
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
      group: "intro",
    }),
    defineField({
      name: "zelleTitle",
      title: "見出し",
      type: "string",
      description: "空欄の場合は「Zelle」と表示されます。",
      group: "zelle",
    }),
    defineField({
      name: "zelleImage",
      title: "QRコード画像",
      type: "image",
      description: "Zelleの送金用QRコードなど。",
      group: "zelle",
    }),
    defineField({
      name: "zelleDescription",
      title: "説明文",
      type: "text",
      rows: 3,
      description: "例: 送金先の電話番号・メールアドレスなど。",
      group: "zelle",
    }),
    defineField({
      name: "checkTitle",
      title: "見出し",
      type: "string",
      description: "空欄の場合は「チェック（郵送）」と表示されます。",
      group: "check",
    }),
    defineField({
      name: "checkDescription",
      title: "説明文",
      type: "text",
      rows: 3,
      description: "例: 宛名・郵送先住所など。",
      group: "check",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Donateページ" };
    },
  },
});
