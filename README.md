# Jevon's Den · 深夜书房

个人网站：随笔、外站文章索引、开发数据（GitHub + AI token 热力图）、影音书收藏、友链，以及一个只属于站主的网页写作间。

深色雅致设计系统：暖黑 `#16161a` 打底，香槟金 `#c8a273` 点睛，宋体标题 + 无衬线正文 + 等宽数据。

## 本地开发

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # 产物在 dist/
```

## 部署（Vercel）

1. 推送本仓库到 GitHub
2. Vercel 导入该仓库，框架选 Astro，直接部署
3. 每次 push 自动重新部署

## 启用写作间（/write）

写作间是暗门页面（导航无入口），通过 GitHub OAuth 登录后可在网页上直接写随笔并发布（自动 commit 到本仓库触发部署）。

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
   - Homepage URL：`https://你的域名`
   - Authorization callback URL：`https://你的域名/write`
2. 拿到 Client ID 和 Client Secret
3. Vercel 项目 → Settings → Environment Variables 添加：
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
4. 编辑 `src/pages/write.astro` 顶部 `CONFIG.clientId` 填入 Client ID，push

没配置 OAuth 时，/write 只是一个无法发布的本地编辑器（草稿存浏览器），其他人打开也写不进仓库——写入权限完全等于 GitHub 仓库权限。

## 写作的两条路

- 网页：打开 `/write`，写完点发布
- 本地：在 `src/content/posts/` 新建 `.md`（frontmatter: title/date/tags/summary），push 即发布

## 目录

```
src/
├── content/posts/    随笔（Markdown）
├── layouts/Base.astro
├── pages/            index / posts / about / links / articles / dev / media / write
├── styles/global.css 设计令牌与全部公共样式
api/auth.js           OAuth token 交换（Vercel Function）
```
