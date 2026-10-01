async function getPageIdFromYourDatabase(slug: string) {
  try {
    // 確保網址沒有被亂編碼 (例如中文字或特殊符號)
    const targetSlug = decodeURIComponent(slug);
    console.log("🔍 網頁傳進來的目標 slug:", `"${targetSlug}"`);

    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        // 完全不寫 filter，叫 Notion 把資料庫的文章全吐出來
        body: JSON.stringify({}),
        // 開發除錯時先關閉快取，確保每次都抓最新的
        cache: 'no-store' 
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    console.log(`📦 資料庫總共回傳了 ${data.results?.length} 篇文章`);

    // 改用 JavaScript 原生的 find 來比對
    const matchPage = data.results.find((page: any) => {
      const pageSlug = page.properties.slug?.rich_text[0]?.plain_text;
      return pageSlug === targetSlug;
    });

    if (matchPage) {
      console.log("✅ 成功比對到文章！ID 是:", matchPage.id);
      return matchPage.id;
    } else {
      console.log("❌ JavaScript 找遍了全部文章，還是沒有吻合的 slug");
      // 印出前三篇文章的 slug 讓你檢查到底差在哪
      const availableSlugs = data.results.slice(0, 3).map((p: any) => p.properties.slug?.rich_text[0]?.plain_text);
      console.log("資料庫裡實際存的 slug 範例:", availableSlugs);
      return null;
    }
  } catch (error) {
    console.error("查詢發生錯誤:", error);
    return null;
  }
}