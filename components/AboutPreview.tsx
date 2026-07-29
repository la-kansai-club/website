import Link from "next/link";
import PhotoFrame from "./PhotoFrame";

// トップページのAboutティザー。2〜3行の短い紹介のみで、
// 詳しい説明はAboutページへ誘導する。
// 文章・画像はSanity(homePage)から編集できる。リンク先(/about)は固定。

type AboutPreviewProps = {
  text: string;
  image?: string;
};

export default function AboutPreview({ text, image }: AboutPreviewProps) {
  return (
    <section className="mx-auto max-w-content px-6 pt-16 md:flex md:items-center md:gap-14 md:px-12 md:pt-24">
      <PhotoFrame
        src={image}
        alt=""
        aspect="card"
        className="mb-6 md:mb-0 md:aspect-portrait md:w-[360px] md:flex-shrink-0"
        iconClassName="w-10 h-10"
      />
      <div>
        <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">About</p>
        <p className="mb-3 max-w-[440px] text-body text-ink md:text-[19px] md:leading-[1.9]">
          {text}
        </p>
        <Link href="/about" className="text-caption font-bold text-navy-deep">
          Aboutで詳しく見る →
        </Link>
      </div>
    </section>
  );
}
