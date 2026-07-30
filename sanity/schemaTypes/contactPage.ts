// 「Contactページ」シングルトン(サイト全体で1つだけ存在するドキュメント)。
//
// 設計方針(2026-07-30承認):
// - お問い合わせ方法はメールリンクのみとする(外部フォームや送信機能は追加しない)。
//   連絡先メールアドレスは siteSettings.email を再利用し、ここでは重複して持たない。

import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contactページ",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "ページ見出し",
      type: "string",
      description: "空欄の場合は「Contact」と表示されます。",
    }),
    defineField({
      name: "introText",
      title: "案内文",
      type: "text",
      rows: 3,
      description: "例: ご質問・ご相談はお気軽にメールでご連絡ください。",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contactページ" };
    },
  },
});
