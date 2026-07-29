import PhotoFrame from "./PhotoFrame";
import Button from "./Button";
import Tag from "./Tag";

// イベント1件を表示するカード。Homeの「次のイベント」だけでなく、
// 将来のEventsページでも再利用する前提のコンポーネント。

type EventCardProps = {
  title: string;
  meta: string;
  description?: string;
  badge?: string;
  image?: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function EventCard({
  title,
  meta,
  description,
  badge,
  image,
  ctaLabel,
  ctaHref,
}: EventCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line md:flex-row">
      <PhotoFrame
        src={image}
        alt={title}
        aspect="card"
        className="rounded-none md:w-[46%]"
        iconClassName="w-12 h-12"
      />
      <div className="flex flex-1 flex-col items-start gap-2 p-5 md:justify-center md:p-8">
        {badge && <Tag>{badge}</Tag>}
        <h3 className="mt-1 text-h3 text-navy-deep md:text-h3-desktop">{title}</h3>
        <p className="text-caption text-ink-soft">{meta}</p>
        {description && (
          <p className="mt-1 max-w-[400px] text-body text-ink">{description}</p>
        )}
        <Button href={ctaHref} variant="primary" className="mt-2">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
