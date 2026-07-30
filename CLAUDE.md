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

## ヘッダー・モバイルメニューのHover/Active仕様（2026-07-30確定）

`components/Header.tsx`のナビゲーション（デスクトップ・モバイルメニュー共通）の状態別スタイル。

- 通常時：現状維持（変更しない）
- Hover：文字色をブランドグリーン（`text-green` = `#3BA564`）に変更。`transition-colors`で自然に変化させる
- Active（現在表示中のページ）：文字色をブランドグリーンに変更し、通常より少しだけ強調する。下線・背景色などの装飾は付けない
  - **注意**: nav全体がデフォルトで`font-semibold`のため、Activeを`font-semibold`にしても通常時と見た目が変わらない。強調を視覚的に成立させるため、コードでは`font-bold`を使用している（ユーザー指示の「font-medium、必要に応じてfont-semibold」からの意図的な逸脱。もし色のみで強調を表現したい場合はこの部分の見直しが必要）
  - Active判定：完全一致に加え前方一致も含む（例: `/events/xxx`でも「Events」がActiveになる）。Homeの`/`のみ完全一致

## デプロイ・確認・報告の運用（2026-07-30確定）

このプロジェクトでは確認用URLを以下の2つに統一している。

- **確認用（Preview / developブランチ）**: `https://website-git-develop-la-kansai-club.vercel.app`（developブランチの最新pushを常に指す固定エイリアス）
- **本番（Production / mainブランチ）**: `https://website-gamma-nine-tyeg177uuh.vercel.app`（ログイン不要で公開）

**重要な制約**:
- Preview URL（上記の固定エイリアスも、push毎に発行されるユニークな`website-<hash>-la-kansai-club.vercel.app`形式のURLも含む）はVercelのDeployment Protection（SSO）で保護されており、Vercelチームアカウントへのログインなしにはアクセスできない（アクセスすると`vercel.com/sso-api`へ302リダイレクトされる）。そのため、**Claude Code自身はPreview環境を目視確認できない**
- ローカルの`next dev`は、このPC固有のTLS証明書検証エラー（`UNABLE_TO_VERIFY_LEAF_SIGNATURE`）により、Sanityへの通信・Google Fonts取得など外部HTTPS通信を伴う処理が失敗することがある（ページ全体が500になる場合と、safeFetch経由でフォールバック表示になり正常表示される場合の両方があり得る。原因の切り分け方法は下記「目視確認できない場合の切り分け」を参照）

**実装後に必ず行う確認**:
1. `npx tsc --noEmit`（型チェック）
2. `npm run build`（本番ビルド）
   - 失敗した場合、エラーメッセージだけで終わらせず原因を確認する。「別セッションの開発サーバーが`.next`をロックしている」ことが原因と判断できる場合は、(1)該当の`next dev`/`npm run dev`プロセスを停止 → (2)`.next`フォルダを削除 → (3)`next build`を再実行、まで試す。それでも失敗する場合のみ「ビルド未確認」として報告する
3. GitHubへのcommit・push
4. Vercel Buildの成否（GitHub Deployments API: `/repos/la-kansai-club/website/deployments` → 該当deploymentの`/statuses` → `state`/`environment_url`）

**目視確認できない場合の切り分け（推測で終わらせない）**:
500エラーや画面が表示されない場合、「TLSが原因と思われる」等の推測だけで報告を終えない。可能な範囲で以下を確認する。
- ブラウザコンソールのエラー
- `next dev`のサーバーログ（`preview_logs`）
- エラースタックトレース
- 該当ルートで発生している例外の内容

その上で、以下の3点を必ず切り分けて報告する。
- ページ自体は表示できたか
- Sanityデータ取得のみが失敗したのか（`safeFetch()`はSanity障害を捕捉してフォールバック表示する設計のため、本来Sanity障害だけならページ自体は正常に描画されるはず。ページごと落ちている場合は原因が別にある可能性が高い）
- 今回変更した箇所（DOM・CSS）だけは確認できたか（スタイル変更等でページ全体が表示されている場合は、変更箇所だけでも個別に確認する）

原因を特定できなかった場合は、「事実として確認できたこと」と「推測」を明確に分けて報告する。

**developにpushした際の報告フォーマット（厳守）**:

```
実装：完了

ローカル確認
・ページ表示：
・変更箇所：
・TypeScript（tsc --noEmit）：
・next build：

GitHub
・コミット：
・GitHub push：

Vercel
・Build：成功／失敗
・確認用URL：
https://website-git-develop-la-kansai-club.vercel.app

未確認事項：
（あれば記載）
```

「実装：完了」と報告するのは、上記内容を確認した上で事実に基づいて報告できる場合のみ。不明な点・未確認事項はそのまま正直に記載し、「確認済み」「反映されています」等の断定はしない。コミット・push・デプロイのいずれも行わずに「実装完了」と報告することは禁止（2026-07-30に、ローカル実装のみでpushせずに複数回「実装完了」と誤って報告した反省による）。mainへのマージ（本番反映）は、ユーザーがPreview環境で確認・承認した後にのみ行う。
