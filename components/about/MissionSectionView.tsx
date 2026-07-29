import type { MissionSectionBlock } from "@/sanity/lib/types";

// 「Missionブロック」の表示。箇条書きの先頭にグリーンのドットを添えて、
// DESIGN_RULES.mdの「グリーンは小さなアクセントとして使う」に沿わせている。

export default function MissionSectionView({ section }: { section: MissionSectionBlock }) {
  return (
    <section className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
      {section.title && <h2 className="mb-6 text-h2 text-navy md:text-h2-desktop">{section.title}</h2>}
      <ul className="max-w-[720px] space-y-3">
        {section.items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-body text-ink">
            <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
