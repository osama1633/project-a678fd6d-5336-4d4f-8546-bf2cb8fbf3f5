import { createFileRoute } from "@tanstack/react-router";
import { ImagePlus, Pencil, Plus, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import { ProductImg, useCatalog, type Category } from "@/data/products";

export const Route = createFileRoute("/admin/categories")({ component: Categories });

type FormState = { slug?: string; name: string; desc: string; image: string };

function Categories() {
  const { categories, products, saveCategory, deleteCategory, uploadImage } = useCatalog();
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const openEdit = (c: Category) => setForm({ slug: c.slug, name: c.name, desc: c.desc, image: c.image });

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
    if (!form.name.trim()) {
      toast.error("أدخل اسم القسم");
      return;
    }
    setSaving(true);
    try {
      await saveCategory({ slug: form.slug, name: form.name.trim(), desc: form.desc.trim(), image: form.image });
      toast.success(form.slug ? "تم تحديث القسم" : "تمت إضافة القسم");
      setForm(null);
    } catch {
      toast.error("تعذّر حفظ القسم");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (c: Category) => {
    const count = products.filter((p) => p.category === c.slug).length;
    if (!window.confirm(`حذف قسم "${c.name}"؟ سيحذف معه ${count} منتج.`)) return;
    try {
      await deleteCategory(c.slug);
      toast.success("تم حذف القسم");
    } catch {
      toast.error("تعذّر حذف القسم");
    }
  };

  return (
    <>
      <AdminPageHeader
        title="الأقسام"
        subtitle="نظّم منتجاتك في أقسام واضحة"
        action={<button onClick={() => setForm({ name: "", desc: "", image: "" })} className="btn-gold"><Plus className="h-4 w-4" /> إضافة قسم</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((c) => (
          <div key={c.slug} className="overflow-hidden rounded-xl border bg-card">
            <ProductImg src={c.image} alt={c.name} className="h-36 w-full object-cover" />
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{products.filter((p) => p.category === c.slug).length} منتج</div>
              </div>
              <div className="flex gap-2 text-muted-foreground">
                <button aria-label="تعديل" onClick={() => openEdit(c)} className="hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                <button aria-label="حذف" onClick={() => remove(c)} className="hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {form && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4" onClick={() => setForm(null)}>
          <div dir="rtl" onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{form.slug ? "تعديل القسم" : "إضافة قسم جديد"}</h2>
              <button aria-label="إغلاق" onClick={() => setForm(null)} className="rounded-full p-1 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid gap-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium">اسم القسم</span>
                <input className="field w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="مثال: لوحات إسلامية" />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">الوصف المختصر</span>
                <input className="field w-full" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="جملة تعريفية قصيرة" />
              </label>
              <div>
                <span className="mb-1 block text-sm font-medium">صورة القسم</span>
                <div className="flex items-center gap-4">
                  {form.image ? (
                    <ProductImg src={form.image} alt="معاينة" className="h-20 w-28 rounded-lg object-cover" />
                  ) : (
                    <div className="grid h-20 w-28 place-items-center rounded-lg border border-dashed text-muted-foreground"><ImagePlus className="h-6 w-6" /></div>
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
                {saving ? "جارٍ الحفظ…" : form.slug ? "حفظ التعديلات" : "إضافة القسم"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
