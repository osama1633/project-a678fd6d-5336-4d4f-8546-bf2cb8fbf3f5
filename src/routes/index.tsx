import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, Frame, ShieldCheck, Truck } from "lucide-react";
import { categories, images, products } from "@/data/products";
import { ProductCard, SectionHeading } from "@/components/store/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "رواق | لوحات فنية جدارية فاخرة في السعودية" },
      { name: "description", content: "اكتشف لوحات جدارية فاخرة: إسلامية، تجريدية، طبيعة، سيارات ومدن. شحن لجميع مدن المملكة." },
      { property: "og:title", content: "رواق | لوحات فنية جدارية فاخرة" },
      { property: "og:description", content: "دار سعودية للفن الجداري بجودة متحفية." },
    ],
  }),
  component: Home,
});

function Home() {
  const best = products.filter((p) => p.bestSeller).slice(0, 4);
  const fresh = products.filter((p) => p.isNew).slice(0, 4);
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-8 md:py-20">
          <div className="fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft px-4 py-1.5 text-xs font-medium text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> مجموعة خريف ٢٠٢٦
            </div>
            <h1 className="text-5xl leading-[1.25] font-bold md:text-7xl">فنٌّ يليق<br /><span className="text-gold">بجدران بيتك</span></h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">لوحات منتقاة بعناية، مطبوعة بجودة متحفية ومؤطرة يدوياً في الرياض، لتمنح مساحتك حضوراً لا يُنسى.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-gold">تسوّق الآن <ArrowLeft className="h-4 w-4" /></Link>
              <Link to="/shop" search={{ category: "custom" }} className="btn-outline">صمّم لوحتك</Link>
            </div>
            <div className="mt-10 flex gap-10 text-sm">
              <div><div className="font-display text-3xl font-bold">+١٢٠٠</div><div className="text-muted-foreground">عميل سعيد</div></div>
              <div><div className="font-display text-3xl font-bold">+٣٠٠</div><div className="text-muted-foreground">لوحة أصلية</div></div>
              <div><div className="font-display text-3xl font-bold">٤٫٩</div><div className="text-muted-foreground">متوسط التقييم</div></div>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-soft">
              <img src={images.a1} alt="لوحة الكلاسيكية الذهبية معلّقة في غرفة معيشة" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 right-6 hidden rounded-xl bg-card p-4 shadow-soft sm:block">
              <div className="text-xs text-muted-foreground">الأكثر مبيعاً</div>
              <div className="font-display text-lg font-semibold">الكلاسيكية الذهبية</div>
              <div className="text-sm text-gold">من ٣٤٩ ر.س</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4 md:px-8">
          {[
            { i: Truck, t: "شحن سريع", d: "لجميع مدن المملكة" },
            { i: Frame, t: "تأطير يدوي", d: "خشب طبيعي فاخر" },
            { i: Award, t: "جودة متحفية", d: "أحبار تدوم ١٠٠ عام" },
            { i: ShieldCheck, t: "دفع آمن", d: "مدى، أبل باي، تابي" },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-soft text-gold"><I className="h-5 w-5" /></span>
              <div><div className="font-semibold">{t}</div><div className="text-xs text-muted-foreground">{d}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <SectionHeading eyebrow="تصفّح حسب الذوق" title="المجموعات المميزة" action={<Link to="/shop" className="text-sm font-medium text-gold">عرض الكل ←</Link>} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c, idx) => (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }}
              className={`group relative overflow-hidden rounded-xl ${idx === 0 || idx === 5 ? "md:row-span-2" : ""}`}>
              <img src={c.image} alt={c.name} loading="lazy" className="h-full min-h-48 w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-ink-fade" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-ink-foreground">
                <div className="font-display text-xl font-semibold">{c.name}</div>
                <div className="text-xs opacity-80">{c.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow="اختيارات عملائنا" title="الأكثر مبيعاً" action={<Link to="/shop" search={{ sort: "popular" }} className="text-sm font-medium text-gold">عرض الكل ←</Link>} />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {best.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promo banner */}
      <section className="mx-auto mt-24 max-w-7xl px-4 md:px-8">
        <div className="grid overflow-hidden rounded-2xl bg-ink text-ink-foreground md:grid-cols-2">
          <div className="flex flex-col justify-center p-10 md:p-16">
            <div className="text-sm text-gold">عرض لفترة محدودة</div>
            <h2 className="mt-3 text-4xl leading-tight font-bold md:text-5xl">خصم ٢٠٪ على اللوحات<br />متعددة القطع</h2>
            <p className="mt-4 opacity-70">استخدم الكود <span className="rounded bg-gold/20 px-2 py-0.5 font-semibold text-gold">رواق٢٠</span> عند الدفع.</p>
            <Link to="/shop" search={{ category: "multi" }} className="btn-gold mt-8 self-start">اكتشف العرض</Link>
          </div>
          <img src={images.a8} alt="معرض المناظر" className="h-72 w-full object-cover md:h-full" />
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <SectionHeading eyebrow="وصل حديثاً" title="أحدث الإضافات" action={<Link to="/shop" search={{ sort: "new" }} className="text-sm font-medium text-gold">عرض الكل ←</Link>} />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {fresh.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Dual promos */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-2 md:px-8">
        {[
          { img: images.a9, t: "لوحتك… بتوقيعك", d: "نحوّل فكرتك أو صورتك إلى عمل فني", c: "custom" },
          { img: images.a7, t: "المجموعة العصرية", d: "قطع مركزية للمجالس الفاخرة", c: "modern" },
        ].map((b) => (
          <Link key={b.t} to="/shop" search={{ category: b.c }} className="group relative h-80 overflow-hidden rounded-2xl">
            <img src={b.img} alt={b.t} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-ink-fade" />
            <div className="absolute bottom-0 p-8 text-ink-foreground">
              <h3 className="text-3xl font-bold">{b.t}</h3>
              <p className="mt-1 opacity-80">{b.d}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
