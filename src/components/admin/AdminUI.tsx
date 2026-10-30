import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function AdminPageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({ title, icon: Icon, action, children, className = "" }: { title?: string; icon?: LucideIcon; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border bg-card p-5 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            {Icon && <Icon className="h-4 w-4 text-gold" />} {title}
          </h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({ title, value, note, change, icon: Icon }: { title: string; value: string; note: string; change: string; icon: LucideIcon }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="mt-2 whitespace-nowrap font-display text-2xl font-bold xl:text-3xl">{value}</div>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-soft text-gold"><Icon className="h-5 w-5" /></span>
      </div>
      <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs">
        <span className="text-muted-foreground">{note}</span>
        <span className="font-semibold text-success">↑ {change}</span>
      </div>
    </div>
  );
}

const statusStyles: Record<string, string> = {
  "تم التوصيل": "bg-success-soft text-success",
  "نشط": "bg-success-soft text-success",
  "قيد التجهيز": "bg-info-soft text-info",
  "قيد الشحن": "bg-warning-soft text-warning",
  "معلق": "bg-muted text-muted-foreground",
  "منتهي": "bg-muted text-muted-foreground",
  "ملغي": "bg-destructive/10 text-destructive",
  "نفد المخزون": "bg-destructive/10 text-destructive",
};
export function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${statusStyles[status] ?? "bg-muted"}`}>{status}</span>;
}

export function DataTable({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead><tr className="bg-muted/60 text-muted-foreground">{head.map((h) => <th key={h} className="px-4 py-3 text-right font-medium">{h}</th>)}</tr></thead>
        <tbody className="divide-y">{children}</tbody>
      </table>
    </div>
  );
}
export const Td = ({ children, className = "" }: { children: ReactNode; className?: string }) => <td className={`px-4 py-3 ${className}`}>{children}</td>;
