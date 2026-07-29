import Link from "next/link";
import Tag from "./Tag";
import { isRecentlyPublished, formatNewsDate } from "@/sanity/lib/dates";
import type { SanityNewsItem } from "@/sanity/lib/types";

// トップページのNewsプレビュー。時系列リストのみのシンプルな構成。
// 「NEW」バッジはスキーマに手動フィールドを持たせず、掲載から14日以内かをここで判定する。
// 外部リンクURLが設定されている項目のみ、ボタン名(空欄なら「詳しく見る」)付きのリンクを表示する。

export default function NewsPreview({ items }: { items: SanityNewsItem[] }) {
  return (
    <section className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">News</p>
          <h2 className="text-h2 text-navy md:text-h2-desktop">お知らせ</h2>
        </div>
        <Link href="/news" className="whitespace-nowrap text-caption font-bold text-navy-deep">
          Newsをもっと見る →
        </Link>
      </div>

      {items.length === 0 && (
        <p className="mt-7 text-body text-ink-soft">お知らせは準備中です。</p>
      )}

      {items.length > 0 && (
        <div className="mt-7 border-t border-line">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-1.5 border-b border-line py-4 md:flex-row md:items-center md:justify-between md:gap-6"
            >
              <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-6">
                <div className="flex items-center gap-2 md:w-[110px] md:flex-shrink-0">
                  <span className="text-caption text-ink-soft">{formatNewsDate(item.publishedAt)}</span>
                  {isRecentlyPublished(item.publishedAt) && <Tag>NEW</Tag>}
                </div>
                <span className="text-body text-ink">{item.title}</span>
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
  );
}
