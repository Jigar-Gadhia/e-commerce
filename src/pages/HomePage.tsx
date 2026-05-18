import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "../api";
import type { Category, Product, SortOption } from "../types";
import CategoryFilter from "@/components/CategoryFilter";
import SortDropdown from "@/components/SortDropdown";
import { useCart } from "@/cart-context";
import ProductCard from "@/components/ProductCard";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Title: A to Z", value: "title-asc" },
];

const FILTER_STORAGE_KEY = "basic-shop-filters";

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const data = [...products];

  if (sort === "price-asc") {
    return data.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    return data.sort((a, b) => b.price - a.price);
  }

  if (sort === "title-asc") {
    return data.sort((a, b) => a.title.localeCompare(b.title));
  }

  return data;
}

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasHydratedFilters = useRef(false);
  const { items } = useCart();

  const selectedCategories = useMemo(() => {
    return searchParams
      .getAll("category")
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value));
  }, [searchParams]);

  const sortParam = searchParams.get("sort");
  const sort =
    sortParam && SORT_OPTIONS.some((option) => option.value === sortParam)
      ? (sortParam as SortOption)
      : "default";

  useEffect(() => {
    if (hasHydratedFilters.current) {
      return;
    }

    const hasQueryFilters =
      searchParams.getAll("category").length > 0 || searchParams.has("sort");
    if (hasQueryFilters) {
      hasHydratedFilters.current = true;
      return;
    }

    const stored = localStorage.getItem(FILTER_STORAGE_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as {
        categories?: number[];
        sort?: SortOption;
      };
      const next = new URLSearchParams();

      parsed.categories?.forEach((categoryId) => {
        if (Number.isFinite(categoryId)) {
          next.append("category", String(categoryId));
        }
      });

      if (parsed.sort && parsed.sort !== "default") {
        next.set("sort", parsed.sort);
      }

      if (next.toString()) {
        setSearchParams(next, { replace: true });
        return;
      }
    } catch {
      localStorage.removeItem(FILTER_STORAGE_KEY);
    }

    hasHydratedFilters.current = true;
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!hasHydratedFilters.current) {
      return;
    }

    localStorage.setItem(
      FILTER_STORAGE_KEY,
      JSON.stringify({
        categories: selectedCategories,
        sort,
      }),
    );
  }, [selectedCategories, sort]);

  useEffect(() => {
    fetchCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch(() => {
        setErrorMessage("Could not load categories.");
      });
  }, []);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        let response: Product[];

        if (selectedCategories.length === 0) {
          response = await fetchProducts();
        } else {
          const grouped = await Promise.all(
            selectedCategories.map((categoryId) =>
              fetchProductsByCategory(categoryId),
            ),
          );

          const map = new Map<number, Product>();

          grouped.flat().forEach((product) => {
            map.set(product.id, product);
          });

          response = Array.from(map.values());
        }

        // sort after api fetch
        response = sortProducts(response, sort);

        setProducts(response);
      } catch {
        setErrorMessage("Could not load products.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadProducts();
  }, [selectedCategories, sort]);

  function toggleCategory(categoryId: number) {
    const current = new Set(selectedCategories);

    if (current.has(categoryId)) {
      current.delete(categoryId);
    } else {
      current.add(categoryId);
    }

    const next = new URLSearchParams(searchParams);
    next.delete("category");
    [...current].forEach((id) => {
      next.append("category", String(id));
    });

    setSearchParams(next);
  }

  function updateSort(nextSort: SortOption) {
    const next = new URLSearchParams(searchParams);
    if (nextSort === "default") {
      next.delete("sort");
    } else {
      next.set("sort", nextSort);
    }
    setSearchParams(next);
  }

  return (
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

      <section className="mt-6 flex flex-row items-center justify-between gap-3">
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onToggle={toggleCategory}
        />
        <SortDropdown
          value={sort}
          options={SORT_OPTIONS}
          onChange={(value) => updateSort(value as SortOption)}
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

      <AnimatePresence mode="wait">
        {!isLoading && !errorMessage && (
          <motion.section
            key={`${selectedCategories.join("-")}-${sort}`}
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
                  search={searchParams.toString()}
                />
              );
            })}
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
