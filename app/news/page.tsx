import Link from "next/link";
import Tag from "@/components/Tag";
import { safeFetch, allNewsQuery } from "@/sanity/lib/queries";
import { isRecentlyPublished, formatNewsDate } from "@/sanity/lib/dates";
import type { SanityNewsItem } from "@/sanity/lib/types";

// Newsページは一覧のみ。詳細は app/news/[slug]/page.tsx。
// 見た目はHomeの「お知らせ」プレビューと同じ時系列リストの全件表示。

export default async function NewsPage() {
  const newsItems = await safeFetch<SanityNewsItem[]>(allNewsQuery, []);

  return (
    <>
      <div className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
        <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">News</p>
        <h1 className="text-h1 text-navy md:text-h1-desktop">お知らせ</h1>
      </div>

      <section className="mx-auto max-w-content px-6 pb-16 pt-8 md:px-12 md:pb-24">
        {newsItems.length === 0 ? (
          <p className="text-body text-ink-soft">お知らせは準備中です。</p>
        ) : (
          <div className="border-t border-line">
            {newsItems.map((item) => (
              <div
                key={item.slug.current}
                className="flex flex-col gap-1.5 border-b border-line py-4 md:flex-row md:items-center md:justify-between md:gap-6"
              >
                <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-6">
                  <div className="flex items-center gap-2 md:w-[110px] md:flex-shrink-0">
                    <span className="text-caption text-ink-soft">{formatNewsDate(item.publishedAt)}</span>
                    {isRecentlyPublished(item.publishedAt) && <Tag>NEW</Tag>}
                  </div>
                  <Link href={`/news/${item.slug.current}`} className="text-body text-ink">
                    {item.title}
                  </Link>
                </div>
                {item.externalUrl && (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-caption font-bold text-navy-deep"
                  >
                    {item.buttonLabel || "詳しく見る"} →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
