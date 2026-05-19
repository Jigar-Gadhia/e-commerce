import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchProductById } from "../api";
import { useCart } from "../cart-context";
import type { Product } from "../types";
import AddToCartButton from "@/components/AddToCartButton";
import Icon from "@/components/Icon";

export function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const { items, addItem, removeItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    if (!id) {
      setErrorMessage("Missing product id.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    fetchProductById(Number(id), controller.signal)
      .then((response) => {
        setProduct(response);
      })
      .catch(() => {
        !controller.signal.aborted && setErrorMessage("Could not load product details.");
      })
      .finally(() => {
        setIsLoading(false);
      });

      return () => controller.abort()
  }, [id]);

  const cartItem = items.find((item) => item.product.id === product?.id);

  const quantity = cartItem?.quantity || 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <main
        className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8"
        data-testid="product-page"
      >
        <Link
          to={{ pathname: "/", search: location.search }}
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
        >
          <Icon
            name="ArrowLeft"
            size={18}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />

          <span>Back to Home</span>
        </Link>

        {isLoading && (
          <section className="mt-6 grid gap-6 md:grid-cols-2 animate-pulse">

            <div className="aspect-square w-full rounded-lg bg-slate-200" />

            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-slate-200" />

              <div className="h-8 w-3/4 rounded bg-slate-200" />

              <div className="h-6 w-28 rounded bg-slate-200" />

              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
              </div>

              <div className="h-10 w-32 rounded-md bg-slate-200" />
            </div>
          </section>
        )}
        {errorMessage && (
          <p className="mt-6 text-sm text-red-600">{errorMessage}</p>
        )}

        {product && !isLoading && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 grid gap-6 md:grid-cols-2"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full rounded-lg object-cover"
            />

            <article className="space-y-4">
              <p className="text-sm text-slate-500">{product.category.name}</p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                {product.title}
              </h1>
              <p className="text-xl font-semibold text-slate-900">
                ${product.price}
              </p>
              <p className="leading-7 text-slate-700">{product.description}</p>
              <AddToCartButton
                product={product}
                quantity={quantity}
                onAdd={addItem}
                onRemove={removeItem}
              />
            </article>
          </motion.section>
        )}
      </main>
    </motion.section>
  );
}
