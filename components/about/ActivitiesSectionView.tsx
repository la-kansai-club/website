import PhotoFrame from "../PhotoFrame";
import { urlFor } from "@/sanity/lib/image";
import type { ActivitiesSectionBlock } from "@/sanity/lib/types";

// 「活動紹介ブロック」の表示。カードはDESIGN_RULES.md通り、白背景+1pxボーダー+影なし。

export default function ActivitiesSectionView({ section }: { section: ActivitiesSectionBlock }) {
  return (
    <section className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
      {section.title && <h2 className="mb-8 text-h2 text-navy md:text-h2-desktop">{section.title}</h2>}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {section.activities.map((activity) => (
          <div key={activity._key} className="overflow-hidden rounded-card border border-line">
            <PhotoFrame
              src={activity.image ? urlFor(activity.image).width(500).height(375).url() : undefined}
              alt={activity.name}
              aspect="card"
              className="rounded-none"
              iconClassName="w-8 h-8"
            />
            <div className="p-4">
              <h3 className="mb-1 text-h3 text-navy-deep md:text-h3-desktop">{activity.name}</h3>
              {activity.description && (
                <p className="whitespace-pre-line text-caption text-ink-soft">{activity.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
