// Homeページで使うSanityデータの型定義。
// 注意: 各フィールドは sanity/lib/queries.ts のGROQクエリで指定した項目と一致させること。

import type { Image } from "sanity";

export interface SanityEvent {
  title: string;
  eventDate: string;
  endDateTime?: string;
  location: string;
  description?: string;
  tag?: string;
  applyUrl?: string;
  image?: Image;
}

export interface SanityNewsItem {
  title: string;
  publishedAt: string;
  externalUrl?: string;
  buttonLabel?: string;
}

export interface SanityGalleryAlbum {
  title: string;
  tag?: string;
  coverImage?: Image;
}

// Homeページ設定・サイト設定はシングルトン(1件のみ)のため、
// ドキュメント自体が未作成の場合や個々のフィールドが未入力の場合がある。
// そのため全フィールドを任意(optional)にし、フロントエンド側でcontent/home.tsの
// 既定値と組み合わせて使う(sanity/lib/queries.ts, app/page.tsx, app/layout.tsx参照)。

export interface SanityHomePage {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: Image;
  heroPrimaryCtaLabel?: string;
  heroSecondaryCtaLabel?: string;
  eventsSectionTitle?: string;
  gallerySectionTitle?: string;
  newsSectionTitle?: string;
  aboutTeaserText?: string;
  aboutTeaserImage?: Image;
  joinTitle?: string;
  joinCtaLabel?: string;
}

export interface SanitySiteSettings {
  logo?: Image;
  favicon?: Image;
  siteTitle?: string;
  metaDescription?: string;
  ogImage?: Image;
  organizationName?: string;
  email?: string;
  address?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  navHomeLabel?: string;
  navAboutLabel?: string;
  navEventsLabel?: string;
  navGalleryLabel?: string;
  navNewsLabel?: string;
  navDonateLabel?: string;
  navContactLabel?: string;
  navJoinButtonLabel?: string;
}
