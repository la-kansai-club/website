// すべてのドキュメントスキーマをここでまとめてsanity.config.tsに渡す。
// 新しいコンテンツの種類を追加するときは、ここに1行追加するだけでよい。

import { eventType } from "./event";
import { newsType } from "./news";
import { galleryAlbumType } from "./galleryAlbum";
import { homePageType } from "./homePage";
import { siteSettingsType } from "./siteSettings";
import { aboutPageType } from "./aboutPage";
import { textSectionType } from "./aboutSections/textSection";
import { missionSectionType } from "./aboutSections/missionSection";
import { historySectionType } from "./aboutSections/historySection";
import { activitiesSectionType } from "./aboutSections/activitiesSection";
import { photoGallerySectionType } from "./aboutSections/photoGallerySection";
import { joinPageType } from "./joinPage";
import { donatePageType } from "./donatePage";
import { contactPageType } from "./contactPage";

export const schemaTypes = [
  eventType,
  newsType,
  galleryAlbumType,
  homePageType,
  siteSettingsType,
  aboutPageType,
  textSectionType,
  missionSectionType,
  historySectionType,
  activitiesSectionType,
  photoGallerySectionType,
  joinPageType,
  donatePageType,
  contactPageType,
];

// シングルトン(1件しか存在しないドキュメント)のtype名一覧。
// sanity.config.tsのStructure Builderで、一覧画面を経由せず直接開けるように使う。
export const singletonTypes = new Set([
  "homePage",
  "siteSettings",
  "aboutPage",
  "joinPage",
  "donatePage",
  "contactPage",
]);
