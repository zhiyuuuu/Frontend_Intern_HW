# Github_Issue_Manager
#### _A website helps you manage your github issues_

### 安裝方式
1. 分別在 root directory, /frontend, /backend 下執行 `yarn`.
2. 在 /frontend 執行 `yarn start`.
3. 在 /backend 執行 `yarn server`.
頁面即會出現於 **localhost:3000**

### 功能
總共可分為三個主頁面，分別為 Login、MainPage 及 Detail，以下是各頁面的功能：

**Login**
- 使用 GitHub login 取得 access token 並進入 MainPage

**MainPage**
- 載入使用者的所有 Issues ，一次呈現十筆資料
- 可在主頁面上看到 Issues 的狀態、標題及內文
- 根據 Issues 的建立時間做排序，可選擇正序/倒序
- 根據 Issues 的狀態 filter 想看到內容
- 可於搜尋欄查找標題或是內文包含關鍵字的 Issue
- 點選 Issues 本體或是右上角工具列可進入其詳細內容頁 (Detail)

**Detail**
- 呈現 Issue 的標題、內文以及狀態
- 點擊 Edit 按鈕下拉出編輯區塊，可再次點擊收回
- 編輯區塊有加上必填及字數限制
- 點擊 Update issue 按鈕會更新更改後的內容，並跳出成功通知
- 點擊 Delete 按鈕會跳出確認詢問方塊，按下確認後會回到 MainPage 並更新任務狀態，同時跳出成功通知

**Deploy**
- 使用 Railway
- Deploy 的部分遇到只能在本機上執行的問題，還在努力嘗試中QQ
- [Deploy 網址](https://frontendinternhw-production.up.railway.app/)
