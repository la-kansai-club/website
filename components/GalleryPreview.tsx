import Link from "next/link";
import PhotoFrame from "./PhotoFrame";
import Tag from "./Tag";
import { urlFor } from "@/sanity/lib/image";
import { galleryTagLabels } from "@/sanity/lib/tags";
import type { SanityGalleryAlbum } from "@/sanity/lib/types";

// トップページのGalleryプレビュー。均等なグリッドではなく、
// 大きな写真1枚+小さな写真を組み合わせたメリハリのあるレイアウト。
// デスクトップとスマホでレイアウトの形自体が異なるため、2つに分けて実装している。
//
// アルバムはSanityから最大4件取得して親(app/page.tsx)から渡される。
// 運用を始めたばかりでアルバムが4件そろっていない場合にレイアウトが崩れないよう、
// 件数に応じてシンプルな均等グリッドにフォールバックする。

function albumImageUrl(album: SanityGalleryAlbum, size: number) {
  return album.coverImage ? urlFor(album.coverImage).width(size).height(size).url() : undefined;
}

function albumTagLabel(album: SanityGalleryAlbum) {
  return album.tag ? galleryTagLabels[album.tag] : undefined;
}

function AlbumLabel({ title, tag }: { title: string; tag?: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1.5 bg-ink/55 p-3">
      {tag && <Tag>{tag}</Tag>}
      <p className="text-[13px] font-bold text-white">{title}</p>
    </div>
  );
}

export default function GalleryPreview({ albums }: { albums: SanityGalleryAlbum[] }) {
  return (
    <section className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">Gallery</p>
          <h2 className="text-h2 text-navy md:text-h2-desktop">思い出のアルバム</h2>
        </div>
        <Link href="/gallery" className="whitespace-nowrap text-caption font-bold text-navy-deep">
          Galleryをもっと見る →
        </Link>
      </div>

      {albums.length === 0 && (
        <p className="mt-8 text-body text-ink-soft">アルバムは準備中です。</p>
      )}

      {albums.length > 0 && albums.length < 4 && (
        <div
          className={`mt-8 grid gap-4 ${
            albums.length === 1 ? "grid-cols-1" : albums.length === 2 ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {albums.map((album) => (
            <div key={album.title} className="relative">
              <PhotoFrame src={albumImageUrl(album, 600)} alt={album.title} aspect="square" />
              <AlbumLabel title={album.title} tag={albumTagLabel(album)} />
            </div>
          ))}
        </div>
      )}

      {albums.length >= 4 && (
        <>
          {/* デスクトップ: 大1 + 横長1 + 小2 */}
          <div className="mt-8 hidden grid-cols-3 grid-rows-[10rem_10rem] gap-4 md:grid">
            <div className="relative col-start-1 row-span-2">
              <PhotoFrame src={albumImageUrl(albums[0], 700)} alt={albums[0].title} aspect="auto" />
              <AlbumLabel title={albums[0].title} tag={albumTagLabel(albums[0])} />
            </div>
            <div className="relative col-span-2 col-start-2 row-start-1">
              <PhotoFrame src={albumImageUrl(albums[1], 700)} alt={albums[1].title} aspect="auto" />
              <AlbumLabel title={albums[1].title} tag={albumTagLabel(albums[1])} />
            </div>
            <div className="relative col-start-2 row-start-2">
              <PhotoFrame src={albumImageUrl(albums[2], 400)} alt={albums[2].title} aspect="auto" />
              <AlbumLabel title={albums[2].title} tag={albumTagLabel(albums[2])} />
            </div>
            <div className="relative col-start-3 row-start-2">
              <PhotoFrame src={albumImageUrl(albums[3], 400)} alt={albums[3].title} aspect="auto" />
              <AlbumLabel title={albums[3].title} tag={albumTagLabel(albums[3])} />
            </div>
          </div>

          {/* スマホ: 大1(上) + 小3(下段) */}
          <div className="mt-6 md:hidden">
            <div className="relative mb-3">
              <PhotoFrame src={albumImageUrl(albums[0], 700)} alt={albums[0].title} aspect="wide" />
              <AlbumLabel title={albums[0].title} tag={albumTagLabel(albums[0])} />
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {albums.slice(1, 4).map((album) => (
                <div key={album.title} className="relative">
                  <PhotoFrame src={albumImageUrl(album, 300)} alt={album.title} aspect="square" />
                  <div className="absolute inset-x-0 bottom-0 bg-ink/55 p-1.5">
                    <p className="truncate text-[10px] font-bold text-white">{album.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
