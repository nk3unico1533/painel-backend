"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../lib/api";

export default function LoginPage(){
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const doLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await login(email, senha);
      if(res && res.userId){
        // store minimal session locally
        localStorage.setItem("pc_user", JSON.stringify({ id: res.userId, email }));
        router.push("/dashboard");
      } else {
        setError(res.error || "Credenciais inválidas");
      }
    } catch(err){
      setError("Erro ao conectar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{maxWidth:520, margin:"24px auto"}}>
      <h2 style={{color:"white", marginBottom:8}}>Entrar</h2>
      <p style={{color:"var(--muted)", marginBottom:14}}>Use seu e-mail e senha para acessar o painel.</p>

      <Input label="E-mail" value={email} onChange={setEmail} placeholder="seu@exemplo.com"/>
      <Input label="Senha" value={senha} onChange={setSenha} placeholder="••••••" type="password"/>

      {error && <div style={{color:"#ff8a8a", marginBottom:10}}>{error}</div>}

      <Button onClick={doLogin} variant="primary">{loading ? "Entrando..." : "Entrar"}</Button>

      <div style={{marginTop:12}}>
        <a href="/register" className="btn btn-ghost" style={{padding:"8px 12px"}}>Criar conta</a>
      </div>
    </div>
  );
}
