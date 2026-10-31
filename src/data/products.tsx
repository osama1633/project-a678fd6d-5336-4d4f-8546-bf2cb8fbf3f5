// Live catalog backed by Lovable Cloud (products & categories tables + image storage).
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

import a1 from "@/assets/art/art-1.png.asset.json";
import a2 from "@/assets/art/art-2.jpg.asset.json";
import a3 from "@/assets/art/art-3.jpg.asset.json";
import a4 from "@/assets/art/art-4.jpg.asset.json";
import a5 from "@/assets/art/art-5.jpg.asset.json";
import a6 from "@/assets/art/art-6.jpg.asset.json";
import a7 from "@/assets/art/art-7.jpg.asset.json";
import a8 from "@/assets/art/art-8.jpg.asset.json";
import a9 from "@/assets/art/art-9.jpg.asset.json";

// Static artwork used by fixed design sections (hero, about, banners).
export const images = { a1: a1.url, a2: a2.url, a3: a3.url, a4: a4.url, a5: a5.url, a6: a6.url, a7: a7.url, a8: a8.url, a9: a9.url };

export type Category = { slug: string; name: string; image: string; desc: string };
export type Size = { label: string; dims: string; price: number };
export type Product = {
  id: string; name: string; category: string; image: string; price: number; oldPrice?: number;
  rating: number; reviews: number; badge?: string; isNew?: boolean;
  bestSeller?: boolean; description: string; sizes: Size[]; stock: number;
};

export type ProductInput = {
  id?: string; name: string; category: string; image: string; price: number; oldPrice?: number;
  badge?: string; isNew?: boolean; bestSeller?: boolean; description: string; sizes: Size[]; stock: number;
};
export type CategoryInput = { slug?: string; name: string; image: string; desc: string };

const mapProduct = (r: Tables<"products">): Product => ({
  id: r.id,
  name: r.name,
  category: r.category,
  image: r.image,
  price: Number(r.price),
  oldPrice: r.old_price != null ? Number(r.old_price) : undefined,
  rating: Number(r.rating),
  reviews: r.reviews,
  badge: r.badge ?? undefined,
  isNew: r.is_new,
  bestSeller: r.best_seller,
  description: r.description,
  sizes: (r.sizes as unknown as Size[]) ?? [],
  stock: r.stock,
});

const mapCategory = (r: Tables<"categories">): Category => ({
  slug: r.slug,
  name: r.name,
  image: r.image,
  desc: r.description,
});

async function fetchCatalog() {
  const [{ data: prows, error: e1 }, { data: crows, error: e2 }] = await Promise.all([
    supabase.from("products").select("*").order("created_at", { ascending: true }),
    supabase.from("categories").select("*").order("sort_order", { ascending: true }),
  ]);
  if (e1) throw e1;
  if (e2) throw e2;
  return { products: (prows ?? []).map(mapProduct), categories: (crows ?? []).map(mapCategory) };
}

type CatalogCtx = {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  getProduct: (id: string) => Product | undefined;
  getCategory: (slug: string) => Category | undefined;
  saveProduct: (input: ProductInput) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  saveCategory: (input: CategoryInput) => Promise<void>;
  deleteCategory: (slug: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
};

const CatalogContext = createContext<CatalogCtx | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["catalog"], queryFn: fetchCatalog, staleTime: 15_000 });
  const products = data?.products ?? [];
  const categories = data?.categories ?? [];
  const refresh = () => qc.invalidateQueries({ queryKey: ["catalog"] });

  const value: CatalogCtx = {
    products,
    categories,
    isLoading,
    getProduct: (id) => products.find((p) => p.id === id),
    getCategory: (slug) => categories.find((c) => c.slug === slug),

    saveProduct: async (input) => {
      const id = input.id ?? `p-${Date.now().toString(36)}`;
      const { error } = await supabase.from("products").upsert({
        id,
        name: input.name,
        category: input.category,
        image: input.image,
        price: input.price,
        old_price: input.oldPrice ?? null,
        badge: input.badge ?? null,
        is_new: input.isNew ?? false,
        best_seller: input.bestSeller ?? false,
        description: input.description,
        sizes: JSON.parse(JSON.stringify(input.sizes)),
        stock: input.stock,
      });
      if (error) throw error;
      await refresh();
    },

    deleteProduct: async (id) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      await refresh();
    },

    saveCategory: async (input) => {
      const slug = input.slug ?? `c-${Date.now().toString(36)}`;
      const { error } = await supabase.from("categories").upsert({
        slug,
        name: input.name,
        image: input.image,
        description: input.desc,
        sort_order: categories.length + 1,
      });
      if (error) throw error;
      await refresh();
    },

    deleteCategory: async (slug) => {
      const { error } = await supabase.from("categories").delete().eq("slug", slug);
      if (error) throw error;
      await refresh();
    },

    uploadImage: async (file) => {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file, { contentType: file.type });
      if (error) throw error;
      return `storage:${path}`;
    },
  };

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used inside CatalogProvider");
  return ctx;
}

// Renders product/category images. "storage:<path>" images are fetched from the
// private bucket as blob URLs; anything else is used as a direct URL.
export function ProductImg({ src, alt, className, loading }: { src: string; alt: string; className?: string; loading?: "lazy" | "eager" }) {
  const isStorage = src.startsWith("storage:");
  const [url, setUrl] = useState(isStorage ? "" : src);

  useEffect(() => {
    if (!isStorage) {
      setUrl(src);
      return;
    }
    let objectUrl: string | undefined;
    let cancelled = false;
    supabase.storage
      .from("product-images")
      .download(src.slice("storage:".length))
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        objectUrl = URL.createObjectURL(data);
        setUrl(objectUrl);
      });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src, isStorage]);

  if (!url) return <div className={`animate-pulse bg-muted ${className ?? ""}`} aria-label={alt} />;
  return <img src={url} alt={alt} loading={loading} className={className} />;
}

const fmt = new Intl.NumberFormat("ar-SA");
export const formatPrice = (n: number) => `${fmt.format(n)} ر.س`;
export const formatNum = (n: number) => fmt.format(n);
