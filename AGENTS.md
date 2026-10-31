<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Catalog is live in Lovable Cloud: products/categories tables are read and mutated through the CatalogProvider in src/data/products.tsx (useCatalog hook); never reintroduce static product arrays. Product images uploaded from admin go to the private `product-images` storage bucket and are stored as `storage:<path>` in the image column — render them only through the ProductImg component, which resolves the blob URL. Orders/customers/coupons are still mock data in src/data/admin.ts. Cart/wishlist stay in src/lib/store.tsx (localStorage). Admin writes are intentionally unauthenticated until admin auth is added — tighten RLS policies when login ships.
- Admin UI lives under /admin routes; __root hides the store header/footer for /admin paths.
