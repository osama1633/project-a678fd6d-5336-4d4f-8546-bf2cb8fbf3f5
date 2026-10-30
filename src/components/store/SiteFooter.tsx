import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div>
          <div className="font-display text-3xl font-bold">رواق</div>
          <p className="mt-4 text-sm leading-7 opacity-70">دار سعودية للفن الجداري، ننتقي لوحات تحكي قصة بيتك بذوق رفيع وجودة متحفية.</p>
        </div>
        <div>
          <h4 className="mb-4 text-gold">الأقسام</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}><Link to="/shop" search={{ category: c.slug }}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-gold">روابط</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/about">من نحن</Link></li>
            <li><Link to="/contact">تواصل معنا</Link></li>
            <li><Link to="/wishlist">المفضلة</Link></li>
            <li><Link to="/cart">سلة التسوق</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-gold">تواصل</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> الرياض، حي الملقا</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <span dir="ltr">٩٢٠٠٠٠٠٠٠</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> البريد الإلكتروني للمتجر</li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4" /> رواق للفنون</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 py-6 text-center text-xs opacity-60">© ٢٠٢٦ رواق للفنون. جميع الحقوق محفوظة.</div>
    </footer>
  );
}
