import { describe, expect, it } from "vitest";
import { checkoutSchema, orderTotals } from "@/lib/orders-schema";

const input = { requestId: "78d06251-c2a8-4a80-9d31-fcaa416cc705", firstName: "اختبار", lastName: "طلب", phone: "0500000000", email: "", city: "الرياض", district: "حي", address: "عنوان", paymentMethod: "cod", items: [{ productId: "arabian-horse", size: "صغير", qty: 1 }] };
describe("Private checkout", () => {
  it("accepts a guest delivery order", () => expect(checkoutSchema.safeParse(input).success).toBe(true));
  it("rejects an empty cart", () => expect(checkoutSchema.safeParse({ ...input, items: [] }).success).toBe(false));
  it("does not accept card payments without a payment provider", () => expect(checkoutSchema.safeParse({ ...input, paymentMethod: "card" }).success).toBe(false));
  it("preserves existing shipping of 35 below 500", () => expect(orderTotals(299)).toEqual({ subtotal: 299, shipping: 35, total: 334 }));
  it("preserves free shipping from 500", () => expect(orderTotals(500).shipping).toBe(0));
});