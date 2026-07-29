// Sanityにアップロードされた画像から、Web表示用に最適化されたURLを作るヘルパー。
//
// 「画像はアップロード時にWeb用へ自動最適化」という要件は、ここで一元的に対応する。
// コンポーネント側は urlFor(image).width(800).url() のように呼ぶだけでよく、
// 個々の場所で最適化パラメータを意識する必要がない(保守性のための一元化)。
//
// ビルダーの生成は初回呼び出し時まで遅らせている(client.tsのgetClient()と同じ理由)。

import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

let cachedBuilder: ReturnType<typeof createImageUrlBuilder> | null = null;

function getBuilder() {
  if (!cachedBuilder) {
    cachedBuilder = createImageUrlBuilder({ projectId: projectId ?? "", dataset: dataset ?? "" });
  }
  return cachedBuilder;
}

export function urlFor(source: Image) {
  return getBuilder().image(source).auto("format").fit("max");
}
