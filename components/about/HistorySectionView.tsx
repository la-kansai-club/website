import RichText from "../RichText";
import type { HistorySectionBlock } from "@/sanity/lib/types";

export default function HistorySectionView({ section }: { section: HistorySectionBlock }) {
  return (
    <section className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
      <div className="max-w-[720px]">
        {section.title && <h2 className="mb-3 text-h2 text-navy md:text-h2-desktop">{section.title}</h2>}
        <RichText blocks={section.body} />
      </div>
    </section>
  );
}
