import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Bell, ClipboardList, Home, LayoutGrid, LogOut, Menu, Package, Search, Settings, Tag, User, X } from "lucide-react";
import { useState } from "react";
import { images } from "@/data/products";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم | رواق" },
      { name: "description", content: "لوحة إدارة متجر رواق." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "لوحة التحكم | رواق" },
      { property: "og:description", content: "إدارة المتجر." },
    ],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "لوحة التحكم", icon: Home },
  { to: "/admin/orders", label: "الطلبات", icon: ClipboardList },
  { to: "/admin/products", label: "المنتجات", icon: Package },
  { to: "/admin/categories", label: "الأقسام", icon: LayoutGrid },
  { to: "/admin/customers", label: "العملاء", icon: User },
  { to: "/admin/coupons", label: "الكوبونات", icon: Tag },
  { to: "/admin/reports", label: "التقارير", icon: BarChart3 },
  { to: "/admin/settings", label: "الإعدادات", icon: Settings },
] as const;

function AdminLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className={`fixed inset-y-0 right-0 z-50 w-64 shrink-0 flex-col overflow-hidden bg-ink text-ink-foreground lg:sticky lg:top-0 lg:flex lg:h-screen ${open ? "flex" : "hidden"}`}>
        <img src={images.a7} alt="" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full object-cover opacity-25" />
        <div className="relative flex items-center justify-between p-6">
          <Link to="/" className="font-display text-2xl font-bold">رواق</Link>
          <button aria-label="إغلاق" onClick={() => setOpen(false)} className="lg:hidden"><X className="h-5 w-5" /></button>
        </div>
        <nav className="relative flex-1 space-y-1 px-3">
          {nav.map(({ to, label, icon: I }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} activeOptions={{ exact: to === "/admin" }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm opacity-80 transition hover:bg-ink-foreground/10 hover:opacity-100"
              activeProps={{ className: "!opacity-100 bg-gold-gradient text-gold-foreground shadow-gold" }}>
              <I className="h-5 w-5" /> {label}
            </Link>
          ))}
        </nav>
        <Link to="/" className="relative m-3 flex items-center gap-3 px-4 py-3 text-sm opacity-80 hover:opacity-100"><LogOut className="h-5 w-5" /> تسجيل الخروج</Link>
      </aside>
      {open && <div className="fixed inset-0 z-40 bg-ink/50 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b bg-card/90 px-4 py-3 backdrop-blur md:px-8">
          <button aria-label="القائمة" onClick={() => setOpen(true)} className="lg:hidden"><Menu className="h-5 w-5" /></button>
          <div className="relative max-w-md flex-1">
            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="ابحث عن منتج أو طلب أو عميل..." className="field !py-2 !pr-10" />
          </div>
          <div className="mr-auto flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3 py-1.5 text-xs font-semibold text-gold transition hover:bg-gold-soft sm:text-sm">
              <ArrowRight className="h-4 w-4" /> <span className="hidden sm:inline">الصفحة الرئيسية</span>
            </Link>
            <button aria-label="الإشعارات" className="relative"><Bell className="h-5 w-5" /><span className="absolute -top-1 -left-1 grid h-4 w-4 place-items-center rounded-full bg-destructive text-[10px] text-destructive-foreground">٣</span></button>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-soft font-semibold text-gold">ع</span>
              <div className="hidden text-sm sm:block"><div className="font-semibold">أهلاً وسهلاً</div><div className="text-xs text-muted-foreground">مدير المتجر</div></div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
