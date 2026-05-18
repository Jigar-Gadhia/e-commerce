import { Link, NavLink } from "react-router-dom";
import { useCart } from "@/cart-context";
import Icon from "@/components/Icon";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-tight text-slate-900"
        >
          <Icon name="ShoppingBag" size={22} />

          <span>Platzi Shop</span>
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Primary"
          className="flex items-center gap-3 text-sm font-medium"
        >
          <NavLink
            to="/cart"
            className="flex items-center gap-2 rounded-xl bg-black px-3 py-2 transition-all duration-200 hover:scale-[1.03] active:scale-95"
            data-testid="cart-link"
          >
            <Icon name="ShoppingCart" size={22} className="text-white" />

            {itemCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-semibold text-slate-900 transition-transform duration-200 hover:scale-110">
                {itemCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
