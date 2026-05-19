import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "../api";
import type { Category, Product } from "../types";
import CategoryFilter from "@/components/CategoryFilter";
import { useCart } from "@/cart-context";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/Icon";

const FILTER_STORAGE_KEY = "basic-shop-filters";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const { items } = useCart();

  console.log(categories)

  const selectedCategories = useMemo(() => {
    return searchParams
      .getAll("category")
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value));
  }, [searchParams]);

  // Runs once on mount — restores filters from localStorage if no URL params present
  useEffect(() => {
    const hasQueryFilters = searchParams.getAll("category").length > 0;
    if (hasQueryFilters) {
      setIsHydrated(true);
      return;
    }

    const stored = localStorage.getItem(FILTER_STORAGE_KEY);
    if (!stored) {
      setIsHydrated(true);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as { categories?: number[] };
      const next = new URLSearchParams();

      parsed.categories?.forEach((categoryId) => {
        if (Number.isFinite(categoryId)) {
          next.append("category", String(categoryId));
        }
      });

      if (next.toString()) {
        setSearchParams(next, { replace: true });
        // isHydrated set to true after searchParams settles (next effect run)
        return;
      }
    } catch {
      localStorage.removeItem(FILTER_STORAGE_KEY);
    }

    setIsHydrated(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount only — intentionally excludes searchParams

  // Once searchParams are set from localStorage, mark hydration done
  useEffect(() => {
    if (!isHydrated && searchParams.getAll("category").length > 0) {
      setIsHydrated(true);
    }
  }, [isHydrated, searchParams]);

  // Persist filters after hydration
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      FILTER_STORAGE_KEY,
      JSON.stringify({ categories: selectedCategories }),
    );
  }, [isHydrated, selectedCategories]);

 useEffect(() => {
  const controller = new AbortController();

  fetchCategories(controller.signal)
    .then(setCategories)
    .catch(() => {
      !controller.signal.aborted && setErrorMessage("Could not load categories.");
    });

  return () => controller.abort();
}, []);

  useEffect(() => {
    if (!isHydrated) return;

    const controller = new AbortController();
    async function loadProducts() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        let response: Product[];

        if (selectedCategories.length === 0) {
          response = await fetchProducts(controller.signal);
        } else {
          const grouped = await Promise.all(
            selectedCategories.map((categoryId) =>
              fetchProductsByCategory(categoryId, controller.signal),
            ),
          );

          const map = new Map<number, Product>();
          grouped.flat().forEach((product) => map.set(product.id, product));
          response = Array.from(map.values());
        }

        setProducts(response);
      } catch {
        setErrorMessage("Could not load products.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadProducts();

    return () => controller.abort();
  }, [isHydrated, selectedCategories]);

  function toggleCategory(categoryId: number) {
    const current = new Set(selectedCategories);

    if (current.has(categoryId)) {
      current.delete(categoryId);
    } else {
      current.add(categoryId);
    }

    const next = new URLSearchParams(searchParams);
    next.delete("category");
    [...current].forEach((id) => next.append("category", String(id)));
    setSearchParams(next);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <main
        className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8"
        data-testid="home-page"
      >
        <section className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Discover Products
          </h1>
          <p className="max-w-2xl text-slate-600">
            Explore curated collections, discover trending items, and shop
            products tailored to your style.
          </p>
        </section>

        <section className="mt-6">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onToggle={toggleCategory}
          />
        </section>

        {errorMessage && (
          <p className="mt-6 text-sm text-red-600">{errorMessage}</p>
        )}
        {isLoading && (
          <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-2 animate-pulse">
                <div className="aspect-square w-full rounded-lg bg-slate-200" />
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-1/4 rounded bg-slate-200" />
              </div>
            ))}
          </section>
        )}

        {products.length === 0 && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <Icon name="ShoppingBag" size={34} className="text-slate-500" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-slate-900">
              No Products found
            </h2>
          </motion.section>
        )}

        <AnimatePresence mode="wait">
          {!isLoading && !errorMessage && (
            <motion.section
              key={selectedCategories.join("-")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              {products.map((product) => {
                const cartItem = items.find(
                  (item) => item.product.id === product.id,
                );
                const quantity = cartItem?.quantity || 0;
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantity}
                  />
                );
              })}
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </motion.section>
  );
}
