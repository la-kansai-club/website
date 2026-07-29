import Link from "next/link";
import PhotoFrame from "./PhotoFrame";
import { aboutPreview } from "@/content/home";

// トップページのAboutティザー。2〜3行の短い紹介のみで、
// 詳しい説明はAboutページへ誘導する。

export default function AboutPreview() {
  return (
    <section className="mx-auto max-w-content px-6 pt-16 md:flex md:items-center md:gap-14 md:px-12 md:pt-24">
      <PhotoFrame
        src={aboutPreview.image}
        alt=""
        aspect="card"
        className="mb-6 md:mb-0 md:aspect-portrait md:w-[360px] md:flex-shrink-0"
        iconClassName="w-10 h-10"
      />
      <div>
        <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">About</p>
        <p className="mb-3 max-w-[440px] text-body text-ink md:text-[19px] md:leading-[1.9]">
          {aboutPreview.text}
        </p>
        <Link href={aboutPreview.link.href} className="text-caption font-bold text-navy-deep">
          {aboutPreview.link.label} →
        </Link>
      </div>
    </section>
  );
}
