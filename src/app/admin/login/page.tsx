"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error ?? "Login failed.");
        setBusy(false);
      }
    } catch {
      setError("Couldn't reach the server.");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <p className="eyebrow text-center">Nirvana admin</p>
      <h1 className="mt-2 text-center font-display text-3xl font-semibold text-maroon-deep">
        Store manager sign-in
      </h1>
      <form onSubmit={login} className="mt-8 rounded-2xl border border-sand bg-parchment p-6">
        <label className="field-label" htmlFor="pw">Admin password</label>
        <input
          id="pw"
          type="password"
          className="field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
        />
        {error && <p className="mt-3 text-sm font-bold text-maroon">{error}</p>}
        <button type="submit" className="btn btn-gold mt-5 w-full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="mt-4 text-center text-xs leading-relaxed text-mist">
          Set <code className="text-gold">ADMIN_PASSWORD</code> in the environment;
          until then the development default from the README applies.
        </p>
      </form>
    </div>
  );
}
