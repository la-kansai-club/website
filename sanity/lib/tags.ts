// タグの選択肢(value)から、画面に表示する日本語ラベルへの対応表。
//
// 注意: この内容は sanity/schemaTypes/event.ts と galleryAlbum.ts の
// options.list とそれぞれ対応している。タグの選択肢を増減・変更する場合は、
// 必ずスキーマ側とこのファイルの両方を合わせて更新すること。

export const eventTagLabels: Record<string, string> = {
  "beginner-friendly": "初めての方歓迎",
  "members-only": "会員限定",
  "cancel-if-rain": "雨天中止",
};

export const galleryTagLabels: Record<string, string> = {
  culture: "文化",
  exchange: "交流",
  social: "懇親",
  learning: "学び",
};
