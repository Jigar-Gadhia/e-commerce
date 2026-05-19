import { Link, NavLink } from "react-router-dom";
import { useCart } from "@/cart-context";
import Icon from "@/components/Icon";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-tight text-slate-900"
        >
          <Icon name="ShoppingBag" size={22} />

          <span>Platzi Shop</span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-3 text-sm font-medium"
        >
          <NavLink
            to="/cart"
            className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-xl active:scale-95"
            data-testid="cart-link"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-100 via-white to-slate-200 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-b from-white/90 to-slate-50/80" />
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
              className="relative z-10"
            >
              <Icon name="ShoppingCart" size={22} className="text-slate-900" />
            </motion.div>
            <AnimatePresence mode="popLayout">
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{
                    scale: 0.4,
                    opacity: 0,
                    y: -6,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    scale: 0.4,
                    opacity: 0,
                    y: -6,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 22,
                  }}
                  className="absolute -right-2 -top-2 z-20 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-slate-900 px-1.5 shadow-xl"
                >
                  <motion.div
                    key={`pulse-${itemCount}`}
                    initial={{
                      scale: 0.8,
                      opacity: 0.5,
                    }}
                    animate={{
                      scale: 1.8,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.6,
                    }}
                    className="absolute inset-0 rounded-full bg-slate-900"
                  />
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="relative z-10 text-[11px] font-black tracking-wide text-white"
                  >
                    {itemCount}
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
