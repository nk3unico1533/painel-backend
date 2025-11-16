// lib/api.js
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://painel-backend-3i7j.onrender.com";

export async function register(email, senha){
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, senha })
  });
  return res.json();
}

export async function login(email, senha){
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, senha })
  });
  return res.json();
}

export async function consulta(tipo, valor, userId){
  const res = await fetch(`${API_BASE}/consulta/${encodeURIComponent(tipo)}`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ valor, userId })
  });
  return res.json();
}

export async function historico(userId){
  const res = await fetch(`${API_BASE}/historico/${userId}`);
  return res.json();
}
