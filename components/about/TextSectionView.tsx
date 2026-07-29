import PhotoFrame from "../PhotoFrame";
import RichText from "../RichText";
import { urlFor } from "@/sanity/lib/image";
import type { TextSectionBlock } from "@/sanity/lib/types";

// 「文章ブロック」の表示。写真が設定されていれば写真+文章(Home のAbout紹介と同じ見せ方)、
// 無ければ文章のみのシンプルな表示にする。

export default function TextSectionView({ section }: { section: TextSectionBlock }) {
  const imageUrl = section.image ? urlFor(section.image).width(800).height(1000).url() : undefined;

  if (imageUrl) {
    return (
      <section className="mx-auto max-w-content px-6 pt-16 md:flex md:items-center md:gap-14 md:px-12 md:pt-24">
        <PhotoFrame
          src={imageUrl}
          alt=""
          aspect="card"
          className="mb-6 md:mb-0 md:aspect-portrait md:w-[360px] md:flex-shrink-0"
          iconClassName="w-10 h-10"
        />
        <div>
          {section.title && (
            <h2 className="mb-3 text-h2 text-navy md:text-h2-desktop">{section.title}</h2>
          )}
          <RichText blocks={section.body} />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
      <div className="max-w-[720px]">
        {section.title && <h2 className="mb-3 text-h2 text-navy md:text-h2-desktop">{section.title}</h2>}
        <RichText blocks={section.body} />
      </div>
    </section>
  );
}
