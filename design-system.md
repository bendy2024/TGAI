# TGAI MCP 設計系統規範 (Design System)

> 版本 1.1 | 基於 MCP 協議與 html.to.design 同步優化

## 1. 核心設計令牌 (Design Tokens)

### 🎨 色彩系統 (Colors)
```css
:root {
    /* 背景色 */
    --bg-deep: #020406;      /* 主背景 - 絕對深色 */
    --bg-surface: #080C12;   /* 卡片/容器背景 */

    /* 品牌色 */
    --tg-cyan: #00F2FF;      /* 神經網絡青 - 主品牌色 */
    --tg-emerald: #00F5A0;   /* 能源綠 - 輔助品牌色 */
    --tg-blue: #005DAA;      /* 企業藍 - Logo 色 */

    /* 文字色 */
    --text-main: #F8FAFC;    /* 主標題 */
    --text-secondary: #CBD5E1; /* 次要文字 */
    --text-muted: #94A3B8;    /* 輔助文字 */

    /* 邊框 */
    --border-white: rgba(255, 255, 255, 0.12);
    --border-glow: rgba(0, 242, 255, 0.5);
}
```

### ✍️ 字體規範 (Typography)
- **字體家族**: `Noto Sans TC` (全局唯一指定字體，涵蓋標題、正文、數據及代碼)
- **大小規範**: 
  - `text-2xl` (32px): 頁面主標題
  - `text-xl` (20px): 區塊標題
  - `text-lg` (18px): 卡片標題
  - `text-[13px]`: 正文內容 (行高 1.6)
  - `text-[10-11px]`: 輔助/微型標籤

---

## 4. 間距系統 (Spacing)

### 基礎單位
採用 **4px** 為基礎單位 (Tailwind 的 1 單位)

| 尺寸 | 數值 | 使用場景 |
|------|------|----------|
| xs | 4px (1) | 圖標與文字間距 |
| sm | 8px (2) | 元素內部間距 |
| md | 16px (4) | 卡片內部間距 |
| lg | 24px (6) | 區塊間距 |
| xl | 32px (8) | 區塊分隔 |
| 2xl | 48px (12) | 頁面區域分隔 |

### 容器規範
```css
/* 頁面容器 */
.container {
    max-width: 1600px;
    padding-left: 48px;   /* px-12 */
    padding-right: 48px;
    margin: 0 auto;
}

/* 核心功能區 (Command Console / Input Area) */
.functional-area {
    width: 100%;
    max-width: 1600px; /* 強制與首頁容器寬度保持一致 */
    margin: 0 auto;
}

/* 應用型佈局容器 (如 Chatbot 界面) */
.app-container {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    overflow: hidden;
    border-left: 1px solid var(--border-white);
    border-right: 1px solid var(--border-white);
}
```

---

## 5. 組件規範 (Components)

### A. 導航欄 (Header)
```
結構：HUD 狀態欄 (h-10) + 主導航欄 (py-4)
背景：glass-header (磨砂玻璃效果)
位置：sticky top-0 z-[100]
底部：漸變色分隔線 (cyan → emerald)
```

### B. 智能體卡片 (The Neu-Card)
用於 Agent 超市與通用卡片場景。
```css
.neu-card {
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid var(--border-white);
    border-radius: 24px;
}
/* Hover 特效：上浮、綠色邊框、揭示隱藏內容 */
```

### B. 插件卡片 (The Plugin-Card)
用於插件倉庫，強調技術與模組化感。
```css
.plugin-card {
    background: rgba(10, 15, 25, 0.6);
    border: 1px solid rgba(0, 93, 170, 0.4);
    border-radius: 24px 0 24px 0; /* 左上/右下圓角 */
    background-image: linear-gradient(rgba(0, 93, 170, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 93, 170, 0.05) 1px, transparent 1px);
}
/* 特色：非對稱圓角、動態掃描線 */
```

### D. 按鈕系統 (Buttons)

按鈕必須具備明確的交互反饋（Hover 效果）。

| 類型 | 類名 | 使用場景 | 樣式特徵 |
|------|------|----------|----------|
| 主要操作 | `btn-action` | 提交、確認、申請 | 品牌漸變色背景，黑色文字，Hover 時有發光效果 |
| 次要操作 | `btn-glass` | 取消、查看詳情 | 半透明背景，白色文字，Hover 時邊框變為綠色 |
| 標籤按鈕 | `tag-btn` | 篩選標籤、試試這樣提問 | 圓角矩形，Hover 時文字與邊框變為綠色 |
| 圖標按鈕 | `btn-icon` | 附件上傳、圖片上傳 | 正方形圓角，Hover 時邊框與背景微亮，顏色變綠 |

#### CSS 實作代碼
```css
/* 主要按鈕 */
.btn-action {
    background: linear-gradient(135deg, var(--tg-cyan) 0%, var(--tg-emerald) 100%);
    color: #000;
    font-weight: 700;
    transition: all 0.3s;
}

.btn-action:hover {
    box-shadow: 0 0 25px var(--tg-emerald);
    transform: scale(1.02);
}

/* 玻璃質感按鈕 (次要) */
.btn-glass {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-main);
    font-weight: 500;
    transition: all 0.3s;
}

.btn-glass:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--tg-emerald);
}

/* 標籤式按鈕 (常用於快捷提問) */
.tag-btn {
    white-space: nowrap;
    font-size: 15px;
    padding: 6px 16px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05);
    color: #CBD5E1;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s;
}

.tag-btn:hover {
    border-color: rgba(0, 245, 160, 0.5);
    color: var(--tg-emerald);
}

/* 圖標式功能按鈕 */
.btn-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #CBD5E1;
    transition: all 0.3s;
}

.btn-icon:hover {
    color: var(--tg-emerald);
    border-color: rgba(0, 245, 160, 0.5);
    background: rgba(0, 245, 160, 0.05);
}
```

### E. 輸入區 (Command Console)
```
寬度：max-w-[1600px] (與首頁主容器一致)
外框：neu-card + rounded-[2.5rem]
內部：頂部工具列 + 文本輸入區
工具列：下拉選擇 + 快捷標籤
提交按鈕：btn-action + 圓角 + 定位右下
```

### F. 標籤頁 (Tabs)
```css
.tab-item {
    color: var(--text-muted);
    padding: 8px 0;
}

.tab-item.active {
    color: var(--tg-cyan);
    /* 底部漸變線 */
}
```

### G. 進度條 (Progress Bar)
```css
.progress-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
}

.progress-fill {
    background: linear-gradient(90deg, var(--tg-cyan), var(--tg-emerald));
}
```

### H. 徽章 (Badges)
| 排名 | 顏色 |
|------|------|
| Top 1 | 金色漸變 (#FFD700 → #FFA500) |
| Top 2 | 銀色漸變 (#E8E8E8 → #B8B8B8) |
| Top 3 | 銅色漸變 (#CD7F32 → #A0522D) |
| Top 4+ | 品牌色漸變 (cyan → emerald) |

---

## 6. 圖標規範 (Icons)

### 風格
- 使用 **線性圖標** (Stroke icons)
- 線寬：`stroke-width: 1.5`
- 尺寸規範：
  - 小圖標：16px (w-4 h-4)
  - 中圖標：20px (w-5 h-5)
  - 大圖標：24px (w-6 h-6)
  - 特大圖標：28px (w-7 h-7)

### 圖標容器
```html
<div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
    <svg class="w-6 h-6 text-cyan-400">...</svg>
</div>
```

---

## 7. 動效規範 (Animation)

### 過渡時間
| 類型 | 時長 | 緩動函數 |
|------|------|----------|
| 微交互 | 0.3s | ease |
| 卡片懸停 | 0.4s | cubic-bezier(0.16, 1, 0.3, 1) |
| 頁面切換 | 0.5s | ease-in-out |

### 常用動效
```css
/* 狀態脈衝 */
@keyframes statusPulse {
    0% { transform: scale(0.5); opacity: 1; }
    100% { transform: scale(2.5); opacity: 0; }
}

/* 淡入 */
@keyframes fadeIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
}
```

### 交互原則
- **內容覺醒**：信息不一次鋪滿，Hover 揭示深度內容
- **狀態反饋**：所有可點擊元素都需有 hover/active 狀態
- **系統狀態**：在線狀態使用 `animate-pulse`

---

## 8. 響應式斷點 (Breakpoints)

| 斷點 | 寬度 | 用途 |
|------|------|------|
| sm | 640px | 手機橫屏 |
| md | 768px | 平板 |
| lg | 1024px | 小型筆電 |
| xl | 1280px | 桌面 |
| 2xl | 1536px | 大屏幕 |

### 網格系統
- 桌面：4 欄 (`xl:grid-cols-4`)
- 平板：2 欄 (`md:grid-cols-2`)
- 手機：1 欄 (`grid-cols-1`)

---

## 9. 頁面模板結構 (Page Template)

```html
<!DOCTYPE html>
<html lang="zh-HK">
<head>
    <!-- Meta 標籤 -->
    <!-- 字體引入 -->
    <!-- 樣式引入 -->
</head>
<body>
    <!-- 背景層 -->
    <div class="ambient-glow"></div>
    <div class="grid-matrix"></div>

    <!-- 導航欄 -->
    <header class="sticky top-0 z-[100] glass-header">
        <!-- HUD 狀態欄 -->
        <!-- 主導航 -->
    </header>

    <!-- 主內容區 -->
    <main class="max-w-[1600px] mx-auto px-12 pb-32">
        <!-- 頁面內容 -->
    </main>

    <!-- 頁腳 -->
    <footer>
        <!-- 四欄式頁腳 -->
    </footer>

    <!-- 浮動 AI 助手 -->
    <div class="float-action">...</div>

    <!-- JavaScript -->
</body>
</html>
```

---

## 10. 文案規範 (Copywriting)

### 語言
- **強制繁體中文**：所有 UI 標籤、導航、按鈕、描述
- **例外情況**：Agent, API, Token, AI, GPU 等科技專有名詞保持英文

### 語氣風格
- 專業、精準、具備企業前瞻性
- 避免過於口語化或誇張的表達

### 標題格式
- 區塊標題：`大寫英文` + 中文 (如：`最近部署 .NEW`)
- 使用 `font-orbitron` 和 `font-mono-code` 組合

---

## 11. 頁面清單 (Page Inventory)

| 頁面 | 路徑 | 狀態 |
|------|------|------|
| 首頁 | `index.html` | ✅ 完成 |
| AI 工具庫 | `tools.html` | ⏳ 待設計 |
| 工具詳情 | `tool-detail.html` | ⏳ 待設計 |
| 案例中心 | `cases.html` | ⏳ 待設計 |
| 案例詳情 | `case-detail.html` | ⏳ 待設計 |
| AI 快訊 | `news.html` | ⏳ 待設計 |
| 在線使用 | `chat-online.html` | ✅ 完成 |
| 文章詳情 | `article.html` | ⏳ 待設計 |
| AI 文化 | culture.html | ✅ 完成 |

---

## 12. 文件結構 (File Structure)

```
TGAI/
├── index.html              # 首頁
├── tools.html              # AI 工具庫
├── cases.html              # 案例中心
├── news.html               # AI 快訊
├── culture.html            # AI 文化
├── css/
│   └── main.css            # 共用樣式
├── js/
│   └── main.js             # 共用腳本
├── assets/
│   ├── images/
│   │   └── logo.png
│   └── icons/
└── design-system.md        # 設計系統文檔
```

---

## 13. 最新設計要求更新 (2026年1月21日)

### 導航系統優化
1. **導航菜單結構**：
   - 新增「AI 報告」頁面連結，位置在「AI 快訊」之前
   - 標準導航順序：首頁 → Agent超市 → 插件倉庫 → 知識庫 → 模型管理 → AI 報告 → AI 快訊 → AI文化

2. **可訪問性增強**：
   - 所有13px及以下的文字統一增大2px，提升年長用戶閱讀體驗
   - 導航菜單文字在非當前狀態下顏色從灰色改為白色(#FFFFFF)
   - 增強文字顏色對比度，確保在深色背景下清晰可讀

3. **文案更新**：
   - 「綠色燃料」改為「延伸業務」
   - 「待上線板塊」去掉「板塊」二字，簡化為「待上線」

### 交互組件改進
1. **語言選擇器**：
   - 從文字形式改為圖標形式
   - 預設顯示繁體中文圖標（「繁」字）
   - 支援繁體/簡體切換功能
   - 保留完整的語言切換功能與本地存儲

2. **搜索框優化**：
   - 默認狀態下適當縮短搜索框寬度（max-w-[160px]）
   - 點擊擴展時往左邊延伸，避免與語言選擇器重疊
   - 保持搜索功能完整性和用戶體驗

3. **Logo區域更新**：
   - 移除「Towngas AI中心」文字
   - 放大「TGAI」文字（text-3xl）
   - 為「TGAI」文字應用漸變色效果（from-cyan-400 to-emerald-400）
   - 確保視覺平衡和專業性

### 實施要求
- 所有修改需保持響應式設計
- 確保在各類屏幕尺寸下都能正常顯示
- 修改後需進行跨瀏覽器測試（Chrome, Firefox, Safari, Edge）
- 保持整體設計風格的一致性
- 所有頁面（index.html, agent-market.html, ainews.html, culture.html, plugins.html）需同步更新

---

*最後更新：2026年1月21日*
