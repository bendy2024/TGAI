# TGAI 平台資源自動切換規則 (Platform Switcher)

## 觸發條件與上下文定義

### 1. App 端開發上下文 (App Context)
- **觸發路徑**: 任何位於 `/app/` 目錄下的文件，或文件名包含 `-mobile.html` 的文件。
- **核心規範**: 強制優先讀取 [design-system-app.md](file:///Users/bendyyip/development/work/TGAI/design-system-app.md)。
- **開發原則**:
    - 禁用所有 `hover:` 類（移動端無懸停）。
    - 確保所有按鈕高度 >= `44px`。
    - 使用 `flex-col` 作為基礎容器結構。
    - 必須包含 `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">`。

### 2. PC/Web 端開發上下文 (PC Context)
- **觸發路徑**: 任何位於 `/dist/` 或 `/src/` 下的文件（除非命中 App 規則）。
- **核心規範**: 強制優先讀取 [design-system.md](file:///Users/bendyyip/development/work/TGAI/design-system.md)。
- **開發原則**:
    - 容器寬度上限為 `1600px` 居中。
    - 豐富的 `hover:` 效果與鍵盤快捷鍵支持。
    - 側邊導航與多欄佈局。

### 3. 全局共享資源
- **色彩與品牌**: 始終參考 [design-system.md](file:///Users/bendyyip/development/work/TGAI/design-system.md) 的色彩定義。
- **Figma 匯入**: 兩端均須保留 `data-page` 與 `data-section` 標記。
