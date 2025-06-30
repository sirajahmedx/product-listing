import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Minus, Plus } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";

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

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/products/${id}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data = await response.json();
      setProduct(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "text-gray-900 fill-current"
            : "text-gray-200"
        }`}
      />
    ));
  };

  const updateQuantity = (change: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + change)));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Product not found
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors"
          >
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-md text-gray-500 hover:text-gray-800 transition"
        >
          <ArrowLeft className="h-[19px] w-[19px] mr-2" />
          Back
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover rounded-xl shadow-sm mt-4"
          />
        </div>

        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500">{product.brand}</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="text-xl font-bold text-gray-900">
            ${product.price}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {product.features.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Key Features
              </h3>
              <ul className="text-sm text-gray-600 space-y-1 pl-4 list-disc">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.inStock ? (
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Quantity:</span>
                <div className="flex items-center border rounded-md border-gray-200 overflow-hidden">
                  <button
                    onClick={() => updateQuantity(-1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 text-sm">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button className="w-full bg-gray-900 text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition">
                Add to cart
              </button>
            </div>
          ) : (
            <div className="text-sm text-red-500">Out of stock</div>
          )}
        </div>
      </div>
    </div>
  );
};
