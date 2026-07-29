"use client";

// サイト全体用の簡易フォールバック画面。
// safeFetch(sanity/lib/queries.ts)で個別の取得は失敗しても例外を投げない設計にしているため、
// ここに到達するのは想定外の不具合が起きた場合のみ。技術的なエラー内容は表示しない。

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-content flex-col items-center justify-center px-6 text-center">
      <p className="mb-3 text-h2 text-navy">一時的に問題が発生しました</p>
      <p className="mb-8 text-body text-ink-soft">
        しばらくしてから、もう一度お試しください。
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex min-h-btn items-center justify-center rounded-btn bg-magenta px-6 py-3 text-body font-bold text-white"
      >
        もう一度試す
      </button>
    </div>
  );
}
