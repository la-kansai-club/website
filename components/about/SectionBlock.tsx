import TextSectionView from "./TextSectionView";
import MissionSectionView from "./MissionSectionView";
import HistorySectionView from "./HistorySectionView";
import ActivitiesSectionView from "./ActivitiesSectionView";
import PhotoGallerySectionView from "./PhotoGallerySectionView";
import type { AboutSectionBlock } from "@/sanity/lib/types";

// aboutPage.sections の各ブロックを、種類(_type)に応じた見た目に振り分ける。
// 新しいブロックの種類を追加する場合は、対応するView用コンポーネントを作り、
// ここにcaseを1つ足す(sanity/schemaTypes/aboutSections/と対にして管理する)。

export default function SectionBlock({ section }: { section: AboutSectionBlock }) {
  switch (section._type) {
    case "textSection":
      return <TextSectionView section={section} />;
    case "missionSection":
      return <MissionSectionView section={section} />;
    case "historySection":
      return <HistorySectionView section={section} />;
    case "activitiesSection":
      return <ActivitiesSectionView section={section} />;
    case "photoGallerySection":
      return <PhotoGallerySectionView section={section} />;
    default:
      return null;
  }
}
