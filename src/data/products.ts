// Static catalog — replace with API calls when a backend is added.
import a1 from "@/assets/art/art-1.png.asset.json";
import a2 from "@/assets/art/art-2.jpg.asset.json";
import a3 from "@/assets/art/art-3.jpg.asset.json";
import a4 from "@/assets/art/art-4.jpg.asset.json";
import a5 from "@/assets/art/art-5.jpg.asset.json";
import a6 from "@/assets/art/art-6.jpg.asset.json";
import a7 from "@/assets/art/art-7.jpg.asset.json";
import a8 from "@/assets/art/art-8.jpg.asset.json";
import a9 from "@/assets/art/art-9.jpg.asset.json";

export const images = { a1: a1.url, a2: a2.url, a3: a3.url, a4: a4.url, a5: a5.url, a6: a6.url, a7: a7.url, a8: a8.url, a9: a9.url };

export type Category = { slug: string; name: string; image: string; desc: string };

export const categories: Category[] = [
  { slug: "islamic", name: "لوحات إسلامية", image: a6.url, desc: "سكينة الحرف وجمال الزخرفة" },
  { slug: "abstract", name: "فن تجريدي", image: a3.url, desc: "خطوط حرّة وألوان جريئة" },
  { slug: "nature", name: "طبيعة ومناظر", image: a5.url, desc: "هدوء الطبيعة في بيتك" },
  { slug: "cars", name: "سيارات", image: a1.url, desc: "شغف الكلاسيكيات" },
  { slug: "cities", name: "مدن ومعالم", image: a2.url, desc: "روح المدن وتفاصيلها" },
  { slug: "modern", name: "لوحات عصرية", image: a7.url, desc: "لمسة معاصرة فاخرة" },
  { slug: "multi", name: "لوحات متعددة القطع", image: a8.url, desc: "مجموعات متناغمة" },
  { slug: "custom", name: "لوحات حسب الطلب", image: a9.url, desc: "صمّم لوحتك بنفسك" },
];

export type Size = { label: string; dims: string; price: number };
export type Product = {
  id: string; name: string; category: string; image: string; price: number; oldPrice?: number;
  rating: number; reviews: number; badge?: "جديد" | "الأكثر مبيعاً" | "خصم"; isNew?: boolean;
  bestSeller?: boolean; description: string; sizes: Size[];
};

const sizes = (base: number): Size[] => [
  { label: "صغير", dims: "٣٠ × ٤٠ سم", price: base },
  { label: "متوسط", dims: "٥٠ × ٧٠ سم", price: base + 120 },
  { label: "كبير", dims: "٧٠ × ١٠٠ سم", price: base + 260 },
];

export const products: Product[] = [
  { id: "golden-classic", name: "الكلاسيكية الذهبية", category: "cars", image: a1.url, price: 349, oldPrice: 429, rating: 4.9, reviews: 58, badge: "الأكثر مبيعاً", bestSeller: true, description: "لقطة فنية لسيارة كلاسيكية ذهبية أمام جدار ترابي دافئ، مطبوعة على ورق فني فاخر بإطار خشبي أسود يمنح المساحة طابعاً راقياً.", sizes: sizes(349) },
  { id: "arabian-horse", name: "الجواد الأصيل", category: "abstract", image: a3.url, price: 299, rating: 4.8, reviews: 42, bestSeller: true, description: "رسم تجريدي لجواد عربي بخطوط فرشاة حرّة ودائرة ذهبية، يعكس الأصالة والقوة بأسلوب معاصر.", sizes: sizes(299) },
  { id: "golden-face", name: "ملامح الذهب", category: "modern", image: a7.url, price: 459, rating: 5, reviews: 31, badge: "جديد", isNew: true, bestSeller: true, description: "بورتريه زيتي بدرجات العسل والذهب، قطعة مركزية تليق بالمجالس والردهات الفاخرة.", sizes: sizes(459) },
  { id: "dried-meadow", name: "مرج الزهور المجففة", category: "nature", image: a5.url, price: 219, rating: 4.7, reviews: 27, isNew: true, badge: "جديد", description: "زهور برية مجففة محفوظة داخل إطار خشبي طبيعي معلّق بحبل، لمسة ريفية ناعمة.", sizes: sizes(219) },
  { id: "tropical-trio", name: "ثلاثية الأوراق الاستوائية", category: "multi", image: a4.url, price: 389, oldPrice: 459, rating: 4.8, reviews: 36, badge: "خصم", bestSeller: true, description: "مجموعة من ثلاث لوحات نباتية بخطوط ناعمة، مثالية لجدران الدرج والممرات.", sizes: sizes(389) },
  { id: "street-soul", name: "روح الشارع", category: "cities", image: a2.url, price: 279, rating: 4.6, reviews: 19, isNew: true, badge: "جديد", description: "جدارية حضرية نابضة بالألوان على واجهة من الطوب الأحمر، تحمل إيقاع المدن الكبرى.", sizes: sizes(279) },
  { id: "boho-sun", name: "شمس البوهو", category: "modern", image: a6.url, price: 249, rating: 4.7, reviews: 24, description: "تكوين بوهيمي من المرايا المنسوجة والزخارف الدائرية، يضيف دفئاً لغرف المعيشة.", sizes: sizes(249) },
  { id: "landscape-gallery", name: "معرض المناظر", category: "multi", image: a8.url, price: 899, oldPrice: 1099, rating: 4.9, reviews: 15, badge: "خصم", isNew: true, description: "جدار معرض متكامل من اثنتي عشرة لوحة لمناظر طبيعية، يحوّل أي جدار إلى معرض فني.", sizes: sizes(899) },
  { id: "spring-bicycle", name: "دراجة الربيع", category: "custom", image: a9.url, price: 529, rating: 4.8, reviews: 12, description: "جدارية مرسومة يدوياً لدراجة كلاسيكية بسلة أزهار، تُنفّذ حسب مقاس جدارك وألوانك.", sizes: sizes(529) },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

const fmt = new Intl.NumberFormat("ar-SA");
export const formatPrice = (n: number) => `${fmt.format(n)} ر.س`;
export const formatNum = (n: number) => fmt.format(n);
