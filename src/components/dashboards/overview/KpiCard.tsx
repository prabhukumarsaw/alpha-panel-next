import { ArrowDown, ArrowUp, Minus } from "lucide-react"

import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface KpiCardProps {
  label: string
  value: string | number
  delta?: number
  icon: LucideIcon
  tone?: "primary" | "success" | "warning" | "info" | "destructive"
  suffix?: string
}

const toneStyles: Record<string, string> = {
  primary: "from-primary/15 to-primary/5 text-primary",
  success: "from-success/15 to-success/5 text-success",
  warning: "from-warning/20 to-warning/5 text-warning",
  info: "from-info/15 to-info/5 text-info",
  destructive: "from-destructive/15 to-destructive/5 text-destructive",
}

export function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
  suffix,
}: KpiCardProps) {
  const trendUp = (delta ?? 0) > 0
  const trendDown = (delta ?? 0) < 0
  return (
    <div className="card-elevated rounded-xl p-4 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground truncate">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-foreground tracking-tight">
            {value}
            {suffix && (
              <span className="text-sm text-muted-foreground ml-1">
                {suffix}
              </span>
            )}
          </p>
          {delta !== undefined && (
            <div className="mt-2 flex items-center gap-1 text-xs">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-semibold",
                  trendUp && "bg-success/10 text-success",
                  trendDown && "bg-destructive/10 text-destructive",
                  !trendUp && !trendDown && "bg-muted text-muted-foreground"
                )}
              >
                {trendUp ? (
                  <ArrowUp className="size-3" />
                ) : trendDown ? (
                  <ArrowDown className="size-3" />
                ) : (
                  <Minus className="size-3" />
                )}
                {Math.abs(delta).toFixed(1)}%
              </span>
              <span className="text-muted-foreground">vs prev</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "rounded-lg p-2.5 bg-gradient-to-br shrink-0",
            toneStyles[tone]
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  )
}
