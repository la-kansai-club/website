import SectionBlock from "@/components/about/SectionBlock";
import JoinCTA from "@/components/JoinCTA";
import { safeFetch, aboutPageQuery, homePageQuery } from "@/sanity/lib/queries";
import type { SanityAboutPage, SanityHomePage } from "@/sanity/lib/types";
import { joinCta as fallbackJoinCta } from "@/content/home";

// Aboutページは最初からSanity(aboutPage)と連携した構成で実装している。
// ページの中身は「セクション」のブロックの並びで構成され、Studioから
// 追加・削除・並び替え・編集ができる(sanity/schemaTypes/aboutPage.ts参照)。
// ページ末尾のJoin導線は、Homeページ設定(homePage)の内容を再利用している
// (同じ文言を2箇所で別々に管理しないため)。

const FALLBACK_PAGE_TITLE = "About";

export default async function AboutPage() {
  const [aboutPage, homePage] = await Promise.all([
    safeFetch<SanityAboutPage | null>(aboutPageQuery, null),
    safeFetch<SanityHomePage | null>(homePageQuery, null),
  ]);

  const sections = aboutPage?.sections || [];

  return (
    <>
      <div className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
        <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">About</p>
        <h1 className="text-h1 text-navy md:text-h1-desktop">
          {aboutPage?.pageTitle || FALLBACK_PAGE_TITLE}
        </h1>
      </div>

      {sections.length === 0 ? (
        <div className="mx-auto max-w-content px-6 pt-8 pb-16 md:px-12">
          <p className="text-body text-ink-soft">このページは準備中です。</p>
        </div>
      ) : (
        sections.map((section) => <SectionBlock key={section._key} section={section} />)
      )}

      <JoinCTA
        title={homePage?.joinTitle || fallbackJoinCta.title}
        ctaLabel={homePage?.joinCtaLabel || fallbackJoinCta.cta.label}
      />
    </>
  );
}
