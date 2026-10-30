import { createFileRoute } from "@tanstack/react-router";
import { AdminPageHeader, DataTable, Panel, Td } from "@/components/admin/AdminUI";
import { customers } from "@/data/admin";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/admin/customers")({ component: Customers });

function Customers() {
  return (
    <>
      <AdminPageHeader title="العملاء" subtitle="قاعدة عملاء المتجر" />
      <Panel>
        <DataTable head={["العميل", "المدينة", "عدد الطلبات", "إجمالي الإنفاق", "تاريخ التسجيل"]}>
          {customers.map((c) => (
            <tr key={c.name}>
              <Td><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-gold-soft font-semibold text-gold">{c.name[0]}</span>{c.name}</div></Td>
              <Td>{c.city}</Td><Td>{c.orders}</Td><Td className="font-semibold">{formatPrice(c.spent)}</Td><Td className="text-muted-foreground">{c.joined}</Td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </>
  );
}
