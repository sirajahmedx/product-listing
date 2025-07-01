import { useState, useEffect } from "react";
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
        `https://product-listing-backend-kohl.vercel.app/api/products?${queryParams}`
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
    <div className="min-h-screen">
      <div className="space-y-6 sm:space-y-8 lg:space-y-12 py-6 sm:py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-6 animate-fade-in px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent leading-tight">
              Elevate Your Everyday
            </h1>
            <div className="w-32 sm:w-48 md:w-64 lg:w-96 h-0.5 sm:h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"></div>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto pt-2 sm:pt-4 px-4">
              Discover thoughtfully crafted products that blend design, quality,
              and purpose made to inspire and enhance your lifestyle.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mx-auto relative group px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg sm:rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 transition-colors group-focus-within:text-gray-600" />
            <input
              type="text"
              placeholder="What are you looking for today?"
              value={filters.search}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
              className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 bg-transparent rounded-lg sm:rounded-xl focus:outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Visual elements */}
        <div className="flex justify-center items-center space-x-4 sm:space-x-6 lg:space-x-8 opacity-60 px-4">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-8 sm:w-12 lg:w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div className="w-8 sm:w-12 lg:w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-300 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8 items-start px-4 sm:px-6 lg:px-8">
            {/* Filters Sidebar */}
            <div className="xl:col-span-1 order-1 xl:order-1">
              <div className="sticky top-4">
                <ProductFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>

            {/* Products Section */}
            <div className="xl:col-span-3 space-y-4 sm:space-y-6 order-2 xl:order-2">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-sm">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <span className="text-gray-600 text-sm sm:text-base lg:text-lg whitespace-nowrap">
                    Sort by:
                  </span>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    <button
                      onClick={() => handleSortChange("name")}
                      className={`text-sm sm:text-base lg:text-lg transition-colors ${
                        filters.sortBy === "name"
                          ? "text-gray-900 underline"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Name
                    </button>
                    <button
                      onClick={() => handleSortChange("price")}
                      className={`text-sm sm:text-base lg:text-lg transition-colors ${
                        filters.sortBy === "price"
                          ? "text-gray-900 underline"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Price
                    </button>
                    <button
                      onClick={() => handleSortChange("rating")}
                      className={`text-sm sm:text-base lg:text-lg transition-colors ${
                        filters.sortBy === "rating"
                          ? "text-gray-900 underline"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Rating
                    </button>
                  </div>
                </div>

                <div className="flex space-x-2 self-start sm:self-auto">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid"
                        ? "text-gray-900"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Grid className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${
                      viewMode === "list"
                        ? "text-gray-900"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <List className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>
              </div>

              {/* Products Display */}
              {loading ? (
                <div className="flex justify-center py-8 sm:py-12">
                  <LoadingSpinner />
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-8 sm:py-12 px-4">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className={`${
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
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
                  <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-gray-500">
                    {products.length} product{products.length !== 1 ? "s" : ""}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
