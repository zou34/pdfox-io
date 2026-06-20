export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const GROQ_KEY = process.env.GROQ_KEY;
  if (!GROQ_KEY) {
    return res.status(500).json({ error: 'GROQ_KEY not configured in Vercel Environment Variables' });
  }

  try {
    const { messages, system, max_tokens } = req.body;
    const formattedMessages = [];

    if (system) formattedMessages.push({ role: 'system', content: system });
    if (messages && Array.isArray(messages)) {
      messages.forEach(function(m) {
        formattedMessages.push({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        });
      });
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_KEY
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: formattedMessages,
        max_tokens: max_tokens || 1024,
        temperature: 0.3
      })
    });

    if (!groqRes.ok) {
      const err = await groqRes.json();
      return res.status(groqRes.status).json({ error: (err.error && err.error.message) || 'Groq API error' });
    }

    const data = await groqRes.json();
    const content = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
    return res.status(200).json({ content: content });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
