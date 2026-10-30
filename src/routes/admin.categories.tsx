import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/admin/categories")({ component: Categories });

function Categories() {
  return (
    <>
      <AdminPageHeader title="الأقسام" subtitle="نظّم منتجاتك في أقسام واضحة" action={<button className="btn-gold"><Plus className="h-4 w-4" /> إضافة قسم</button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((c) => (
          <div key={c.slug} className="overflow-hidden rounded-xl border bg-card">
            <img src={c.image} alt={c.name} className="h-36 w-full object-cover" />
            <div className="flex items-center justify-between p-4">
              <div><div className="font-semibold">{c.name}</div><div className="text-xs text-muted-foreground">{products.filter((p) => p.category === c.slug).length} منتج</div></div>
              <button aria-label="تعديل" className="text-muted-foreground"><Pencil className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
