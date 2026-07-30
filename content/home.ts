// Homeページ・共通レイアウトの「既定値(フォールバック)」。
//
// hero/aboutPreview/joinCta/footer/navLinksは、現在Sanity(homePage/siteSettings)からも
// 編集できるようになっている。Sanity側にまだ値が無い項目は、ここに定義した値がそのまま
// 表示される(app/page.tsx, app/layout.tsxの合成ロジックを参照)。
// そのため、この値を消してはいけない。Sanityが一時的に使えない場合の安全網でもある。
//
// イベント・お知らせ・ギャラリーの実データはSanityのみで管理するため、ここには含めない
// (sanity/lib/queries.ts, app/page.tsx を参照)。

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
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
  title: "LA Kansai Clubについて",
  text: "関西出身者・関西ファンが集まり、河内音頭や学生研修などの活動を通じてつながりを広げています。",
  link: { label: "Aboutで詳しく見る", href: "/about" },
};

export const joinCta = {
  title: "一緒に関西を楽しみませんか？",
  cta: { label: "入会する", href: "/join" },
};

export const footer = {
  address: "Los Angeles, CA",
  email: "info@kansaiclub.org",
  facebookUrl: "https://www.facebook.com/KansaiC",
  copyright: "© 2026 LA Kansai Club",
};
