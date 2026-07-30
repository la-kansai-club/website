import Link from "next/link";
import { notFound } from "next/navigation";
import RichText from "@/components/RichText";
import { safeFetch, newsBySlugQuery, allNewsQuery } from "@/sanity/lib/queries";
import { formatNewsDate } from "@/sanity/lib/dates";
import type { SanityNewsItem, SanityNewsItemDetail } from "@/sanity/lib/types";

// お知らせ詳細ページ。前後の記事への移動は、一覧と同じ並び順(掲載日が新しい順)の
// リストの中で現在の記事の位置を探して求める(専用のGROQクエリを増やさず、
// 一覧ページと同じ allNewsQuery を再利用している。Galleryの前後アルバム移動と同じ設計)。

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const [item, allNews] = await Promise.all([
    safeFetch<SanityNewsItemDetail | null>(newsBySlugQuery, null, { slug: params.slug }),
    safeFetch<SanityNewsItem[]>(allNewsQuery, []),
  ]);

  if (!item) {
    notFound();
  }

  const currentIndex = allNews.findIndex((n) => n.slug.current === params.slug);
  const prevItem = currentIndex > 0 ? allNews[currentIndex - 1] : undefined;
  const nextItem = currentIndex >= 0 && currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : undefined;

  return (
    <div className="mx-auto max-w-content px-6 py-16 md:px-12 md:py-24">
      <Link href="/news" className="text-caption font-bold text-navy-deep">
        ← お知らせ一覧に戻る
      </Link>

      {/* 基本情報ブロック */}
      <div className="mt-6">
        <p className="text-caption text-ink-soft">{formatNewsDate(item.publishedAt)}</p>
        <h1 className="mt-2 text-h1 text-navy md:text-h1-desktop">{item.title}</h1>
      </div>

      {/* 本文ブロック */}
      <div className="mt-8 max-w-[640px]">
        <RichText blocks={item.body} />
      </div>

      {/* 外部リンクCTAブロック */}
      {item.externalUrl && (
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block text-body font-bold text-navy-deep"
        >
          {item.buttonLabel || "詳しく見る"} →
        </a>
      )}

      {/* 前後の記事への移動ブロック */}
      <div className="mt-12 flex items-center justify-between border-t border-line pt-6 text-caption font-bold text-navy-deep">
        {prevItem ? (
          <Link href={`/news/${prevItem.slug.current}`} className="max-w-[40%] truncate">
            ← {prevItem.title}
          </Link>
        ) : (
          <span />
        )}
        <Link href="/news" className="whitespace-nowrap text-ink-soft">
          一覧へ戻る
        </Link>
        {nextItem ? (
          <Link href={`/news/${nextItem.slug.current}`} className="max-w-[40%] truncate text-right">
            {nextItem.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
