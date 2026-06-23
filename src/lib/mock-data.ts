// Mock dataset for the Hospital Executive Dashboard

export const departments = [
  "All Departments",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Oncology",
  "Emergency",
  "Gynecology",
  "General Medicine",
]

export const kpis = {
  totalPatients: { value: 1284, delta: 8.4 },
  totalBeds: { value: 420, delta: 0 },
  occupiedBeds: { value: 356, delta: 3.2 },
  occupancyPct: { value: 84.8, delta: 2.1 },
  totalCollection: { value: 8742500, delta: 12.3 },
  opdCollection: { value: 2145000, delta: 6.1 },
  ipdCollection: { value: 4320000, delta: 14.7 },
  pharmacyCollection: { value: 1487500, delta: 9.2 },
  investigationCollection: { value: 790000, delta: -2.4 },
  avgDailyRevenue: { value: 291416, delta: 5.7 },
  avgRevenuePerPatient: { value: 6810, delta: 1.9 },
  todayRegistrations: { value: 187, delta: 11.2 },
  todayAdmissions: { value: 42, delta: -3.1 },
  todayDischarges: { value: 38, delta: 4.4 },
  pendingBills: { value: 64, delta: -8.0 },
  outstandingReceivables: { value: 1245000, delta: 2.8 },
}

export const dailyRevenue = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  revenue: Math.round(180000 + Math.random() * 180000),
  target: 300000,
}))

export const deptRevenue = [
  { name: "Cardiology", value: 1820000 },
  { name: "Orthopedics", value: 1450000 },
  { name: "Oncology", value: 1290000 },
  { name: "Neurology", value: 980000 },
  { name: "Pediatrics", value: 760000 },
  { name: "Gynecology", value: 690000 },
  { name: "Emergency", value: 870000 },
  { name: "Gen. Medicine", value: 882500 },
]

export const opdVsIpd = Array.from({ length: 12 }, (_, i) => ({
  month: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][i],
  OPD: Math.round(150000 + Math.random() * 80000),
  IPD: Math.round(280000 + Math.random() * 120000),
}))

export const pharmacyTrend = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  value: Math.round(80000 + Math.random() * 60000),
}))

export const investigationTrend = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  value: Math.round(40000 + Math.random() * 40000),
}))

export const paymentModeShare = [
  { name: "UPI", value: 3120000 },
  { name: "Cash", value: 1980000 },
  { name: "Card", value: 2240000 },
  { name: "Net Banking", value: 980000 },
  { name: "Cheque", value: 422500 },
]

export const monthlyGrowth = Array.from({ length: 12 }, (_, i) => ({
  month: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][i],
  growth: Math.round((Math.random() * 18 - 4) * 10) / 10,
}))

export const topServices = [
  { name: "Cardiac Bypass", revenue: 480000 },
  { name: "MRI Scan", revenue: 312000 },
  { name: "Knee Replacement", revenue: 295000 },
  { name: "CT Scan", revenue: 240000 },
  { name: "Chemotherapy", revenue: 220000 },
  { name: "Dialysis", revenue: 180000 },
]

type ModeRow = { mode: string; amount: number; count: number; trend: number }
const buildModes = (base: number): ModeRow[] => [
  {
    mode: "Cash",
    amount: Math.round(base * 0.28),
    count: Math.round(base / 1200),
    trend: 2.1,
  },
  {
    mode: "Card",
    amount: Math.round(base * 0.26),
    count: Math.round(base / 1500),
    trend: 4.7,
  },
  {
    mode: "UPI",
    amount: Math.round(base * 0.32),
    count: Math.round(base / 900),
    trend: 11.4,
  },
  {
    mode: "Net Banking",
    amount: Math.round(base * 0.1),
    count: Math.round(base / 4000),
    trend: -1.2,
  },
  {
    mode: "Cheque",
    amount: Math.round(base * 0.04),
    count: Math.round(base / 9000),
    trend: -6.8,
  },
]

export const paymentBreakdown = {
  OPD: buildModes(2145000),
  IPD: buildModes(4320000),
  Pharmacy: buildModes(1487500),
  Investigation: buildModes(790000),
}

export const operational = {
  opRegistrations: 187,
  ipAdmissions: 42,
  discharges: 38,
  otProcedures: 14,
  investigations: 312,
  pharmacyBills: 489,
  avgWaitingTime: "18 min",
  avgLengthOfStay: "4.2 days",
  emergencyAdmissions: 11,
  criticalPatients: 7,
}

const names = [
  "Aarav Sharma",
  "Priya Patel",
  "Rahul Kumar",
  "Sneha Iyer",
  "Vikram Singh",
  "Anjali Rao",
  "Karan Mehta",
  "Pooja Nair",
  "Rohit Verma",
  "Divya Reddy",
  "Arjun Joshi",
  "Meera Das",
]
const doctors = [
  "Dr. Kapoor",
  "Dr. Banerjee",
  "Dr. Khan",
  "Dr. Menon",
  "Dr. Gupta",
  "Dr. Pillai",
]
const users = ["reception01", "billing02", "pharma03", "lab04", "ipd05"]
const modes = ["Cash", "Card", "UPI", "Net Banking", "Cheque"]
const pick = <T>(a: T[]) => a[Math.floor(Math.random() * a.length)]
const rid = (p: string) => `${p}${Math.floor(10000 + Math.random() * 89999)}`
const dt = (i: number) => {
  const d = new Date()
  d.setHours(d.getHours() - i)
  return d.toLocaleString()
}

export const opdCancellations = Array.from({ length: 12 }, (_, i) => ({
  date: dt(i * 2),
  patientId: rid("P"),
  patient: pick(names),
  doctor: pick(doctors),
  amount: Math.round(500 + Math.random() * 4500),
  reason: pick([
    "Patient no-show",
    "Doctor unavailable",
    "Duplicate booking",
    "Patient request",
  ]),
  user: pick(users),
}))

export const investigationCancellations = Array.from(
  { length: 10 },
  (_, i) => ({
    date: dt(i * 3),
    patient: pick(names),
    investigation: pick([
      "MRI Brain",
      "CT Chest",
      "CBC",
      "Lipid Profile",
      "X-Ray Spine",
    ]),
    amount: Math.round(800 + Math.random() * 6000),
    reason: pick(["Patient request", "Insurance issue", "Re-scheduled"]),
    user: pick(users),
  })
)

export const pharmacyReturns = Array.from({ length: 10 }, (_, i) => ({
  date: dt(i * 4),
  billNo: rid("BN"),
  patient: pick(names),
  amount: Math.round(200 + Math.random() * 3000),
  reason: pick(["Wrong medicine", "Patient discharged", "Expired stock"]),
  user: pick(users),
}))

export const opdCollections = Array.from({ length: 15 }, (_, i) => ({
  receiptNo: rid("OR"),
  patient: pick(names),
  doctor: pick(doctors),
  amount: Math.round(300 + Math.random() * 2500),
  mode: pick(modes),
  user: pick(users),
  date: dt(i),
}))

export const ipdCollections = Array.from({ length: 15 }, (_, i) => ({
  receiptNo: rid("IR"),
  patient: pick(names),
  admissionNo: rid("AD"),
  amount: Math.round(5000 + Math.random() * 45000),
  mode: pick(modes),
  user: pick(users),
  date: dt(i),
}))

export const investigationCollections = Array.from({ length: 12 }, (_, i) => ({
  receiptNo: rid("INR"),
  patient: pick(names),
  test: pick([
    "MRI Brain",
    "CT Chest",
    "CBC",
    "Lipid Profile",
    "X-Ray Spine",
    "USG Abdomen",
  ]),
  amount: Math.round(500 + Math.random() * 8000),
  mode: pick(modes),
  user: pick(users),
  date: dt(i),
}))

export const pharmacyCollections = Array.from({ length: 12 }, (_, i) => ({
  billNo: rid("PH"),
  patient: pick(names),
  amount: Math.round(200 + Math.random() * 5000),
  mode: pick(modes),
  user: pick(users),
  date: dt(i),
}))

export const modificationLog = Array.from({ length: 10 }, (_, i) => ({
  type: pick([
    "OPD Registration",
    "IPD Payment",
    "Investigation Payment",
    "Pharmacy Bill",
    "Patient Record",
  ]),
  recordId: rid("REC"),
  originalValue: `₹${Math.round(1000 + Math.random() * 9000)}`,
  newValue: `₹${Math.round(1000 + Math.random() * 9000)}`,
  modifiedBy: pick(users),
  modifiedDate: dt(i * 5),
  reason: pick([
    "Billing error",
    "Discount applied",
    "Wrong entry",
    "Insurance update",
  ]),
}))

export const otList = Array.from({ length: 8 }, (_, i) => ({
  otNo: rid("OT"),
  patient: pick(names),
  procedure: pick([
    "Appendectomy",
    "C-Section",
    "Cataract",
    "Knee Arthroscopy",
    "Hernia Repair",
  ]),
  surgeon: pick(doctors),
  duration: `${1 + Math.floor(Math.random() * 4)}h ${Math.floor(Math.random() * 60)}m`,
  date: dt(i * 2),
}))

export const alerts = [
  {
    type: "warning",
    title: "High-value cancellation",
    desc: "OPD ₹45,000 cancelled by reception02",
    time: "12 min ago",
  },
  {
    type: "destructive",
    title: "Revenue drop alert",
    desc: "Pharmacy revenue down 18% vs yesterday",
    time: "1 hr ago",
  },
  {
    type: "warning",
    title: "Pending discharges",
    desc: "9 patients pending discharge over 4hrs",
    time: "2 hr ago",
  },
  {
    type: "info",
    title: "Unsettled IPD bills",
    desc: "12 IPD bills unsettled > ₹2.4L",
    time: "3 hr ago",
  },
  {
    type: "destructive",
    title: "Critical patient alert",
    desc: "3 ICU patients require attention",
    time: "5 min ago",
  },
  {
    type: "warning",
    title: "Low occupancy - Pediatrics",
    desc: "Occupancy at 42% (threshold 60%)",
    time: "30 min ago",
  },
]

export const insights = [
  {
    title: "Revenue up 12.3% today",
    desc: "Driven by IPD collections in Cardiology.",
    tone: "success",
  },
  {
    title: "OPD registrations +11.2%",
    desc: "Highest in last 14 days.",
    tone: "success",
  },
  {
    title: "Bed occupancy at 84.8%",
    desc: "Approaching capacity — consider triage.",
    tone: "warning",
  },
  {
    title: "UPI exceeded Cash",
    desc: "UPI now 36% of collections vs Cash 23%.",
    tone: "info",
  },
  {
    title: "Investigations grew 14%",
    desc: "MRI bookings doubled this week.",
    tone: "success",
  },
  {
    title: "Top dept: Cardiology",
    desc: "₹18.2L revenue today, 22% of total.",
    tone: "info",
  },
]
