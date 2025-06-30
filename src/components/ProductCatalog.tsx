import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { LoadingSpinner } from './LoadingSpinner';
import { Search, Grid, List } from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    search: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          queryParams.append(key, value);
        }
      });
      
      const response = await fetch(`http://localhost:3001/api/products?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (sortBy: string) => {
    const newSortOrder = filters.sortBy === sortBy && filters.sortOrder === 'asc' ? 'desc' : 'asc';
    setFilters(prev => ({ ...prev, sortBy, sortOrder: newSortOrder }));
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load products</h3>
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
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Browse our collection</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'text-gray-900' : 'text-gray-400'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'text-gray-900' : 'text-gray-400'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 focus:border-gray-900 focus:ring-0"
        />
      </div>

      {/* Sort */}
      <div className="flex items-center space-x-4 text-sm">
        <span className="text-gray-600">Sort by:</span>
        <button
          onClick={() => handleSortChange('name')}
          className={`${filters.sortBy === 'name' ? 'text-gray-900 underline' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Name
        </button>
        <button
          onClick={() => handleSortChange('price')}
          className={`${filters.sortBy === 'price' ? 'text-gray-900 underline' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Price
        </button>
        <button
          onClick={() => handleSortChange('rating')}
          className={`${filters.sortBy === 'rating' ? 'text-gray-900 underline' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Rating
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
                  : 'space-y-0'
              }`}>
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
              
              <div className="mt-12 text-center text-sm text-gray-500">
                {products.length} product{products.length !== 1 ? 's' : ''}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};