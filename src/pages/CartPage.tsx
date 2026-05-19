// import { AnimatePresence, motion } from "framer-motion";
// import { Link, useLocation } from "react-router-dom";
// import { useCart } from "../cart-context";
// import AddToCartButton from "@/components/AddToCartButton";
// import Icon from "@/components/Icon";

// export function CartPage() {
//   const { items, itemCount, totalValue, addItem, removeItem } = useCart();
//   const location = useLocation();

//   return (
//     <main
//       className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8"
//       data-testid="cart-page"
//     >
//       <Link
//         to={{ pathname: "/", search: location.search }}
//         className="group inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 mb-5"
//       >
//         <Icon
//           name="ArrowLeft"
//           size={18}
//           className="transition-transform duration-200 group-hover:-translate-x-1"
//         />

//         <span>Back to Home</span>
//       </Link>
//       <section className="space-y-2">
//         <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
//           Cart
//         </h1>
//         <p className="text-sm text-slate-600">
//           {itemCount} item{itemCount === 1 ? "" : "s"} in cart
//         </p>
//       </section>

//       <section className="mt-6 space-y-4">
//         <AnimatePresence>
//           {items.map((line) => (
//             <motion.article
//               key={line.product.id}
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -8 }}
//               className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4"
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={line.product.images[0]}
//                   alt={line.product.title}
//                   className="h-16 w-16 rounded-md object-cover"
//                 />
//                 <div>
//                   <p className="font-medium text-slate-900">
//                     {line.product.title}
//                   </p>
//                   <p className="text-sm text-slate-600">
//                     ${line.product.price} x {line.quantity}
//                   </p>
//                 </div>
//               </div>

//               <AddToCartButton
//                 product={line.product}
//                 quantity={line.quantity}
//                 onAdd={addItem}
//                 onRemove={removeItem}
//               />
//             </motion.article>
//           ))}
//         </AnimatePresence>

//         {items.length === 0 && (
//           <p className="text-slate-600">
//             Your cart is empty.{" "}
//             <Link className="underline" to="/">
//               Continue shopping
//             </Link>
//           </p>
//         )}
//       </section>

//       <section className="mt-8 border-t border-slate-200 pt-4">
//         <p className="text-sm text-slate-600">Total</p>
//         <p
//           className="text-2xl font-semibold text-slate-900"
//           data-testid="cart-total"
//         >
//           ${totalValue}
//         </p>
//       </section>
//     </main>
//   );
// }
// pages/CartPage.tsx

import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../cart-context";
import AddToCartButton from "@/components/AddToCartButton";
import Icon from "@/components/Icon";

export function CartPage() {
  const { items, itemCount, totalValue, addItem, removeItem } = useCart();

  const location = useLocation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <main
        className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8"
        data-testid="cart-page"
      >
        {/* Back */}
        {items.length! > 0 && (
          <Link
            to={{ pathname: "/", search: location.search }}
            className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            <Icon
              name="ArrowLeft"
              size={18}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />

            <span>Continue Shopping</span>
          </Link>
        )}

        {/* Empty State */}
        {items.length === 0 && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
            data-testid="empty-cart-state"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <Icon name="ShoppingCart" size={34} className="text-slate-500" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-slate-900">
              Your cart is empty
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Looks like you haven’t added anything yet. Start exploring
              products and add your favorites.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-slate-800"
              data-testid="continue-shopping-btn"
            >
              <Icon name="ArrowLeft" size={16} />
              Continue Shopping
            </Link>
          </motion.section>
        )}

        {/* Cart Items */}
        {items.length > 0 && (
          <section className="mt-1 grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Items */}
            <div className="space-y-4">
              <AnimatePresence>
                {items.map((line) => (
                  <motion.article
                    key={line.product.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="group flex gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg"
                    data-testid={`cart-line-item-${line.product.id}`}
                  >
                    {/* Image */}
                    <div className="relative shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                      <img
                        src={line.product.images[0]}
                        alt={line.product.title}
                        className="h-24 w-24 object-cover transition-transform duration-300 group-hover:scale-105 sm:h-28 sm:w-28"
                        data-testid={`cart-item-image-${line.product.id}`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p
                              className="line-clamp-2 text-sm font-semibold leading-6 text-slate-900 sm:text-base"
                              data-testid={`cart-item-title-${line.product.id}`}
                            >
                              {line.product.title}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {line.product.category.name}
                            </p>
                          </div>

                          <div className="shrink-0 text-right">
                            <p
                              className="text-lg font-bold tracking-tight text-slate-900"
                              data-testid={`cart-item-total-${line.product.id}`}
                            >
                              ${(line.product.price * line.quantity).toFixed(2)}
                            </p>

                            <p className="text-xs text-slate-400">
                              ${line.product.price} each
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Icon
                            name="Star"
                            size={14}
                            className="fill-current"
                          />

                          <span className="text-xs font-medium text-slate-700">
                            4.8 Rating
                          </span>
                        </div>

                        <AddToCartButton
                          product={line.product}
                          quantity={line.quantity}
                          onAdd={addItem}
                          onRemove={removeItem}
                        />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <aside
              className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              data-testid="order-summary"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Items</span>

                  <span>{itemCount}</span>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-slate-900">
                      Total
                    </span>

                    <span
                      className="text-2xl font-bold tracking-tight text-slate-900"
                      data-testid="cart-total"
                    >
                      ${totalValue.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.01] hover:bg-slate-800"
                  data-testid="checkout-btn"
                >
                  <Icon name="CreditCard" size={18} />
                  Proceed to Checkout
                </button>
              </div>
            </aside>
          </section>
        )}
      </main>
    </motion.section>
  );
}
