import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoFrame from "@/components/PhotoFrame";
import Tag from "@/components/Tag";
import { safeFetch, galleryAlbumBySlugQuery, allGalleryAlbumsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatAlbumDate } from "@/sanity/lib/dates";
import { galleryTagLabels } from "@/sanity/lib/tags";
import type { SanityGalleryAlbum, SanityGalleryAlbumDetail } from "@/sanity/lib/types";

// アルバム詳細ページ。前後のアルバムへの移動は、一覧と同じ並び順(開催日が新しい順)の
// リストの中で現在のアルバムの位置を探して求める(専用のGROQクエリを増やさず、
// 一覧ページと同じ allGalleryAlbumsQuery を再利用している)。

export default async function GalleryAlbumDetailPage({ params }: { params: { slug: string } }) {
  const [album, allAlbums] = await Promise.all([
    safeFetch<SanityGalleryAlbumDetail | null>(galleryAlbumBySlugQuery, null, { slug: params.slug }),
    safeFetch<SanityGalleryAlbum[]>(allGalleryAlbumsQuery, []),
  ]);

  if (!album) {
    notFound();
  }

  const currentIndex = allAlbums.findIndex((a) => a.slug.current === params.slug);
  const prevAlbum = currentIndex > 0 ? allAlbums[currentIndex - 1] : undefined;
  const nextAlbum =
    currentIndex >= 0 && currentIndex < allAlbums.length - 1 ? allAlbums[currentIndex + 1] : undefined;

  return (
    <div className="mx-auto max-w-content px-6 py-16 md:px-12 md:py-24">
      <Link href="/gallery" className="text-caption font-bold text-navy-deep">
        ← アルバム一覧に戻る
      </Link>

      {/* 基本情報ブロック */}
      <div className="mt-6">
        {album.tag && <Tag>{galleryTagLabels[album.tag] || album.tag}</Tag>}
        <h1 className="mt-2 text-h1 text-navy md:text-h1-desktop">{album.title}</h1>
        <p className="mt-2 text-body text-ink-soft">{formatAlbumDate(album.eventDate)}</p>
        {album.relatedEvent && (
          <Link
            href={`/events/${album.relatedEvent.slug}`}
            className="mt-2 inline-block text-caption font-bold text-navy-deep"
          >
            関連イベント: {album.relatedEvent.title} →
          </Link>
        )}
      </div>

      {/* 写真ブロック */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {(album.photos || []).map((photo, index) => (
          <PhotoFrame
            key={index}
            src={urlFor(photo).width(500).height(500).url()}
            alt={`${album.title} ${index + 1}`}
            aspect="square"
          />
        ))}
      </div>

      {/* 前後のアルバムへの移動ブロック */}
      <div className="mt-12 flex items-center justify-between border-t border-line pt-6 text-caption font-bold text-navy-deep">
        {prevAlbum ? (
          <Link href={`/gallery/${prevAlbum.slug.current}`} className="max-w-[40%] truncate">
            ← {prevAlbum.title}
          </Link>
        ) : (
          <span />
        )}
        <Link href="/gallery" className="whitespace-nowrap text-ink-soft">
          アルバム一覧へ戻る
        </Link>
        {nextAlbum ? (
          <Link href={`/gallery/${nextAlbum.slug.current}`} className="max-w-[40%] truncate text-right">
            {nextAlbum.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
