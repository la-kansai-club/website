import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoFrame from "@/components/PhotoFrame";
import Button from "@/components/Button";
import Tag from "@/components/Tag";
import { safeFetch, eventBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatEventMeta } from "@/sanity/lib/dates";
import { eventTagLabels } from "@/sanity/lib/tags";
import type { SanityEvent } from "@/sanity/lib/types";

// イベント詳細ページ。既存の event スキーマのみを使い、新規フィールドは追加していない。
// 表示は「基本情報ブロック」「写真」「説明」「申し込みCTA」の独立したブロックに分けており、
// 将来 event スキーマにフィールドが増えた場合もブロックを追加するだけで拡張できる構成にしている。

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await safeFetch<SanityEvent | null>(eventBySlugQuery, null, { slug: params.slug });

  if (!event) {
    notFound();
  }

  const imageUrl = event.image ? urlFor(event.image).width(1600).height(900).url() : undefined;

  return (
    <div className="mx-auto max-w-content px-6 py-16 md:px-12 md:py-24">
      <Link href="/events" className="text-caption font-bold text-navy-deep">
        ← イベント一覧に戻る
      </Link>

      {/* 基本情報ブロック */}
      <div className="mt-6">
        {event.tag && <Tag>{eventTagLabels[event.tag] || event.tag}</Tag>}
        <h1 className="mt-2 text-h1 text-navy md:text-h1-desktop">{event.title}</h1>
        <p className="mt-2 text-body text-ink-soft">
          {formatEventMeta(event.eventDate, event.location)}
        </p>
      </div>

      {/* 写真ブロック */}
      <PhotoFrame
        src={imageUrl}
        alt={event.title}
        aspect="wide"
        className="mt-8"
        iconClassName="w-16 h-16"
      />

      {/* 説明ブロック */}
      {event.description && (
        <p className="mt-8 max-w-[640px] whitespace-pre-line text-body text-ink md:text-body-desktop">
          {event.description}
        </p>
      )}

      {/* 申し込みCTAブロック */}
      {event.applyUrl && (
        <Button href={event.applyUrl} variant="primary" className="mt-8">
          申し込む
        </Button>
      )}
    </div>
  );
}
