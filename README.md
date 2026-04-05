# 濃濃香蛋捲官網

內灣濃濃香蛋捲介紹官網、訂購資訊、產品介紹。

這個專案是純靜態網站，直接部署到靜態網站平台即可，不需要資料庫或後端服務。

## 專案結構

- `index.html`: 首頁
- `products.html`: 商品口味
- `order.html`: 訂購資訊
- `faq.html`: 常見問題
- `contact.html`: 聯絡我們
- `styles.css`: 網站樣式
- `app.js`: 前端互動
- `assets/`: 圖片素材

## 本機預覽

在專案資料夾執行：

```bash
python3 -m http.server 8080
```

然後開啟 `http://localhost:8080`。

## 建議部署方式

最適合這個網站的是 Cloudflare Pages。

原因很簡單：

- 純靜態網站可直接部署
- 可直接綁定自有網域
- 有免費 HTTPS
- 後續改版只要更新 GitHub 就能重新發布

## 上架到 Cloudflare Pages

### 1. 先上傳到 GitHub

如果你還沒把專案放到 GitHub，可以先在這個資料夾執行：

```bash
git init
git add .
git commit -m "Initial website"
```

接著到 GitHub 建立新 repo，然後推上去：

```bash
git remote add origin <你的 GitHub repo URL>
git branch -M main
git push -u origin main
```

### 2. 建立 Cloudflare Pages 專案

1. 登入 Cloudflare
2. 進入 `Workers & Pages`
3. 點 `Create`
4. 選 `Pages`
5. 選 `Connect to Git`
6. 連接你的 GitHub repo

### 3. 部署設定

因為這是靜態網站，設定如下：

- Framework preset: `None`
- Build command: 留空
- Build output directory: `/`

Cloudflare 會直接把專案根目錄當成網站內容發布。

### 4. 綁定網域 `neiwaneggroll.com`

Pages 專案部署完成後：

1. 進入該 Pages 專案
2. 點 `Custom domains`
3. 點 `Set up a custom domain`
4. 輸入 `neiwaneggroll.com`
5. 再加上 `www.neiwaneggroll.com`

如果你的網域 DNS 也放在 Cloudflare，Cloudflare 會自動幫你建立需要的 DNS 記錄。

如果網域不在 Cloudflare 管理，Cloudflare 會顯示你需要新增的 DNS 記錄；照畫面加到原本的網域商後台即可。

### 5. 等待生效

通常幾分鐘到幾小時內會完成：

- DNS 生效
- SSL 憑證簽發
- `https://neiwaneggroll.com` 可正常開啟

## 上線前已整理的事項

這份專案適合部署到 Linux 主機時，最常見的問題是圖片檔名大小寫不一致。正式環境通常會區分大小寫，所以部署前要確認：

- HTML 內引用的圖片檔名與實際檔名完全一致
- 沒有使用不存在的圖片路徑

目前專案已調整為使用現有素材檔名。

## 之後如何更新網站

如果你是用 Cloudflare Pages 串 GitHub：

1. 修改網站檔案
2. `git add .`
3. `git commit -m "Update website"`
4. `git push`

Cloudflare Pages 會自動重新部署。
