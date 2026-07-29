import type { PortableTextBlock, PortableTextSpan } from "@/sanity/lib/types";

// News/Aboutの本文(太字・箇条書きのみに制限したPortable Text)を描画する軽量レンダラー。
// 汎用のPortable Textライブラリを新たに追加せず、スキーマ側で許可している
// 「標準の段落」「太字」「箇条書き」だけを扱う専用実装にしている。

function renderSpans(children: PortableTextSpan[]) {
  return children.map((span) =>
    span.marks?.includes("strong") ? (
      <strong key={span._key}>{span.text}</strong>
    ) : (
      <span key={span._key}>{span.text}</span>
    )
  );
}

export default function RichText({ blocks }: { blocks: PortableTextBlock[] }) {
  const elements: JSX.Element[] = [];
  let pendingListItems: PortableTextBlock[] = [];

  function flushList() {
    if (pendingListItems.length === 0) return;
    elements.push(
      <ul key={`list-${elements.length}`} className="list-disc space-y-1.5 pl-5">
        {pendingListItems.map((item) => (
          <li key={item._key}>{renderSpans(item.children)}</li>
        ))}
      </ul>
    );
    pendingListItems = [];
  }

  for (const block of blocks) {
    if (block.listItem === "bullet") {
      pendingListItems.push(block);
    } else {
      flushList();
      elements.push(<p key={block._key}>{renderSpans(block.children)}</p>);
    }
  }
  flushList();

  return <div className="space-y-4 text-body text-ink">{elements}</div>;
}
