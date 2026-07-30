// 「Homeページ設定」シングルトン(サイト全体で1つだけ存在するドキュメント)。
// トップページのうち、更新頻度が低くこれまでコード(content/home.ts)に
// ハードコードしていた部分をSanityから編集できるようにする。
//
// 設計方針(2026-07-29承認):
// - ボタンのリンク先(/events, /join など)はコードに固定し、ボタンの文言だけを編集可能にする
// - デザイン・レイアウトは一切変更しない。あくまで文章・画像の差し替えのみ

import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Homeページ",
  type: "document",
  // 「新規作成」「削除」操作は sanity.config.ts の document.actions で無効化している
  // (シングルトンとして1件だけ存在させるため)
  groups: [
    { name: "hero", title: "Hero" },
    { name: "sections", title: "セクション見出し" },
    { name: "about", title: "About紹介" },
    { name: "join", title: "Join" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Heroタイトル", type: "string", group: "hero" }),
    defineField({
      name: "heroSubtitle",
      title: "Heroサブタイトル",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero画像",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaLabel",
      title: "メインボタンの文言",
      type: "string",
      description: "リンク先は/eventsに固定されています。",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      title: "サブボタンの文言",
      type: "string",
      description: "リンク先は/joinに固定されています。",
      group: "hero",
    }),
    defineField({
      name: "eventsSectionTitle",
      title: "「次のイベント」セクションの見出し",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "gallerySectionTitle",
      title: "「Gallery」セクションの見出し",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "newsSectionTitle",
      title: "「News」セクションの見出し",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "aboutTeaserTitle",
      title: "About紹介の見出し",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutTeaserText",
      title: "About紹介文",
      type: "text",
      rows: 3,
      group: "about",
    }),
    defineField({ name: "joinTitle", title: "Join見出し", type: "string", group: "join" }),
    defineField({
      name: "joinCtaLabel",
      title: "Joinボタンの文言",
      type: "string",
      description: "リンク先は/joinに固定されています。",
      group: "join",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homeページ" };
    },
  },
});
