import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { safeFetch, siteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { SanitySiteSettings } from "@/sanity/lib/types";
import { navLinks as fallbackNavLinks, footer as fallbackFooter } from "@/content/home";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const FALLBACK_TITLE = "LA Kansai Club";
const FALLBACK_DESCRIPTION =
  "関西にゆかりのある方も、関西文化が好きな方も。世代や地域を越えて交流を楽しめる、LA Kansai Clubのコミュニティです。";
const FALLBACK_ORGANIZATION_NAME = "LA Kansai Club";
const FALLBACK_JOIN_BUTTON_LABEL = "入会する";

// ナビゲーションのhref(リンク先)ごとに、対応するsiteSettingsのフィールド名を固定でひもづける。
// hrefはコード側の一覧(content/home.tsのnavLinks)が正であり、Sanity側からは表示名しか上書きできない。
const navLabelFieldByHref: Record<string, keyof SanitySiteSettings> = {
  "/": "navHomeLabel",
  "/about": "navAboutLabel",
  "/events": "navEventsLabel",
  "/gallery": "navGalleryLabel",
  "/news": "navNewsLabel",
  "/donate": "navDonateLabel",
  "/contact": "navContactLabel",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await safeFetch<SanitySiteSettings | null>(siteSettingsQuery, null);

  const title = settings?.siteTitle || FALLBACK_TITLE;
  const description = settings?.metaDescription || FALLBACK_DESCRIPTION;
  const ogImageUrl = settings?.ogImage
    ? urlFor(settings.ogImage).width(1200).height(630).url()
    : undefined;
  const faviconUrl = settings?.favicon ? urlFor(settings.favicon).width(64).height(64).url() : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // generateMetadata()と同じクエリを再度呼んでいるが、Next.jsのfetchキャッシュにより
  // 実際のSanityへの問い合わせは重複しない(revalidate:60が共有される)。
  const settings = await safeFetch<SanitySiteSettings | null>(siteSettingsQuery, null);

  const logoUrl = settings?.logo ? urlFor(settings.logo).width(200).height(264).url() : "/images/logo.png";
  const navItems = fallbackNavLinks.map((link) => ({
    href: link.href,
    label: (settings?.[navLabelFieldByHref[link.href]] as string | undefined) || link.label,
  }));

  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="font-sans">
        <Header
          logoUrl={logoUrl}
          navItems={navItems}
          joinButtonLabel={settings?.navJoinButtonLabel || FALLBACK_JOIN_BUTTON_LABEL}
        />
        <main>{children}</main>
        <Footer
          address={settings?.address || fallbackFooter.address}
          email={settings?.email || fallbackFooter.email}
          instagramUrl={settings?.instagramUrl}
          facebookUrl={settings?.facebookUrl}
          navItems={navItems}
          organizationName={settings?.organizationName || FALLBACK_ORGANIZATION_NAME}
        />
      </body>
    </html>
  );
}
