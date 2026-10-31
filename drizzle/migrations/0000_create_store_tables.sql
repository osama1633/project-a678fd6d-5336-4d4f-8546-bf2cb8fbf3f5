create table public.categories (
  slug text primary key,
  name text not null,
  image text not null default '',
  description text not null default '',
  sort_order int not null default 0
);

create table public.products (
  id text primary key,
  name text not null,
  category text not null references public.categories(slug) on delete cascade,
  image text not null default '',
  price numeric not null default 0,
  old_price numeric,
  rating numeric not null default 5,
  reviews int not null default 0,
  badge text,
  is_new boolean not null default false,
  best_seller boolean not null default false,
  description text not null default '',
  sizes jsonb not null default '[]'::jsonb,
  stock int not null default 10,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.categories to anon, authenticated;
grant all on public.categories to service_role;
grant select, insert, update, delete on public.products to anon, authenticated;
grant all on public.products to service_role;

alter table public.categories enable row level security;
alter table public.products enable row level security;

create policy "public read categories" on public.categories for select to anon, authenticated using (true);
create policy "public write categories" on public.categories for insert to anon, authenticated with check (true);
create policy "public update categories" on public.categories for update to anon, authenticated using (true) with check (true);
create policy "public delete categories" on public.categories for delete to anon, authenticated using (true);

create policy "public read products" on public.products for select to anon, authenticated using (true);
create policy "public write products" on public.products for insert to anon, authenticated with check (true);
create policy "public update products" on public.products for update to anon, authenticated using (true) with check (true);
create policy "public delete products" on public.products for delete to anon, authenticated using (true);

insert into public.categories (slug, name, image, description, sort_order) values
  ('islamic', 'لوحات إسلامية', '/__l5e/assets-v1/47948448-fd0c-464e-aeeb-a876d05e498c/art-6.jpg', 'سكينة الحرف وجمال الزخرفة', 1),
  ('abstract', 'فن تجريدي', '/__l5e/assets-v1/d1fcf47d-c12d-4ab7-b69d-9d548de6bc12/art-3.jpg', 'خطوط حرّة وألوان جريئة', 2),
  ('nature', 'طبيعة ومناظر', '/__l5e/assets-v1/b4b0fd7b-c378-4b1e-8121-a30ba9a65db9/art-5.jpg', 'هدوء الطبيعة في بيتك', 3),
  ('cars', 'سيارات', '/__l5e/assets-v1/aff72d13-cb06-447f-bb16-d16d3fb3ee9f/art-1.png', 'شغف الكلاسيكيات', 4),
  ('cities', 'مدن ومعالم', '/__l5e/assets-v1/870a2349-1b6d-4261-829e-5875d9ae1f52/art-2.jpg', 'روح المدن وتفاصيلها', 5),
  ('modern', 'لوحات عصرية', '/__l5e/assets-v1/b42da03b-2712-47ae-9bb4-5e014dc64982/art-7.jpg', 'لمسة معاصرة فاخرة', 6),
  ('multi', 'لوحات متعددة القطع', '/__l5e/assets-v1/a8bbe436-5669-4bda-9bca-3d52da1faabe/art-8.jpg', 'مجموعات متناغمة', 7),
  ('custom', 'لوحات حسب الطلب', '/__l5e/assets-v1/bdf2dfb2-36fb-4145-a68d-5139331474c5/art-9.jpg', 'صمّم لوحتك بنفسك', 8);

insert into public.products (id, name, category, image, price, old_price, rating, reviews, badge, is_new, best_seller, description, sizes, stock) values
  ('golden-classic', 'الكلاسيكية الذهبية', 'cars', '/__l5e/assets-v1/aff72d13-cb06-447f-bb16-d16d3fb3ee9f/art-1.png', 349, 429, 4.9, 58, 'الأكثر مبيعاً', false, true, 'لقطة فنية لسيارة كلاسيكية ذهبية أمام جدار ترابي دافئ، مطبوعة على ورق فني فاخر بإطار خشبي أسود يمنح المساحة طابعاً راقياً.', '[{"label":"صغير","dims":"٣٠ × ٤٠ سم","price":349},{"label":"متوسط","dims":"٥٠ × ٧٠ سم","price":469},{"label":"كبير","dims":"٧٠ × ١٠٠ سم","price":609}]', 24),
  ('arabian-horse', 'الجواد الأصيل', 'abstract', '/__l5e/assets-v1/d1fcf47d-c12d-4ab7-b69d-9d548de6bc12/art-3.jpg', 299, null, 4.8, 42, null, false, true, 'رسم تجريدي لجواد عربي بخطوط فرشاة حرّة ودائرة ذهبية، يعكس الأصالة والقوة بأسلوب معاصر.', '[{"label":"صغير","dims":"٣٠ × ٤٠ سم","price":299},{"label":"متوسط","dims":"٥٠ × ٧٠ سم","price":419},{"label":"كبير","dims":"٧٠ × ١٠٠ سم","price":559}]', 12),
  ('golden-face', 'ملامح الذهب', 'modern', '/__l5e/assets-v1/b42da03b-2712-47ae-9bb4-5e014dc64982/art-7.jpg', 459, null, 5, 31, 'جديد', true, true, 'بورتريه زيتي بدرجات العسل والذهب، قطعة مركزية تليق بالمجالس والردهات الفاخرة.', '[{"label":"صغير","dims":"٣٠ × ٤٠ سم","price":459},{"label":"متوسط","dims":"٥٠ × ٧٠ سم","price":579},{"label":"كبير","dims":"٧٠ × ١٠٠ سم","price":719}]', 31),
  ('dried-meadow', 'مرج الزهور المجففة', 'nature', '/__l5e/assets-v1/b4b0fd7b-c378-4b1e-8121-a30ba9a65db9/art-5.jpg', 219, null, 4.7, 27, 'جديد', true, false, 'زهور برية مجففة محفوظة داخل إطار خشبي طبيعي معلّق بحبل، لمسة ريفية ناعمة.', '[{"label":"صغير","dims":"٣٠ × ٤٠ سم","price":219},{"label":"متوسط","dims":"٥٠ × ٧٠ سم","price":339},{"label":"كبير","dims":"٧٠ × ١٠٠ سم","price":479}]', 8),
  ('tropical-trio', 'ثلاثية الأوراق الاستوائية', 'multi', '/__l5e/assets-v1/f344dd47-e004-4118-a9a7-259a00812bfe/art-4.jpg', 389, 459, 4.8, 36, 'خصم', false, true, 'مجموعة من ثلاث لوحات نباتية بخطوط ناعمة، مثالية لجدران الدرج والممرات.', '[{"label":"صغير","dims":"٣٠ × ٤٠ سم","price":389},{"label":"متوسط","dims":"٥٠ × ٧٠ سم","price":509},{"label":"كبير","dims":"٧٠ × ١٠٠ سم","price":649}]', 17),
  ('street-soul', 'روح الشارع', 'cities', '/__l5e/assets-v1/870a2349-1b6d-4261-829e-5875d9ae1f52/art-2.jpg', 279, null, 4.6, 19, 'جديد', true, false, 'جدارية حضرية نابضة بالألوان على واجهة من الطوب الأحمر، تحمل إيقاع المدن الكبرى.', '[{"label":"صغير","dims":"٣٠ × ٤٠ سم","price":279},{"label":"متوسط","dims":"٥٠ × ٧٠ سم","price":399},{"label":"كبير","dims":"٧٠ × ١٠٠ سم","price":539}]', 40),
  ('boho-sun', 'شمس البوهو', 'modern', '/__l5e/assets-v1/47948448-fd0c-464e-aeeb-a876d05e498c/art-6.jpg', 249, null, 4.7, 24, null, false, false, 'تكوين بوهيمي من المرايا المنسوجة والزخارف الدائرية، يضيف دفئاً لغرف المعيشة.', '[{"label":"صغير","dims":"٣٠ × ٤٠ سم","price":249},{"label":"متوسط","dims":"٥٠ × ٧٠ سم","price":369},{"label":"كبير","dims":"٧٠ × ١٠٠ سم","price":509}]', 5),
  ('landscape-gallery', 'معرض المناظر', 'multi', '/__l5e/assets-v1/a8bbe436-5669-4bda-9bca-3d52da1faabe/art-8.jpg', 899, 1099, 4.9, 15, 'خصم', true, false, 'جدار معرض متكامل من اثنتي عشرة لوحة لمناظر طبيعية، يحوّل أي جدار إلى معرض فني.', '[{"label":"صغير","dims":"٣٠ × ٤٠ سم","price":899},{"label":"متوسط","dims":"٥٠ × ٧٠ سم","price":1019},{"label":"كبير","dims":"٧٠ × ١٠٠ سم","price":1159}]', 9),
  ('spring-bicycle', 'دراجة الربيع', 'custom', '/__l5e/assets-v1/bdf2dfb2-36fb-4145-a68d-5139331474c5/art-9.jpg', 529, null, 4.8, 12, null, false, false, 'جدارية مرسومة يدوياً لدراجة كلاسيكية بسلة أزهار، تُنفّذ حسب مقاس جدارك وألوانك.', '[{"label":"صغير","dims":"٣٠ × ٤٠ سم","price":529},{"label":"متوسط","dims":"٥٠ × ٧٠ سم","price":649},{"label":"كبير","dims":"٧٠ × ١٠٠ سم","price":789}]', 6);

create policy "public read product images" on storage.objects for select to anon, authenticated using (bucket_id = 'product-images');
create policy "public upload product images" on storage.objects for insert to anon, authenticated with check (bucket_id = 'product-images');
create policy "public update product images" on storage.objects for update to anon, authenticated using (bucket_id = 'product-images') with check (bucket_id = 'product-images');
create policy "public delete product images" on storage.objects for delete to anon, authenticated using (bucket_id = 'product-images');