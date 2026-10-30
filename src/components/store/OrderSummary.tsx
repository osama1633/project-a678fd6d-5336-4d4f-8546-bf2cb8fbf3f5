import type { ReactNode } from "react";
import { formatPrice } from "@/data/products";

export function OrderSummary({ subtotal, children }: { subtotal: number; children?: ReactNode }) {
  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 35;
  const vat = Math.round((subtotal * 15) / 115);
  return (
    <aside className="h-fit rounded-2xl border bg-card p-6">
      <h2 className="mb-6 text-2xl font-bold">ملخص الطلب</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between"><span>المجموع الفرعي</span><span>{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between"><span>الشحن</span><span>{shipping ? formatPrice(shipping) : "مجاني"}</span></div>
        <div className="flex justify-between text-muted-foreground"><span>ضريبة القيمة المضافة (مشمولة)</span><span>{formatPrice(vat)}</span></div>
        <div className="flex gap-2 pt-2">
          <input placeholder="كود الخصم" className="field" />
          <button type="button" className="btn-outline !px-4">تطبيق</button>
        </div>
        <div className="flex justify-between border-t pt-4 text-lg font-bold"><span>الإجمالي</span><span>{formatPrice(subtotal + shipping)}</span></div>
      </div>
      {children}
    </aside>
  );
}
