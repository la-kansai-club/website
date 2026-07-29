"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

// サイト共通のヘッダー。全ページで再利用する。
// 背景は白(bg-paper)。
//
// ロゴ・ナビゲーションの表示名はSanity(siteSettings)から編集できる。
// ナビゲーションのリンク先(href)は事故防止のためコード側で固定し、
// 親(app/layout.tsx)から{label, href}の配列として渡している。
//
// ロゴ画像について:
// - Sanityで未設定の場合は既定の public/images/logo.png を使う(呼び出し側でフォールバック済み)
// - width/height は元画像の比率(約3:4)を保つための値。表示サイズはCSS(h-8 / md:h-10)側で制御している

type NavItem = { label: string; href: string };

type HeaderProps = {
  logoUrl: string;
  navItems: NavItem[];
  joinButtonLabel: string;
};

export default function Header({ logoUrl, navItems, joinButtonLabel }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={logoUrl}
            alt="LA Kansai Club ロゴ"
            width={200}
            height={264}
            priority
            className="h-8 w-auto md:h-10"
          />
          <span className="text-[15px] font-bold tracking-wide text-navy-deep">LA KANSAI CLUB</span>
        </Link>

        <nav className="hidden items-center gap-7 text-body font-semibold text-ink md:flex">
          {navItems.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Button href="/join" className="min-h-0 px-5 py-2 text-caption">
            {joinButtonLabel}
          </Button>
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
            <Link key={link.href} href={link.href} className="py-2" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Button href="/join" className="mt-2 w-full">
            {joinButtonLabel}
          </Button>
        </nav>
      )}
    </header>
  );
}
