# JIUKU DPP

## 本次交付边界

按本次要求：代码推送 GitHub，沿用现有 GitHub Pages 发布流程；不创建、部署或修改 Cloudflare 云资源。

- `/dpp/` 是英文查询入口，`?sn=JK-CL-SN-20261006-00001` 请求实时 API；每台设备的资料独立。
- `/dpp/admin/` 是中文管理员界面，公开资料字段用英文填写。
- GitHub Pages 能发布页面资源，**不能执行这里的 Worker、D1 数据库或 R2 上传接口**。仅推送 GitHub 后，界面可访问，但真实查询、录入、上传与二维码 API 需要已运行的后台。当前仓库配置仍为占位符，不能视为完整系统已上线。
- 不在前端嵌入账号密钥，不将真实证书、客户资料或管理员凭据提交公共仓库。

## 文件与运行

`public/dpp`：独立页面，不受 Nuxt 语言路由改写。`services/dpp`：Cloudflare Worker API、D1 迁移与 R2 文件存储。官网页脚增加 DPP 入口。

本地检查（Node 24、pnpm 11）：

```sh
cd services/dpp
pnpm install --frozen-lockfile
pnpm test
pnpm check
pnpm db:local
```

浏览器检查从仓库根目录运行 `node services/dpp/test/browser.mjs`。需安装 Playwright 及 Edge；可以通过 `PLAYWRIGHT_MODULE` 指定已安装模块路径。该测试使用本地 SQLite、虚构产品资料与管理员 API 路由替身；不代表已验证真实 Cloudflare Access 登录。生产 Worker 不包含测试绕过入口。

## 管理员使用流程

1. 自动生成 1–100 台一批的 SN，或每行导入一个已有 SN。自动序号由数据库事务分配，同日续号，跨日重新开始。可重复创建多批。已有 SN 导入会推进该日计数器。
2. 点击设备，编辑八个板块。所有设备都有独立草稿与发布版本，不共用记录。
3. 上传 PDF、PNG、JPEG、WebP（每份不超过 15 MB）。图片、证书与零件文件可在相应字段选择关联。未发布文件不能通过公开下载接口读取。
4. 「保存草稿」不修改客户可见资料；「发布」才替换公开快照。发布至少要求产品名、型号和制造商名；不会自动判定法律合规。
5. 「打印本批二维码」或单机打印保持同一完整链接。量产印刷前务必验证已上线域名和实际扫码结果。草稿设备对应链接在发布前显示未找到档案。
6. 支持 SN CSV、完整资料 JSON 导出；JSON 不包含上传文件本体，备份必须同时保存 R2 对象与数据库。
7. 编辑冲突返回提示，重新载入后再修改，防止覆盖另一位管理员。历史内容可载入为新草稿；SN 不可编辑，不支持删除档案。

## 后续接通后台时所需配置（本次不执行）

前提：`jiukuclaw.com` 的 DNS 在 Cloudflare 且代理开启，现有 GitHub Pages 源站与 HTTPS 保持可用。只为 `/dpp` 和 `/dpp/*` 配置 Worker 路由，其他官网地址维持原服务。

在 `services/dpp` 内，管理员自行完成 `pnpm exec wrangler login`。不要把登录令牌发到聊天或提交 Git。

- 创建 D1：`pnpm exec wrangler d1 create jiuku-dpp --location weur`，将返回的 ID 填入 `wrangler.jsonc` 的 `database_id`。`weur` 是欧洲位置提示，并非访问耗时保证。
- 创建 R2：`pnpm exec wrangler r2 bucket create jiuku-dpp-documents`。保持桶私有，关闭公共桶域名。
- Cloudflare Zero Trust 创建一个 Self-hosted Access 应用，配置同一个应用内两个路径：`jiukuclaw.com/dpp/admin*` 与 `jiukuclaw.com/dpp/api/admin/*`。Allow 策略只列实际管理员邮箱，不能采用 Everyone 或 Bypass。
- 将 team 域名、该应用 AUD 和相同管理员邮箱白名单分别填入 `ACCESS_TEAM_DOMAIN`、`ACCESS_AUD`、`ADMIN_EMAILS`。应用两个路径必须使用同一 AUD。公开 `/dpp/`、`/dpp/api/passport`、已发布文件和 QR 不加 Access 限制。
- 运行 `pnpm db:remote` 后 `pnpm deploy`。本次不运行这两个命令。
- 上线验收：无痕窗口无需登录查询已发布 SN；草稿不可读；管理员登录可新增/上传/编辑/发布；同一码更新后立即得到新资料；退出登录后不能调用管理接口；欧洲网络实测延时；访问官网其他语言页面确认正常。

Worker 静态资源由 Cloudflare 分发；公共 JSON 使用 `no-store` 保证发布更新可见，下载文件最多缓存 60 秒。禁止为管理接口或查询接口设置额外 Cache Everything 规则。部署后需要欧洲实际网络测试，不能仅凭架构承诺“秒开”。

## 持久性与法规边界

SN 数据库约束防止更改/删除，事务与幂等键防止重试重复分配；版本记录保存修改人和时间。文件按 SN 隔离，并记录 SHA-256。域名续费、运行服务和备份仍须持续维护，代码无法单独保证二维码永久可用。

建议每日导出 D1 SQL 并备份 R2 到独立存储，定期验证恢复。使用 `wrangler d1 export jiuku-dpp --remote --output=<backup.sql>`，备份含管理员邮箱，应放私有位置；R2 通过受限 S3 凭据备份全部对象。灾难恢复保留所有 SN、文件 ID 与公网路径；数据库迁移采用新增迁移，不覆盖已应用迁移。历史快照引用的对象不可随意删除。

现有 schemaVersion、extensions、独立文件和稳定标识可支持后续扩展；未来产品类别授权法案可能要求不同标识、注册、互操作格式与访问权限，届时仍可能需要开发。八板块公开展示是当前业务要求，不代表法律要求全部资料向所有人开放。CE、RoHS、REACH、EPR 仅是可录入的文件类别，空记录不会显示已认证；碳足迹、寿命及进口商资料均不会捏造。

参考：[欧盟 DPP FAQ](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/explore-our-faqs_en)、[ESPR 正文](https://eur-lex.europa.eu/eli/reg/2024/1781/oj)、[Cloudflare D1 事务批处理](https://developers.cloudflare.com/d1/worker-api/d1-database/)、[D1 配置命令](https://developers.cloudflare.com/d1/wrangler-commands/)、[Access 应用配置](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)。
