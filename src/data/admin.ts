// Mock admin data — replace with API calls when a backend is added.
export const orders = [
  { id: "#1024", customer: "أحمد محمد", city: "الرياض", date: "2026/10/26", time: "14:32", total: 349, items: 1, status: "تم التوصيل" },
  { id: "#1023", customer: "سارة العتيبي", city: "جدة", date: "2026/10/26", time: "11:17", total: 598, items: 2, status: "قيد التجهيز" },
  { id: "#1022", customer: "خالد المطيري", city: "الدمام", date: "2026/10/25", time: "18:45", total: 279, items: 1, status: "قيد الشحن" },
  { id: "#1021", customer: "فهد العتيبي", city: "الرياض", date: "2026/10/25", time: "12:20", total: 449, items: 1, status: "معلق" },
  { id: "#1020", customer: "نورة السبيعي", city: "مكة المكرمة", date: "2026/10/24", time: "16:03", total: 199, items: 1, status: "تم التوصيل" },
  { id: "#1019", customer: "ريم القحطاني", city: "الخبر", date: "2026/10/24", time: "10:40", total: 899, items: 1, status: "قيد الشحن" },
  { id: "#1018", customer: "عبدالله الشهري", city: "أبها", date: "2026/10/23", time: "20:12", total: 738, items: 3, status: "ملغي" },
  { id: "#1017", customer: "لمى الدوسري", city: "الرياض", date: "2026/10/23", time: "09:55", total: 529, items: 1, status: "تم التوصيل" },
];

export const customers = [
  { name: "أحمد محمد", city: "الرياض", orders: 6, spent: 2340, joined: "2025/03/12" },
  { name: "سارة العتيبي", city: "جدة", orders: 4, spent: 1820, joined: "2025/06/02" },
  { name: "خالد المطيري", city: "الدمام", orders: 3, spent: 987, joined: "2025/08/19" },
  { name: "نورة السبيعي", city: "مكة المكرمة", orders: 8, spent: 3410, joined: "2024/12/01" },
  { name: "ريم القحطاني", city: "الخبر", orders: 2, spent: 1148, joined: "2026/01/15" },
  { name: "لمى الدوسري", city: "الرياض", orders: 5, spent: 2105, joined: "2025/04/27" },
];

export const coupons = [
  { code: "رواق٢٠", type: "نسبة", value: "٢٠٪", uses: 142, limit: 500, expires: "2026/12/31", status: "نشط" },
  { code: "اليوم_الوطني", type: "نسبة", value: "٢٥٪", uses: 389, limit: 400, expires: "2026/09/30", status: "منتهي" },
  { code: "شحن_مجاني", type: "شحن", value: "مجاني", uses: 76, limit: 300, expires: "2026/11/30", status: "نشط" },
  { code: "ترحيب٥٠", type: "مبلغ", value: "٥٠ ر.س", uses: 214, limit: 1000, expires: "2027/01/31", status: "نشط" },
];

export const salesWeek = [
  { d: "20 أكتوبر", v: 4200 }, { d: "21 أكتوبر", v: 7300 }, { d: "22 أكتوبر", v: 5100 },
  { d: "23 أكتوبر", v: 8100 }, { d: "24 أكتوبر", v: 11200 }, { d: "25 أكتوبر", v: 12600 }, { d: "26 أكتوبر", v: 17400 },
];

export const salesYear = [
  { d: "يناير", v: 28000 }, { d: "فبراير", v: 31000 }, { d: "مارس", v: 42000 }, { d: "أبريل", v: 38000 },
  { d: "مايو", v: 45000 }, { d: "يونيو", v: 41000 }, { d: "يوليو", v: 39000 }, { d: "أغسطس", v: 47000 },
  { d: "سبتمبر", v: 61000 }, { d: "أكتوبر", v: 52680 },
];
