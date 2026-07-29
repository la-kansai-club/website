// Sanity接続に必要な環境変数を、ここ1箇所にまとめて読み込む。
//
// 保守性・堅牢性のためのルール:
// - 他のファイルではprocess.envを直接読まず、必ずこのファイルの値を使う
// - projectId/datasetは「未設定の可能性がある値」としてそのまま公開する(ここでは例外を投げない)。
//   ここで例外を投げると、importしただけでHomeページ全体が落ちてしまうため
//   (実際の検証はsanity/lib/client.tsのgetClient()内、safeFetchのtry/catch内で行う)。
// - Studio(管理画面, /studio)だけは値が無いと機能しないため、assertSanityConfig()で検証する。
//   Studioが使えない状態でも公開サイト側は正常に表示され続ける設計。

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export function assertSanityConfig(): {
  projectId: string;
  dataset: string;
  apiVersion: string;
} {
  if (!projectId || !dataset) {
    throw new Error(
      "環境変数 NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET が設定されていません(.env.local.example を参照)"
    );
  }
  return { projectId, dataset, apiVersion };
}
