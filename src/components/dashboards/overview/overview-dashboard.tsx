"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { toast } from "sonner"
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BedDouble,
  Calendar,
  CreditCard,
  Download,
  FileBarChart,
  FileText,
  Filter,
  FlaskConical,
  HeartPulse,
  Hospital,
  IndianRupee,
  Loader2,
  LogIn,
  LogOut,
  Moon,
  Pill,
  Printer,
  RefreshCw,
  Sparkles,
  Stethoscope,
  Sun,
  Syringe,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react"

import {
  alerts,
  dailyRevenue,
  departments,
  deptRevenue,
  insights,
  investigationCancellations,
  investigationCollections,
  investigationTrend,
  ipdCollections,
  kpis,
  modificationLog,
  monthlyGrowth,
  opdCancellations,
  opdCollections,
  opdVsIpd,
  operational,
  otList,
  paymentBreakdown,
  paymentModeShare,
  pharmacyCollections,
  pharmacyReturns,
  pharmacyTrend,
  topServices,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

import { useSettings } from "@/hooks/use-settings"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "./DataTable"
import { KpiCard } from "./KpiCard"
import { SectionCard } from "./SectionCard"

const inr = (n: number) =>
  n >= 10000000
    ? `₹${(n / 10000000).toFixed(2)} Cr`
    : n >= 100000
      ? `₹${(n / 100000).toFixed(2)} L`
      : `₹${n.toLocaleString("en-IN")}`

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      {label && <p className="font-semibold mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || p.fill }}>
          {p.name}:{" "}
          <span className="font-medium text-foreground">
            {typeof p.value === "number" && p.value > 1000
              ? inr(p.value)
              : p.value}
          </span>
        </p>
      ))}
    </div>
  )
}

export default function OverviewDashboard() {
  const { settings, updateSettings } = useSettings()
  const [dateRange, setDateRange] = useState("today")
  const [dept, setDept] = useState("All Departments")
  const [role, setRole] = useState("Director")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const dark = settings.mode === "dark"

  useEffect(() => {
    if (!autoRefresh) return
    const id = setInterval(() => {
      setRefreshing(true)
      setTimeout(() => {
        setLastUpdated(new Date())
        setRefreshing(false)
      }, 600)
    }, 30000)
    return () => clearInterval(id)
  }, [autoRefresh])

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setLastUpdated(new Date())
      setRefreshing(false)
      toast.success("Dashboard metrics synced successfully!")
    }, 500)
  }

  const handleToggleDark = () => {
    updateSettings({ ...settings, mode: dark ? "light" : "dark" })
  }

  const canSeeFinance = role !== "Operations"
  const canSeeAudit = role === "Director" || role === "Admin"

  const kpiCards = useMemo(
    () => [
      {
        label: "Total Patients",
        value: kpis.totalPatients.value.toLocaleString(),
        delta: kpis.totalPatients.delta,
        icon: Users,
        tone: "primary" as const,
      },
      {
        label: "Total Beds",
        value: kpis.totalBeds.value,
        icon: BedDouble,
        tone: "info" as const,
      },
      {
        label: "Occupied Beds",
        value: kpis.occupiedBeds.value,
        delta: kpis.occupiedBeds.delta,
        icon: Hospital,
        tone: "info" as const,
      },
      {
        label: "Bed Occupancy",
        value: `${kpis.occupancyPct.value}%`,
        delta: kpis.occupancyPct.delta,
        icon: Activity,
        tone: "warning" as const,
      },
      {
        label: "Total Collection",
        value: inr(kpis.totalCollection.value),
        delta: kpis.totalCollection.delta,
        icon: IndianRupee,
        tone: "success" as const,
      },
      {
        label: "OPD Collection",
        value: inr(kpis.opdCollection.value),
        delta: kpis.opdCollection.delta,
        icon: Stethoscope,
        tone: "primary" as const,
      },
      {
        label: "IPD Collection",
        value: inr(kpis.ipdCollection.value),
        delta: kpis.ipdCollection.delta,
        icon: Syringe,
        tone: "primary" as const,
      },
      {
        label: "Pharmacy",
        value: inr(kpis.pharmacyCollection.value),
        delta: kpis.pharmacyCollection.delta,
        icon: Pill,
        tone: "success" as const,
      },
      {
        label: "Investigations",
        value: inr(kpis.investigationCollection.value),
        delta: kpis.investigationCollection.delta,
        icon: FlaskConical,
        tone: "info" as const,
      },
      {
        label: "Avg Daily Revenue",
        value: inr(kpis.avgDailyRevenue.value),
        delta: kpis.avgDailyRevenue.delta,
        icon: TrendingUp,
        tone: "success" as const,
      },
      {
        label: "Avg Revenue / Patient",
        value: inr(kpis.avgRevenuePerPatient.value),
        delta: kpis.avgRevenuePerPatient.delta,
        icon: Wallet,
        tone: "primary" as const,
      },
      {
        label: "Today's Registrations",
        value: kpis.todayRegistrations.value,
        delta: kpis.todayRegistrations.delta,
        icon: UserPlus,
        tone: "info" as const,
      },
      {
        label: "Today's Admissions",
        value: kpis.todayAdmissions.value,
        delta: kpis.todayAdmissions.delta,
        icon: LogIn,
        tone: "primary" as const,
      },
      {
        label: "Today's Discharges",
        value: kpis.todayDischarges.value,
        delta: kpis.todayDischarges.delta,
        icon: LogOut,
        tone: "success" as const,
      },
      {
        label: "Pending Bills",
        value: kpis.pendingBills.value,
        delta: kpis.pendingBills.delta,
        icon: FileText,
        tone: "warning" as const,
      },
      {
        label: "Outstanding A/R",
        value: inr(kpis.outstandingReceivables.value),
        delta: kpis.outstandingReceivables.delta,
        icon: AlertTriangle,
        tone: "destructive" as const,
      },
    ],
    []
  )

  const visibleKpis = canSeeFinance
    ? kpiCards
    : kpiCards.filter(
        (k) =>
          ![
            "Total Collection",
            "OPD Collection",
            "IPD Collection",
            "Pharmacy",
            "Investigations",
            "Avg Daily Revenue",
            "Avg Revenue / Patient",
            "Outstanding A/R",
          ].includes(k.label)
      )

  const handleExport = (kind: string) => {
    if (kind === "Print") {
      window.print()
      return
    }
    toast.success(`${kind} export generated successfully!`, {
      description: `Filters applied: Date Range: ${dateRange}, Department: ${dept}`,
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-3">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-info text-primary-foreground shadow-md">
                <HeartPulse className="size-5" />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-base sm:text-lg font-bold">
                  MediPulse
                </h1>
                <p className="hidden sm:block text-xs text-muted-foreground">
                  Executive Hospital Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="hidden md:inline-flex gap-1.5"
              >
                <span className="size-1.5 rounded-full bg-success animate-pulse" />
                Live
              </Badge>
              <span className="hidden lg:inline text-xs text-muted-foreground">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
              <Button variant="ghost" size="icon" onClick={handleRefresh}>
                <RefreshCw
                  className={cn("size-4", refreshing && "animate-spin")}
                />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleToggleDark}>
                {dark ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Filter className="size-3.5" /> Filters:
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="h-8 w-[140px] text-xs">
                <Calendar className="size-3.5 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="h-8 w-[180px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="h-8 w-[140px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Director">Director</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 text-xs ml-1">
              <Switch
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
                id="ar"
              />
              <label
                htmlFor="ar"
                className="text-muted-foreground cursor-pointer"
              >
                Auto-refresh
              </label>
            </div>
            <div className="ml-auto flex flex-wrap gap-1.5">
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={() => handleExport("Excel")}
              >
                <Download className="size-3.5 mr-1" /> Excel
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={() => handleExport("PDF")}
              >
                <FileBarChart className="size-3.5 mr-1" /> PDF
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={() => handleExport("Print")}
              >
                <Printer className="size-3.5 mr-1" /> Print
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 sm:px-6 py-6 space-y-6">
        {/* KPIs */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Key Performance Indicators</h2>
            {refreshing && (
              <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                <Loader2 className="size-3 animate-spin" /> Syncing…
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
            {visibleKpis.map((k) => (
              <KpiCard key={k.label} {...k} />
            ))}
          </div>
        </section>

        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto p-1 bg-muted/50 rounded-lg">
            <TabsTrigger value="revenue" className="text-xs sm:text-sm">
              Revenue Analytics
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-xs sm:text-sm">
              Payment Modes
            </TabsTrigger>
            <TabsTrigger value="operations" className="text-xs sm:text-sm">
              Operations
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-xs sm:text-sm">
              Transactions
            </TabsTrigger>
            {canSeeAudit && (
              <TabsTrigger value="audit" className="text-xs sm:text-sm">
                Audit
              </TabsTrigger>
            )}
            <TabsTrigger value="clinical" className="text-xs sm:text-sm">
              Clinical
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs sm:text-sm">
              Alerts & Insights
            </TabsTrigger>
          </TabsList>

          {/* REVENUE */}
          <TabsContent value="revenue" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <SectionCard
                title="Daily Revenue Trend"
                description="Last 30 days vs target"
                className="lg:col-span-2"
              >
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={dailyRevenue}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="var(--color-chart-1)"
                          stopOpacity={0.5}
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--color-chart-1)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                    />
                    <XAxis
                      dataKey="date"
                      stroke="var(--color-muted-foreground)"
                      fontSize={11}
                    />
                    <YAxis
                      stroke="var(--color-muted-foreground)"
                      fontSize={11}
                      tickFormatter={(v) => `${v / 1000}k`}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-chart-1)"
                      strokeWidth={2}
                      fill="url(#rev)"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="var(--color-chart-3)"
                      strokeDasharray="4 4"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </SectionCard>

              <SectionCard
                title="Department Revenue"
                description="Distribution"
              >
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={deptRevenue}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={2}
                    >
                      {deptRevenue.map((_, i) => (
                        <Cell
                          key={i}
                          fill={CHART_COLORS[i % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </SectionCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SectionCard
                title="OPD vs IPD Revenue"
                description="Monthly comparison"
              >
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={opdVsIpd}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="var(--color-muted-foreground)"
                      fontSize={11}
                    />
                    <YAxis
                      stroke="var(--color-muted-foreground)"
                      fontSize={11}
                      tickFormatter={(v) => `${v / 1000}k`}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar
                      dataKey="OPD"
                      fill="var(--color-chart-1)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="IPD"
                      fill="var(--color-chart-2)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </SectionCard>

              <SectionCard
                title="Revenue by Payment Mode"
                description="Share of total collections"
              >
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={paymentModeShare}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={95}
                      label={(e: any) => e.name}
                    >
                      {paymentModeShare.map((_, i) => (
                        <Cell
                          key={i}
                          fill={CHART_COLORS[i % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </SectionCard>

              <SectionCard title="Pharmacy Revenue Trend">
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={pharmacyTrend}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                    />
                    <XAxis
                      dataKey="day"
                      stroke="var(--color-muted-foreground)"
                      fontSize={11}
                    />
                    <YAxis
                      stroke="var(--color-muted-foreground)"
                      fontSize={11}
                      tickFormatter={(v) => `${v / 1000}k`}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-chart-2)"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </SectionCard>

              <SectionCard title="Investigation Revenue Trend">
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={investigationTrend}>
                    <defs>
                      <linearGradient id="inv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="var(--color-chart-4)"
                          stopOpacity={0.5}
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--color-chart-4)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                    />
                    <XAxis
                      dataKey="day"
                      stroke="var(--color-muted-foreground)"
                      fontSize={11}
                    />
                    <YAxis
                      stroke="var(--color-muted-foreground)"
                      fontSize={11}
                      tickFormatter={(v) => `${v / 1000}k`}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-chart-4)"
                      strokeWidth={2}
                      fill="url(#inv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </SectionCard>

              <SectionCard title="Monthly Revenue Growth %">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={monthlyGrowth}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="var(--color-muted-foreground)"
                      fontSize={11}
                    />
                    <YAxis
                      stroke="var(--color-muted-foreground)"
                      fontSize={11}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="growth" radius={[4, 4, 0, 0]}>
                      {monthlyGrowth.map((d, i) => (
                        <Cell
                          key={i}
                          fill={
                            d.growth >= 0
                              ? "var(--color-success)"
                              : "var(--color-destructive)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </SectionCard>

              <SectionCard title="Top Revenue Services">
                <div className="space-y-2.5">
                  {topServices.map((s, i) => {
                    const max = Math.max(...topServices.map((x) => x.revenue))
                    return (
                      <div key={s.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium">
                            {i + 1}. {s.name}
                          </span>
                          <span className="text-muted-foreground font-semibold">
                            {inr(s.revenue)}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-info"
                            style={{ width: `${(s.revenue / max) * 100}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </SectionCard>
            </div>
          </TabsContent>

          {/* PAYMENTS */}
          <TabsContent value="payments" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {(["OPD", "IPD", "Pharmacy", "Investigation"] as const).map(
                (seg) => {
                  const rows = paymentBreakdown[seg]
                  const total = rows.reduce((s, r) => s + r.amount, 0)
                  return (
                    <SectionCard
                      key={seg}
                      title={`${seg} Payment Breakdown`}
                      description={`Total: ${inr(total)}`}
                    >
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-xs uppercase text-muted-foreground">
                              <th className="text-left py-2 font-semibold">
                                Mode
                              </th>
                              <th className="text-right font-semibold">
                                Amount
                              </th>
                              <th className="text-right font-semibold">
                                Count
                              </th>
                              <th className="text-right font-semibold">
                                Share
                              </th>
                              <th className="text-right font-semibold">
                                Trend
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((r) => {
                              const pct = (r.amount / total) * 100
                              const up = r.trend >= 0
                              return (
                                <tr
                                  key={r.mode}
                                  className="border-t border-border"
                                >
                                  <td className="py-2.5 font-medium flex items-center gap-2">
                                    <CreditCard className="size-3.5 text-muted-foreground" />
                                    {r.mode}
                                  </td>
                                  <td className="text-right font-semibold">
                                    {inr(r.amount)}
                                  </td>
                                  <td className="text-right text-muted-foreground">
                                    {r.count}
                                  </td>
                                  <td className="text-right">
                                    <div className="inline-flex items-center gap-2">
                                      <div className="w-14 h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-primary rounded-full"
                                          style={{ width: `${pct}%` }}
                                        />
                                      </div>
                                      <span className="text-xs tabular-nums">
                                        {pct.toFixed(0)}%
                                      </span>
                                    </div>
                                  </td>
                                  <td
                                    className={cn(
                                      "text-right text-xs font-semibold",
                                      up ? "text-success" : "text-destructive"
                                    )}
                                  >
                                    <span className="inline-flex items-center gap-0.5">
                                      {up ? (
                                        <ArrowUp className="size-3" />
                                      ) : (
                                        <ArrowDown className="size-3" />
                                      )}
                                      {Math.abs(r.trend).toFixed(1)}%
                                    </span>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </SectionCard>
                  )
                }
              )}
            </div>
          </TabsContent>

          {/* OPERATIONS */}
          <TabsContent value="operations" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <KpiCard
                label="OP Registrations"
                value={operational.opRegistrations}
                icon={UserPlus}
                tone="info"
              />
              <KpiCard
                label="IP Admissions"
                value={operational.ipAdmissions}
                icon={LogIn}
                tone="primary"
              />
              <KpiCard
                label="Discharges"
                value={operational.discharges}
                icon={LogOut}
                tone="success"
              />
              <KpiCard
                label="OT Procedures"
                value={operational.otProcedures}
                icon={Syringe}
                tone="warning"
              />
              <KpiCard
                label="Investigations"
                value={operational.investigations}
                icon={FlaskConical}
                tone="info"
              />
              <KpiCard
                label="Pharmacy Bills"
                value={operational.pharmacyBills}
                icon={Pill}
                tone="success"
              />
              <KpiCard
                label="Avg Waiting Time"
                value={operational.avgWaitingTime}
                icon={Activity}
                tone="warning"
              />
              <KpiCard
                label="Avg Length of Stay"
                value={operational.avgLengthOfStay}
                icon={BedDouble}
                tone="info"
              />
              <KpiCard
                label="Emergency Adm."
                value={operational.emergencyAdmissions}
                icon={AlertTriangle}
                tone="destructive"
              />
              <KpiCard
                label="Critical Patients"
                value={operational.criticalPatients}
                icon={HeartPulse}
                tone="destructive"
              />
            </div>
          </TabsContent>

          {/* TRANSACTIONS */}
          <TabsContent value="transactions" className="mt-4 space-y-4">
            <DataTable
              title="OPD Collections"
              data={opdCollections}
              columns={[
                { key: "receiptNo", label: "Receipt #" },
                { key: "patient", label: "Patient" },
                { key: "doctor", label: "Doctor" },
                {
                  key: "amount",
                  label: "Amount",
                  render: (r) => (
                    <span className="font-semibold">{inr(r.amount)}</span>
                  ),
                },
                {
                  key: "mode",
                  label: "Mode",
                  render: (r) => <Badge variant="secondary">{r.mode}</Badge>,
                },
                { key: "user", label: "User" },
                { key: "date", label: "Date Time" },
              ]}
            />
            <DataTable
              title="IPD Collections"
              data={ipdCollections}
              columns={[
                { key: "receiptNo", label: "Receipt #" },
                { key: "patient", label: "Patient" },
                { key: "admissionNo", label: "Admission #" },
                {
                  key: "amount",
                  label: "Amount",
                  render: (r) => (
                    <span className="font-semibold">{inr(r.amount)}</span>
                  ),
                },
                {
                  key: "mode",
                  label: "Mode",
                  render: (r) => <Badge variant="secondary">{r.mode}</Badge>,
                },
                { key: "user", label: "User" },
                { key: "date", label: "Date Time" },
              ]}
            />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <DataTable
                title="Investigation Collections"
                data={investigationCollections}
                columns={[
                  { key: "receiptNo", label: "Receipt #" },
                  { key: "patient", label: "Patient" },
                  { key: "test", label: "Test" },
                  {
                    key: "amount",
                    label: "Amount",
                    render: (r) => inr(r.amount),
                  },
                  { key: "mode", label: "Mode" },
                  { key: "date", label: "Date" },
                ]}
              />
              <DataTable
                title="Pharmacy Collections"
                data={pharmacyCollections}
                columns={[
                  { key: "billNo", label: "Bill #" },
                  { key: "patient", label: "Patient" },
                  {
                    key: "amount",
                    label: "Amount",
                    render: (r) => inr(r.amount),
                  },
                  { key: "mode", label: "Mode" },
                  { key: "user", label: "User" },
                  { key: "date", label: "Date" },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <DataTable
                title="OPD Cancellations"
                data={opdCancellations}
                columns={[
                  { key: "date", label: "Date" },
                  { key: "patient", label: "Patient" },
                  {
                    key: "amount",
                    label: "Amount",
                    render: (r) => (
                      <span className="text-destructive font-semibold">
                        {inr(r.amount)}
                      </span>
                    ),
                  },
                  { key: "reason", label: "Reason" },
                ]}
              />
              <DataTable
                title="Investigation Cancellations"
                data={investigationCancellations}
                columns={[
                  { key: "date", label: "Date" },
                  { key: "patient", label: "Patient" },
                  { key: "investigation", label: "Test" },
                  {
                    key: "amount",
                    label: "Amount",
                    render: (r) => inr(r.amount),
                  },
                  { key: "reason", label: "Reason" },
                ]}
              />
              <DataTable
                title="Pharmacy Returns"
                data={pharmacyReturns}
                columns={[
                  { key: "date", label: "Date" },
                  { key: "billNo", label: "Bill #" },
                  { key: "patient", label: "Patient" },
                  {
                    key: "amount",
                    label: "Amount",
                    render: (r) => inr(r.amount),
                  },
                  { key: "reason", label: "Reason" },
                ]}
              />
            </div>
          </TabsContent>

          {/* AUDIT */}
          {canSeeAudit && (
            <TabsContent value="audit" className="mt-4 space-y-4">
              <DataTable
                title="Modification & Audit Log"
                data={modificationLog}
                columns={[
                  {
                    key: "type",
                    label: "Type",
                    render: (r) => (
                      <Badge
                        variant="outline"
                        className="border-warning text-warning"
                      >
                        {r.type}
                      </Badge>
                    ),
                  },
                  { key: "recordId", label: "Record #" },
                  { key: "originalValue", label: "Original" },
                  {
                    key: "newValue",
                    label: "New",
                    render: (r) => (
                      <span className="font-semibold">{r.newValue}</span>
                    ),
                  },
                  { key: "modifiedBy", label: "Modified By" },
                  { key: "modifiedDate", label: "Date" },
                  { key: "reason", label: "Reason" },
                ]}
              />
            </TabsContent>
          )}

          {/* CLINICAL */}
          <TabsContent value="clinical" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KpiCard
                label="OT Done"
                value={otList.length}
                icon={Syringe}
                tone="warning"
              />
              <KpiCard
                label="Investigations"
                value={operational.investigations}
                icon={FlaskConical}
                tone="info"
              />
              <KpiCard
                label="IP Admissions"
                value={operational.ipAdmissions}
                icon={LogIn}
                tone="primary"
              />
              <KpiCard
                label="OP Registrations"
                value={operational.opRegistrations}
                icon={UserPlus}
                tone="success"
              />
            </div>
            <DataTable
              title="OT Procedures Done"
              data={otList}
              columns={[
                { key: "otNo", label: "OT #" },
                { key: "patient", label: "Patient" },
                { key: "procedure", label: "Procedure" },
                { key: "surgeon", label: "Surgeon" },
                { key: "duration", label: "Duration" },
                { key: "date", label: "Date" },
              ]}
            />
          </TabsContent>

          {/* ALERTS */}
          <TabsContent
            value="alerts"
            className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <SectionCard
              title="Alerts & Exceptions"
              description="Items needing attention"
            >
              <div className="space-y-2">
                {alerts.map((a, i) => {
                  const toneMap: Record<string, string> = {
                    warning: "border-l-warning bg-warning/5",
                    destructive: "border-l-destructive bg-destructive/5",
                    info: "border-l-info bg-info/5",
                  }
                  return (
                    <div
                      key={i}
                      className={cn(
                        "rounded-lg border border-border border-l-4 px-3 py-2.5",
                        toneMap[a.type]
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-sm">{a.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {a.desc}
                          </p>
                        </div>
                        <span className="text-[10px] text-muted-foreground shrink-0">
                          {a.time}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </SectionCard>

            <SectionCard
              title="Executive Insights"
              description="AI-generated highlights"
              action={
                <Badge variant="outline" className="gap-1">
                  <Sparkles className="size-3" /> AI
                </Badge>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {insights.map((ins, i) => {
                  const toneMap: Record<string, string> = {
                    success: "from-success/15 to-transparent border-success/30",
                    warning: "from-warning/15 to-transparent border-warning/30",
                    info: "from-info/15 to-transparent border-info/30",
                  }
                  const Icon =
                    ins.tone === "success"
                      ? TrendingUp
                      : ins.tone === "warning"
                        ? AlertTriangle
                        : Sparkles
                  return (
                    <div
                      key={i}
                      className={cn(
                        "rounded-lg border bg-gradient-to-br p-3",
                        toneMap[ins.tone]
                      )}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-semibold mb-1">
                        <Icon className="size-3.5" /> {ins.title}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {ins.desc}
                      </p>
                    </div>
                  )
                })}
              </div>
            </SectionCard>
          </TabsContent>
        </Tabs>

        <footer className="pt-4 pb-2 text-center text-xs text-muted-foreground border-t border-border mt-8">
          MediPulse Executive Hospital Dashboard • Role:{" "}
          <span className="font-semibold text-foreground">{role}</span> • Last
          sync {lastUpdated.toLocaleTimeString()}
        </footer>
      </main>
    </div>
  )
}
