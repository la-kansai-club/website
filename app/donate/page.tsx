import PhotoFrame from "@/components/PhotoFrame";
import RichText from "@/components/RichText";
import { safeFetch, donatePageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { SanityDonatePage } from "@/sanity/lib/types";

// Donateページ: 案内文 + 寄付方法(Zelle・チェック郵送)の2カード。
// 白背景+1pxボーダー+影なし(DESIGN_RULES.mdのカードルールに準拠)。
// 寄付方法は値が無ければカード自体を表示しない(Home/Aboutと同じ設計)。

const FALLBACK_PAGE_TITLE = "Donate";
const FALLBACK_ZELLE_TITLE = "Zelle";
const FALLBACK_CHECK_TITLE = "チェック（郵送）";

export default async function DonatePage() {
  const donatePage = await safeFetch<SanityDonatePage | null>(donatePageQuery, null);
  const body = donatePage?.body || [];

  const hasZelle = Boolean(donatePage?.zelleImage || donatePage?.zelleDescription);
  const hasCheck = Boolean(donatePage?.checkDescription);

  return (
    <div className="mx-auto max-w-content px-6 pb-16 pt-16 md:px-12 md:pb-24 md:pt-24">
      <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">Donate</p>
      <h1 className="text-h1 text-navy md:text-h1-desktop">
        {donatePage?.pageTitle || FALLBACK_PAGE_TITLE}
      </h1>

      {body.length > 0 && (
        <div className="mt-6 max-w-[640px]">
          <RichText blocks={body} />
        </div>
      )}

      {(hasZelle || hasCheck) && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {hasZelle && (
            <div className="rounded-card border border-line p-6">
              <h2 className="text-h3 text-navy-deep md:text-h3-desktop">
                {donatePage?.zelleTitle || FALLBACK_ZELLE_TITLE}
              </h2>
              {donatePage?.zelleImage && (
                <div className="mt-4 w-32 md:w-40">
                  <PhotoFrame
                    src={urlFor(donatePage.zelleImage).width(320).height(320).url()}
                    alt={donatePage?.zelleTitle || FALLBACK_ZELLE_TITLE}
                    aspect="square"
                  />
                </div>
              )}
              {donatePage?.zelleDescription && (
                <p className="mt-4 text-body text-ink-soft">{donatePage.zelleDescription}</p>
              )}
            </div>
          )}

          {hasCheck && (
            <div className="rounded-card border border-line p-6">
              <h2 className="text-h3 text-navy-deep md:text-h3-desktop">
                {donatePage?.checkTitle || FALLBACK_CHECK_TITLE}
              </h2>
              <p className="mt-4 text-body text-ink-soft">{donatePage?.checkDescription}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
