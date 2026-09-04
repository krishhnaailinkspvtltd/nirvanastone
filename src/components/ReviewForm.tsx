"use client";

import { useState } from "react";

export function ReviewForm({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productId, name, rating, text }),
      });
      const data = await res.json();
      if (data.ok) {
        setMsg({ ok: true, text: data.message });
        setName("");
        setText("");
      } else {
        setMsg({ ok: false, text: data.error ?? "Couldn't submit — try again." });
      }
    } catch {
      setMsg({ ok: false, text: "Couldn't reach the server." });
    } finally {
      setBusy(false);
    }
  }

  if (!open && !msg?.ok) {
    return (
      <button type="button" className="btn btn-outline mt-4 !py-2 text-sm" onClick={() => setOpen(true)}>
        Write a review
      </button>
    );
  }

  if (msg?.ok) {
    return (
      <p className="mt-4 rounded-xl border border-jade/40 bg-jade/10 p-4 text-sm font-bold text-jade">
        {msg.text}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 rounded-xl border border-sand bg-parchment p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="rv-name">Your name</label>
          <input id="rv-name" className="field" required maxLength={60} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <span className="field-label">Rating</span>
          <div className="flex gap-1 pt-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                onClick={() => setRating(n)}
                className={`text-2xl leading-none ${n <= rating ? "text-gold" : "text-sand"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="rv-text">Your review</label>
          <textarea id="rv-text" className="field min-h-20" required minLength={10} maxLength={1200} value={text} onChange={(e) => setText(e.target.value)} placeholder="How is the piece? Quality, packaging, experience…" />
        </div>
      </div>
      {msg && !msg.ok && <p className="mt-3 text-sm font-bold text-maroon">{msg.text}</p>}
      <div className="mt-4 flex gap-3">
        <button type="submit" className="btn btn-gold !py-2 text-sm" disabled={busy}>
          {busy ? "Submitting…" : "Submit review"}
        </button>
        <button type="button" className="btn btn-outline !py-2 text-sm" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
      <p className="mt-3 text-xs text-mist">Reviews appear after moderation.</p>
    </form>
  );
}
