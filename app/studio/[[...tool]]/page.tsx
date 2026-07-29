// Sanity Studio(理事が使う管理画面)を /studio に埋め込むためのページ。
// 見た目や項目の中身は sanity.config.ts / sanity/schemaTypes/ 側で管理する。
//
// "use client" が必要な理由: Sanity StudioはReactのcreateContext等、
// クライアント専用のAPIを内部で使っている。このページをServer Componentのままにすると、
// importしたsanity.config.tsごとサーバー用のReactビルドで評価されてしまい、
// createContextが存在せずエラーになる。

"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
