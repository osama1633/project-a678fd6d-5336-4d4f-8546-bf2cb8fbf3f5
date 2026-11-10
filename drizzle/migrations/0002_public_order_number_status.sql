CREATE OR REPLACE FUNCTION public.list_order_statuses()
RETURNS TABLE (order_number bigint, status text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
 SELECT o.order_number, o.status FROM public.orders o ORDER BY o.created_at DESC, o.order_number DESC LIMIT 500;
$$;
REVOKE ALL ON FUNCTION public.list_order_statuses() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_order_statuses() TO anon, authenticated, service_role;
COMMENT ON FUNCTION public.list_order_statuses() IS 'Public order numbers and statuses only; private customer data remains inaccessible.';