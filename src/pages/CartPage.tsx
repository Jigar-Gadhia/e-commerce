import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../cart-context";
import AddToCartButton from "@/components/AddToCartButton";
import Icon from "@/components/Icon";

export function CartPage() {
  const { items, itemCount, totalValue, addItem, removeItem } = useCart();
  const location = useLocation();

  return (
    <main
      className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8"
      data-testid="cart-page"
    >
      <Link
        to={{ pathname: "/", search: location.search }}
        className="group inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 mb-5"
      >
        <Icon
          name="ArrowLeft"
          size={18}
          className="transition-transform duration-200 group-hover:-translate-x-1"
        />

        <span>Back to Home</span>
      </Link>
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Cart
        </h1>
        <p className="text-sm text-slate-600">
          {itemCount} item{itemCount === 1 ? "" : "s"} in cart
        </p>
      </section>

      <section className="mt-6 space-y-4">
        <AnimatePresence>
          {items.map((line) => (
            <motion.article
              key={line.product.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={line.product.images[0]}
                  alt={line.product.title}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium text-slate-900">
                    {line.product.title}
                  </p>
                  <p className="text-sm text-slate-600">
                    ${line.product.price} x {line.quantity}
                  </p>
                </div>
              </div>

              <AddToCartButton
                product={line.product}
                quantity={line.quantity}
                onAdd={addItem}
                onRemove={removeItem}
              />
            </motion.article>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <p className="text-slate-600">
            Your cart is empty.{" "}
            <Link className="underline" to="/">
              Continue shopping
            </Link>
          </p>
        )}
      </section>

      <section className="mt-8 border-t border-slate-200 pt-4">
        <p className="text-sm text-slate-600">Total</p>
        <p
          className="text-2xl font-semibold text-slate-900"
          data-testid="cart-total"
        >
          ${totalValue}
        </p>
      </section>
    </main>
  );
}
