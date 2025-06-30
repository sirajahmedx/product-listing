import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <ShoppingBag className="h-6 w-6 text-gray-900" />
              <span className="text-xl font-medium text-gray-900">Store</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Products
              </Link>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </a>
            </nav>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-6 py-4 space-y-3">
              <Link to="/" className="block text-gray-600 hover:text-gray-900">
                Products
              </Link>
              <a href="#" className="block text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#" className="block text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </div>
          </div>
        )}
      </header>
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {children}
      </main>
    </div>
  );
};