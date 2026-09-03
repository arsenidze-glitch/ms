import { cn } from "@/lib/utils"

export function StatusBadge({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium",
        tone,
      )}
    >
      {label}
    </span>
  )
}
