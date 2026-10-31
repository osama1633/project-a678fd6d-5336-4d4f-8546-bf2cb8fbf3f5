import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, CreditCard } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/store/ProductCard";
import { useStore } from "@/lib/store";
import { OrderSummary } from "@/components/store/OrderSummary";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب | لوفيانا" },
      { name: "description", content: "أدخل بيانات الشحن والدفع لإتمام طلبك." },
      { property: "og:title", content: "إتمام الطلب | لوفيانا" },
      { property: "og:description", content: "خطوة أخيرة لتصلك لوحتك." },
    ],
  }),
  component: Checkout,
});

const cities = ["الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "أبها", "تبوك"];

function Checkout() {
  const { cartTotal, clearCart } = useStore();
  const [pay, setPay] = useState("mada");
  const [done, setDone] = useState(false);

  if (done)
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-6 text-4xl font-bold">شكراً لطلبك!</h1>
        <p className="mt-3 text-muted-foreground">تم استلام طلبك رقم #١٠٢٥ وسنتواصل معك لتأكيد موعد التوصيل.</p>
        <Link to="/shop" className="btn-gold mt-8">متابعة التسوق</Link>
      </div>
    );

  return (
    <>
      <PageHero title="إتمام الطلب" />
      <form
        onSubmit={(e) => { e.preventDefault(); clearCart(); setDone(true); }}
        className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:px-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <section>
            <h2 className="mb-5 text-2xl font-bold">بيانات التوصيل</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="الاسم الأول" className="field" />
              <input required placeholder="اسم العائلة" className="field" />
              <input required placeholder="رقم الجوال" className="field" />
              <input type="email" placeholder="البريد الإلكتروني" className="field" />
              <select className="field">{cities.map((c) => <option key={c}>{c}</option>)}</select>
              <input required placeholder="الحي" className="field" />
              <input required placeholder="العنوان التفصيلي" className="field sm:col-span-2" />
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
                <label key={m.v} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${pay === m.v ? "border-gold bg-gold-soft" : ""}`}>
                  <input type="radio" name="pay" checked={pay === m.v} onChange={() => setPay(m.v)} className="accent-gold" />
                  <CreditCard className="h-4 w-4 text-gold" /> {m.l}
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
          <button type="submit" className="btn-gold mt-6 w-full">تأكيد الطلب</button>
        </OrderSummary>
      </form>
    </>
  );
}
