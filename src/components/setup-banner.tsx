"use client";

import { useEffect, useState } from "react";
import { RiAlertLine, RiCheckLine, RiCloseLine } from "react-icons/ri";

type Status = "checking" | "connected" | "error";

export function SetupBanner() {
  const [status, setStatus] = useState<Status>("checking");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => {
        setStatus(res.ok ? "connected" : "error");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  if (dismissed || status === "connected" || status === "checking") return null;

  return (
    <div className="mb-6 flex items-center gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 animate-fade-up">
      <RiAlertLine className="h-4 w-4 shrink-0 text-amber-400" />
      <div className="flex-1">
        <p className="text-sm font-medium text-amber-200">
          Database not connected
        </p>
        <p className="mt-0.5 font-mono text-xs text-amber-200/60">
          Copy <code className="rounded bg-amber-500/10 px-1">.env.example</code> to{" "}
          <code className="rounded bg-amber-500/10 px-1">.env.local</code>, set your DATABASE_URL, then run{" "}
          <code className="rounded bg-amber-500/10 px-1">npm run db:push</code> and{" "}
          <code className="rounded bg-amber-500/10 px-1">npm run db:seed</code>
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded p-1 text-amber-400/60 hover:bg-amber-500/10 hover:text-amber-400"
      >
        <RiCloseLine className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
