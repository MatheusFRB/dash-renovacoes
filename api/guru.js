// api/guru.js
// Proxy serverless para a API do Digital Manager Guru
// Roda no servidor Vercel — resolve o problema de CORS

export default async function handler(req, res) {
  // CORS: permite chamadas do próprio domínio Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Token vem no header Authorization do frontend
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não informado.' });
  }

  // Monta a URL da Guru com os mesmos query params recebidos
  const queryString = new URLSearchParams(req.query).toString();
  const guruUrl = `https://digitalmanager.guru/api/v2/subscriptions/${queryString ? '?' + queryString : ''}`;

  try {
    const guruRes = await fetch(guruUrl, {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      },
    });

    const data = await guruRes.json();

    if (!guruRes.ok) {
      return res.status(guruRes.status).json(data);
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: `Erro ao contactar a Guru: ${err.message}` });
  }
}
