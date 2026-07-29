// ロゴ(三連の山+波)をモチーフにしたプレースホルダー用アイコン。
// 写真が未設定のときに PhotoFrame の中央に表示する。

type MountainIconProps = {
  className?: string;
};

export default function MountainIcon({ className = "w-10 h-10" }: MountainIconProps) {
  return (
    <svg
      viewBox="0 0 200 150"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={6}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 122 L54 44 L90 122" />
      <path d="M58 122 L96 56 L134 122" />
      <path d="M100 122 L128 72 L156 122" />
      <path d="M10 132 Q30 124 50 132 T90 132 T130 132 T170 132" strokeWidth={5} />
      <path d="M10 142 Q30 134 50 142 T90 142 T130 142 T170 142" strokeWidth={5} />
    </svg>
  );
}
