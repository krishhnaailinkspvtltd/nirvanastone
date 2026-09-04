import { MalaDivider } from "@/components/MalaDivider";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <MalaDivider className="animate-pulse" />
      <p className="text-sm font-bold tracking-widest text-mist">LOADING…</p>
    </div>
  );
}
