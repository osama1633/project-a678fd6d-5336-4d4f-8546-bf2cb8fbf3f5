import { expect, it, vi } from "vitest";

const rpc = vi.hoisted(() => vi.fn());
vi.mock("@tanstack/react-start", () => ({ createServerFn: () => ({ handler: (fn: () => unknown) => fn }) }));
vi.mock("@supabase/supabase-js", () => ({ createClient: () => ({ rpc }) }));
import { listOrderStatuses } from "@/lib/order-status.functions";

it("exposes only order number and status, never customer details", async () => {
  vi.stubEnv("SUPABASE_URL", "https://example.invalid");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
  rpc.mockResolvedValue({ data: [{ order_number: 1026, status: "قيد التجهيز", phone: "0500000001", address: "private", first_name: "private" }], error: null });
  try {
    expect(await listOrderStatuses()).toEqual([{ orderNumber: 1026, status: "قيد التجهيز" }]);
    expect(rpc).toHaveBeenCalledWith("list_order_statuses");
  } finally { vi.unstubAllEnvs(); }
});