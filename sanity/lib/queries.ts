// Homeページで使うGROQクエリと、安全にデータを取得するための共通処理。
//
// 設計方針:
// - 「終了したイベントの自動アーカイブ」の判定条件はここに1箇所だけ定義し、
//   将来Eventsページ(一覧・アーカイブ)を作るときも同じ条件を再利用する
// - すべての取得は safeFetch を通す。Sanity側で障害があっても例外を投げず、
//   呼び出し側が指定したフォールバック値(空配列やnullなど)を返す設計にしている。
//   これにより、Homeページ全体がエラー画面になることを防ぐ(2026-07-23承認の設計)

import { getClient } from "./client";

// 「終了日時」が入力されていればそれを基準に、無ければ「開催日の翌日」を基準に
// まだ終了していないと判定する条件。event.ts のコメントと対応している。
export const NOT_ARCHIVED_FILTER = `(
  (defined(endDateTime) && dateTime(endDateTime) >= dateTime(now())) ||
  (!defined(endDateTime) && dateTime(eventDate) + 60 * 60 * 24 >= dateTime(now()))
)`;

// 終了していないイベントのうち、開催日が一番近いもの1件
export const nextEventQuery = `*[_type == "event" && ${NOT_ARCHIVED_FILTER}] | order(eventDate asc)[0]{
  title,
  eventDate,
  endDateTime,
  location,
  description,
  tag,
  applyUrl,
  image
}`;

// 掲載日が新しい順のお知らせ3件
export const latestNewsQuery = `*[_type == "news"] | order(publishedAt desc)[0...3]{
  title,
  publishedAt,
  externalUrl,
  buttonLabel
}`;

// 開催日が新しい順のギャラリーアルバム最大4件
export const latestGalleryAlbumsQuery = `*[_type == "galleryAlbum"] | order(eventDate desc)[0...4]{
  title,
  tag,
  coverImage
}`;

function timeoutAfter(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Sanityへの問い合わせが${ms}ms以内に完了しませんでした`)), ms);
  });
}

/**
 * Sanityへの問い合わせを行い、失敗しても例外を投げずフォールバック値を返す。
 * - 一定時間(既定5秒)応答がない場合もタイムアウトとして扱う
 * - 実際のエラー内容はサーバーログにのみ出力し、画面には出さない
 */
export async function safeFetch<T>(query: string, fallback: T, timeoutMs = 5000): Promise<T> {
  try {
    // getClient()は環境変数が未設定だと例外を投げるが、このtry内で呼ぶことで
    // 「Sanity未接続」も他の失敗と同じくフォールバック表示に落ちるようにしている
    const client = getClient();
    const result = await Promise.race([
      client.fetch<T>(query, {}, { next: { revalidate: 60 } }),
      timeoutAfter(timeoutMs),
    ]);
    return result;
  } catch (error) {
    console.error("[Sanity] データ取得に失敗しました。フォールバック表示を使用します:", error);
    return fallback;
  }
}
