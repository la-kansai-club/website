import Button from "@/components/Button";
import RichText from "@/components/RichText";
import { safeFetch, joinPageQuery } from "@/sanity/lib/queries";
import type { SanityJoinPage } from "@/sanity/lib/types";

// Joinページ: メリット → 会費・条件 → 入会までの流れ → 申込ボタン、の確定済みの並び順。
// joinPage(シングルトン)の各セクションは、値が無い場合はそのセクション自体を表示しない
// (Home/Aboutと同じ「データが無ければ自然に消える」設計)。

const FALLBACK_PAGE_TITLE = "Join";
const FALLBACK_INTRO_TEXT =
  "LA Kansai Clubへのご入会を歓迎します。下記のフォームからお申し込みください。";
const FALLBACK_APPLY_BUTTON_LABEL = "入会申し込み";
const FALLBACK_APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfTqHwpgY9m79WMjUuGdivNzh0m1E4ZLBw1cFsc32_gBrRnYQ/viewform";

export default async function JoinPage() {
  const joinPage = await safeFetch<SanityJoinPage | null>(joinPageQuery, null);

  const benefits = joinPage?.benefits || [];
  const feeBody = joinPage?.feeBody || [];
  const steps = joinPage?.steps || [];
  const hasContent = benefits.length > 0 || feeBody.length > 0 || steps.length > 0;

  return (
    <div className="pb-16 md:pb-24">
      <div className="mx-auto max-w-content px-6 pt-16 md:px-12 md:pt-24">
        <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">Join</p>
        <h1 className="text-h1 text-navy md:text-h1-desktop">
          {joinPage?.pageTitle || FALLBACK_PAGE_TITLE}
        </h1>
      </div>

      {!hasContent && (
        <div className="mx-auto max-w-content px-6 pt-8 md:px-12">
          <p className="max-w-[560px] text-body text-ink">{FALLBACK_INTRO_TEXT}</p>
        </div>
      )}

      {benefits.length > 0 && (
        <section className="mx-auto max-w-content px-6 pt-8 md:px-12">
          {joinPage?.benefitsTitle && (
            <h2 className="mb-6 text-h2 text-navy md:text-h2-desktop">{joinPage.benefitsTitle}</h2>
          )}
          <ul className="max-w-[720px] space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3 text-body text-ink">
                <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green" aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {feeBody.length > 0 && (
        <section className="mx-auto max-w-content px-6 pt-16 md:px-12">
          <div className="max-w-[720px]">
            {joinPage?.feeTitle && (
              <h2 className="mb-3 text-h2 text-navy md:text-h2-desktop">{joinPage.feeTitle}</h2>
            )}
            <RichText blocks={feeBody} />
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section className="mx-auto max-w-content px-6 pt-16 md:px-12">
          {joinPage?.stepsTitle && (
            <h2 className="mb-8 text-h2 text-navy md:text-h2-desktop">{joinPage.stepsTitle}</h2>
          )}
          <ol className="max-w-[640px] space-y-6">
            {steps.map((step, index) => (
              <li key={step._key} className="flex items-start gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy text-body font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-h3 text-navy-deep md:text-h3-desktop">{step.title}</p>
                  {step.description && (
                    <p className="mt-1 text-body text-ink-soft">{step.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="mx-auto max-w-content px-6 pt-16 text-center md:px-12 md:pt-24">
        <Button href={joinPage?.applyUrl || FALLBACK_APPLY_URL} variant="primary">
          {joinPage?.applyButtonLabel || FALLBACK_APPLY_BUTTON_LABEL}
        </Button>
      </div>
    </div>
  );
}
