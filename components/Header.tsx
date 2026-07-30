"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// サイト共通のヘッダー。全ページで再利用する。
// 背景は白(bg-paper)。
//
// ロゴ・ナビゲーションの表示名はSanity(siteSettings)から編集できる。
// ナビゲーションのリンク先(href)は事故防止のためコード側で固定し、
// 親(app/layout.tsx)から{label, href}の配列として渡している。
//
// ロゴ画像について:
// - Sanityで未設定の場合は既定の public/images/logo.png を使う(呼び出し側でフォールバック済み)
// - width/height は元画像の比率(約3:4)を保つための値。表示サイズはCSS(h-10 / sm:h-11 / md:h-12)側で制御している
//
// Hover/Active時の色分け(2026-07-30確定):
// - 通常時は現状どおり(text-ink)。Hoverと現在ページ(Active)のみブランドグリーン(text-green)にする。
// - ナビ全体がfont-semibold基調のため、Activeの「少しだけ強調」はfont-boldで表現している
//   (font-semibold のままだと通常時と見た目が変わらないため)。下線・背景色などの装飾は付けない。
// - Active判定は完全一致に加え、詳細ページ(例: /events/slug)でも該当セクションが
//   ハイライトされるよう前方一致も含める(Homeの"/"のみ完全一致)。
// - Joinへのリンクは特別なCTAボタンとして扱わず、他のナビ項目と全く同じスタイル
//   (色・Hover・Active)のテキストリンクとして表示する(2026-07-30変更)。

type NavItem = { label: string; href: string };

type HeaderProps = {
  logoUrl: string;
  navItems: NavItem[];
  joinButtonLabel: string;
};

export default function Header({ logoUrl, navItems, joinButtonLabel }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-12 md:py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoUrl}
            alt="LA Kansai Club ロゴ"
            width={200}
            height={264}
            priority
            className="h-10 w-auto sm:h-11 md:h-12"
          />
          <span className="text-[15px] font-bold tracking-wide text-navy-deep">LA KANSAI CLUB</span>
        </Link>

        <nav className="hidden items-center gap-7 text-body font-semibold text-ink md:flex">
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 hover:text-green ${
                isActive(link.href) ? "font-bold text-green" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/join"
            className={`transition-colors duration-200 hover:text-green ${
              isActive("/join") ? "font-bold text-green" : ""
            }`}
          >
            {joinButtonLabel}
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
          className="text-navy-deep md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
            {open ? (
              <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-6 py-4 text-body font-semibold text-ink md:hidden">
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-2 transition-colors duration-200 hover:text-green ${
                isActive(link.href) ? "font-bold text-green" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/join"
            className={`py-2 transition-colors duration-200 hover:text-green ${
              isActive("/join") ? "font-bold text-green" : ""
            }`}
            onClick={() => setOpen(false)}
          >
            {joinButtonLabel}
          </Link>
        </nav>
      )}
    </header>
  );
}
