import type { Metadata } from "next"

import OverviewDashboard from "@/components/dashboards/overview/overview-dashboard"

export const metadata: Metadata = {
  title: "Executive Dashboard",
  description:
    "Real-time dashboard for administrators, finance managers, and directors.",
  openGraph: {
    title: "Executive Dashboard",
    description:
      "Real-time dashboard for administrators, finance managers, and directors.",
  },
}

export default function OverviewPage() {
  return <OverviewDashboard />
}
