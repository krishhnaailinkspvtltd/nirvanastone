"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReviewModeration({ id, approved }: { id: string; approved: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function act(method: "PATCH" | "DELETE", body?: object) {
    setBusy(true);
    await fetch(`/api/admin/reviews/${id}`, {
      method,
      headers: { "content-type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    }).catch(() => {});
    router.refresh();
    setBusy(false);
  }

  return (
    <div className="flex gap-2">
      {approved ? (
        <button type="button" className="btn btn-outline !px-3 !py-1 text-xs" disabled={busy}
          onClick={() => act("PATCH", { approved: false })}>
          Unpublish
        </button>
      ) : (
        <button type="button" className="btn btn-gold !px-3 !py-1 text-xs" disabled={busy}
          onClick={() => act("PATCH", { approved: true })}>
          Approve
        </button>
      )}
      <button type="button" className="btn border-[1.5px] border-maroon !px-3 !py-1 text-xs text-[#e08a94]" disabled={busy}
        onClick={() => confirm("Delete this review?") && act("DELETE")}>
        Delete
      </button>
    </div>
  );
}
