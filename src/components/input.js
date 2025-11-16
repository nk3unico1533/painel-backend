"use client";
import React from "react";

export default function Input({label, value, onChange, placeholder, type="text"}) {
  return (
    <div style={{marginBottom:12}}>
      {label && <label>{label}</label>}
      <input className="input" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} type={type} />
    </div>
  );
}