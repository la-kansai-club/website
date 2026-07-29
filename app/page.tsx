import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import GalleryPreview from "@/components/GalleryPreview";
import AboutPreview from "@/components/AboutPreview";
import NewsPreview from "@/components/NewsPreview";
import JoinCTA from "@/components/JoinCTA";
import {
  safeFetch,
  nextEventQuery,
  latestNewsQuery,
  latestGalleryAlbumsQuery,
  homePageQuery,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatEventMeta } from "@/sanity/lib/dates";
import { eventTagLabels } from "@/sanity/lib/tags";
import type { SanityEvent, SanityNewsItem, SanityGalleryAlbum, SanityHomePage } from "@/sanity/lib/types";
import { hero as fallbackHero, aboutPreview as fallbackAboutPreview, joinCta as fallbackJoinCta } from "@/content/home";

// イベント・お知らせ・ギャラリーはSanityから取得する(更新頻度が高いため)。
// Hero・About紹介・Join紹介・各セクション見出しはhomePage(シングルトン)から取得し、
// 値が無い項目はcontent/home.tsの既定値にフォールバックする(2026-07-29承認の設計)。
// Footerはapp/layout.tsx側でsiteSettingsから取得している。
//
// 4つの取得はそれぞれ独立してsafeFetchでラップしているため、
// どれか1つがSanity側の障害で失敗しても、他の表示やページ全体には影響しない。

const FALLBACK_EVENTS_SECTION_TITLE = "次のイベント";
const FALLBACK_GALLERY_SECTION_TITLE = "思い出のアルバム";
const FALLBACK_NEWS_SECTION_TITLE = "お知らせ";

export default async function HomePage() {
  const [event, newsItems, albums, homePage] = await Promise.all([
    safeFetch<SanityEvent | null>(nextEventQuery, null),
    safeFetch<SanityNewsItem[]>(latestNewsQuery, []),
    safeFetch<SanityGalleryAlbum[]>(latestGalleryAlbumsQuery, []),
    safeFetch<SanityHomePage | null>(homePageQuery, null),
  ]);

  const heroImageUrl = homePage?.heroImage
    ? urlFor(homePage.heroImage).width(1600).height(1200).url()
    : fallbackHero.image;
  const aboutTeaserImageUrl = homePage?.aboutTeaserImage
    ? urlFor(homePage.aboutTeaserImage).width(800).height(1000).url()
    : fallbackAboutPreview.image;

  return (
    <>
      <Hero
        eyebrow={fallbackHero.eyebrow}
        title={homePage?.heroTitle || fallbackHero.title}
        subtitle={homePage?.heroSubtitle || fallbackHero.subtitle}
        image={heroImageUrl}
        primaryCtaLabel={homePage?.heroPrimaryCtaLabel || fallbackHero.primaryCta.label}
        primaryCtaHref={fallbackHero.primaryCta.href}
        secondaryCtaLabel={homePage?.heroSecondaryCtaLabel || fallbackHero.secondaryCta.label}
        secondaryCtaHref={fallbackHero.secondaryCta.href}
      />

      <section className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
        <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">Next event</p>
        <h2 className="mb-8 text-h2 text-navy md:text-h2-desktop">
          {homePage?.eventsSectionTitle || FALLBACK_EVENTS_SECTION_TITLE}
        </h2>
        {event ? (
          <EventCard
            title={event.title}
            meta={formatEventMeta(event.eventDate, event.location)}
            description={event.description}
            badge={event.tag ? eventTagLabels[event.tag] : undefined}
            image={event.image ? urlFor(event.image).width(900).height(675).url() : undefined}
            ctaLabel="詳細を見る"
            ctaHref="/events"
          />
        ) : (
          <p className="text-body text-ink-soft">現在予定されているイベントはありません。</p>
        )}
      </section>

      <GalleryPreview
        albums={albums}
        sectionTitle={homePage?.gallerySectionTitle || FALLBACK_GALLERY_SECTION_TITLE}
      />
      <AboutPreview text={homePage?.aboutTeaserText || fallbackAboutPreview.text} image={aboutTeaserImageUrl} />
      <NewsPreview items={newsItems} sectionTitle={homePage?.newsSectionTitle || FALLBACK_NEWS_SECTION_TITLE} />
      <JoinCTA
        title={homePage?.joinTitle || fallbackJoinCta.title}
        ctaLabel={homePage?.joinCtaLabel || fallbackJoinCta.cta.label}
      />
    </>
  );
}
