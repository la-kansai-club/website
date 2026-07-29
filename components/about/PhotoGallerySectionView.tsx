import PhotoFrame from "../PhotoFrame";
import { urlFor } from "@/sanity/lib/image";
import type { PhotoGallerySectionBlock } from "@/sanity/lib/types";

export default function PhotoGallerySectionView({ section }: { section: PhotoGallerySectionBlock }) {
  return (
    <section className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
      {section.title && <h2 className="mb-8 text-h2 text-navy md:text-h2-desktop">{section.title}</h2>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {section.photos.map((photo, index) => (
          <PhotoFrame key={index} src={urlFor(photo).width(500).height(500).url()} alt="" aspect="square" />
        ))}
      </div>
    </section>
  );
}
