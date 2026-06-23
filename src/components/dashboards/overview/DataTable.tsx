import { useMemo, useState } from "react"
import { ArrowUpDown, Search } from "lucide-react"

import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"

type Col<T> = {
  key: keyof T
  label: string
  className?: string
  render?: (row: T) => React.ReactNode
}

interface Props<T> {
  title: string
  data: T[]
  columns: Col<T>[]
}

export function DataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
}: Props<T>) {
  const [q, setQ] = useState("")
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  const filtered = useMemo(() => {
    let rows = data
    if (q) {
      const ql = q.toLowerCase()
      rows = rows.filter((r) =>
        Object.values(r).some((v) => String(v).toLowerCase().includes(ql))
      )
    }
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        if (av === bv) return 0
        const cmp = av > bv ? 1 : -1
        return sortDir === "asc" ? cmp : -cmp
      })
    }
    return rows
  }, [data, q, sortKey, sortDir])

  const toggleSort = (k: keyof T) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc")
    else {
      setSortKey(k)
      setSortDir("asc")
    }
  }

  return (
    <div className="card-elevated rounded-xl overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="pl-8 h-9 w-56"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className={cn(
                    "px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none",
                    c.className
                  )}
                  onClick={() => toggleSort(c.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {c.label}
                    <ArrowUpDown className="size-3" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No records found
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-border hover:bg-muted/30"
                >
                  {columns.map((c) => (
                    <td
                      key={String(c.key)}
                      className={cn("px-4 py-3 text-foreground", c.className)}
                    >
                      {c.render ? c.render(row) : String(row[c.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
