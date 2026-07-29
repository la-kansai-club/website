// Sanity Studio(管理画面)の設定。/studio でこの設定を使ってStudioが表示される。
// 新しいコンテンツの種類は sanity/schemaTypes/index.ts に追加すれば、ここを変更せず反映される。

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { assertSanityConfig } from "./sanity/env";

// Studioは値が無いと機能しないため、ここでは(公開サイト側と異なり)例外を投げてよい。
// このファイルの失敗は/studioルートのみに影響し、公開サイト側には影響しない。
const { projectId, dataset, apiVersion } = assertSanityConfig();

export default defineConfig({
  name: "default",
  title: "LA Kansai Club CMS",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool(),
    // GROQクエリを試せるVisionツール。開発者がデータ確認する際に使う(理事の日常操作には不要)
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
