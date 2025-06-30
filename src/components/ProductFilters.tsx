import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FilterState {
  category: string;
  minRating: string;
  search: string;
  sortBy: string;
  sortOrder: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const clearFilters = () => {
    onFilterChange({
      category: "all",
      minRating: "",
    });
  };

  const hasActiveFilters = filters.category !== "all" || filters.minRating;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-lg text-gray-600 hover:text-gray-900"
        >
          <span>Filters</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Clear
          </button>
        )}
      </div>

      {isOpen && (
        <div className="space-y-6 pb-6 border-b border-gray-100">
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Category</h4>
            <div className="space-y-2">
              <label className="flex items-center text-md">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={filters.category === "all"}
                  onChange={(e) => onFilterChange({ category: e.target.value })}
                  className="mr-2 text-gray-900 focus:ring-gray-900"
                />
                All
              </label>
              {categories.map((category) => (
                <label key={category} className="flex items-center text-md">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={(e) =>
                      onFilterChange({ category: e.target.value })
                    }
                    className="mr-2 text-gray-900 focus:ring-gray-900"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2].map((rating) => (
                <label key={rating} className="flex items-center text-md">
                  <input
                    type="radio"
                    name="rating"
                    value={rating.toString()}
                    checked={filters.minRating === rating.toString()}
                    onChange={(e) =>
                      onFilterChange({ minRating: e.target.value })
                    }
                    className="mr-2 text-gray-900 focus:ring-gray-900"
                  />
                  {rating}+ stars
                </label>
              ))}
              <label className="flex items-center text-md">
                <input
                  type="radio"
                  name="rating"
                  value=""
                  checked={filters.minRating === ""}
                  onChange={(e) =>
                    onFilterChange({ minRating: e.target.value })
                  }
                  className="mr-2 text-gray-900 focus:ring-gray-900"
                />
                All ratings
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
