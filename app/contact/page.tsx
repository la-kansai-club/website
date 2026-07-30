import Button from "@/components/Button";
import { safeFetch, contactPageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { SanityContactPage, SanitySiteSettings } from "@/sanity/lib/types";
import { footer as fallbackFooter } from "@/content/home";

// Contactページ: お問い合わせ方法はメールリンクのみ(2026-07-30承認)。
// 連絡先メールアドレスはsiteSettings.emailを再利用し、このページ専用のフィールドは持たない。

const FALLBACK_PAGE_TITLE = "Contact";
const FALLBACK_INTRO_TEXT = "ご質問・ご相談はお気軽にメールでご連絡ください。";

export default async function ContactPage() {
  const [contactPage, settings] = await Promise.all([
    safeFetch<SanityContactPage | null>(contactPageQuery, null),
    safeFetch<SanitySiteSettings | null>(siteSettingsQuery, null),
  ]);

  const email = settings?.email || fallbackFooter.email;
  const address = settings?.address || fallbackFooter.address;

  return (
    <div className="mx-auto max-w-content px-6 pb-16 pt-16 md:px-12 md:pb-24 md:pt-24">
      <p className="mb-2 text-eyebrow font-bold uppercase text-navy-deep">Contact</p>
      <h1 className="text-h1 text-navy md:text-h1-desktop">
        {contactPage?.pageTitle || FALLBACK_PAGE_TITLE}
      </h1>

      <p className="mt-6 max-w-[560px] text-body text-ink">
        {contactPage?.introText || FALLBACK_INTRO_TEXT}
      </p>

      <p className="mt-2 text-body text-ink-soft">{address}</p>

      <Button href={`mailto:${email}`} variant="primary" className="mt-8">
        {email}
      </Button>
    </div>
  );
}
