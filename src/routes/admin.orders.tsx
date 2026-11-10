import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminPageHeader, DataTable, Panel, StatusBadge, Td } from "@/components/admin/AdminUI";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listOrderStatuses } from "@/lib/order-status.functions";

const ordersQuery = queryOptions({ queryKey: ["order-statuses"], queryFn: () => listOrderStatuses(), staleTime: 0, refetchInterval: 10000 });

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [
    { title: "الطلبات وحالاتها | لوفيانا" },
    { name: "description", content: "أرقام طلبات متجر لوفيانا وحالات تجهيزها." },
    { property: "og:title", content: "الطلبات وحالاتها | لوفيانا" },
    { property: "og:description", content: "متابعة حالات طلبات لوفيانا." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex" },
  ] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(ordersQuery),
  component: Orders,
});

const tabs = ["الكل", "قيد التجهيز", "قيد الشحن", "تم التوصيل", "معلق", "ملغي"];

function Orders() {
  const { data: orders, refetch, isFetching } = useSuspenseQuery(ordersQuery);
  const [tab, setTab] = useState("الكل");
  const list = tab === "الكل" ? orders : orders.filter((o) => o.status === tab);
  return (
    <>
      <AdminPageHeader title="الطلبات" subtitle="تابع جميع طلبات المتجر وحالاتها" action={<Button variant="outline" onClick={() => refetch()} disabled={isFetching}><RefreshCw className={isFetching ? "animate-spin" : ""} />تحديث</Button>} />
      <Panel>
        <div className="mb-4 flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <Button variant="outline" key={t} onClick={() => setTab(t)} aria-pressed={tab === t} className={`whitespace-nowrap ${tab === t ? "border-gold bg-gold-soft" : ""}`}>{t}</Button>
          ))}
        </div>
        <DataTable head={["رقم الطلب", "الحالة"]}>
          {list.map((o) => (
            <tr key={o.orderNumber}>
              <Td className="font-semibold">#{new Intl.NumberFormat("ar-SA", { useGrouping: false }).format(o.orderNumber)}</Td>
              <Td><StatusBadge status={o.status} /></Td>
            </tr>
          ))}
          {!list.length && <tr><td colSpan={2} className="py-10 text-center text-muted-foreground">لا توجد طلبات{tab !== "الكل" ? " بهذه الحالة" : " حتى الآن"}.</td></tr>}
        </DataTable>
      </Panel>
    </>
  );
}
