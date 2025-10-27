# 九酷公司官网（Vue 3 + Vite）

这是一个基于 Vue 3 + Vite 的企业官网示例骨架，包含路由、页面和部署到 GitHub Pages 的脚本。

快速开始（Windows PowerShell）：

```powershell
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建
npm run build

# 部署到 GitHub Pages（需要先创建远程仓库并推送）
npm run deploy
```

部署说明：

A) 使用 gh-pages 手动发布（保留源码在 main，发布到 gh-pages）：
- 运行 `npm run build` 然后 `npm run deploy`，gh-pages 会把 `dist/` 发布到 `gh-pages` 分支。
- 在 GitHub 仓库 Settings -> Pages 中选择 `gh-pages` 分支作为站点源。

B) 使用 GitHub Actions 自动发布到 `main`（适用于 username.github.io 仓库）：
- 我们在 `.github/workflows/deploy.yml` 中包含了一个 workflow，会在你 push 到 `main` 时构建并把 `dist/` 发布到 `main` 分支（适合仓库名为 `jiukutech.github.io` 的用户名站点）。
- 注意：该 workflow 会把 `dist/` 的内容推到 `main`（覆盖该分支的文件内容）。如果你想保留源码，建议使用 gh-pages 发布方法或在另一个仓库保存源码。

如何把本地仓库推送到 GitHub（示例）：
```powershell
cd C:\Users\Teni\Desktop\九酷公司官网
git init
git add .
git commit -m "chore: init site"
git branch -M main
git remote add origin https://github.com/JiuKuTech/jiukutech.github.io.git
git push -u origin main
```

在你 push 到 `main` 之后，Actions 会自动运行并把构建产物发布到 `main`（作为 username.github.io 站点）。

提示：如果你不希望 Actions 覆盖源码，请选择使用 gh-pages（方法 A）。
