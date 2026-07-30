// Sanityの初期データ(Seed)投入スクリプト。
//
// 目的: Home/About/Join/Donate/Contact/サイト設定の6つのシングルトンについて、
// 「現在サイトに実際に表示されている文言・画像・リンク」だけをSanityの初期データとして
// 登録する。表示されていない項目(About本文、Joinのメリット/ステップ、Donateの
// Zelle/チェック情報など)は一切作成せず、空欄のまま(コード側のフォールバックに任せる)。
// 「準備中です」のようなプレースホルダー文言もここには含めない。
//
// 再実行可能な設計: 各ドキュメントは固定IDで「存在しない場合のみ作成」する。
// 既存データがあれば一切上書きしない。CMSを初期化した際にも安全に再実行できる。
//
// 実行方法: .env.local に SANITY_API_TOKEN(Editor権限以上)を設定した上で
//   npm run seed

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// next dev経由の通信だけがこのPC固有のTLS証明書制約で失敗するため、
// このスクリプトは next を経由しない素のNodeプロセスとして実行する
// (CLAUDE.md「デプロイ・確認・報告の運用」参照)。.env.local はここで手動で読み込む。
function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET / SANITY_API_TOKEN が .env.local に必要です。"
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// 指定IDのドキュメントが存在しない場合のみ作成する。既存の場合は何もしない。
async function seedSingleton(id, doc) {
  const existing = await client.fetch(`*[_id == $id][0]{_id}`, { id });
  if (existing) {
    console.log(`- ${id}: 既に存在するためスキップしました`);
    return;
  }
  await client.create({ _id: id, ...doc });
  console.log(`✓ ${id}: 作成しました`);
}

async function seedSiteSettings() {
  const existing = await client.fetch(`*[_id == "siteSettings"][0]{_id}`);
  if (existing) {
    console.log("- siteSettings: 既に存在するためスキップしました");
    return;
  }

  const logoPath = path.join(__dirname, "..", "public", "images", "logo.png");
  let logoField;
  if (fs.existsSync(logoPath)) {
    const asset = await client.assets.upload("image", fs.createReadStream(logoPath), {
      filename: "logo.png",
    });
    logoField = { logo: { _type: "image", asset: { _type: "reference", _ref: asset._id } } };
  } else {
    logoField = {};
  }

  await client.create({
    _id: "siteSettings",
    _type: "siteSettings",
    organizationName: "LA Kansai Club",
    siteTitle: "LA Kansai Club",
    metaDescription:
      "関西にゆかりのある方も、関西文化が好きな方も。世代や地域を越えて交流を楽しめる、LA Kansai Clubのコミュニティです。",
    email: "info@kansaiclub.org",
    address: "Los Angeles, CA",
    facebookUrl: "https://www.facebook.com/KansaiC",
    navHomeLabel: "Home",
    navAboutLabel: "About",
    navEventsLabel: "Events",
    navGalleryLabel: "Gallery",
    navNewsLabel: "News",
    navDonateLabel: "Donate",
    navContactLabel: "Contact",
    navJoinButtonLabel: "Join",
    ...logoField,
  });
  console.log("✓ siteSettings: 作成しました");
}

async function main() {
  console.log(`Seed対象: ${projectId} / ${dataset}\n`);

  await seedSiteSettings();

  await seedSingleton("homePage", {
    _type: "homePage",
    heroTitle: "人と文化をつなぐ、LA関西クラブ。",
    heroSubtitle:
      "関西にゆかりのある方も、関西文化が好きな方も。世代や地域、さまざまなバックグラウンドを越えて、交流を楽しめるコミュニティです。",
    heroPrimaryCtaLabel: "イベントを見る",
    heroSecondaryCtaLabel: "入会する",
    eventsSectionTitle: "次のイベント",
    gallerySectionTitle: "思い出のアルバム",
    newsSectionTitle: "お知らせ",
    aboutTeaserTitle: "LA Kansai Clubについて",
    aboutTeaserText:
      "関西出身者・関西ファンが集まり、河内音頭や学生研修などの活動を通じてつながりを広げています。",
    joinTitle: "一緒に関西を楽しみませんか？",
    joinCtaLabel: "入会する",
  });

  await seedSingleton("aboutPage", {
    _type: "aboutPage",
    pageTitle: "About",
    // sectionsは現在コード上に文言が存在しないため空のまま(理事が今後Studioで追加する)
  });

  await seedSingleton("joinPage", {
    _type: "joinPage",
    pageTitle: "Join",
    applyButtonLabel: "入会申し込み",
    applyUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfTqHwpgY9m79WMjUuGdivNzh0m1E4ZLBw1cFsc32_gBrRnYQ/viewform",
    // benefits/feeBody/stepsは現在未表示のため空のまま
  });

  await seedSingleton("donatePage", {
    _type: "donatePage",
    pageTitle: "Donate",
    // bodyは現在「準備中です」というプレースホルダーのみのため登録しない
    // zelle/checkの情報は現在未表示のため空のまま
  });

  await seedSingleton("contactPage", {
    _type: "contactPage",
    pageTitle: "Contact",
    introText: "ご質問・ご相談はお気軽にメールでご連絡ください。",
  });

  console.log("\nSeed処理が完了しました。");
}

main().catch((error) => {
  console.error("Seed処理中にエラーが発生しました:", error);
  process.exit(1);
});
