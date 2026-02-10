import { RiWifiOffLine } from "react-icons/ri";

export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-6">
      <div className="flex max-w-sm flex-col items-center text-center">
        <RiWifiOffLine className="mb-6 h-16 w-16 text-muted-foreground/40" />
        <h1 className="text-2xl font-bold tracking-tight">You're offline</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This page isn't available offline. Please check your connection and try
          again.
        </p>
        <p className="mt-6 font-mono text-xs text-muted-foreground/60">
          Polyglot-Flow
        </p>
      </div>
    </div>
  );
}
