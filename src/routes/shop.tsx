import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { categories, products } from "@/data/products";
import { PageHero, ProductCard } from "@/components/store/ProductCard";

type Search = { category?: string; sort?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
  }),
  head: () => ({
    meta: [
      { title: "المتجر | رواق للوحات الجدارية" },
      { name: "description", content: "تسوّق اللوحات الجدارية حسب القسم والسعر." },
      { property: "og:title", content: "المتجر | رواق" },
      { property: "og:description", content: "تشكيلة كاملة من اللوحات الفنية الفاخرة." },
    ],
  }),
  component: Shop,
});

const sorts = [
  { v: "featured", l: "المميزة" },
  { v: "popular", l: "الأكثر مبيعاً" },
  { v: "new", l: "الأحدث" },
  { v: "price-asc", l: "السعر: من الأقل" },
  { v: "price-desc", l: "السعر: من الأعلى" },
];

function Shop() {
  const { category, sort = "featured" } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  let list = category ? products.filter((p) => p.category === category) : [...products];
  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
  if (sort === "popular") list.sort((a, b) => b.reviews - a.reviews);
  if (sort === "new") list = [...list.filter((p) => p.isNew), ...list.filter((p) => !p.isNew)];
  const current = categories.find((c) => c.slug === category);

  const chip = (active: boolean) =>
    `whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${active ? "border-foreground bg-foreground text-background" : "hover:border-foreground"}`;

  return (
    <>
      <PageHero title={current?.name ?? "جميع اللوحات"} subtitle={current?.desc ?? "تشكيلة منتقاة من أجمل الأعمال الفنية لكل زاوية في بيتك"} />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-wrap lg:px-0">
            <Link to="/shop" search={(p) => ({ ...p, category: undefined })} className={chip(!category)}>الكل</Link>
            {categories.map((c) => (
              <Link key={c.slug} to="/shop" search={(p) => ({ ...p, category: c.slug })} className={chip(category === c.slug)}>{c.name}</Link>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-sm text-muted-foreground">{list.length} منتج</span>
            <select aria-label="ترتيب" value={sort} onChange={(e) => navigate({ search: (p) => ({ ...p, sort: e.target.value }) })} className="field !w-auto">
              {sorts.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
            </select>
          </div>
        </div>
        {list.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed py-24 text-center">
            <h3 className="text-2xl font-bold">مجموعة جديدة قريباً</h3>
            <p className="mt-2 text-muted-foreground">نعمل على إضافة لوحات هذا القسم، تابعنا قريباً.</p>
            <Link to="/shop" search={{}} className="btn-ink mt-6">تصفّح جميع اللوحات</Link>
          </div>
        )}
      </div>
    </>
  );
}
