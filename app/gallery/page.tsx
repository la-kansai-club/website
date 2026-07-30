import Link from "next/link";
import PhotoFrame from "@/components/PhotoFrame";
import Tag from "@/components/Tag";
import { safeFetch, allGalleryAlbumsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { galleryTagLabels } from "@/sanity/lib/tags";
import type { SanityGalleryAlbum } from "@/sanity/lib/types";

// Galleryページは一覧のみ。詳細は app/gallery/[slug]/page.tsx。
// Homeの「思い出のアルバム」プレビューと違い、全アルバムを均等なグリッドで表示する
// (Homeのメリハリレイアウトは「注目の数件を見せる」用途、こちらは「探す」用途のため)。

export default async function GalleryPage() {
  const albums = await safeFetch<SanityGalleryAlbum[]>(allGalleryAlbumsQuery, []);

  return (
    <>
      <div className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
        <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">Gallery</p>
        <h1 className="text-h1 text-navy md:text-h1-desktop">ギャラリー</h1>
      </div>

      <section className="mx-auto max-w-content px-6 pb-16 pt-8 md:px-12 md:pb-24">
        {albums.length === 0 ? (
          <p className="text-body text-ink-soft">アルバムは準備中です。</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {albums.map((album) => (
              <Link key={album.slug.current} href={`/gallery/${album.slug.current}`} className="relative block">
                <PhotoFrame
                  src={album.coverImage ? urlFor(album.coverImage).width(500).height(500).url() : undefined}
                  alt={album.title}
                  aspect="square"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1.5 rounded-b-card bg-ink/55 p-3">
                  {album.tag && <Tag>{galleryTagLabels[album.tag] || album.tag}</Tag>}
                  <p className="text-[13px] font-bold text-white">{album.title}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
