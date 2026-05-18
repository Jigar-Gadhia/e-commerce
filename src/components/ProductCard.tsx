import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "@/components/Icon";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  quantity?: number;
}

export default function ProductCard({
  product,
  quantity = 0
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group min-w-0"
    >
      <Link
        to={{
          pathname: `/product/${product.id}`,
        }}
        data-testid={`product-item-${product.id}`}
        className="block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl"
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-slate-100">
          <img
            src={product.images[0]}
            alt={product.title}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Cart Badge */}
          {quantity > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/90 px-2 py-1 text-white shadow-lg backdrop-blur sm:right-3 sm:top-3 sm:px-2.5 sm:py-1.5"
            >
              <Icon
                name="ShoppingCart"
                size={12}
                className="text-white sm:h-[13px] sm:w-[13px]"
              />

              <span className="text-[10px] font-semibold sm:text-xs">
                {quantity}
              </span>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2 p-3 sm:space-y-3 sm:p-4">
          {/* Category + Rating */}
          <div className="flex items-center justify-between gap-2">
            <span className="max-w-[70%] truncate rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 sm:px-2.5 sm:text-xs">
              {product.category.name}
            </span>

            <div className="flex shrink-0 items-center gap-1 text-amber-500">
              <Icon
                name="Star"
                size={12}
                className="fill-current sm:h-[14px] sm:w-[14px]"
              />

              <span className="text-[10px] font-medium text-slate-700 sm:text-xs">
                4.8
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 min-h-[40px] text-xs font-semibold leading-5 text-slate-900 sm:min-h-[48px] sm:text-sm sm:leading-6">
            {product.title}
          </h3>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="min-w-0">
              <div className="flex flex-wrap items-end gap-1">
                <span className="text-base font-bold tracking-tight text-slate-900 sm:text-xl">
                  ${product.price}
                </span>

                <span className="text-[10px] text-slate-400 line-through sm:text-xs">
                  ${(product.price * 1.2).toFixed(0)}
                </span>
              </div>
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-transform duration-200 group-hover:scale-110 sm:h-10 sm:w-10">
              <Icon
                name="ArrowUpRight"
                size={16}
                className="sm:h-[18px] sm:w-[18px]"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
