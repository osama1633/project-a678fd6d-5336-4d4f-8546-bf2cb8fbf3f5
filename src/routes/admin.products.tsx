import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminPageHeader, DataTable, Panel, StatusBadge, Td } from "@/components/admin/AdminUI";
import { formatPrice, getCategory, products } from "@/data/products";

export const Route = createFileRoute("/admin/products")({ component: Products });

function Products() {
  return (
    <>
      <AdminPageHeader title="المنتجات" subtitle={`${products.length} منتج في المتجر`} action={<button className="btn-gold"><Plus className="h-4 w-4" /> إضافة منتج</button>} />
      <Panel>
        <DataTable head={["المنتج", "القسم", "السعر", "المخزون", "المبيعات", "الحالة", ""]}>
          {products.map((p, i) => {
            const stock = [24, 12, 0, 31, 8, 17, 40, 5, 9][i] ?? 10;
            return (
              <tr key={p.id}>
                <Td><div className="flex items-center gap-3"><img src={p.image} alt={p.name} className="h-12 w-12 rounded object-cover" /><span className="font-semibold">{p.name}</span></div></Td>
                <Td>{getCategory(p.category)?.name}</Td><Td>{formatPrice(p.price)}</Td><Td>{stock}</Td><Td>{p.reviews}</Td>
                <Td><StatusBadge status={stock ? "نشط" : "نفد المخزون"} /></Td>
                <Td><div className="flex gap-2 text-muted-foreground"><button aria-label="تعديل"><Pencil className="h-4 w-4" /></button><button aria-label="حذف"><Trash2 className="h-4 w-4" /></button></div></Td>
              </tr>
            );
          })}
        </DataTable>
      </Panel>
    </>
  );
}
