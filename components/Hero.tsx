import PhotoFrame from "./PhotoFrame";
import Button from "./Button";
import { hero } from "@/content/home";

// トップページ最上部のヒーロー。写真を主役にし、CTAを2つ配置する
// (デザインモック通り: Primary「イベントを見る」/ Secondary「入会する」)。

export default function Hero() {
  return (
    <div className="relative">
      <PhotoFrame
        src={hero.image}
        alt=""
        aspect="heroMobile"
        priority
        className="rounded-none md:aspect-hero"
        iconClassName="w-16 h-16 md:w-20 md:h-20"
      />
      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:max-w-[620px] md:px-16">
        <p className="mb-3 text-eyebrow font-bold uppercase text-white/95 md:mb-4">
          {hero.eyebrow}
        </p>
        <h1 className="mb-3 text-h1 text-white md:text-h1-desktop">{hero.title}</h1>
        <p className="mb-6 text-body text-white/90 md:mb-8 md:text-body-desktop">
          {hero.subtitle}
        </p>
        <div className="flex flex-col gap-3 md:flex-row md:gap-4">
          <Button href={hero.primaryCta.href} variant="primary" className="justify-center">
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="onPhoto" className="justify-center">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
