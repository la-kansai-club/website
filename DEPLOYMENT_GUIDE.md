# Vercel本番デプロイ手順

ローカル環境でのネットワーク制約の調査はいったん保留し、本番環境（Vercel）での動作確認を優先するためのガイドです。

## 0. リポジトリをPublicに変更する手順（今回必要な作業）

VercelのHobby（無料）プランは、GitHub Organization配下のPrivateリポジトリからのデプロイに対応していません。検討の結果、このリポジトリには機密情報が含まれないことを確認した上で、Publicへ変更する方針としました（管理用アカウントのメールアドレス等の運用情報は、このリポジトリからは削除し、非公開の引き継ぎ資料側にのみ記載する形に整理済みです）。

1. `https://github.com/la-kansai-club/website` を開く
2. 「Settings」タブを開く
3. 一番下までスクロールし、「Danger Zone」内の「Change repository visibility」を選ぶ
4. 「Change to public」を選び、確認のためにリポジトリ名（`la-kansai-club/website`）を入力して実行する
5. 変更後、リポジトリ内に機密情報が表示されていないか、念のためもう一度ざっと見て確認する

変更が終わったら、以下「2. GitHub・Vercel・Sanityの接続手順」のVercelの手順に進んでください。

## 1. 本番デプロイに必要な設定（確認済み）

私の方で以下を確認・準備しました。

- [x] `website/`フォルダをGitリポジトリとして初期化し、初回コミットを作成済み
- [x] `.gitignore`により `.env.local`・`node_modules`・`.next` が正しく除外されることを確認済み（秘密情報や不要なファイルがGitHubに上がらない）
- [x] 実際のSanity認証情報（Project ID: `gpi6bjc8`）を使って、本番用ビルド（`next build`）が正常に完了することを確認済み
- [x] `DESIGN_RULES.md`・`OPERATIONS.md`・`SANITY_SETUP_GUIDE.md`を`website/`フォルダ内に移動し、このリポジトリ1つで完結する構成にした

**まだ行っていないこと**：GitHub・Vercelへの接続（アカウント操作が必要なため、以下の手順をお願いします）

---

## 2. GitHub・Vercel・Sanityの接続手順

### GitHub

1. [https://github.com/](https://github.com/) を開き、クラブ専用の管理用Googleアカウントでサインアップ/ログインします（「Continue with Google」を選ぶと簡単です）
2. 右上の「＋」→「New organization」で組織を作成します。名前（スラッグ）は`la-kansai-club`、表示名は「LA Kansai Club」にしてください（OPERATIONS.md「9. GitHub運用方針」参照。個人アカウント名義にしないためです）
3. 作成した組織の中で「New repository」を選び、リポジトリを作成します
   - 名前：`website`
   - 公開範囲：**Public**（VercelのHobby(無料)プランはOrganization配下のPrivateリポジトリのデプロイに対応していないため。機密情報が含まれないことは確認済み。管理用アカウントのメールアドレス等の運用情報は非公開の引き継ぎ資料側にのみ記載する運用にしている）
   - 「Add a README file」等のチェックは**すべて外してください**（すでにローカルにファイルがあるため）
4. 作成が終わると、リポジトリのURL（`https://github.com/la-kansai-club/website.git`のような形）が表示されるので、次のコマンドをご自身のパソコンのターミナルで実行してください（Claude Codeから実行する場合は、このURLを私に共有いただければ代わりに実行します）

```bash
cd website
git remote add origin ここにコピーしたURLを貼り付け
git branch -M main
git push -u origin main
git checkout -b develop
git push -u origin develop
```

5. 事故防止のため、`main`ブランチに直接pushできないよう保護をかけることを推奨します。リポジトリの「Settings」→「Branches」→「Add branch ruleset」で`main`を保護対象にし、直接pushではなくPull Request経由でのみ反映できるようにします（OPERATIONS.md「9. GitHub運用方針」参照。以降の日常作業は`develop`ブランチに対して行い、公開するタイミングで`develop`→`main`にPull Requestを作成してマージします）

### Vercel

1. [https://vercel.com/](https://vercel.com/) を開き、同じくクラブ専用の管理用Googleアカウントでサインアップ/ログインします
2. 「Add New...」→「Project」を選びます
3. 初回はGitHubとの連携の許可を求められるので、許可します
4. 先ほど作成したリポジトリ（`la-kansai-club/website`）を選んで「Import」します
5. 「Framework Preset」は自動的に「Next.js」と認識されるはずです。フォルダの構成はそのままで問題ありません（`website/`をリポジトリのルートにしたため、追加設定は不要です）
6. 「Environment Variables」の欄に、下記「3. Vercelに設定する環境変数」の内容を入力します
7. 「Deploy」をクリックします。初回は`main`ブランチが公開されます
8. デプロイ完了後、「Settings」→「Git」→「Production Branch」が`main`になっていることを確認してください。これにより、`develop`ブランチへのpushは自動的にPreview環境（確認用の別URL）にのみ反映され、`main`にマージされたときだけ本番環境に反映されるようになります

### Sanity側の追加設定（重要・見落としやすい項目）

Sanity Studio（管理画面）は、ブラウザから直接Sanityと通信する仕組みのため、**本番のURLをSanity側に許可リストとして登録する必要があります**。これを忘れると、本番の`/studio`にアクセスできても保存ができない、といった不具合が起きます。

1. [https://www.sanity.io/manage](https://www.sanity.io/manage) を開き、プロジェクト（gpi6bjc8）を選びます
2. 「API」タブ →「CORS Origins」→「Add CORS origin」
3. Vercelでデプロイされた実際のURL（`https://〜.vercel.app`の形。プロジェクト作成時にVercelの画面に表示されます）を入力
4. 「Allow credentials」に**チェックを入れて**保存します

---

## 3. Vercelに設定する環境変数

Vercelのプロジェクト設定画面（Environment Variables）に、以下をそのまま入力してください。

| 変数名 | 値 | 備考 |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `gpi6bjc8` | |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` | |
| `SANITY_API_TOKEN` | （設定不要） | 下書きプレビュー等が必要になった時点で改めて対応します |

適用する環境（Production / Preview / Development）は、迷ったら**すべてにチェック**を入れて問題ありません。

---

## 4. デプロイ後の確認チェックリスト

- [ ] Vercelのダッシュボードで、デプロイが緑色の「Ready」になっている
- [ ] 発行されたURL（`https://xxxxx.vercel.app`）を開き、Homeページが正しく表示される
- [ ] Sanity側のCORS Originsに本番URLを追加した（上記2.参照）
- [ ] 本番URLの末尾に`/studio`を付けてアクセスし、Sanityのログイン画面が表示される（エラー画面にならない）

---

## 5. 本番環境でのStudio・Home・Sanity連携の確認フロー

ローカルではネットワークの制約で確認しづらかった部分を、本番環境で確認します。

1. `https://（本番URL）/studio` を開き、クラブ専用の管理用Googleアカウントでログインする
2. 「イベント」に仮のタイトル（例：「テスト投稿」）で1件作成し、Publishする
3. 本番URLのトップページを開き（1分ほど待ってから）、「次のイベント」に反映されていることを確認する
4. 同様に「お知らせ」を1件作成しPublish → トップページの「お知らせ」欄に反映されることを確認する
5. 同様に「ギャラリーアルバム」を1件作成しPublish → トップページの「Gallery」欄に反映されることを確認する
6. すべて確認できたら、Studio側で今回作成した3件のテストデータをすべて削除する
7. 最後にもう一度トップページを再読み込みし、削除後は元の「現在予定されているイベントはありません」等の表示に戻ることを確認する

この一連の確認がすべて完了すれば、本番環境でのSanity連携は問題なく機能していると判断できます。
