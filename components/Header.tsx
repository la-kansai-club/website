"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import { navLinks } from "@/content/home";

// サイト共通のヘッダー。全ページで再利用する。
// スマホ版のメニュー開閉はデザインモックに具体的な開閉状態の指定がなかったため、
// 白背景+ネイビー文字+アニメーションなしという既存のトーンのまま最小限で実装している。

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="text-[15px] font-bold tracking-wide text-navy-deep">
          LA KANSAI CLUB
        </Link>

        <nav className="hidden items-center gap-7 text-body font-semibold text-ink md:flex">
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
