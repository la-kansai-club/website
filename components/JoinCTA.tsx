import Button from "./Button";
import { joinCta } from "@/content/home";

// トップページ最後のJoin CTAバナー。ネイビー背景+1つだけのPrimaryボタン。

export default function JoinCTA() {
  return (
    <section className="mt-16 bg-navy-deep px-6 py-12 text-center md:mt-24 md:py-20">
      <h2 className="mx-auto mb-6 max-w-[520px] text-h2 text-white md:text-h2-desktop">
        {joinCta.title}
      </h2>
      <Button href={joinCta.cta.href} variant="primary" className="w-full md:w-auto">
        {joinCta.cta.label}
      </Button>
    </section>
  );
}
