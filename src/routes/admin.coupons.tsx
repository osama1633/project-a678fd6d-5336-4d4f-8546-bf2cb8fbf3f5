import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AdminPageHeader, DataTable, Panel, StatusBadge, Td } from "@/components/admin/AdminUI";
import { coupons } from "@/data/admin";

export const Route = createFileRoute("/admin/coupons")({ component: Coupons });

function Coupons() {
  return (
    <>
      <AdminPageHeader title="الكوبونات" subtitle="أكواد الخصم والعروض" action={<button className="btn-gold"><Plus className="h-4 w-4" /> كوبون جديد</button>} />
      <Panel>
        <DataTable head={["الكود", "النوع", "القيمة", "الاستخدام", "ينتهي في", "الحالة"]}>
          {coupons.map((c) => (
            <tr key={c.code}>
              <Td><span className="rounded border border-dashed border-gold px-2 py-1 font-semibold text-gold">{c.code}</span></Td>
              <Td>{c.type}</Td><Td>{c.value}</Td>
              <Td><div className="w-32"><div className="text-xs">{c.uses} / {c.limit}</div><div className="mt-1 h-1.5 rounded bg-muted"><div className="h-full rounded bg-gold" style={{ width: `${(c.uses / c.limit) * 100}%` }} /></div></div></Td>
              <Td className="text-muted-foreground">{c.expires}</Td><Td><StatusBadge status={c.status} /></Td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </>
  );
}
