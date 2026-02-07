任務：根據上傳的草圖開發 plugins.html (插件倉庫)，並最終輸出繁體中文

任務：根據上傳的草圖開發 agent-market.html (Agent 超市)

1. 參考文件與規範：
- 嚴格遵守 design-system.md 的深色系令牌（Deep Dark System）。
- 複用 components-catalog.html 中的「導航欄」、「玻璃擬態卡片 (Neu-Card)」和「梯度按鈕」。
- 應用 design.cursorrules 中的交互動效，特別是卡片的 Hover 揭示效果。

2. 頁面佈局結構：
- Header: 延用現有導航，確保「Agent 超市」處於 Active 狀態。
- Banner: 頂部全寬度區域，背景需有 ambient-glow 光暈效果，文字居中，展現「Agent 超市」標題。
- Filter Section (過濾區)：
  - 採用多行標籤組，包含：應用場景、按功能、核心技術、來源、收藏狀態、內容類型。
  - 已選標籤欄：左側顯示選中的 Tag（帶刪除按鈕），右側為帶圖標的搜尋框與「已開通」切換開關。
- Agent Grid (網格區)：
  - 使用 CSS Grid 佈局（4 欄）。
  - 卡片設計：
    - 右上角有來源標籤（如：本地、飛書、N8N），顏色需區分。
    - 包含圖標、標題、描述文字。
    - 底部顯示「上架時間」。
    - Hover 狀態：顯示「查看詳情」和「立即使用」兩個按鈕，背景變為 tg-emerald 的半透明發光。
- Pagination: 底部居中的分頁組件。

3. 技術要求 (Figma 導入優化)：
- Flexbox/Grid: 所有容器必須使用 Flex 或 Grid 佈局，禁止使用 position: absolute 進行排版（除標籤外），以便於 Figma Auto Layout 識別。
- 語義化 Class: 使用 .filter-group, .agent-card, .tag-item 等具備語義的命名。
- 字體: 全局強制使用 Noto Sans TC。

4. 交付內容：
- 完整的 HTML 結構。
- 專屬於此頁面的 <style> 區塊（如有 main.css 以外的特殊樣式）。
- 簡單的 JavaScript 用於模擬標籤切換和搜尋框交互。
- 語言：繁體中文。



頂部替換的頂部和footer，剛我手動刪除“請輸入關鍵詞進行搜索”旁邊的已經開通模組，現在請把“請輸入關鍵詞進行搜索”往右邊靠齊，並將2行卡片增加到3行