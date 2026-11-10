import { z } from "zod";

export const checkoutCities = ["الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "أبها", "تبوك"] as const;
export const checkoutSchema = z.object({
  requestId: z.string().uuid(),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  phone: z.string().trim().regex(/^\+?[0-9٠-٩][0-9٠-٩\s-]{7,18}$/),
  email: z.union([z.string().trim().email().max(254), z.literal("")]),
  city: z.enum(checkoutCities),
  district: z.string().trim().min(1).max(150),
  address: z.string().trim().min(1).max(500),
  paymentMethod: z.literal("cod"),
  items: z.array(z.object({ productId: z.string().min(1).max(100), size: z.string().min(1).max(100), qty: z.number().int().min(1).max(100) })).min(1).max(50),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;

export function orderTotals(subtotal: number) {
  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 35;
  return { subtotal, shipping, total: Math.round((subtotal + shipping) * 100) / 100 };
}