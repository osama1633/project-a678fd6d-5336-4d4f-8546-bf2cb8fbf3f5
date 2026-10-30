import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/shop", label: "المتجر" },
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "تواصل معنا" },
] as const;

export function SiteHeader() {
  const { cartCount, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="bg-ink py-2 text-center text-xs text-ink-foreground">
        شحن مجاني لجميع مدن المملكة للطلبات فوق ٥٠٠ ر.س
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 md:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-gradient font-display text-lg font-bold text-gold-foreground">ر</span>
          <span className="truncate font-display text-2xl font-bold tracking-tight">رواق</span>
        </Link>
        <nav className="hidden justify-center gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "!text-foreground border-b-2 border-gold pb-1" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="col-start-3 flex items-center gap-1">
          <Link to="/shop" aria-label="بحث" className="hidden rounded-full p-2 hover:bg-muted sm:block"><Search className="h-5 w-5" /></Link>
          <Link to="/wishlist" aria-label="المفضلة" className="relative rounded-full p-2 hover:bg-muted">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && <span className="absolute -top-0.5 -left-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] text-gold-foreground">{wishlist.length}</span>}
          </Link>
          <Link to="/cart" aria-label="السلة" className="relative rounded-full p-2 hover:bg-muted">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && <span className="absolute -top-0.5 -left-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] text-gold-foreground">{cartCount}</span>}
          </Link>
          <button aria-label="القائمة" onClick={() => setOpen(!open)} className="rounded-full p-2 hover:bg-muted md:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col border-t px-4 py-3 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 font-medium">{n.label}</Link>
          ))}
          <Link to="/wishlist" onClick={() => setOpen(false)} className="py-3 font-medium">المفضلة</Link>
        </nav>
      )}
    </header>
  );
}
