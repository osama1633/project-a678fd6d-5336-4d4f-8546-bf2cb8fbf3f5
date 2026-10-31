import { createFileRoute } from "@tanstack/react-router";
import { ImagePlus, Pencil, Plus, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { AdminPageHeader, DataTable, Panel, StatusBadge, Td } from "@/components/admin/AdminUI";
import { formatPrice, ProductImg, useCatalog, type Product, type ProductInput } from "@/data/products";

export const Route = createFileRoute("/admin/products")({ component: Products });

const badges = ["", "جديد", "الأكثر مبيعاً", "خصم"];

type FormState = {
  id?: string;
  name: string;
  category: string;
  price: string;
  oldPrice: string;
  stock: string;
  badge: string;
  isNew: boolean;
  bestSeller: boolean;
  description: string;
  image: string;
};

const emptyForm: FormState = {
  name: "", category: "", price: "", oldPrice: "", stock: "10",
  badge: "", isNew: false, bestSeller: false, description: "", image: "",
};

function Products() {
  const { products, categories, getCategory, saveProduct, deleteProduct, uploadImage } = useCatalog();
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const openNew = () => setForm({ ...emptyForm, category: categories[0]?.slug ?? "" });
  const openEdit = (p: Product) =>
    setForm({
      id: p.id, name: p.name, category: p.category, price: String(p.price),
      oldPrice: p.oldPrice != null ? String(p.oldPrice) : "", stock: String(p.stock),
      badge: p.badge ?? "", isNew: !!p.isNew, bestSeller: !!p.bestSeller,
      description: p.description, image: p.image,
    });

  const pickImage = async (file: File) => {
    try {
      const url = await uploadImage(file);
      setForm((f) => (f ? { ...f, image: url } : f));
      toast.success("تم رفع الصورة");
    } catch {
      toast.error("تعذّر رفع الصورة");
    }
  };

  const submit = async () => {
    if (!form) return;
    const price = Number(form.price);
    if (!form.name.trim() || !form.category || !price || price <= 0) {
      toast.error("أدخل اسم المنتج والقسم والسعر");
      return;
    }
    if (!form.image) {
      toast.error("أضف صورة للمنتج");
      return;
    }
    const input: ProductInput = {
      id: form.id,
      name: form.name.trim(),
      category: form.category,
      image: form.image,
      price,
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      badge: form.badge || undefined,
      isNew: form.isNew,
      bestSeller: form.bestSeller,
      description: form.description.trim(),
      stock: Number(form.stock) || 0,
      sizes: [
        { label: "صغير", dims: "٣٠ × ٤٠ سم", price },
        { label: "متوسط", dims: "٥٠ × ٧٠ سم", price: price + 120 },
        { label: "كبير", dims: "٧٠ × ١٠٠ سم", price: price + 260 },
      ],
    };
    setSaving(true);
    try {
      await saveProduct(input);
      toast.success(form.id ? "تم تحديث المنتج" : "تمت إضافة المنتج");
      setForm(null);
    } catch {
      toast.error("تعذّر حفظ المنتج");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: Product) => {
    if (!window.confirm(`حذف "${p.name}" نهائياً؟`)) return;
    try {
      await deleteProduct(p.id);
      toast.success("تم حذف المنتج");
    } catch {
      toast.error("تعذّر حذف المنتج");
    }
  };

  return (
    <>
      <AdminPageHeader
        title="المنتجات"
        subtitle={`${products.length} منتج في المتجر`}
        action={<button onClick={openNew} className="btn-gold"><Plus className="h-4 w-4" /> إضافة منتج</button>}
      />
      <Panel>
        <DataTable head={["المنتج", "القسم", "السعر", "المخزون", "المبيعات", "الحالة", ""]}>
          {products.map((p) => (
            <tr key={p.id}>
              <Td>
                <div className="flex items-center gap-3">
                  <ProductImg src={p.image} alt={p.name} className="h-12 w-12 rounded object-cover" />
                  <span className="font-semibold">{p.name}</span>
                </div>
              </Td>
              <Td>{getCategory(p.category)?.name}</Td>
              <Td>{formatPrice(p.price)}</Td>
              <Td>{p.stock}</Td>
              <Td>{p.reviews}</Td>
              <Td><StatusBadge status={p.stock > 0 ? "نشط" : "نفد المخزون"} /></Td>
              <Td>
                <div className="flex gap-2 text-muted-foreground">
                  <button aria-label="تعديل" onClick={() => openEdit(p)} className="hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                  <button aria-label="حذف" onClick={() => remove(p)} className="hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </Td>
            </tr>
          ))}
        </DataTable>
      </Panel>

      {form && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4" onClick={() => setForm(null)}>
          <div dir="rtl" onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{form.id ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
              <button aria-label="إغلاق" onClick={() => setForm(null)} className="rounded-full p-1 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-sm font-medium">اسم المنتج</span>
                <input className="field w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="مثال: الكلاسيكية الذهبية" />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">القسم</span>
                <select className="field w-full" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">الشارة</span>
                <select className="field w-full" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}>
                  {badges.map((b) => <option key={b} value={b}>{b || "بدون"}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">السعر (ر.س)</span>
                <input type="number" min="1" className="field w-full" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">السعر قبل الخصم (اختياري)</span>
                <input type="number" min="0" className="field w-full" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">المخزون</span>
                <input type="number" min="0" className="field w-full" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              </label>
              <div className="flex items-end gap-5 pb-2 text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} /> جديد</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.bestSeller} onChange={(e) => setForm({ ...form, bestSeller: e.target.checked })} /> الأكثر مبيعاً</label>
              </div>
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-sm font-medium">الوصف</span>
                <textarea rows={3} className="field w-full" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="وصف اللوحة وخاماتها…" />
              </label>
              <div className="sm:col-span-2">
                <span className="mb-1 block text-sm font-medium">صورة المنتج</span>
                <div className="flex items-center gap-4">
                  {form.image ? (
                    <ProductImg src={form.image} alt="معاينة" className="h-24 w-20 rounded-lg object-cover" />
                  ) : (
                    <div className="grid h-24 w-20 place-items-center rounded-lg border border-dashed text-muted-foreground"><ImagePlus className="h-6 w-6" /></div>
                  )}
                  <button type="button" onClick={() => fileRef.current?.click()} className="btn-outline">
                    {form.image ? "تغيير الصورة" : "رفع صورة"}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) void pickImage(f); e.target.value = ""; }} />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setForm(null)} className="btn-outline">إلغاء</button>
              <button onClick={() => void submit()} disabled={saving} className="btn-gold disabled:opacity-50">
                {saving ? "جارٍ الحفظ…" : form.id ? "حفظ التعديلات" : "إضافة المنتج"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
