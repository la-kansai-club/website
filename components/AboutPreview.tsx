import Link from "next/link";

// トップページのAboutティザー。「クラブ紹介への導入」という位置付けのため、
// 写真は表示せずラベル・見出し・説明文・リンクのみのシンプルな構成にしている。
// 詳しい写真・活動紹介はAboutページ側で見せる(このセクションでは重複させない)。
// レイアウト・余白はGallery/Newsのセクション見出しと統一している。

type AboutPreviewProps = {
  title: string;
  text: string;
};

export default function AboutPreview({ title, text }: AboutPreviewProps) {
  return (
    <section className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">About</p>
          <h2 className="text-h2 text-navy md:text-h2-desktop">{title}</h2>
        </div>
        <Link href="/about" className="whitespace-nowrap text-caption font-bold text-navy-deep">
          Aboutで詳しく見る →
        </Link>
      </div>
      <p className="mt-6 max-w-[640px] text-body text-ink md:text-body-desktop">{text}</p>
    </section>
  );
}
