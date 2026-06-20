/* PDFOX.io — ai.js — Appelle /api/chat (Vercel Serverless) */

var API_URL = '/api/chat';

async function callGemini(prompt, system) {
  return await callAPI([{ role: 'user', content: prompt }], system, 1024);
}

async function callGeminiChat(messages, system) {
  return await callAPI(messages, system, 800);
}

async function callAPI(messages, system, max_tokens) {
  var body = { messages: messages, max_tokens: max_tokens || 1024 };
  if (system) body.system = system;

  var res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    var err = await res.json();
    throw new Error(err.error || 'Erreur API');
  }

  var data = await res.json();
  return data.content || '';
}

function getAiUsage() {
  try {
    var d = JSON.parse(localStorage.getItem('pdfox_ai') || '{"c":0,"date":""}');
    if (d.date !== new Date().toDateString()) return { c: 0, date: new Date().toDateString() };
    return d;
  } catch (e) { return { c: 0, date: new Date().toDateString() }; }
}

function incAiUsage() {
  var u = getAiUsage(); u.c++;
  localStorage.setItem('pdfox_ai', JSON.stringify(u));
}

function aiRemaining() { return Math.max(0, 5 - getAiUsage().c); }
function isApiConfigured() { return true; }
