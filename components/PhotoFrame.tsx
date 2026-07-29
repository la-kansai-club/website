import Image from "next/image";
import MountainIcon from "./MountainIcon";

// 写真の表示エリア。src が未指定の間はプレースホルダー(山のモチーフ)を表示し、
// src を渡すだけで実際の写真に差し替えられる。アスペクト比は常に固定されるため、
// 差し替えてもレイアウトは崩れない。
// aspect="auto" は、CSS Grid など親要素が高さを決めるレイアウトで
// 枠いっぱいに写真を表示したいときに使う。

type Aspect = "hero" | "heroMobile" | "card" | "square" | "portrait" | "wide" | "auto";

const aspectClass: Record<Aspect, string> = {
  hero: "aspect-hero",
  heroMobile: "aspect-hero-mobile",
  card: "aspect-card",
  square: "aspect-square",
  portrait: "aspect-portrait",
  wide: "aspect-wide",
  auto: "h-full w-full",
};

type PhotoFrameProps = {
  src?: string;
  alt: string;
  aspect: Aspect;
  className?: string;
  priority?: boolean;
  iconClassName?: string;
};

export default function PhotoFrame({
  src,
  alt,
  aspect,
  className = "",
  priority = false,
  iconClassName = "w-10 h-10",
}: PhotoFrameProps) {
  return (
    <div
      className={`relative overflow-hidden bg-placeholder rounded-card ${aspectClass[aspect]} ${className}`}
    >
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-placeholder-icon">
          <MountainIcon className={iconClassName} />
        </div>
      )}
    </div>
  );
}
