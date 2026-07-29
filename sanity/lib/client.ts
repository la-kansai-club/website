// フロントエンド(トップページ等)からSanityのデータを読み取るためのクライアント。
// 書き込みは行わない読み取り専用の用途なので useCdn: true にして高速なキャッシュ経由で取得する。
//
// クライアントの生成は getClient() 呼び出し時まで遅らせている。
// これはモジュールをimportしただけで例外が発生しないようにするため
// (sanity/lib/queries.ts の safeFetch が、この関数呼び出しをtry/catchで包む)。

import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

let cachedClient: SanityClient | null = null;

export function getClient(): SanityClient {
  if (!projectId || !dataset) {
    throw new Error(
      "Sanityの環境変数が設定されていません(.env.local.example を参照)"
    );
  }
  if (!cachedClient) {
    cachedClient = createClient({ projectId, dataset, apiVersion, useCdn: true });
  }
  return cachedClient;
}
