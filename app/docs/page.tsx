"use client";

import { useState } from "react";

export default function ApiDocsPage() {
  const [link, setLink] = useState("");
  const [qr, setQr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function testarAPI() {
    if (!link) {
        setError("Por favor, insira um link válido.");
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

        if(qr) {
            setResult("https://42t.vercel.app/api/v0/criar?link="+encodeURIComponent(link)+"&qr=1")
            return
        };
        setError("Ocorreu um erro ao testar a API. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function copiar() {
    if (result?.url) {
      navigator.clipboard.writeText(result.url);
    }
  }

  return (
    <div className="docs-wrap">
      <h1 className="app-title">API - Encurtador</h1>

      <div className="panel docs-box">
        <h2>Endpoint</h2>
        <code className="docs-code">
          GET /api/v0/criar?link={encodeURIComponent(link)}{qr ? "&qr=1" : ""}
        </code>
      </div>

      <div className="panel docs-box">
        <h2>Testar API</h2>

        <input
          className="form-control"
          placeholder="https://..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <label className="docs-label">
          <input
            type="checkbox"
            checked={qr}
            onChange={(e) => setQr(e.target.checked)}
          />
          Gerar QR Code
        </label>

        <button className="btn btn-primary w-100 mt-3" onClick={testarAPI}>
          {loading ? "Carregando..." : "Testar API"}
        </button>
        {error && (
            <div className="docs-error">
                {error}
            </div>
        )}

        {(result && !qr) && (
          <div className="panel docs-result">
            
            <code className="docs-code">{JSON.stringify(result)}</code>

            <button className="docs-copy-btn" onClick={copiar}>
              Copiar link
            </button>

           
          </div>
        )}

        {(qr) && (
          <div className="panel docs-result">
            
            <img src={result} alt="QR Code" style={{ width: "100%" }} />

           
          </div>
        )}
      </div>
    </div>
  );
}