import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminPageHeader, DataTable, Panel, StatusBadge, Td } from "@/components/admin/AdminUI";
import { orders } from "@/data/admin";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/admin/orders")({ component: Orders });

const tabs = ["الكل", "قيد التجهيز", "قيد الشحن", "تم التوصيل", "معلق", "ملغي"];

function Orders() {
  const [tab, setTab] = useState("الكل");
  const list = tab === "الكل" ? orders : orders.filter((o) => o.status === tab);
  return (
    <>
      <AdminPageHeader title="الطلبات" subtitle="تابع جميع طلبات المتجر وحالاتها" action={<button className="btn-outline">تصدير</button>} />
      <Panel>
        <div className="mb-4 flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm ${tab === t ? "border-gold bg-gold-soft" : ""}`}>{t}</button>
          ))}
        </div>
        <DataTable head={["رقم الطلب", "العميل", "المدينة", "التاريخ", "القطع", "الإجمالي", "الحالة", ""]}>
          {list.map((o) => (
            <tr key={o.id}>
              <Td className="font-semibold">{o.id}</Td><Td>{o.customer}</Td><Td>{o.city}</Td>
              <Td className="text-muted-foreground">{o.date}</Td><Td>{o.items}</Td>
              <Td className="font-semibold">{formatPrice(o.total)}</Td><Td><StatusBadge status={o.status} /></Td>
              <Td><button className="text-xs text-gold">التفاصيل</button></Td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </>
  );
}
