// Homeページで使うSanityデータの型定義。
// 注意: 各フィールドは sanity/lib/queries.ts のGROQクエリで指定した項目と一致させること。

import type { Image } from "sanity";

export interface SanityEvent {
  title: string;
  slug: { current: string };
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
  slug: { current: string };
  publishedAt: string;
  externalUrl?: string;
  buttonLabel?: string;
}

export interface SanityNewsItemDetail extends SanityNewsItem {
  body: PortableTextBlock[];
}

export interface SanityGalleryAlbum {
  title: string;
  slug: { current: string };
  eventDate: string;
  tag?: string;
  coverImage?: Image;
}

export interface SanityGalleryAlbumDetail extends SanityGalleryAlbum {
  photos?: Image[];
  relatedEvent?: { title: string; slug: string } | null;
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
  aboutTeaserTitle?: string;
  aboutTeaserText?: string;
  joinTitle?: string;
  joinCtaLabel?: string;
}

// Portable Text(太字・箇条書きのみに制限したリッチテキスト)の型。
// components/RichText.tsx でこの形だけを想定した専用レンダラーを実装している。

export interface PortableTextSpan {
  _key: string;
  _type: "span";
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _key: string;
  _type: "block";
  style?: string;
  listItem?: string;
  children: PortableTextSpan[];
}

// Aboutページの「セクション」を構成する5種類のブロック。
// sanity/schemaTypes/aboutSections/ の各スキーマに対応する。

export interface TextSectionBlock {
  _type: "textSection";
  _key: string;
  title?: string;
  body: PortableTextBlock[];
  image?: Image;
}

export interface MissionSectionBlock {
  _type: "missionSection";
  _key: string;
  title?: string;
  items: string[];
}

export interface HistorySectionBlock {
  _type: "historySection";
  _key: string;
  title?: string;
  body: PortableTextBlock[];
}

export interface ActivityItem {
  _key: string;
  name: string;
  description?: string;
  image?: Image;
}

export interface ActivitiesSectionBlock {
  _type: "activitiesSection";
  _key: string;
  title?: string;
  activities: ActivityItem[];
}

export interface PhotoGallerySectionBlock {
  _type: "photoGallerySection";
  _key: string;
  title?: string;
  photos: Image[];
}

export type AboutSectionBlock =
  | TextSectionBlock
  | MissionSectionBlock
  | HistorySectionBlock
  | ActivitiesSectionBlock
  | PhotoGallerySectionBlock;

export interface SanityAboutPage {
  pageTitle?: string;
  sections?: AboutSectionBlock[];
}

export interface JoinStep {
  _key: string;
  title: string;
  description?: string;
}

export interface SanityJoinPage {
  pageTitle?: string;
  benefitsTitle?: string;
  benefits?: string[];
  feeTitle?: string;
  feeBody?: PortableTextBlock[];
  stepsTitle?: string;
  steps?: JoinStep[];
  applyButtonLabel?: string;
  applyUrl?: string;
}

export interface SanityDonatePage {
  pageTitle?: string;
  body?: PortableTextBlock[];
  zelleTitle?: string;
  zelleImage?: Image;
  zelleDescription?: string;
  checkTitle?: string;
  checkDescription?: string;
}

export interface SanityContactPage {
  pageTitle?: string;
  introText?: string;
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
