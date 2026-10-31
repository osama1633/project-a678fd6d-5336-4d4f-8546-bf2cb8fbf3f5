import { createFileRoute, Link } from "@tanstack/react-router";
import { useCatalog } from "@/data/products";
import { PageHero, ProductCard } from "@/components/store/ProductCard";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "المفضلة | لوفيانا" },
      { name: "description", content: "اللوحات التي أعجبتك محفوظة هنا." },
      { property: "og:title", content: "المفضلة | لوفيانا" },
      { property: "og:description", content: "قائمة لوحاتك المفضلة." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const { products } = useCatalog();
  const list = products.filter((p) => wishlist.includes(p.id));
  return (
    <>
      <PageHero title="المفضلة" subtitle="احتفظ باللوحات التي أسرت قلبك لتعود إليها لاحقاً" />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        {list.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold">لا توجد لوحات في المفضلة بعد</h2>
            <Link to="/shop" className="btn-gold mt-6">اكتشف اللوحات</Link>
          </div>
        )}
      </div>
    </>
  );
}
