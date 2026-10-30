import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, Star, Truck, RotateCcw, Frame } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice, getCategory, getProduct, products } from "@/data/products";
import { ProductCard, SectionHeading } from "@/components/store/ProductCard";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} | رواق` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} | رواق` },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [{ title: "غير متوفر | رواق" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [sizeIdx, setSizeIdx] = useState(0);
  const [frame, setFrame] = useState("أسود");
  const [qty, setQty] = useState(1);
  const size = product.sizes[sizeIdx];
  const liked = wishlist.includes(product.id);
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/">الرئيسية</Link> / <Link to="/shop">المتجر</Link> / <span className="text-foreground">{product.name}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-[1fr] gap-3">
          <div className="overflow-hidden rounded-2xl bg-muted">
            <img src={product.image} alt={product.name} className="max-h-[80vh] w-full object-cover" />
          </div>
        </div>
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="text-sm text-gold">{getCategory(product.category)?.name}</div>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div>
            {product.rating} · {product.reviews} تقييم
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold">{formatPrice(size.price)}</span>
            {product.oldPrice && sizeIdx === 0 && <span className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>}
            <span className="text-xs text-muted-foreground">شامل الضريبة</span>
          </div>
          <p className="mt-6 leading-8 text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <div className="mb-3 font-semibold">المقاس</div>
            <div className="grid grid-cols-3 gap-3">
              {product.sizes.map((s, i) => (
                <button key={s.label} onClick={() => setSizeIdx(i)}
                  className={`rounded-lg border p-3 text-center transition ${i === sizeIdx ? "border-gold bg-gold-soft" : "hover:border-foreground"}`}>
                  <div className="font-semibold">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.dims}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-3 font-semibold">لون الإطار: <span className="font-normal text-muted-foreground">{frame}</span></div>
            <div className="flex gap-2">
              {["أسود", "خشب طبيعي", "ذهبي", "بدون إطار"].map((f) => (
                <button key={f} onClick={() => setFrame(f)} className={`rounded-full border px-4 py-2 text-sm ${frame === f ? "border-foreground bg-foreground text-background" : ""}`}>{f}</button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <div className="flex items-center rounded-lg border">
              <button aria-label="زيادة" onClick={() => setQty(qty + 1)} className="p-3"><Plus className="h-4 w-4" /></button>
              <span className="w-8 text-center">{qty}</span>
              <button aria-label="إنقاص" onClick={() => setQty(Math.max(1, qty - 1))} className="p-3"><Minus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => { addToCart({ productId: product.id, size: size.label, price: size.price }, qty); toast.success("تمت الإضافة إلى السلة"); }} className="btn-gold flex-1">
              أضف إلى السلة
            </button>
            <button aria-label="المفضلة" onClick={() => toggleWishlist(product.id)} className="grid w-12 place-items-center rounded-lg border">
              <Heart className={`h-5 w-5 ${liked ? "fill-gold text-gold" : ""}`} />
            </button>
          </div>
          <div className="mt-8 grid gap-3 rounded-xl bg-secondary/60 p-5 text-sm">
            <div className="flex items-center gap-3"><Truck className="h-4 w-4 text-gold" /> توصيل خلال ٣-٥ أيام عمل</div>
            <div className="flex items-center gap-3"><Frame className="h-4 w-4 text-gold" /> تأطير يدوي مع زجاج مضاد للانعكاس</div>
            <div className="flex items-center gap-3"><RotateCcw className="h-4 w-4 text-gold" /> استرجاع مجاني خلال ١٤ يوماً</div>
          </div>
        </div>
      </div>
      <section className="mt-24">
        <SectionHeading title="قد يعجبك أيضاً" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
