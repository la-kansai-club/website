import Button from "./Button";

// トップページ最後のJoin CTAバナー。ネイビー背景+1つだけのPrimaryボタン。
// 文言はSanity(homePage)から編集できる。リンク先(/join)は固定。

type JoinCTAProps = {
  title: string;
  ctaLabel: string;
};

export default function JoinCTA({ title, ctaLabel }: JoinCTAProps) {
  return (
    <section className="mt-16 bg-navy-deep px-6 py-12 text-center md:mt-24 md:py-20">
      <h2 className="mx-auto mb-6 max-w-[520px] text-h2 text-white md:text-h2-desktop">{title}</h2>
      <Button href="/join" variant="primary" className="w-full md:w-auto">
        {ctaLabel}
      </Button>
    </section>
  );
}
