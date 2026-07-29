// Homeページのうち、更新頻度が低くコードに残す部分のテキスト・コンテンツ。
// イベント・お知らせ・ギャラリーはSanityから取得するため、ここには含めない
// (sanity/lib/queries.ts, app/page.tsx を参照)。
//
// 写真素材が用意され次第、各 image に画像パスを追加するだけで差し替えられる。

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "News", href: "/news" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  eyebrow: "LA Kansai Club",
  title: "人と文化をつなぐ、LA関西クラブ。",
  subtitle:
    "関西にゆかりのある方も、関西文化が好きな方も。世代や地域、さまざまなバックグラウンドを越えて、交流を楽しめるコミュニティです。",
  primaryCta: { label: "イベントを見る", href: "/events" },
  secondaryCta: { label: "入会する", href: "/join" },
  image: undefined as string | undefined,
};

export const aboutPreview = {
  text: "関西出身者・関西ファンが集まり、河内音頭や学生研修などの活動を通じてつながりを広げています。",
  link: { label: "Aboutで詳しく見る", href: "/about" },
  image: undefined as string | undefined,
};

export const joinCta = {
  title: "一緒に関西を楽しみませんか？",
  cta: { label: "入会について見る", href: "/join" },
};

export const footer = {
  address: "Los Angeles, CA",
  email: "info@lakansaiclub.org",
  copyright: "© 2026 LA Kansai Club",
};
