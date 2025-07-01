import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  brand: string;
  features: string[];
}

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < Math.floor(rating)
            ? "text-gray-900 fill-current"
            : "text-gray-200"
        }`}
      />
    ));
  };

  if (viewMode === "list") {
    return (
      <div className="border-b border-gray-200 rounded shadow-sm pb-6 sm:pb-8 mb-6 sm:mb-8 last:border-b-0">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="w-full sm:w-32 md:w-40 lg:w-44 h-48 sm:h-32 md:h-40 lg:h-44 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">
                  <Link
                    to={`/product/${product.id}`}
                    className="hover:text-gray-600 transition-colors line-clamp-2"
                  >
                    {product.name}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {product.brand}
                </p>
              </div>
              <div className="text-base sm:text-lg font-medium text-gray-900 flex-shrink-0">
                ${product.price}
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
              {product.description}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
                <span className="text-xs text-gray-500 ml-2">
                  {product.rating} ({product.reviews})
                </span>
              </div>
              {!product.inStock && (
                <span className="text-xs text-gray-400">Out of stock</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-lg shadow-xl p-3 sm:p-4">
      <div className="mb-3 sm:mb-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full aspect-square object-cover rounded-lg sm:rounded-xl"
        />
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 flex-1">
            <Link
              to={`/product/${product.id}`}
              className="hover:text-gray-600 transition-colors"
            >
              {product.name}
            </Link>
          </h3>
          <div className="text-xs sm:text-sm font-medium text-gray-900 flex-shrink-0">
            ${product.price}
          </div>
        </div>
        <p className="text-xs text-gray-500">{product.brand}</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        {!product.inStock && (
          <span className="text-xs text-gray-400">Out of stock</span>
        )}
      </div>
      <Link
        to={`/product/${product.id}`}
        className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-teal-600 text-white text-xs px-2 sm:px-3 py-1 rounded-full hover:bg-teal-700 transition-all"
      >
        View
      </Link>
    </div>
  );
};
