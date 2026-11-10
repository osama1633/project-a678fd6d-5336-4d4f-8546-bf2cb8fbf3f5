import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, CreditCard } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/store/ProductCard";
import { useStore } from "@/lib/store";
import { OrderSummary } from "@/components/store/OrderSummary";
import { Button } from "@/components/ui/button";
import { useServerFn } from "@tanstack/react-start";
import { submitOrder } from "@/lib/orders.functions";
import { checkoutCities, checkoutSchema } from "@/lib/orders-schema";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب | لوفيانا" },
      { name: "description", content: "أدخل بيانات الشحن والدفع لإتمام طلبك." },
      { property: "og:title", content: "إتمام الطلب | لوفيانا" },
      { property: "og:description", content: "خطوة أخيرة لتصلك لوحتك." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

const cities = checkoutCities;

function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const [pay, setPay] = useState("cod");
  const [done, setDone] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");
  const saveOrder = useServerFn(submitOrder);

  if (done)
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-6 text-4xl font-bold">شكراً لطلبك!</h1>
        <p className="mt-3 text-muted-foreground">تم استلام طلبك رقم #{new Intl.NumberFormat("ar-SA", { useGrouping: false }).format(done)}.</p>
        <Link to="/shop" className="btn-gold mt-8">متابعة التسوق</Link>
      </div>
    );

  return (
    <>
      <PageHero title="إتمام الطلب" />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (saving) return;
          setError("");
          const form = new FormData(e.currentTarget);
          const id = requestId || crypto.randomUUID();
          setRequestId(id);
          const parsed = checkoutSchema.safeParse({ requestId: id, firstName: form.get("firstName"), lastName: form.get("lastName"), phone: form.get("phone"), email: form.get("email"), city: form.get("city"), district: form.get("district"), address: form.get("address"), paymentMethod: pay, items: cart.map(({ productId, size, qty }) => ({ productId, size, qty })) });
          if (!parsed.success) { setError(cart.length ? "راجع بيانات التوصيل ورقم الجوال." : "السلة فارغة، أضف منتجات أولًا."); return; }
          setSaving(true);
          try {
            const result = await saveOrder({ data: parsed.data });
            if (!result.ok) { setError(result.error); return; }
            setDone(result.orderNumber);
            clearCart();
          } catch { setError("تعذر حفظ الطلب. حاول مرة أخرى؛ منتجاتك ما زالت في السلة."); }
          finally { setSaving(false); }
        }}
        className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:px-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <section>
            <h2 className="mb-5 text-2xl font-bold">بيانات التوصيل</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="firstName" required maxLength={100} placeholder="الاسم الأول" aria-label="الاسم الأول" className="field" />
              <input name="lastName" required maxLength={100} placeholder="اسم العائلة" aria-label="اسم العائلة" className="field" />
              <input name="phone" type="tel" required maxLength={20} placeholder="رقم الجوال" aria-label="رقم الجوال" className="field" />
              <input name="email" type="email" maxLength={254} placeholder="البريد الإلكتروني" aria-label="البريد الإلكتروني" className="field" />
              <select name="city" aria-label="المدينة" className="field">{cities.map((c) => <option key={c}>{c}</option>)}</select>
              <input name="district" required maxLength={150} placeholder="الحي" aria-label="الحي" className="field" />
              <input name="address" required maxLength={500} placeholder="العنوان التفصيلي" aria-label="العنوان التفصيلي" className="field sm:col-span-2" />
            </div>
          </section>
          <section>
            <h2 className="mb-5 text-2xl font-bold">طريقة الدفع</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { v: "mada", l: "بطاقة مدى" },
                { v: "card", l: "فيزا / ماستركارد" },
                { v: "apple", l: "أبل باي" },
                { v: "tabby", l: "تابي - قسّمها على ٤" },
                { v: "cod", l: "الدفع عند الاستلام" },
              ].map((m) => (
                <label key={m.v} className={`flex items-center gap-3 rounded-lg border p-4 ${m.v !== "cod" ? "opacity-50" : "cursor-pointer"} ${pay === m.v ? "border-gold bg-gold-soft" : ""}`}>
                  <input type="radio" name="pay" disabled={m.v !== "cod"} checked={pay === m.v} onChange={() => setPay(m.v)} className="accent-gold" />
                  <CreditCard className="h-4 w-4 text-gold" /> {m.l}{m.v !== "cod" && <span className="text-xs text-muted-foreground">غير متاح حاليًا</span>}
                </label>
              ))}
            </div>
            {(pay === "mada" || pay === "card") && (
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <input placeholder="رقم البطاقة" className="field sm:col-span-3" />
                <input placeholder="الاسم على البطاقة" className="field" />
                <input placeholder="تاريخ الانتهاء" className="field" />
                <input placeholder="رمز التحقق" className="field" />
              </div>
            )}
          </section>
        </div>
        <OrderSummary subtotal={cartTotal}>
          {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
          {!cart.length && <p className="mt-4 text-sm text-muted-foreground">السلة فارغة. <Link to="/shop" className="text-gold">متابعة التسوق</Link></p>}
          <Button type="submit" disabled={saving || !cart.length} className="btn-gold mt-6 h-auto w-full">{saving ? "جارٍ حفظ الطلب…" : "تأكيد الطلب"}</Button>
        </OrderSummary>
      </form>
    </>
  );
}
