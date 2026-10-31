import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, Frame, ShieldCheck, Truck } from "lucide-react";
import { formatPrice, images, ProductImg, useCatalog, type Product } from "@/data/products";
import { ProductCard } from "@/components/store/ProductCard";

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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-gold">
      <span className="h-px w-10 bg-gold" /> {children}
    </div>
  );
}

function Heading({ eyebrow, title, sub, center }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={`mb-14 max-w-2xl ${center ? "mx-auto text-center [&>div]:justify-center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-4xl leading-[1.3] font-semibold md:text-5xl">{title}</h2>
      {sub && <p className="mt-5 leading-8 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function EditorialFeature({ p, reverse, index }: { p: Product; reverse?: boolean; index: string }) {
  const { getCategory } = useCatalog();
  return (
    <div className={`grid items-center gap-10 md:grid-cols-12 md:gap-16 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
      <Link to="/product/$id" params={{ id: p.id }} className="group relative md:col-span-7">
        <div className="overflow-hidden rounded-sm">
          <ProductImg src={p.image} alt={p.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-[1.4s] ease-out group-hover:scale-[1.04] md:aspect-[5/6]" />
        </div>
        <div className={`absolute -bottom-5 hidden h-24 w-24 border border-gold/60 md:block ${reverse ? "-right-5" : "-left-5"}`} />
      </Link>
      <div className="md:col-span-5">
        <div className="font-display text-7xl text-gold/30">{index}</div>
        <div className="mt-2 text-sm text-muted-foreground">{getCategory(p.category)?.name}</div>
        <h3 className="mt-2 text-4xl font-semibold md:text-5xl">{p.name}</h3>
        <p className="mt-6 leading-8 text-muted-foreground">{p.description}</p>
        <div className="mt-8 flex items-baseline gap-3">
          <span className="font-display text-2xl">{formatPrice(p.price)}</span>
          {p.oldPrice && <span className="text-muted-foreground line-through">{formatPrice(p.oldPrice)}</span>}
        </div>
        <Link to="/product/$id" params={{ id: p.id }} className="group mt-8 inline-flex items-center gap-3 border-b border-foreground pb-2 text-sm font-semibold transition hover:border-gold hover:text-gold">
          اكتشف اللوحة <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function Home() {
  const { products, categories, getCategory } = useCatalog();
  const best = [...products].filter((p) => p.bestSeller).sort((a, b) => b.reviews - a.reviews);
  const [lead, ...restBest] = best;
  const fresh = products.filter((p) => p.isNew).slice(0, 4);
  const editorial = ["golden-face", "arabian-horse"].map((id) => products.find((p) => p.id === id)).filter((p): p is Product => !!p);

  return (
    <>
      {/* Full-width hero */}
      <section className="relative -mt-px h-[88vh] min-h-[560px] w-full overflow-hidden bg-ink">
        <img src={images.a1} alt="لوحة الكلاسيكية الذهبية في مجلس فاخر" className="absolute inset-0 h-full w-full scale-105 object-cover opacity-80 [animation:heroZoom_14s_ease-out_forwards]" />
        <div className="absolute inset-0 bg-gradient-to-l from-ink/85 via-ink/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 md:px-10">
          <div className="max-w-2xl text-ink-foreground">
            <div className="fade-up"><Eyebrow>مجموعة خريف ٢٠٢٦</Eyebrow></div>
            <h1 className="fade-up text-5xl leading-[1.25] font-semibold [animation-delay:.15s] sm:text-6xl md:text-8xl">
              حيثُ يسكنُ <span className="text-gold">الفن</span>
              <br /> جدرانَ بيتك
            </h1>
            <p className="fade-up mt-8 max-w-md text-base leading-8 opacity-80 [animation-delay:.3s] md:text-lg">
              أعمال فنية منتقاة بعناية، مطبوعة بجودة متحفية ومؤطرة يدوياً في الرياض.
            </p>
            <div className="fade-up mt-10 flex flex-wrap items-center gap-6 [animation-delay:.45s]">
              <Link to="/shop" className="btn-gold !rounded-sm !px-9 !py-4">اكتشف المجموعة <ArrowLeft className="h-4 w-4" /></Link>
              <Link to="/shop" search={{ category: "custom" }} className="border-b border-ink-foreground/50 pb-1 text-sm transition hover:border-gold hover:text-gold">صمّم لوحتك الخاصة</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-ink-foreground/70 md:flex">
          <span>اكتشف</span><span className="h-10 w-px animate-pulse bg-gold" />
        </div>
      </section>

      {/* Brand promise */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <div className="mx-auto mb-8 h-12 w-px bg-gold" />
        <p className="font-display text-2xl leading-[1.9] md:text-4xl md:leading-[1.8]">
          نؤمن أن اللوحة ليست زينةً فحسب، بل <span className="text-gold">حكايةٌ</span> تمنح المكان روحه وهويته.
        </p>
        <div className="mt-16 grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
          {[
            { i: Truck, t: "شحن لكل المملكة" },
            { i: Frame, t: "تأطير يدوي" },
            { i: Award, t: "جودة متحفية" },
            { i: ShieldCheck, t: "دفع آمن" },
          ].map(({ i: I, t }) => (
            <div key={t} className="flex flex-col items-center gap-3 text-muted-foreground">
              <I className="h-5 w-5 text-gold" strokeWidth={1.4} /> {t}
            </div>
          ))}
        </div>
      </section>

      {/* Collections — editorial mosaic */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Heading eyebrow="المجموعات" title="عوالم فنية لكل ذوق" sub="من سكينة الحرف إلى جرأة التجريد، اختر المجموعة التي تشبهك." />
          <Link to="/shop" className="mb-14 text-sm font-semibold text-gold hover:underline">جميع المجموعات ←</Link>
        </div>
        <div className="grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-5">
          {categories.map((c, idx) => {
            const span = idx === 0 ? "col-span-2 row-span-2" : idx === 5 ? "md:col-span-2" : "";
            return (
              <Link key={c.slug} to="/shop" search={{ category: c.slug }} className={`group relative overflow-hidden rounded-sm ${span}`}>
                <ProductImg src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-ink-fade opacity-90 transition group-hover:opacity-100" />
                <div className="absolute inset-3 border border-ink-foreground/0 transition duration-500 group-hover:border-ink-foreground/40" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-ink-foreground md:p-7">
                  <div className={`font-display font-semibold ${idx === 0 ? "text-3xl md:text-4xl" : "text-xl"}`}>{c.name}</div>
                  <div className="mt-1 max-h-0 overflow-hidden text-xs opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-80">{c.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Best sellers — showcase */}
      <section className="mt-32 bg-secondary/50 py-24 md:mt-40 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Heading center eyebrow="الأكثر طلباً" title="أعمال اختارها عملاؤنا" />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {lead && (
              <Link to="/product/$id" params={{ id: lead.id }} className="group relative block overflow-hidden rounded-sm">
                <ProductImg src={lead.image} alt={lead.name} className="aspect-[4/5] h-full w-full object-cover transition duration-[1.4s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-ink-fade" />
                <span className="absolute top-6 right-6 rounded-full bg-gold-gradient px-4 py-1.5 text-xs font-semibold text-gold-foreground">الأكثر مبيعاً</span>
                <div className="absolute inset-x-0 bottom-0 p-8 text-ink-foreground md:p-10">
                  <div className="text-sm opacity-70">{getCategory(lead.category)?.name}</div>
                  <h3 className="mt-2 text-4xl font-semibold">{lead.name}</h3>
                  <div className="mt-3 text-gold">{formatPrice(lead.price)}</div>
                </div>
              </Link>
            )}
            <div className="grid grid-cols-2 gap-x-5 gap-y-10">
              {restBest.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial features */}
      <section className="mx-auto max-w-7xl space-y-28 px-6 py-28 md:space-y-40 md:px-10 md:py-40">
        <Heading eyebrow="مختارات المحرّر" title="قطعٌ تستحق أن تُروى" />
        {editorial.map((p, i) => <EditorialFeature key={p.id} p={p} index={i ? "٠٢" : "٠١"} reverse={i === 1} />)}
      </section>

      {/* Full-bleed promo */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img src={images.a8} alt="معرض المناظر" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/70 to-ink/20" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
          <div className="max-w-xl">
            <Eyebrow>عرض لفترة محدودة</Eyebrow>
            <h2 className="text-4xl leading-[1.3] font-semibold md:text-6xl">خصم ٢٠٪ على<br />اللوحات متعددة القطع</h2>
            <p className="mt-6 opacity-70">استخدم الكود <span className="border border-gold/50 px-2 py-0.5 text-gold">رواق٢٠</span> عند إتمام الطلب.</p>
            <Link to="/shop" search={{ category: "multi" }} className="btn-gold mt-10 !rounded-sm !px-9 !py-4">اكتشف العرض</Link>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Heading eyebrow="وصل حديثاً" title="أحدث الإضافات إلى الرواق" />
          <Link to="/shop" search={{ sort: "new" }} className="mb-14 text-sm font-semibold text-gold hover:underline">عرض الكل ←</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {fresh.map((p, i) => (
            <div key={p.id} className={i % 2 ? "md:mt-16" : ""}><ProductCard product={p} /></div>
          ))}
        </div>
      </section>

      {/* Dual collection banners */}
      <section className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-2 md:px-10">
        {[
          { img: images.a9, e: "حسب الطلب", t: "لوحتك… بتوقيعك", d: "نحوّل فكرتك إلى عمل فني فريد", c: "custom" },
          { img: images.a7, e: "عصري", t: "المجموعة العصرية", d: "قطع مركزية للمجالس الفاخرة", c: "modern" },
        ].map((b) => (
          <Link key={b.t} to="/shop" search={{ category: b.c }} className="group relative h-[480px] overflow-hidden rounded-sm md:h-[560px]">
            <img src={b.img} alt={b.t} loading="lazy" className="h-full w-full object-cover transition duration-[1.4s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-ink-fade" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-ink-foreground md:p-12">
              <div className="text-xs tracking-[0.2em] text-gold">{b.e}</div>
              <h3 className="mt-3 text-4xl font-semibold">{b.t}</h3>
              <p className="mt-2 opacity-80">{b.d}</p>
              <span className="mt-6 inline-flex items-center gap-2 border-b border-gold pb-1 text-sm">تسوّق المجموعة <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" /></span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
