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
      <div className="border-b border-gray-200 rounded shadow-sm pb-8 mb-8 last:border-b-0">
        <div className="flex gap-6">
          <div className="w-44 h-44 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  <Link
                    to={`/product/${product.id}`}
                    className="hover:text-gray-600 transition-colors"
                  >
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
              </div>
              <div className="text-lg font-medium text-gray-900">
                ${product.price}
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center space-x-1 mb-3">
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
    );
  }

  return (
    <div className="group relative rounded-lg shadow-xl p-4">
      <div className="mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            <Link
              to={`/product/${product.id}`}
              className="hover:text-gray-600 transition-colors"
            >
              {product.name}
            </Link>
          </h3>
          <div className="text-sm font-medium text-gray-900 ml-2">
            ${product.price}
          </div>
        </div>

        <p className="text-xs text-gray-500">{product.brand}</p>

        <div className="flex items-center space-x-1">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-400 ml-1">
            ({product.reviews})
          </span>
        </div>

        {!product.inStock && (
          <span className="text-xs text-gray-400">Out of stock</span>
        )}
      </div>

      <Link
        to={`/product/${product.id}`}
        className="absolute bottom-4 right-4 bg-teal-600 text-white text-xs px-3 py-1 rounded-full hover:bg-teal-700 transition-all"
      >
        View
      </Link>
    </div>
  );
};
