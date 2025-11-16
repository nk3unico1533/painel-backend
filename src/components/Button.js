"use client";
import React from "react";

export default function Button({children, onClick, variant="primary", style}) {
  return (
    <button onClick={onClick} className={`btn ${variant==="primary" ? "btn-primary" : "btn-ghost"}`} style={style}>
      {children}
    </button>
  );
}