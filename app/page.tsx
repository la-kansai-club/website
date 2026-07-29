import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import GalleryPreview from "@/components/GalleryPreview";
import AboutPreview from "@/components/AboutPreview";
import NewsPreview from "@/components/NewsPreview";
import JoinCTA from "@/components/JoinCTA";
import { safeFetch, nextEventQuery, latestNewsQuery, latestGalleryAlbumsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatEventMeta } from "@/sanity/lib/dates";
import { eventTagLabels } from "@/sanity/lib/tags";
import type { SanityEvent, SanityNewsItem, SanityGalleryAlbum } from "@/sanity/lib/types";

// イベント・お知らせ・ギャラリーはSanityから取得する(更新頻度が高いため)。
// Hero・About紹介・Join紹介・Footerはコードに残す(2026-07-23承認の設計)。
//
// 3つの取得はそれぞれ独立してsafeFetchでラップしているため、
// どれか1つがSanity側の障害で失敗しても、他の表示やページ全体には影響しない。

export default async function HomePage() {
  const [event, newsItems, albums] = await Promise.all([
    safeFetch<SanityEvent | null>(nextEventQuery, null),
    safeFetch<SanityNewsItem[]>(latestNewsQuery, []),
    safeFetch<SanityGalleryAlbum[]>(latestGalleryAlbumsQuery, []),
  ]);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
        <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">Next event</p>
        <h2 className="mb-8 text-h2 text-navy md:text-h2-desktop">次のイベント</h2>
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

      <GalleryPreview albums={albums} />
      <AboutPreview />
      <NewsPreview items={newsItems} />
      <JoinCTA />
    </>
  );
}
