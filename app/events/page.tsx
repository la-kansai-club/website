import EventCard from "@/components/EventCard";
import { safeFetch, upcomingEventsQuery, pastEventsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatEventMeta } from "@/sanity/lib/dates";
import { eventTagLabels } from "@/sanity/lib/tags";
import type { SanityEvent } from "@/sanity/lib/types";

// Eventsページは一覧のみ。詳細は app/events/[slug]/page.tsx。
// 「終了したイベントの自動アーカイブ」の判定は sanity/lib/queries.ts の
// NOT_ARCHIVED_FILTER に集約されており、ここでは upcoming/past 2つのクエリを
// 呼び分けるだけでよい(Homeの「次のイベント」表示と同じ設計)。

function EventCardFromSanity({ event }: { event: SanityEvent }) {
  return (
    <EventCard
      title={event.title}
      meta={formatEventMeta(event.eventDate, event.location)}
      description={event.description}
      badge={event.tag ? eventTagLabels[event.tag] : undefined}
      image={event.image ? urlFor(event.image).width(900).height(675).url() : undefined}
      ctaLabel="詳細を見る"
      ctaHref={`/events/${event.slug.current}`}
    />
  );
}

export default async function EventsPage() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    safeFetch<SanityEvent[]>(upcomingEventsQuery, []),
    safeFetch<SanityEvent[]>(pastEventsQuery, []),
  ]);

  return (
    <>
      <div className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
        <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">Events</p>
        <h1 className="text-h1 text-navy md:text-h1-desktop">イベント</h1>
      </div>

      <section className="mx-auto max-w-content px-6 pb-16 pt-8 md:px-12 md:pb-24">
        <h2 className="mb-6 text-h2 text-navy md:text-h2-desktop">今後の予定</h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-body text-ink-soft">現在予定されているイベントはありません。</p>
        ) : (
          <div className="flex flex-col gap-6">
            {upcomingEvents.map((event) => (
              <EventCardFromSanity key={event.slug.current} event={event} />
            ))}
          </div>
        )}
      </section>

      {pastEvents.length > 0 && (
        <section className="mx-auto max-w-content px-6 pb-16 pt-16 md:px-12 md:pb-24">
          <h2 className="mb-6 text-h2 text-navy md:text-h2-desktop">過去のイベント</h2>
          <div className="flex flex-col gap-6">
            {pastEvents.map((event) => (
              <EventCardFromSanity key={event.slug.current} event={event} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
