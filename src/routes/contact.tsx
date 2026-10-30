import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/store/ProductCard";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | رواق للفنون" },
      { name: "description", content: "تواصل مع فريق رواق للاستفسارات والطلبات الخاصة." },
      { property: "og:title", content: "تواصل معنا | رواق" },
      { property: "og:description", content: "يسعدنا خدمتك." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero title="تواصل معنا" subtitle="فريقنا جاهز لمساعدتك في اختيار اللوحة المثالية أو تنفيذ طلبك الخاص" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { i: MapPin, t: "المعرض", d: "الرياض، حي الملقا، طريق أنس بن مالك" },
            { i: Phone, t: "الهاتف", d: "٩٢٠٠٠٠٠٠٠" },
            { i: Mail, t: "البريد", d: "راسلنا عبر النموذج" },
            { i: Clock, t: "ساعات العمل", d: "السبت - الخميس، ١٠ص - ١٠م" },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="flex items-center gap-4 rounded-xl border bg-card p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-soft text-gold"><I className="h-5 w-5" /></span>
              <div><div className="font-semibold">{t}</div><div className="text-sm text-muted-foreground">{d}</div></div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("تم إرسال رسالتك، سنتواصل معك قريباً"); (e.target as HTMLFormElement).reset(); }}
          className="grid gap-4 rounded-2xl border bg-card p-8 sm:grid-cols-2">
          <input required placeholder="الاسم" className="field" />
          <input required placeholder="رقم الجوال" className="field" />
          <input type="email" placeholder="البريد الإلكتروني" className="field sm:col-span-2" />
          <select className="field sm:col-span-2"><option>استفسار عام</option><option>لوحة حسب الطلب</option><option>طلب قائم</option><option>شراكات</option></select>
          <textarea required rows={5} placeholder="رسالتك" className="field sm:col-span-2" />
          <button className="btn-gold sm:col-span-2">إرسال الرسالة</button>
        </form>
      </div>
    </>
  );
}
