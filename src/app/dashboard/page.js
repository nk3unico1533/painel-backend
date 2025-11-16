"use client";
import React, { useEffect, useState } from "react";
import { consulta, historico } from "../../lib/api";
import Input from "../../components/Input";
import Button from "../../components/Button";
import HistoricoFlutuante from "../../components/HistoricoFlutuante";
import Header from "../../components/Header";

export default function DashboardPage(){
  const [user, setUser] = useState(null);
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState(null);
  const [hist, setHist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFloat, setShowFloat] = useState(true);

  const tipos = ["CPF","RG","Nome","Telefone","Placa","Email","CEP","CNPJ"];

  useEffect(()=>{
    const s = localStorage.getItem("pc_user");
    if(s) setUser(JSON.parse(s));
    // carregar histórico localmente como fallback
    if(s){
      const u = JSON.parse(s);
      fetchHistorico(u.id);
    }
  }, []);

  const fetchHistorico = async (userId) => {
    try {
      const h = await historico(userId);
      setHist(Array.isArray(h) ? h : []);
    } catch(e){
      // fallback: localstorage
      const local = JSON.parse(localStorage.getItem("pc_history_"+(user?.id||"anon")) || "[]");
      setHist(local);
    }
  };

  const doConsulta = async () => {
    if(!tipo || !valor) return alert("Escolha o tipo e digite o valor.");
    setLoading(true);
    try {
      const res = await consulta(tipo, valor, user ? user.id : 0);
      setResultado(res);
      // atualizar histórico local visual
      const entry = { tipo, valor, resultado: res, criadoEm: new Date().toISOString() };
      const newHist = [ entry, ...hist ];
      setHist(newHist);
      // salvar no local (apenas para visual enquanto backend guarda também)
      localStorage.setItem("pc_history_"+(user?.id||"anon"), JSON.stringify(newHist.slice(0,50)));
    } catch(e){
      console.error(e);
      alert("Erro ao consultar");
    } finally {
      setLoading(false);
    }
  };

  const saveResult = () => {
    // atualmente backend já salva em /consulta, então aqui apenas ação visual
    alert("Resultado salvo no histórico.");
  };

  const logout = () => {
    localStorage.removeItem("pc_user");
    window.location.href = "/";
  };

  return (
    <div>
      <Header user={user} onLogout={logout} />
      <div className="grid-two" style={{marginTop:12}}>
        <div className="card">
          <div className="section-title">Tipos de consulta</div>
          <div style={{display:"flex", flexWrap:"wrap", gap:8, marginBottom:12}}>
            {tipos.map(t=>(
              <button key={t} className="btn btn-ghost" onClick={()=>{ setTipo(t); setResultado(null); }}>{t}</button>
            ))}
          </div>

          <div style={{marginTop:12}}>
            <div style={{marginBottom:6, color:"var(--muted)"}}>
              {tipo ? `Você escolheu: ${tipo}` : "Escolha um tipo acima"}
            </div>

            {tipo && (
              <>
                <Input label={`Digite o ${tipo}`} value={valor} onChange={setValor} placeholder={`Digite o ${tipo}`} />
                <div style={{display:"flex", gap:8, marginTop:8}}>
                  <Button onClick={doConsulta} variant="primary">{loading ? "Consultando..." : "Consultar"}</Button>
                  <Button onClick={()=>{ setTipo(""); setValor(""); setResultado(null); }} variant="ghost">Limpar</Button>
                </div>
              </>
            )}

            {resultado && (
              <div className="result">
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div style={{fontWeight:700, color:"white"}}>Resultado — {resultado.tipo || tipo}</div>
                  <div style={{fontSize:12, color:"var(--muted)"}}>{new Date().toLocaleString()}</div>
                </div>

                <div style={{marginTop:10}}>
                  {/* Exibir campos do retorno (genérico) */}
                  {Object.entries(resultado).map(([k,v])=>(
                    <div key={k} style={{marginTop:6}}>
                      <div style={{fontSize:12, color:"var(--muted)"}}>{k}</div>
                      <div style={{fontWeight:600, color:"white"}}>{typeof v === "object" ? JSON.stringify(v) : String(v)}</div>
                    </div>
                  ))}
                </div>

                <div style={{display:"flex", gap:8, marginTop:12}}>
                  <Button onClick={saveResult} variant="primary">Salvar resultado</Button>
                  <Button onClick={()=>{ const blob = new Blob([JSON.stringify(resultado, null, 2)], {type:"application/json"}); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `${tipo}_${valor}.json`; a.click(); URL.revokeObjectURL(url); }} variant="ghost">Baixar JSON</Button>
                  <Button onClick={()=>navigator.share ? navigator.share({title:"Resultado", text: JSON.stringify(resultado,null,2)}) : alert("Compartilhar não suportado")} variant="ghost">Compartilhar</Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="card" style={{marginBottom:12}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div className="section-title">Histórico completo (últimos 15)</div>
              <div style={{fontSize:13, color:"var(--muted)"}}>{hist.length} registros</div>
            </div>

            <div>
              {hist.slice(0,15).map((h, i)=>(
                <div key={i} className="history-item">
                  <div style={{fontSize:13}}><strong>{h.tipo}</strong> — {h.valor}</div>
                  <div style={{fontSize:12, color:"var(--muted)"}}>{h.criadoEm ? new Date(h.criadoEm).toLocaleString() : "-"}</div>
                </div>
              ))}
              {hist.length === 0 && <div style={{color:"var(--muted)"}}>Nenhum histórico salvo.</div>}
            </div>
          </div>

          <div className="card">
            <div className="section-title">Opções</div>
            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              <button className="btn btn-ghost" onClick={()=>setShowFloat(s=>!s)}>{showFloat ? "Ocultar mini-histórico" : "Mostrar mini-histórico"}</button>
              <button className="btn btn-ghost" onClick={()=>{ localStorage.removeItem("pc_history_"+(user?.id||"anon")); setHist([]); }}>Limpar histórico local</button>
            </div>
          </div>
        </div>
      </div>

      <HistoricoFlutuante items={hist} visible={true} />
    </div>
  );
}
