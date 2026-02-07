# Skill Seekers 使用說明指南 (Trae 專用版)

Skill Seekers 是一個強大的自動化工具，能將外部文檔、GitHub 代碼庫和 PDF 轉換為 AI 可理解的「技能知識包」。在 Trae 中使用它可以幫助 AI 更好地理解特定的技術棧或私有庫。

## 1. 快速啟動
工具已安裝在本地虛擬環境中，使用前請先激活環境：

```bash
# 激活環境
source .venv/bin/activate

# 檢查是否可用
skill-seekers --help
```

## 2. 核心指令說明
- `scrape`: 抓取網站文檔
- `github`: 抓取並分析 GitHub 倉庫
- `pdf`: 提取 PDF 內容
- `unified`: 多源混合抓取
- `package`: 打包為 AI 技能包 (.zip)

## 3. 模擬 10 個中文 Prompt 示範例子

以下是您可以直接在 Trae 終端或對話中參考的示範場景：

### 範例 1：抓取技術文檔
> "幫我抓取 Tailwind CSS 的官方文檔，並命名為 tailwind-docs，方便我之後在項目中參考最新的類名用法。"
> **對應指令：** `skill-seekers scrape --url https://tailwindcss.com/docs --name tailwind-docs`

### 範例 2：分析 GitHub 開源項目
> "我需要深入了解 Lucide 圖標庫的源代碼結構，請幫我分析 GitHub 上的 lucide-icons 倉庫並生成技能包。"
> **對應指令：** `skill-seekers github --repo lucide-icons/lucide --name lucide-skill`

### 範例 3：提取產品說明的 PDF
> "項目根目錄下有一個 product_spec.pdf，請幫我提取裡面的功能清單和 API 定義。"
> **對應指令：** `skill-seekers pdf --file product_spec.pdf --name product-knowledge`

### 範例 4：混合來源抓取（文檔 + 代碼）
> "幫我同時抓取 React Query 的文檔和它的 GitHub 範例代碼，我想要一個最完整的知識庫。"
> **對應指令：** `skill-seekers unified --config configs/react_query_unified.json`

### 範例 5：生成 Claude 專用的技能包
> "已經抓取好的 'auth-system' 內容，請幫我打包成 Claude 專用的 .zip 文件。"
> **對應指令：** `skill-seekers package output/auth-system/ --target claude`

### 範例 6：快速更新現有知識
> "之前的 TypeScript 抓取任務中斷了，請幫我恢復並完成剩餘的部分。"
> **對應指令：** `skill-seekers resume --name typescript-skill`

### 範例 7：預估抓取工作量
> "在開始抓取 Next.js 文檔之前，先幫我預估一下大約有多少頁面。"
> **對應指令：** `skill-seekers estimate --url https://nextjs.org/docs`

### 範例 8：AI 增強知識內容
> "對剛剛抓取到的 'payment-api' 內容進行 AI 處理，提取出最重要的代碼範例。"
> **對應指令：** `skill-seekers enhance output/payment-api/`

### 範例 9：查看工具版本與更新
> "檢查一下目前的 Skill Seekers 版本，確認功能是否是最新的。"
> **對應指令：** `skill-seekers --version`

### 範例 10：一鍵式完整安裝流
> "幫我執行從抓取到上傳的完整流程，目標是這個 GitHub 倉庫：`facebook/react`。"
> **對應指令：** `skill-seekers install --repo facebook/react --name react-full`

---
*提示：所有抓取後的內容將保存在 `output/` 目錄下。建議將重要的 Markdown 文件保留在項目中，以便 Trae 自動索引。*
