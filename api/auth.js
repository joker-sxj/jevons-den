// Vercel Serverless Function：GitHub OAuth code → access token
// 需要环境变量 GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET（在 Vercel 项目设置里配）
export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.status(400).json({ error: 'missing code' });

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'OAuth 未配置：请在 Vercel 环境变量中设置 GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET' });
  }

  try {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await r.json();
    if (data.access_token) return res.status(200).json({ token: data.access_token });
    return res.status(400).json({ error: data.error_description || 'token 交换失败' });
  } catch {
    return res.status(502).json({ error: '无法连接 GitHub' });
  }
}
