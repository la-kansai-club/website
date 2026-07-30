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

// イベント一覧・詳細で共通して取得するフィールド
const EVENT_FIELDS = `
  title,
  slug,
  eventDate,
  endDateTime,
  location,
  description,
  tag,
  applyUrl,
  image
`;

// 終了していないイベントのうち、開催日が一番近いもの1件
export const nextEventQuery = `*[_type == "event" && ${NOT_ARCHIVED_FILTER}] | order(eventDate asc)[0]{
  ${EVENT_FIELDS}
}`;

// Eventsページ用: 今後の予定(開催日が近い順)
export const upcomingEventsQuery = `*[_type == "event" && ${NOT_ARCHIVED_FILTER}] | order(eventDate asc){
  ${EVENT_FIELDS}
}`;

// Eventsページ用: 過去のイベント(開催日が新しい順)
export const pastEventsQuery = `*[_type == "event" && !(${NOT_ARCHIVED_FILTER})] | order(eventDate desc){
  ${EVENT_FIELDS}
}`;

// イベント詳細ページ用: スラッグ1件を取得
export const eventBySlugQuery = `*[_type == "event" && slug.current == $slug][0]{
  ${EVENT_FIELDS}
}`;

// お知らせ一覧・詳細で共通して取得するフィールド
const NEWS_SUMMARY_FIELDS = `
  title,
  slug,
  publishedAt,
  externalUrl,
  buttonLabel
`;

// 掲載日が新しい順のお知らせ3件
export const latestNewsQuery = `*[_type == "news"] | order(publishedAt desc)[0...3]{
  ${NEWS_SUMMARY_FIELDS}
}`;

// Newsページ用: 全件(掲載日が新しい順)。詳細ページの前後移動にも同じ並び順を使う
export const allNewsQuery = `*[_type == "news"] | order(publishedAt desc){
  ${NEWS_SUMMARY_FIELDS}
}`;

// お知らせ詳細ページ用: スラッグ1件を取得
export const newsBySlugQuery = `*[_type == "news" && slug.current == $slug][0]{
  ${NEWS_SUMMARY_FIELDS},
  body
}`;

// ギャラリーアルバム一覧・詳細で共通して取得するフィールド
const GALLERY_ALBUM_SUMMARY_FIELDS = `
  title,
  slug,
  eventDate,
  tag,
  coverImage
`;

// 開催日が新しい順のギャラリーアルバム最大4件
export const latestGalleryAlbumsQuery = `*[_type == "galleryAlbum"] | order(eventDate desc)[0...4]{
  ${GALLERY_ALBUM_SUMMARY_FIELDS}
}`;

// Galleryページ用: 全アルバム(開催日が新しい順)。詳細ページの前後移動にも同じ並び順を使う
export const allGalleryAlbumsQuery = `*[_type == "galleryAlbum"] | order(eventDate desc){
  ${GALLERY_ALBUM_SUMMARY_FIELDS}
}`;

// アルバム詳細ページ用: スラッグ1件を取得。relatedEventは相互リンク表示のため参照先を解決する
export const galleryAlbumBySlugQuery = `*[_type == "galleryAlbum" && slug.current == $slug][0]{
  ${GALLERY_ALBUM_SUMMARY_FIELDS},
  photos,
  "relatedEvent": relatedEvent->{ title, "slug": slug.current }
}`;

// Homeページ設定(シングルトン)。ドキュメントIDを固定しているため常に1件のみ存在する
export const homePageQuery = `*[_type == "homePage"][0]{
  heroTitle,
  heroSubtitle,
  heroImage,
  heroPrimaryCtaLabel,
  heroSecondaryCtaLabel,
  eventsSectionTitle,
  gallerySectionTitle,
  newsSectionTitle,
  aboutTeaserTitle,
  aboutTeaserText,
  joinTitle,
  joinCtaLabel
}`;

// サイト設定(シングルトン)。Header/Footer/メタ情報で共通して使う
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  logo,
  favicon,
  siteTitle,
  metaDescription,
  ogImage,
  organizationName,
  email,
  address,
  instagramUrl,
  facebookUrl,
  navHomeLabel,
  navAboutLabel,
  navEventsLabel,
  navGalleryLabel,
  navNewsLabel,
  navDonateLabel,
  navContactLabel,
  navJoinButtonLabel
}`;

// Aboutページ設定(シングルトン)。sections配列はブロックの種類ごとに形が異なるため、
// "..."で全フィールドをそのまま展開している(ネストした活動項目・写真も含めて解決される)
export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  pageTitle,
  sections[]{
    ...
  }
}`;

// Joinページ設定(シングルトン)
export const joinPageQuery = `*[_type == "joinPage"][0]{
  pageTitle,
  benefitsTitle,
  benefits,
  feeTitle,
  feeBody,
  stepsTitle,
  steps,
  applyButtonLabel,
  applyUrl
}`;

// Donateページ設定(シングルトン)
export const donatePageQuery = `*[_type == "donatePage"][0]{
  pageTitle,
  body,
  zelleTitle,
  zelleImage,
  zelleDescription,
  checkTitle,
  checkDescription
}`;

// Contactページ設定(シングルトン)
export const contactPageQuery = `*[_type == "contactPage"][0]{
  pageTitle,
  introText
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
export async function safeFetch<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {},
  timeoutMs = 5000
): Promise<T> {
  try {
    // getClient()は環境変数が未設定だと例外を投げるが、このtry内で呼ぶことで
    // 「Sanity未接続」も他の失敗と同じくフォールバック表示に落ちるようにしている
    const client = getClient();
    const result = await Promise.race([
      client.fetch<T>(query, params, { next: { revalidate: 60 } }),
      timeoutAfter(timeoutMs),
    ]);
    return result;
  } catch (error) {
    console.error("[Sanity] データ取得に失敗しました。フォールバック表示を使用します:", error);
    return fallback;
  }
}
