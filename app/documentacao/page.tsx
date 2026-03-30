"use client";

import { useState } from "react";

export default function ApiDocsPage() {
  const [link, setLink] = useState("");
  const [qr, setQr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function testarAPI() {
    if (!link) {
      alert("Informe uma URL");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const endpoint = `https://42t.vercel.app/api/v0/criar?link=${encodeURIComponent(link)}${qr ? "&qr=1" : ""}`;

      const res = await fetch(endpoint);
      const data = await res.json();

      setResult(data);
    } catch (err) {
      alert("Erro ao chamar API");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function copiar() {
    if (result?.url) {
      navigator.clipboard.writeText(result.url);
      alert("Copiado!");
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔌 API - Encurtador</h1>

      <div style={styles.box}>
        <h2>🚀 Endpoint</h2>
        <code style={styles.code}>
          GET /api/v0/criar?link=URL&qr=1
        </code>
      </div>

      <div style={styles.box}>
        <h2>🧪 Testar API</h2>

        <input
          style={styles.input}
          placeholder="https://..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <label style={styles.label}>
          <input
            type="checkbox"
            checked={qr}
            onChange={(e) => setQr(e.target.checked)}
          />
          Gerar QR Code
        </label>

        <button style={styles.button} onClick={testarAPI}>
          {loading ? "Carregando..." : "Testar API"}
        </button>

        {result && (
          <div style={styles.result}>
            <p><strong>Status:</strong> {result.status}</p>

            <p>
              <strong>URL:</strong>{" "}
              <a href={result.url} target="_blank">
                {result.url}
              </a>
            </p>

            <button style={styles.copyBtn} onClick={copiar}>
              Copiar link
            </button>

            {qr && (
              <div style={{ marginTop: 20 }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${result.url}`}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    maxWidth: 800,
    margin: "0 auto",
    padding: 20,
    fontFamily: "Arial",
    color: "#e2e8f0",
    background: "#0f172a",
    minHeight: "100vh",
  },
  title: {
    color: "#38bdf8",
  },
  box: {
    background: "#020617",
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  code: {
    display: "block",
    background: "#000",
    padding: 10,
    borderRadius: 6,
    color: "#22c55e",
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
    border: "1px solid #1e293b",
    background: "#020617",
    color: "#fff",
  },
  label: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 15,
    width: "100%",
    padding: 12,
    borderRadius: 6,
    background: "#38bdf8",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  result: {
    marginTop: 20,
    padding: 15,
    background: "#020617",
    borderRadius: 6,
  },
  copyBtn: {
    marginTop: 10,
    padding: 8,
    borderRadius: 6,
    border: "none",
    background: "#22c55e",
    cursor: "pointer",
  },
};