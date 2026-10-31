import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminPageHeader, Panel } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/settings")({ component: SettingsPage });

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-medium">{label}</span>{children}</label>;
}

function Toggle({ label, on = true }: { label: string; on?: boolean }) {
  return (
    <label className="flex items-center justify-between border-b py-3 last:border-0">
      <span className="text-sm">{label}</span>
      <input type="checkbox" defaultChecked={on} className="h-4 w-4 accent-gold" />
    </label>
  );
}

function SettingsPage() {
  return (
    <>
      <AdminPageHeader title="الإعدادات" subtitle="إعدادات المتجر العامة" action={<button onClick={() => toast.success("تم حفظ الإعدادات")} className="btn-gold">حفظ التغييرات</button>} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="معلومات المتجر">
          <div className="grid gap-4">
            <Field label="اسم المتجر"><input defaultValue="لوفيانا للفنون" className="field" /></Field>
            <Field label="رقم التواصل"><input defaultValue="٩٢٠٠٠٠٠٠٠" className="field" /></Field>
            <Field label="العنوان"><input defaultValue="الرياض، حي الملقا" className="field" /></Field>
            <Field label="الرقم الضريبي"><input defaultValue="٣٠٠٠٠٠٠٠٠٠٠٠٠٠٣" className="field" /></Field>
          </div>
        </Panel>
        <Panel title="الشحن والضرائب">
          <div className="grid gap-4">
            <Field label="الحد الأدنى للشحن المجاني (ر.س)"><input defaultValue="500" className="field" /></Field>
            <Field label="رسوم الشحن (ر.س)"><input defaultValue="35" className="field" /></Field>
            <Field label="نسبة ضريبة القيمة المضافة"><input defaultValue="15%" className="field" /></Field>
          </div>
        </Panel>
        <Panel title="طرق الدفع">
          <Toggle label="مدى" /><Toggle label="فيزا / ماستركارد" /><Toggle label="أبل باي" /><Toggle label="تابي" /><Toggle label="الدفع عند الاستلام" on={false} />
        </Panel>
        <Panel title="الإشعارات">
          <Toggle label="إشعار عند طلب جديد" /><Toggle label="تنبيه انخفاض المخزون" /><Toggle label="التقرير الأسبوعي بالبريد" on={false} />
        </Panel>
      </div>
    </>
  );
}
