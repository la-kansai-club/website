// Sanity Studio(管理画面)の設定。/studio でこの設定を使ってStudioが表示される。
// 新しいコンテンツの種類は sanity/schemaTypes/index.ts に追加すれば、ここを変更せず反映される。

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes, singletonTypes } from "./sanity/schemaTypes";
import { assertSanityConfig } from "./sanity/env";

// Studioは値が無いと機能しないため、ここでは(公開サイト側と異なり)例外を投げてよい。
// このファイルの失敗は/studioルートのみに影響し、公開サイト側には影響しない。
const { projectId, dataset, apiVersion } = assertSanityConfig();

// 左メニューを「更新頻度が高いコンテンツ」と「ページ設定」の2グループに分ける。
// ページ設定(シングルトン)は一覧を経由せず、クリックすると直接編集画面が開くようにしている
// (誤って複数のHomeページ設定を作ってしまう、といった事故を防ぐため)。
//
// 重要: S.list()/S.listItem()のidは.title()から自動生成されるが、
// タイトルが日本語(web-safeでない文字)だと有効なidを生成できず、
// Studio側で実行時エラー「'id' is required for lists」になる(2026-07-30に発生・特定)。
// そのため、すべてのS.list()/S.listItem()に英数字の.id()を明示している。
function structure(S: StructureBuilder) {
  return S.list()
    .id("root")
    .title("コンテンツ")
    .items([
      S.listItem()
        .id("frequent-content")
        .title("更新頻度が高いコンテンツ")
        .child(
          S.list()
            .id("frequent-content-list")
            .title("更新頻度が高いコンテンツ")
            .items(
              S.documentTypeListItems().filter(
                (item) => item.getId() && !singletonTypes.has(item.getId()!)
              )
            )
        ),
      S.divider(),
      S.listItem()
        .id("page-settings")
        .title("ページ設定")
        .child(
          S.list()
            .id("page-settings-list")
            .title("ページ設定")
            .items([
              S.listItem()
                .id("homePage")
                .title("Homeページ")
                .child(S.document().schemaType("homePage").documentId("homePage")),
              S.listItem()
                .id("aboutPage")
                .title("Aboutページ")
                .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
              S.listItem()
                .id("joinPage")
                .title("Joinページ")
                .child(S.document().schemaType("joinPage").documentId("joinPage")),
              S.listItem()
                .id("donatePage")
                .title("Donateページ")
                .child(S.document().schemaType("donatePage").documentId("donatePage")),
              S.listItem()
                .id("contactPage")
                .title("Contactページ")
                .child(S.document().schemaType("contactPage").documentId("contactPage")),
              S.listItem()
                .id("siteSettings")
                .title("サイト設定")
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            ])
        ),
    ]);
}

export default defineConfig({
  name: "default",
  title: "LA Kansai Club CMS",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // GROQクエリを試せるVisionツール。開発者がデータ確認する際に使う(理事の日常操作には不要)
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // シングルトン(homePage/siteSettings)は「新規作成」「複製」「削除」を無効化し、
    // 常に1件だけ存在する状態を保つ(理事が誤って複数作ってしまう事故を防ぐ)
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(({ action }) => action && !["duplicate", "delete", "create"].includes(action))
        : prev,
  },
});
