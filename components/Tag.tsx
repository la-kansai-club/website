import { ReactNode } from "react";

// グリーンのタグ・バッジ。DESIGN_RULES.md で「タグや小さなアクセントとして限定的に使う」
// と定義されている用途専用のコンポーネント。

type TagProps = {
  children: ReactNode;
  className?: string;
};

export default function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full bg-green-bg px-3 py-1 text-[11px] font-bold text-green-text ${className}`}
    >
      {children}
    </span>
  );
}
