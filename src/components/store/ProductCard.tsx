import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, getCategory, type Product } from "@/data/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const liked = wishlist.includes(product.id);
  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden rounded-lg bg-muted">
        <Link to="/product/$id" params={{ id: product.id }} className="block aspect-[4/5]">
          <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </Link>
        {product.badge && (
          <span className="absolute top-3 right-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground">{product.badge}</span>
        )}
        <button aria-label="أضف إلى المفضلة" onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 left-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 transition hover:scale-110">
          <Heart className={`h-4 w-4 ${liked ? "fill-gold text-gold" : ""}`} />
        </button>
        <button
          onClick={() => { const s = product.sizes[0]; if (s) addToCart({ productId: product.id, size: s.label, price: s.price }); toast.success("تمت الإضافة إلى السلة"); }}
          className="absolute inset-x-3 bottom-3 flex translate-y-14 items-center justify-center gap-2 rounded-md bg-ink py-2.5 text-sm font-semibold text-ink-foreground transition group-hover:translate-y-0">
          <ShoppingBag className="h-4 w-4" /> أضف إلى السلة
        </button>
      </div>
      <div className="mt-4 space-y-1">
        <div className="text-xs text-muted-foreground">{getCategory(product.category)?.name}</div>
        <Link to="/product/$id" params={{ id: product.id }} className="block font-display text-lg font-semibold">{product.name}</Link>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {product.rating} ({product.reviews} تقييم)
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="text-sm text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>}
        </div>
      </div>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <div className="mb-2 text-sm font-medium text-gold">{eyebrow}</div>}
        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="border-b bg-secondary/60">
      <div className="mx-auto max-w-7xl px-4 py-14 text-center md:px-8">
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}
