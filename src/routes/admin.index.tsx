import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart, Box, Calendar, ClipboardList, Coins, Crown, List, Plus, Users } from "lucide-react";
import { useState } from "react";
import { AdminPageHeader, DataTable, Panel, StatCard, StatusBadge, Td } from "@/components/admin/AdminUI";
import { SalesChart } from "@/components/admin/SalesChart";
import { orders, salesWeek, salesYear } from "@/data/admin";
import { formatPrice, products } from "@/data/products";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const [range, setRange] = useState("7");
  const data = range === "year" ? salesYear : salesWeek;
  const best = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);
  return (
    <>
      <AdminPageHeader title="لوحة التحكم" subtitle="مرحباً بك في لوحة تحكم المتجر"
        action={
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2.5 text-sm"><Calendar className="h-4 w-4 text-muted-foreground" /> من 2026/10/01 إلى 2026/10/31</div>
            <Link to="/admin/products" className="btn-gold"><Plus className="h-4 w-4" /> إضافة منتج</Link>
          </div>
        } />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="إجمالي المبيعات" value={formatPrice(52680)} note="إجمالي الإيرادات" change="١٨٪" icon={Coins} />
        <StatCard title="إجمالي الطلبات" value="٣٤٢" note="الطلبات المكتملة" change="١٥٪" icon={ClipboardList} />
        <StatCard title="عدد العملاء" value="١٬٢٤٨" note="العملاء المسجلين" change="٨٪" icon={Users} />
        <StatCard title="المنتجات" value="٤٨" note="إجمالي المنتجات" change="١٢٪" icon={Box} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <Panel title="نظرة عامة على المبيعات" action={
            <div className="flex rounded-lg border p-1 text-xs">
              {[{ v: "7", l: "٧ أيام" }, { v: "30", l: "٣٠ يوم" }, { v: "year", l: "سنة" }].map((r) => (
                <button key={r.v} onClick={() => setRange(r.v)} className={`rounded-md px-3 py-1.5 ${range === r.v ? "bg-gold-gradient text-gold-foreground" : ""}`}>{r.l}</button>
              ))}
            </div>
          }>
            <SalesChart data={data} />
          </Panel>
          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <Panel title="أحدث الطلبات" icon={List} action={<Link to="/admin/orders" className="text-xs text-gold">عرض الكل ←</Link>}>
              <DataTable head={["رقم الطلب", "العميل", "التاريخ", "الإجمالي", "الحالة"]}>
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id}><Td>{o.id}</Td><Td>{o.customer}</Td><Td className="text-muted-foreground">{o.date} {o.time}</Td><Td className="font-semibold">{formatPrice(o.total)}</Td><Td><StatusBadge status={o.status} /></Td></tr>
                ))}
              </DataTable>
            </Panel>
            <Panel title="إحصائيات سريعة" icon={BarChart}>
              <div className="grid grid-cols-2 gap-3 text-center">
                {[["نسبة النمو", "٢٫٨٪"], ["متوسط قيمة الطلب", "٤٣٨ ر.س"], ["أكثر منتج مبيعاً", "الكلاسيكية الذهبية"], ["العملاء الجدد", "٥٦"]].map(([l, v]) => (
                  <div key={l} className="rounded-lg border p-3"><div className="text-[11px] text-muted-foreground">{l}</div><div className="mt-2 text-sm font-semibold">{v}</div></div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
        <Panel title="الأكثر مبيعاً" icon={Crown}>
          <ul className="divide-y">
            {best.map((p, i) => (
              <li key={p.id} className="flex items-center gap-3 py-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-gold text-[10px] text-gold-foreground">{i + 1}</span>
                <img src={p.image} alt={p.name} className="h-14 w-14 shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{p.name}</div>
                  <div className="text-sm">{formatPrice(p.price)}</div>
                  <div className="text-xs text-muted-foreground">({p.reviews} مبيعة)</div>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/admin/products" className="mt-2 block rounded-lg border py-2.5 text-center text-sm">عرض جميع المنتجات</Link>
        </Panel>
      </div>

      <Panel title="لوحات مميزة" className="mt-4">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {products.map((p) => (
            <div key={p.id} className="w-44 shrink-0 rounded-lg border p-2 text-center">
              <img src={p.image} alt={p.name} className="h-28 w-full rounded object-cover" />
              <div className="mt-2 truncate text-sm">{p.name}</div>
              <div className="text-xs text-muted-foreground">{formatPrice(p.price)}</div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
