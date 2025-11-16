"use client";
import React from "react";

export default function Header({ user, onLogout }) {
  return (
    <header className="header card" style={{marginBottom:16}}>
      <div className="brand">
        <div className="logo">PN</div>
        <div>
          <div style={{color:"white", fontWeight:700}}>Painel Consulta</div>
          <div style={{fontSize:12, color:"var(--muted)"}}>Painel • Dark Neon</div>
        </div>
      </div>

      <div style={{display:"flex", gap:12, alignItems:"center"}}>
        {user ? (
          <>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:14, color:"var(--accent)", fontWeight:700}}>Usuário</div>
              <div style={{fontSize:13}}>{user.email || `#${user.id}`}</div>
            </div>
            <button className="btn btn-ghost" onClick={onLogout}>Sair</button>
          </>
        ) : (
          <div style={{display:"flex", gap:8}}>
            <a href="/" className="btn btn-ghost">Login</a>
            <a href="/register" className="btn btn-ghost">Registrar</a>
          </div>
        )}
      </div>
    </header>
  );
}