"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header style={{ marginBottom: "30px" }}>
      <h1>Painel • Dark Neon</h1>

      <nav style={{ marginTop: "10px" }}>
        <Link href="/">Login</Link> &nbsp;|&nbsp; 
        <Link href="/register">Registrar</Link>
      </nav>
    </header>
  );
}