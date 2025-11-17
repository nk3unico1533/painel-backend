"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div>
      <h2>Use seu e-mail e senha para acessar o painel.</h2>

      <label>E-mail</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@exemplo.com"
      />

      <label>Senha</label>
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button>Entrar</button>

      <p style={{ marginTop: "20px" }}>
        <a href="/register">Criar conta</a>
      </p>
    </div>
  );
}