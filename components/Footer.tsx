import Link from "next/link";

// サイト共通のフッター。DESIGN_RULES.md 通り、ネイビーを背景に使う唯一の大きな面。
// 全ページで再利用する。
// 住所・メール・SNS・ナビゲーションの表示名・団体名はSanity(siteSettings)から編集できる。
// ナビゲーションのリンク先(href)はコード側で固定(親のapp/layout.tsxから渡される)。
// Copyrightの年は自動計算し、専用フィールドは持たない。
//
// フッターのメニューはヘッダーと同じ並び順のうち、Home/Donate/Contactを除いた
// About/Events/News/Galleryのみを表示する(2026-07-30確定)。

const FOOTER_NAV_HREFS = ["/about", "/events", "/news", "/gallery"];

type NavItem = { label: string; href: string };

type FooterProps = {
  address: string;
  email: string;
  instagramUrl?: string;
  facebookUrl?: string;
  navItems: NavItem[];
  organizationName: string;
};

export default function Footer({
  address,
  email,
  instagramUrl,
  facebookUrl,
  navItems,
  organizationName,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-footer px-6 py-16 md:px-16">
      <div className="mx-auto grid max-w-content gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="mb-2 text-[14px] font-bold text-white">LA KANSAI CLUB</p>
          <p className="text-caption text-footer-text">{address}</p>
          <p className="mt-1 text-caption text-footer-text">{email}</p>
        </div>

        <div>
          <p className="mb-3 text-[12px] font-bold text-footer-text-muted">Menu</p>
          <div className="flex flex-col gap-2 text-body text-footer-text">
            {navItems
              .filter((link) => FOOTER_NAV_HREFS.includes(link.href))
              .map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-[12px] font-bold text-footer-text-muted">Follow us</p>
          <div className="flex gap-4 text-white">
            <a href={instagramUrl || "#"} aria-label="Instagram">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={facebookUrl || "#"} aria-label="Facebook">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.3}>
                <circle cx="12" cy="12" r="9.2" strokeWidth={1.6} />
                <path
                  d="M13.2 20.6v-6.8h2.1l.3-2.6h-2.4V9.5c0-.75.2-1.26 1.28-1.26h1.37V5.9c-.24-.03-1.05-.1-2-.1-1.98 0-3.33 1.2-3.33 3.42v1.98H8.4v2.6h2.1v6.8"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href={`mailto:${email}`} aria-label="Email">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <rect x="3" y="5.5" width="18" height="13" rx="2" />
                <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-content border-t border-white/15 pt-5">
        <p className="text-caption text-footer-text-muted">
          © {year} {organizationName}
        </p>
      </div>
    </footer>
  );
}
