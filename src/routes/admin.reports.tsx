import { createFileRoute } from "@tanstack/react-router";
import { Coins, Percent, ShoppingCart, TrendingUp } from "lucide-react";
import { AdminPageHeader, Panel, StatCard } from "@/components/admin/AdminUI";
import { SalesChart } from "@/components/admin/SalesChart";
import { salesYear } from "@/data/admin";
import { categories } from "@/data/products";

export const Route = createFileRoute("/admin/reports")({ component: Reports });

const share = [28, 18, 14, 12, 10, 9, 6, 3];

function Reports() {
  return (
    <>
      <AdminPageHeader title="التقارير" subtitle="أداء المتجر خلال عام ٢٠٢٦" action={<button className="btn-outline">تحميل التقرير</button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="إيرادات السنة" value="٤٢٤٬٦٨٠ ر.س" note="منذ يناير" change="٢٢٪" icon={Coins} />
        <StatCard title="الطلبات" value="٣٬١٢٠" note="طلب مكتمل" change="١٧٪" icon={ShoppingCart} />
        <StatCard title="معدل التحويل" value="٢٫٨٪" note="من الزيارات" change="٠٫٤٪" icon={Percent} />
        <StatCard title="متوسط الطلب" value="٤٣٨ ر.س" note="لكل طلب" change="٥٪" icon={TrendingUp} />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_360px]">
        <Panel title="المبيعات الشهرية"><SalesChart data={salesYear} height={320} /></Panel>
        <Panel title="المبيعات حسب القسم">
          <div className="space-y-4">
            {categories.map((c, i) => (
              <div key={c.slug}>
                <div className="mb-1 flex justify-between text-sm"><span>{c.name}</span><span className="text-muted-foreground">{share[i]}٪</span></div>
                <div className="h-2 rounded bg-muted"><div className="h-full rounded bg-gold-gradient" style={{ width: `${(share[i] ?? 0) * 3}%` }} /></div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
