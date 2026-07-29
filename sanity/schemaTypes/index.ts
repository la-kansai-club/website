// すべてのドキュメントスキーマをここでまとめてsanity.config.tsに渡す。
// 新しいコンテンツの種類を追加するときは、ここに1行追加するだけでよい。

import { eventType } from "./event";
import { newsType } from "./news";
import { galleryAlbumType } from "./galleryAlbum";

export const schemaTypes = [eventType, newsType, galleryAlbumType];
