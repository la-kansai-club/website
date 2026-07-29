// 「Aboutページ」シングルトン(サイト全体で1つだけ存在するドキュメント)。
//
// 設計方針(2026-07-29承認):
// - クラブ紹介・Mission・History・活動紹介・写真を個別の固定フィールドにするのではなく、
//   「セクション」を自由に追加・削除・並び替えできるブロック形式にしている
//   (sanity/schemaTypes/aboutSections/ の5種類のブロック)。
// - できること: ブロックの追加・削除・並び替え、各ブロック内の文章・写真の編集
// - できないこと: ブロックごとの見た目(色・余白・レイアウト)はコード側で固定。
//   新しい見た目のブロックが必要な場合は開発者への相談が必要
// - ページ末尾のJoin導線は独自のフィールドを持たず、Homeページ設定(homePage)の
//   joinTitle/joinCtaLabelを再利用する(内容を二重管理しないため)

import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Aboutページ",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "ページ見出し",
      type: "string",
      description: "空欄の場合は「About」と表示されます。",
    }),
    defineField({
      name: "sections",
      title: "セクション",
      type: "array",
      description: "「＋」から追加するブロックの種類を選び、ドラッグで順番を入れ替えられます。",
      of: [
        { type: "textSection" },
        { type: "missionSection" },
        { type: "historySection" },
        { type: "activitiesSection" },
        { type: "photoGallerySection" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Aboutページ" };
    },
  },
});
