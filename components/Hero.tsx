import PhotoFrame from "./PhotoFrame";
import Button from "./Button";

// トップページ最上部のヒーロー。写真を主役にし、CTAを2つ配置する。
// 「イベントを見る」「入会する」はどちらも同格のCTAとして扱い、
// 両方ともマゼンタのPrimaryスタイルで表示する(2026-07-30変更。
// 以前はSecondary=白アウトラインだったが、Joinも同じくらい目立たせたいという方針に変更)。
//
// 文言・画像はSanity(homePage)から編集できる。リンク先(href)は事故防止のため
// 呼び出し側(app/page.tsx)で固定値を渡す構成にしており、Sanityからは変更できない。

type HeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export default function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: HeroProps) {
  return (
    <div className="relative">
      <PhotoFrame
        src={image}
        alt=""
        aspect="heroMobile"
        priority
        className="rounded-none md:aspect-hero"
        iconClassName="w-16 h-16 md:w-20 md:h-20"
      />
      {/* 写真が未設定の間、プレースホルダーがグレーっぽく見えないようブランドのネイビーで覆う。
          実写真を設定した際は、DESIGN_RULES.mdの「黒の35〜55%のオーバーレイ」に戻すことを検討する */}
      <div className="absolute inset-0 bg-navy-deep/80" />
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:max-w-[620px] md:px-16">
        <p className="mb-3 text-eyebrow font-bold uppercase text-white/95 md:mb-4">{eyebrow}</p>
        <h1 className="mb-3 whitespace-pre-line text-h1 text-white md:text-h1-desktop">{title}</h1>
        <p className="mb-6 whitespace-pre-line text-body text-white/90 md:mb-8 md:text-body-desktop">{subtitle}</p>
        <div className="flex flex-col gap-3 md:flex-row md:gap-4">
          <Button href={primaryCtaHref} variant="primary" className="justify-center">
            {primaryCtaLabel}
          </Button>
          <Button href={secondaryCtaHref} variant="primary" className="justify-center">
            {secondaryCtaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
