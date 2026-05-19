import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "@/components/Icon";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  quantity?: number;
}

const ProductCard = ({ product, quantity = 0 }: ProductCardProps) => {
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
        {/* <div className="relative overflow-hidden bg-slate-100">
          <img
            src={product.images[0]}
            alt={product.title}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {quantity > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 shadow-2xl backdrop-blur-xl"
            >
              <Icon
                name="ShoppingCart"
                size={12}
                className="text-white sm:h-[13px] sm:w-[13px]"
              />

              <span className="text-xs font-bold tracking-wide text-white">
                {quantity}
              </span>
            </motion.div>
          )}
        </div> */}
        <div className="relative overflow-hidden bg-slate-100">
          {product.images[0]?.match(/\.(jpg|jpeg|png|webp|gif|avif)$/i) ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                  <Icon
                    name="ShoppingBag"
                    size={30}
                    className="text-slate-500"
                  />
                </div>

                <span className="text-xs font-medium tracking-wide text-slate-500">
                  No Preview
                </span>
              </div>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Cart Badge */}
          {quantity > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 shadow-2xl backdrop-blur-xl"
            >
              <Icon
                name="ShoppingCart"
                size={12}
                className="text-white sm:h-[13px] sm:w-[13px]"
              />

              <span className="text-xs font-bold tracking-wide text-white">
                {quantity}
              </span>
            </motion.div>
          )}
        </div>

        <div className="space-y-2 p-3 sm:space-y-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="max-w-[70%] truncate rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 sm:px-2.5 sm:text-xs">
              {product.category.name}
            </span>
          </div>

          <h3 className="line-clamp-2 min-h-[40px] text-xs font-semibold leading-5 text-slate-900 sm:min-h-[48px] sm:text-sm sm:leading-6">
            {product.title}
          </h3>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="min-w-0">
              <div className="flex flex-wrap items-end gap-1">
                <span className="text-base font-bold tracking-tight text-slate-900 sm:text-xl">
                  ${product.price}
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
};

export default ProductCard;
