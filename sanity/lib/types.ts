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
