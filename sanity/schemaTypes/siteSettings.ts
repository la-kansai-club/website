// 「サイト設定」シングルトン(サイト全体で1つだけ存在するドキュメント)。
// Header・Footer・検索結果/SNSシェア時の表示(メタ情報)で共通して使う値をまとめる。
//
// 設計方針(2026-07-29承認):
// - ナビゲーションはURL(リンク先)をコードに固定し、表示名(ラベル)だけをここで編集可能にする。
//   配列ではなく項目ごとの固定フィールドにしているのは、理事が項目の追加・削除・並び替え
//   をできないようにするため(存在しないページへのリンクを作ってしまう事故を防ぐ)
// - Copyright表示専用のフィールドは作らない。年は自動計算し、organizationNameと組み合わせて
//   「© {年} {organizationName}」のように表示する(フロントエンド側の実装)

import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "サイト設定",
  type: "document",
  // 「新規作成」「削除」操作は sanity.config.ts の document.actions で無効化している
  // (シングルトンとして1件だけ存在させるため)
  groups: [
    { name: "brand", title: "ロゴ・SEO" },
    { name: "contact", title: "連絡先・SNS" },
    { name: "nav", title: "メニューの表示名" },
  ],
  fields: [
    defineField({
      name: "logo",
      title: "ロゴ",
      type: "image",
      description: "ヘッダーに表示するロゴです。空欄の場合は既定のロゴ画像が使われます。",
      group: "brand",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "ブラウザのタブに表示される小さいアイコンです。",
      group: "brand",
    }),
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      description: "ブラウザのタブや検索結果に表示されるサイト名です。",
      group: "brand",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "検索結果に表示される説明文です。120字程度がおすすめです。",
      group: "brand",
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
      description: "SNSでリンクをシェアした際に表示される画像です。横長の写真がおすすめです。",
      group: "brand",
    }),
    defineField({
      name: "organizationName",
      title: "Organization Name",
      type: "string",
      description: "団体の正式名称。フッターの著作権表示等に使われます。例: LA Kansai Club",
      group: "brand",
    }),
    defineField({
      name: "email",
      title: "連絡先メール",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "住所表記",
      type: "string",
      description: "例: Los Angeles, CA",
      group: "contact",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      group: "contact",
    }),
    defineField({ name: "navHomeLabel", title: "Home", type: "string", group: "nav" }),
    defineField({ name: "navAboutLabel", title: "About", type: "string", group: "nav" }),
    defineField({ name: "navEventsLabel", title: "Events", type: "string", group: "nav" }),
    defineField({ name: "navGalleryLabel", title: "Gallery", type: "string", group: "nav" }),
    defineField({ name: "navNewsLabel", title: "News", type: "string", group: "nav" }),
    defineField({ name: "navDonateLabel", title: "Donate", type: "string", group: "nav" }),
    defineField({ name: "navContactLabel", title: "Contact", type: "string", group: "nav" }),
    defineField({
      name: "navJoinButtonLabel",
      title: "ヘッダーの入会ボタン",
      type: "string",
      group: "nav",
    }),
  ],
  preview: {
    prepare() {
      return { title: "サイト設定" };
    },
  },
});
