import { createServerFn } from "@tanstack/react-start";
import { checkoutSchema, orderTotals } from "./orders-schema";
import { z } from "zod";

const sizesSchema = z.array(z.object({ label: z.string(), dims: z.string(), price: z.number().nonnegative() }));

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => checkoutSchema.parse(input))
  .handler(async ({ data }) => {
    // Guest checkout only writes private orders. No endpoint exposes customer data.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing, error: existingError } = await supabaseAdmin.from("orders").select("order_number").eq("request_id", data.requestId).maybeSingle();
    if (existingError) return { ok: false as const, error: "تعذر حفظ الطلب، حاول مرة أخرى." };
    if (existing) return { ok: true as const, orderNumber: existing.order_number };
    const { count, error: rateError } = await supabaseAdmin.from("orders").select("id", { count: "exact", head: true }).eq("phone", data.phone).gte("created_at", new Date(Date.now() - 3600000).toISOString());
    if (rateError || (count ?? 0) >= 5) return { ok: false as const, error: "تعذر إرسال طلب جديد الآن، حاول لاحقًا." };
    const { data: products, error } = await supabaseAdmin.from("products").select("id,name,sizes,stock").in("id", data.items.map((i) => i.productId));
    if (error || !products) return { ok: false as const, error: "تعذر التحقق من المنتجات، حاول مرة أخرى." };
    const items = [];
    let subtotal = 0;
    for (const item of data.items) {
      const product = products.find((p) => p.id === item.productId);
      const sizes = sizesSchema.safeParse(product?.sizes);
      const size = sizes.success ? sizes.data.find((s) => s.label === item.size) : undefined;
      const requestedQty = data.items.filter((i) => i.productId === item.productId).reduce((sum, i) => sum + i.qty, 0);
      if (!product || !size || product.stock < requestedQty) return { ok: false as const, error: "منتج أو مقاس غير متوفر بالكمية المطلوبة. راجع السلة." };
      subtotal += size.price * item.qty;
      items.push({ productId: product.id, name: product.name, size: size.label, dims: size.dims, qty: item.qty, price: size.price });
    }
    if (subtotal <= 0) return { ok: false as const, error: "لا يمكن تأكيد طلب بدون منتجات مدفوعة." };
    const { data: order, error: insertError } = await supabaseAdmin.from("orders").insert({
      request_id: data.requestId, first_name: data.firstName, last_name: data.lastName,
      phone: data.phone, email: data.email || null, city: data.city, district: data.district,
      address: data.address, payment_method: data.paymentMethod, items, ...orderTotals(subtotal),
    }).select("order_number").single();
    if (insertError?.code === "23505") {
      const { data: saved } = await supabaseAdmin.from("orders").select("order_number").eq("request_id", data.requestId).maybeSingle();
      if (saved) return { ok: true as const, orderNumber: saved.order_number };
    }
    if (insertError || !order) return { ok: false as const, error: "تعذر حفظ الطلب. لم يتم تفريغ السلة، حاول مرة أخرى." };
    return { ok: true as const, orderNumber: order.order_number };
  });