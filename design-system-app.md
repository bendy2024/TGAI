# TGAI App 端設計系統規範 (Mobile Design System)

> 版本 2.1 | 專為移動端觸控體驗優化，核心設計語言對齊 `agent-home-mobile.html`

## 1. 核心設計令牌 (Shared Tokens)
*繼承自 PC 端設計系統，確保跨平台視覺一致性。*

- **品牌色 (Brand Colors)**: 
  - **Cyan**: `#00F2FF` (`var(--tg-cyan)`) - 用於主要激活態、文字高亮。
  - **Emerald**: `#00F5A0` (`var(--tg-emerald)`) - 用於成功狀態、模型管理主題。
  - **Action Gradient**: `linear-gradient(135deg, var(--tg-cyan) 0%, var(--tg-emerald) 100%)`
- **背景與材質 (Surface & Material)**: 
  - **背景色**: 純深色 `#010204` (`var(--tg-bg)`)，搭配頂部徑向漸變 `radial-gradient(circle at 50% 0%, #111827 0%, #010204 100%)`。
  - **邊框色**: 統一使用 `rgba(255, 255, 255, 0.1)` (`var(--border-white)`)。
  - **磨砂玻璃 (Glassmorphism)**: 
    - **基礎卡片**: `backdrop-filter: blur(20px)`，背景 `rgba(15, 23, 42, 0.5)`。
    - **交互組件 (按鈕/搜索框)**: `backdrop-filter: blur(10px)`，背景 `rgba(255, 255, 255, 0.05)`。
- **圓角規範 (Radii)**: 
  - **大圓角 (Card)**: `24px` (`var(--card-radius)`)。
  - **中圓角 (Modal)**: `32px`。
  - **小圓角 (Button/Input)**: `12px`。
- **導航高度 (Navigation)**: `72px` (`var(--nav-height)`)。

## 2. 移動端字體規範 (Typography)
- **基礎字體**: `Noto Sans HK` (Weights: 300, 400, 500, 700, 900)。
- **字體階梯 (Text Scale)**: 
  - **Banner 標題**: `20px` (text-xl) / `font-black` / `tracking-widest` / `text-white/90`
  - **卡片標題**: `18px` (text-lg) / `font-bold` / `text-white`
  - **分類/導航標籤**: `15px` / `font-medium` (Active: `font-bold` / `text-tg-cyan`)
  - **標準正文**: `14px` (text-sm) / `leading-relaxed` / `text-white/60`
  - **輔助文字 (Badge/Meta)**: `12px` (text-xs) / `text-white/40`
  - **導航標籤 (Bottom Nav)**: `11px` / `text-white/40`

## 3. 核心組件規範 (Core Components)

### A. 按鈕系統 (Buttons)
*所有按鈕高度統一為 `44px`，以符合觸控熱區規範。*

- **主要操作 (btn-action)**:
  - **樣式**: 品牌漸變背景，黑色文字 (`#000`)，`font-bold`。
  - **反饋**: `active:scale-95` / `active:opacity-90`。
- **次要操作 (btn-glass)**:
  - **樣式**: `rgba(255, 255, 255, 0.05)` 背景，白色文字，`font-semibold`，帶有 `blur(10px)`。
  - **反饋**: `active:background(rgba(255, 255, 255, 0.1))` / `active:scale-95`。
- **佈局**: 卡片內底部按鈕統一採用 **2 欄網格** `grid grid-cols-2 gap-3`。

### B. 卡片系統 (Neu-Card)
- **視覺規範**: `neu-card` 類名，具備磨砂玻璃感、`1px` 邊框與 `24px` 圓角。
- **活性狀態**: `active:scale-98`，邊框顏色變為 `var(--tg-cyan)`。
- **Banner 特化**: 高度 `120px`，內置 `conic-gradient` 旋轉動畫，透明度 `0.1`。

### C. 導航組件 (Navigation)
- **分類選項卡 (Category Tabs)**:
  - 高度 `44px`，左側橫向滾動 (`no-scrollbar`)，右側固定 **「篩選」** 按鈕。
  - 篩選按鈕需帶有 `border-l border-white/10` 與 `ml-4 pl-4` 的視覺分隔。
  - 激活態下方有 `2px` 品牌色指示線與 `10px` 擴散陰影。
- **底部導航 (Bottom Nav)**:
  - 懸浮式設計，`nav-wrapper` 距離底部 `24px`。
  - 背景 `rgba(15, 23, 42, 0.8)`，`blur(25px)`，圓角 `36px`。

### D. 狀態標籤 (Status Badges)
- **位置**: 卡片右上角 `absolute` 定位。
- **樣式**: 漸變背景，白色文字，`12px` `font-bold`，圓角 `0 0 0 12px`。
- **預設配色**:
  - **本地 (Local)**: `linear-gradient(135deg, #10B981 0%, #059669 100%)`
  - **飛書 (Lark)**: `linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)`

### E. 篩選彈窗 (Filter Modal)
- **背景**: `rgba(0, 0, 0, 0.7)` 遮罩 + `blur(12px)`。
- **面板**: `rgba(15, 23, 42, 0.9)` 背景，`blur(40px)`，圓角 `32px`。
- **佈局**: `grid-template-cols: 80px 1fr` (標籤 vs 選項)。
- **選項**: 默認 `text-white/80`，激活 `text-tg-cyan` + `font-bold`。

## 4. 佈局與間距規範 (Layout & Spacing)
- **容器限制**: `max-width: 440px` 居中，模擬原生 App。
- **標準邊距**: 左右 `20px` (`px-5`)，區塊間距 `mb-6` 或 `space-y-5`。
- **頂部安全區**: `safe-area-top` (適配動態島/瀏海)。

## 5. 交互原則 (UX Principles)
- **觸控反饋**: 所有可點擊元素必須具備 `:active` 縮放反饋。
- **視覺一致性**: 凡涉及「查看詳情」與「立即使用」的組合，必須保持左側 `btn-glass` 右側 `btn-action` 的網格佈局。
- **色彩語義**: 嚴格遵守 Cyan 用於「操作/激活」，Emerald 用於「成功/資源管理」。
