CREATE TABLE public.orders (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 request_id uuid NOT NULL UNIQUE,
 order_number bigint GENERATED ALWAYS AS IDENTITY (START WITH 1025) UNIQUE NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 first_name text NOT NULL,
 last_name text NOT NULL,
 phone text NOT NULL,
 email text,
 city text NOT NULL,
 district text NOT NULL,
 address text NOT NULL,
 payment_method text NOT NULL DEFAULT 'cod' CHECK (payment_method = 'cod'),
 payment_status text NOT NULL DEFAULT 'غير مدفوع',
 status text NOT NULL DEFAULT 'قيد التجهيز',
 items jsonb NOT NULL,
 subtotal numeric(12,2) NOT NULL CHECK (subtotal > 0),
 shipping numeric(12,2) NOT NULL CHECK (shipping >= 0),
 total numeric(12,2) NOT NULL CHECK (total > 0)
);
GRANT ALL ON public.orders TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.orders_order_number_seq TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.orders IS 'Private checkout orders; no anonymous or authenticated reads until owner authentication is implemented.';