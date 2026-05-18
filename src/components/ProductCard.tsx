import { Link } from "react-router-dom";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  quantity?: number;
  search?: string;
}

export default function ProductCard({
  product,
  quantity = 0,
  search,
}: ProductCardProps) {
  return (
    <Link
      to={{
        pathname: `/product/${product.id}`,
        search: search ? `?${search}` : "",
      }}
      className="group space-y-2"
      data-testid={`product-item-${product.id}`}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={product.images[0]}
          alt={product.title}
          className="aspect-square w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />

        {quantity > 0 && (
          <div className="absolute right-2 top-2 flex min-h-7 min-w-7 items-center justify-center rounded-full bg-black px-2 text-xs font-semibold text-white shadow-md">
            {quantity}
          </div>
        )}
      </div>

      <p className="line-clamp-2 text-sm font-medium text-slate-900">
        {product.title}
      </p>

      <p className="text-sm text-slate-600">
        ${product.price}
      </p>
    </Link>
  );
}
