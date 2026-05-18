import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
  onAdd: (product: Product) => void;
  onRemove: (productId: number) => void;
  showRemoveButton?: boolean;
}

export default function AddToCartButton({
  product,
  quantity,
  onAdd,
  onRemove,
  showRemoveButton = false,
}: AddToCartButtonProps) {
  return (
    <AnimatePresence mode="wait">
      {quantity === 0 ? (
        <motion.button
          key="add-button"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onAdd(product)}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          data-testid="add-to-cart"
        >
          Add to Cart
        </motion.button>
      ) : quantity === 1 && showRemoveButton ? (
        <motion.button
          key="remove-button"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onRemove(product.id)}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Remove
        </motion.button>
      ) : (
        <motion.div
          key="cart-pill"
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex w-fit items-center overflow-hidden rounded-full border border-slate-300 bg-white shadow-sm"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemove(product.id)}
            className="flex h-11 w-11 items-center justify-center text-lg font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            −
          </motion.button>

          <motion.div
            key={quantity}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="min-w-10 text-center text-sm font-semibold text-slate-900"
          >
            {quantity}
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onAdd(product)}
            className="flex h-11 w-11 items-center justify-center text-lg font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            +
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
