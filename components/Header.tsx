"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { navLinks } from "@/content/home";

// サイト共通のヘッダー。全ページで再利用する。
// 背景はブランドカラーのネイビー(bg-navy-deep)。JoinCTAセクションと同じ色で統一している。
//
// ロゴ画像について:
// - 実体は public/images/logo.png (透過PNG)
// - 差し替える場合は同じファイル名で上書きするだけでよい。ファイル名を変える場合はsrcも変更する
// - width/height は元画像の比率(約3:4)を保つための値。表示サイズはCSS(h-8 / md:h-10)側で制御している

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-white/10 bg-navy-deep">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt="LA Kansai Club ロゴ"
            width={200}
            height={264}
            priority
            className="h-8 w-auto md:h-10"
          />
          <span className="text-[15px] font-bold tracking-wide text-white">LA KANSAI CLUB</span>
        </Link>

        <nav className="hidden items-center gap-7 text-body font-semibold text-white md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Button href="/join" className="min-h-0 px-5 py-2 text-caption">
            入会する
          </Button>
        </nav>

        <button
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
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
        <nav className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 text-body font-semibold text-white md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="py-2" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Button href="/join" className="mt-2 w-full">
            入会する
          </Button>
        </nav>
      )}
    </header>
  );
}
