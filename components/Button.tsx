import Link from "next/link";
import { ReactNode } from "react";

// DESIGN_RULES.md で定義された2種類のボタンのみを提供する。
// Primary はマゼンタ塗りつぶし、Secondary は白背景+ネイビー枠線。
// onPhoto は写真の上に置くときの Secondary(白枠+白文字)。

type Variant = "primary" | "secondary" | "onPhoto";

const variantClass: Record<Variant, string> = {
  primary: "bg-magenta text-white",
  secondary: "bg-white text-navy-deep border-[1.5px] border-navy",
  onPhoto: "bg-white/10 text-white border-[1.5px] border-white",
};

type ButtonProps = {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export default function Button({ href, variant = "primary", className = "", children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center min-h-btn rounded-btn px-6 py-3 text-body font-bold ${variantClass[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
