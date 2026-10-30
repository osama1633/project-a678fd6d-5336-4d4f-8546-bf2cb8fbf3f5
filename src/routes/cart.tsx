import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice, getProduct } from "@/data/products";
import { PageHero } from "@/components/store/ProductCard";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سلة التسوق | رواق" },
      { name: "description", content: "راجع اللوحات في سلتك وأكمل طلبك." },
      { property: "og:title", content: "سلة التسوق | رواق" },
      { property: "og:description", content: "راجع طلبك قبل الدفع." },
    ],
  }),
  component: Cart,
});

export function OrderSummary({ subtotal, children }: { subtotal: number; children?: React.ReactNode }) {
  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 35;
  const vat = Math.round(subtotal * 0.15);
  return (
    <aside className="h-fit rounded-2xl border bg-card p-6">
      <h2 className="mb-6 text-2xl font-bold">ملخص الطلب</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between"><span>المجموع الفرعي</span><span>{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between"><span>الشحن</span><span>{shipping ? formatPrice(shipping) : "مجاني"}</span></div>
        <div className="flex justify-between text-muted-foreground"><span>ضريبة القيمة المضافة (مشمولة)</span><span>{formatPrice(vat)}</span></div>
        <div className="flex gap-2 pt-2">
          <input placeholder="كود الخصم" className="field" />
          <button className="btn-outline !px-4">تطبيق</button>
        </div>
        <div className="flex justify-between border-t pt-4 text-lg font-bold"><span>الإجمالي</span><span>{formatPrice(subtotal + shipping)}</span></div>
      </div>
      {children}
    </aside>
  );
}

function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal } = useStore();
  return (
    <>
      <PageHero title="سلة التسوق" />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        {cart.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold">سلتك فارغة</h2>
            <p className="mt-2 text-muted-foreground">ابدأ باكتشاف لوحات تليق بمساحتك.</p>
            <Link to="/shop" className="btn-gold mt-6">تسوّق الآن</Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="divide-y">
              {cart.map((item) => {
                const p = getProduct(item.productId);
                if (!p) return null;
                return (
                  <div key={item.productId + item.size} className="flex gap-4 py-6">
                    <img src={p.image} alt={p.name} className="h-32 w-24 shrink-0 rounded-lg object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <Link to="/product/$id" params={{ id: p.id }} className="font-display text-lg font-semibold">{p.name}</Link>
                        <button aria-label="حذف" onClick={() => removeFromCart(item.productId, item.size)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </div>
                      <div className="text-sm text-muted-foreground">المقاس: {item.size}</div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-lg border">
                          <button aria-label="زيادة" onClick={() => updateQty(item.productId, item.size, item.qty + 1)} className="p-2"><Plus className="h-3.5 w-3.5" /></button>
                          <span className="w-8 text-center text-sm">{item.qty}</span>
                          <button aria-label="إنقاص" onClick={() => updateQty(item.productId, item.size, item.qty - 1)} className="p-2"><Minus className="h-3.5 w-3.5" /></button>
                        </div>
                        <span className="font-semibold">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <OrderSummary subtotal={cartTotal}>
              <Link to="/checkout" className="btn-gold mt-6 w-full">إتمام الطلب</Link>
              <Link to="/shop" className="mt-3 block text-center text-sm text-muted-foreground">متابعة التسوق</Link>
            </OrderSummary>
          </div>
        )}
      </div>
    </>
  );
}
