import React, { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { LoadingSpinner } from "./LoadingSpinner";
import { Search, Grid, List } from "lucide-react";

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

interface FilterState {
  category: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  search: string;
  sortBy: string;
  sortOrder: string;
}

export const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    search: "",
    sortBy: "name",
    sortOrder: "asc",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(
        `http://localhost:3001/api/products?${queryParams}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (sortBy: string) => {
    const newSortOrder =
      filters.sortBy === sortBy && filters.sortOrder === "asc" ? "desc" : "asc";
    setFilters((prev) => ({ ...prev, sortBy, sortOrder: newSortOrder }));
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Unable to load products
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-6 animate-fade-in pl-8">
        <div className="space-y-1.5">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Elevate Your Everyday
          </h1>
          <div className="w-96 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"></div>
          <p className="text-sm md:text-lg text-gray-600 max-w-xl mx-auto pt-4">
            Discover thoughtfully crafted products that blend design, quality,
            and purpose made to inspire and enhance your lifestyle.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto relative group pl-8">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-100">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-gray-600" />
          <input
            type="text"
            placeholder="What are you looking for today?"
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            className="w-full pl-12 pr-6 py-4 bg-transparent rounded-xl focus:outline-none text-gray-700 placeholder-gray-400 text-base"
          />
        </div>
      </div>

      {/* Optional: Add some visual elements */}
      <div className="flex justify-center items-center space-x-8 opacity-60">
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div
          className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div
          className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-1">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center text-sm">
            <div className="space-x-4">
              <span className="text-gray-600 text-lg">Sort by:</span>
              <button
                onClick={() => handleSortChange("name")}
                className={`text-lg ${
                  filters.sortBy === "name"
                    ? "text-gray-900 underline"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Name
              </button>
              <button
                onClick={() => handleSortChange("price")}
                className={`text-lg ${
                  filters.sortBy === "price"
                    ? "text-gray-900 underline"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Price
              </button>
              <button
                onClick={() => handleSortChange("rating")}
                className={`text-lg ${
                  filters.sortBy === "rating"
                    ? "text-gray-900 underline"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Rating
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid" ? "text-gray-900" : "text-gray-400"
                }`}
              >
                <Grid className="h-6 w-6" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list" ? "text-gray-900" : "text-gray-400"
                }`}
              >
                <List className="h-6 w-6" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <>
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                    : "space-y-0"
                }`}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
              <div className="mt-12 text-center text-sm text-gray-500">
                {products.length} product{products.length !== 1 ? "s" : ""}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
