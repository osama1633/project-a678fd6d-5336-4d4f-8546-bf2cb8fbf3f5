import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function SalesChart({ data, height = 260 }: { data: { d: string; v: number }[]; height?: number }) {
  return (
    <div style={{ height }} dir="ltr">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={[...data].reverse()} margin={{ left: 0, right: 8, top: 10 }}>
          <defs>
            <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis dataKey="d" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} reversed />
          <YAxis orientation="right" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={50} />
          <Tooltip formatter={(v: number) => [`${v.toLocaleString("ar-SA")} ر.س`, "المبيعات"]} contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", direction: "rtl" }} />
          <Area type="monotone" dataKey="v" stroke="var(--gold)" strokeWidth={2} fill="url(#goldFill)" dot={{ r: 3, fill: "var(--gold)" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
