# LA Kansai Club — website

## プロジェクト概要

ロサンゼルス在住の関西出身者・関西ファン向けコミュニティ団体「LA Kansai Club」の公式サイト。企業サイトではなくコミュニティサイト。初めて訪れた人が10秒以内に「何の団体か」「楽しそう」「参加したい」と感じられることが最優先目標。

## デザインの基準

- `DESIGN_RULES.md` がデザインの基準書。色・余白・タイポグラフィ・ボタン/カード/アイコンのルール・写真選びのルール・文章の書き方・ページ追加時のルールを定義している。UIに触れる前に必ず読むこと。
- トップページのデザインモック（Version 1、確定済み）: https://claude.ai/code/artifact/98cf4d0e-ff57-43c3-b39e-e29a09c99050
- デザインモックとDESIGN_RULES.mdが最優先の仕様。実装中に「より良いデザイン」と判断して独自に変更しない。

## 技術スタック

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS。DESIGN_RULES.mdの値をそのまま`tailwind.config.ts`のデザイントークンとして定義し、コンポーネント側では色・余白・文字サイズを直接書かずトークン経由で使う
- フォント: `next/font/google` で Inter + Noto Sans JP を自前ホスティング
- CMS: Sanity（`/studio`にStudioを埋め込み。スキーマは`sanity/schemaTypes/`）。運用体制は`OPERATIONS.md`を参照
  - Homeページのうち「最新イベント・最新ニュース・最新ギャラリー」はSanityから取得(`sanity/lib/queries.ts`)。Hero・About紹介・Join紹介・Footerは更新頻度が低いため`content/home.ts`にハードコードしたまま
  - 取得はすべて`safeFetch()`経由。Sanity側で障害や未設定があっても例外を投げず、フォールバック値(空配列・null)を返す設計。呼び出し側は必ず「0件/取得失敗」のときの自然な表示を用意すること（エラー画面を出さない。`app/error.tsx`は予期しない不具合専用の最終防衛ライン）
  - Sanityプロジェクトは作成済み(Project ID: gpi6bjc8 / Dataset: production)。`.env.local`はGitに含まれないため、ローカルで作業する場合は`.env.local.example`を元に別途作成すること。作成手順は`SANITY_SETUP_GUIDE.md`

## 開発ルール（厳守）

実装は必ず「1. 提案 → 2. 理由説明 → 3. ユーザーの承認 → 4. 実装」の順で進める。次を独自判断で行わない。変更が必要な場合は必ず提案・理由を示し、承認を得てから実装する。

- デザインの変更
- ページ構成の変更
- 新機能の追加
- ライブラリの変更
- 文章の大幅な変更

サイト全体を一度に実装せず、1ページずつ「完成 → 確認 → 承認」してから次に進む。実装順序: Home → About → Events → Gallery → News → Join → Donate → Contact。

## クラブの実際の活動（架空の活動を使わない）

現在の主な活動: **チーム河内音頭**（伝統舞踊チーム）、**学生研修プログラム**、**新年会**、**会員セミナー**。BBQ・ハイキング・お花見会・納涼祭などは現在行っていない活動のため、コンテンツ例として使わない。

## コンポーネント構成

Header / Footer / Hero / EventCard / GalleryPreview / AboutPreview / NewsPreview / JoinCTA / Button / Tag / PhotoFrame / MountainIcon を`components/`に配置し、すべてのページで再利用する前提で作る。ページ単位の使い捨てコンポーネントは作らない。

GalleryPreview / NewsPreviewはSanityから取得したデータを`content/home.ts`から直接importするのではなく、親(`app/page.tsx`)からpropsで受け取る形にしている(データ取得はページ側の責務、コンポーネントは表示に専念させるため)。

## 写真の扱い

実際の写真素材はまだない。`PhotoFrame`コンポーネントが `src` 未指定時にプレースホルダー（山のモチーフ）を表示し、`src` を渡すだけで実際の写真に差し替えられる構造にしている。差し替えてもレイアウトが崩れないこと（アスペクト比を固定するため）。
