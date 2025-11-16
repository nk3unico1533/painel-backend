"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { register } from "../../lib/api";

export default function RegisterPage(){
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const doRegister = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await register(email, senha);
      if(res && res.id){
        setMsg("Conta criada. Faça login.");
        setTimeout(()=>router.push("/"), 900);
      } else {
        setMsg(res.error || "Erro ao criar conta");
      }
    } catch(e){
      setMsg("Erro ao conectar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{maxWidth:520, margin:"24px auto"}}>
      <h2 style={{color:"white", marginBottom:8}}>Criar conta</h2>
      <p style={{color:"var(--muted)", marginBottom:14}}>Crie seu usuário para começar a consultar.</p>

      <Input label="E-mail" value={email} onChange={setEmail} placeholder="seu@exemplo.com"/>
      <Input label="Senha" value={senha} onChange={setSenha} placeholder="••••••" type="password"/>

      {msg && <div style={{color:"var(--accent)", marginBottom:10}}>{msg}</div>}

      <Button onClick={doRegister} variant="primary">{loading ? "Criando..." : "Criar conta"}</Button>

      <div style={{marginTop:12}}>
        <a href="/" className="btn btn-ghost" style={{padding:"8px 12px"}}>Voltar ao login</a>
      </div>
    </div>
  );
}
