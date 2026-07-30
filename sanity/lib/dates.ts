// 日付にまつわる表示ロジックをここに集約する。
//
// 「NEWバッジ」や「終了したイベントの判定」は、スキーマに手動フィールドを作らず
// 日付から自動計算する設計にしているため(sanity/schemaTypes/参照)、
// その計算ロジックはフロントエンドのこのファイルが担当する。

// 掲載からwithinDays日以内かどうか(お知らせのNEWバッジ判定に使う)
export function isRecentlyPublished(publishedAt: string, withinDays = 14): boolean {
  const publishedTime = new Date(publishedAt).getTime();
  const diffDays = (Date.now() - publishedTime) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= withinDays;
}

// お知らせの日付表示("2026.07.18"形式)
export function formatNewsDate(publishedAt: string): string {
  const d = new Date(publishedAt);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}.${month}.${day}`;
}

// イベントカードの「日付・場所」表示("2026年9月13日(日)・Los Angeles"形式)
export function formatEventMeta(eventDate: string, location: string): string {
  const weekdayLabels = ["日", "月", "火", "水", "木", "金", "土"];
  const d = new Date(eventDate);
  const formattedDate = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${weekdayLabels[d.getDay()]})`;
  return `${formattedDate}・${location}`;
}

// ギャラリーアルバムの開催日表示("2026年9月13日"形式)
export function formatAlbumDate(eventDate: string): string {
  const d = new Date(eventDate);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
