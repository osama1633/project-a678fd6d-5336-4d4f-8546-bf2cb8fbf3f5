import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/data/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن | لوفيانا للفنون" },
      { name: "description", content: "قصة لوفيانا: دار سعودية للفن الجداري الفاخر." },
      { property: "og:title", content: "من نحن | لوفيانا" },
      { property: "og:description", content: "نؤمن أن لكل جدار حكاية." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <div className="text-sm text-gold">قصتنا</div>
          <h1 className="mt-3 text-5xl leading-tight font-bold">لكل جدارٍ حكاية،<br />ونحن نرويها بالفن</h1>
          <p className="mt-6 leading-8 text-muted-foreground">انطلقت لوفيانا من الرياض عام ٢٠٢٠ بحلم بسيط: أن يصبح الفن الراقي جزءاً من كل بيت سعودي. نعمل مع فنانين محليين وعالميين، وننتقي كل لوحة بعناية، ثم نطبعها ونؤطرها يدوياً في مشغلنا بأعلى معايير الجودة.</p>
          <p className="mt-4 leading-8 text-muted-foreground">من الخط العربي الأصيل إلى الفن التجريدي المعاصر، نؤمن أن اللوحة المناسبة قادرة على تغيير روح المكان.</p>
          <Link to="/shop" className="btn-gold mt-8">اكتشف مجموعتنا</Link>
        </div>
        <img src={images.a7} alt="لوحة ملامح الذهب في ردهة فاخرة" className="aspect-[4/5] w-full rounded-2xl object-cover shadow-soft" />
      </div>
      <div className="mt-24 grid gap-6 md:grid-cols-3">
        {[
          { t: "انتقاء فني", d: "فريق من المختصين يختار كل عمل وفق معايير جمالية دقيقة." },
          { t: "صناعة محلية", d: "طباعة وتأطير يدوي في مشغلنا بالرياض." },
          { t: "تجربة راقية", d: "تغليف فاخر وتوصيل آمن حتى باب منزلك." },
        ].map((v) => (
          <div key={v.t} className="rounded-2xl border bg-card p-8">
            <div className="mb-4 h-1 w-10 bg-gold" />
            <h3 className="text-2xl font-bold">{v.t}</h3>
            <p className="mt-3 text-muted-foreground">{v.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
