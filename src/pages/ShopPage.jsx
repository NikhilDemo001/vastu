import React, { useMemo, useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, RefreshCw, X, Star } from 'lucide-react';
import { productCategories, shopProducts } from '../data/catalog';

// Shop Components
import ShopHero from '../components/shop/ShopHero';
import ProductCard from '../components/shop/ProductCard';
import FilterSidebar from '../components/shop/FilterSidebar';
import CartDrawer from '../components/shop/CartDrawer';
import EmptyState from '../components/shop/EmptyState';

const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#111715] rounded-[16px] border border-black/5 dark:border-white/5 p-5 space-y-4 animate-pulse">
    <div className="aspect-[1/1.15] bg-black/5 dark:bg-white/5 rounded-[12px] w-full" />
    <div className="h-4 bg-black/5 dark:bg-white/5 rounded w-1/3" />
    <div className="h-6 bg-black/5 dark:bg-white/5 rounded w-3/4" />
    <div className="flex justify-between items-center pt-2">
      <div className="h-6 bg-black/5 dark:bg-white/5 rounded w-1/4" />
      <div className="h-6 bg-black/5 dark:bg-white/5 rounded w-1/3" />
    </div>
    <div className="h-10 bg-black/5 dark:bg-white/5 rounded-full w-full mt-4" />
  </div>
);

const ShopPage = () => {
  // Advanced Multi-Attribute Filter States
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(6000);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [stockStatus, setStockStatus] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  
  // Luxury Features State
  const [currency, setCurrency] = useState('INR'); // INR or USD
  const [isLoading, setIsLoading] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]); // Array of { name, quantity }
  const [activeProduct, setActiveProduct] = useState(null);
  
  // UI Panels State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  // Initialize scroll, recently viewed & wishlist
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const savedRV = localStorage.getItem('recentlyViewed');
    if (savedRV) setRecentlyViewed(JSON.parse(savedRV));

    const savedWish = localStorage.getItem('wishlist');
    if (savedWish) setWishlist(JSON.parse(savedWish));

    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Update localStorage for cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle recently viewed recording
  useEffect(() => {
    if (activeProduct) {
      setRecentlyViewed((current) => {
        const updated = [activeProduct.name, ...current.filter(n => n !== activeProduct.name)].slice(0, 6);
        localStorage.setItem('recentlyViewed', JSON.stringify(updated));
        return updated;
      });
    }
  }, [activeProduct]);

  // Loading shimmer trigger on search / filtering shifts
  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1); // Reset to page 1 on active filter changes
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [category, query, maxPrice, selectedBrand, selectedColor, selectedSize, minRating, stockStatus, sortOption]);

  // Multi-layer optimized filtering
  const filteredProducts = useMemo(() => {
    const normQuery = query.trim().toLowerCase();
    
    return shopProducts.filter((product) => {
      // 1. Category check
      const matchesCategory = category === 'All' || product.category === category;
      
      // 2. Search box query check
      const matchesSearch =
        !normQuery ||
        product.name.toLowerCase().includes(normQuery) ||
        product.category.toLowerCase().includes(normQuery) ||
        product.brand.toLowerCase().includes(normQuery) ||
        (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(normQuery)));

      // 3. Price boundary check
      const matchesPrice = product.price <= maxPrice;

      // 4. Brand check
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;

      // 5. Color swatch check
      const matchesColor = selectedColor === 'All' || 
        (product.colors && product.colors.some(c => c.toLowerCase() === selectedColor.toLowerCase()));

      // 6. Size tag check
      const matchesSize = selectedSize === 'All' || 
        (product.sizes && product.sizes.includes(selectedSize));

      // 7. Star ratings check
      const matchesRating = product.rating >= minRating;

      // 8. Availability check
      const matchesStock = stockStatus === 'all' || 
        (stockStatus === 'in-stock' && product.stockStatus === 'in-stock') ||
        (stockStatus === 'low-stock' && product.stockStatus === 'low-stock');

      return matchesCategory && matchesSearch && matchesPrice && matchesBrand && matchesColor && matchesSize && matchesRating && matchesStock;
    });
  }, [category, query, maxPrice, selectedBrand, selectedColor, selectedSize, minRating, stockStatus]);

  // Advanced Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortOption) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'discount':
        return list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      case 'newest':
        return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'popularity':
        return list.sort((a, b) => b.popularity - a.popularity);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'bestselling':
        return list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      default:
        return list;
    }
  }, [filteredProducts, sortOption]);

  // Pagination Calculations
  const totalPages = useMemo(() => {
    return Math.ceil(sortedProducts.length / itemsPerPage);
  }, [sortedProducts, itemsPerPage]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById('collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  // Wishlist callback logic
  const toggleWishlist = (productName) => {
    setWishlist((current) => {
      const updated = current.includes(productName)
        ? current.filter((item) => item !== productName)
        : [...current, productName];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  // Cart quantity-aware toggler
  const handleToggleCart = (productName) => {
    setCartItems((current) => {
      const exists = current.find(item => item.name === productName);
      if (exists) {
        return current.filter(item => item.name !== productName);
      } else {
        // Auto show drawer when item is pushed
        setIsCartOpen(true);
        return [...current, { name: productName, quantity: 1 }];
      }
    });
  };

  const resetFilters = () => {
    setCategory('All');
    setQuery('');
    setMaxPrice(6000);
    setSelectedBrand('All');
    setSelectedColor('All');
    setSelectedSize('All');
    setMinRating(0);
    setStockStatus('all');
    setSortOption('default');
    setIsMobileDrawerOpen(false);
  };

  // Active Filters checker
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (category !== 'All') count++;
    if (query !== '') count++;
    if (maxPrice < 6000) count++;
    if (selectedBrand !== 'All') count++;
    if (selectedColor !== 'All') count++;
    if (selectedSize !== 'All') count++;
    if (minRating > 0) count++;
    if (stockStatus !== 'all') count++;
    return count;
  }, [category, query, maxPrice, selectedBrand, selectedColor, selectedSize, minRating, stockStatus]);

  return (
    <div className="bg-[#f9f7f3] dark:bg-[#080c0b] min-h-screen text-[#080c0b] dark:text-[#f0ede8] transition-colors duration-300">
      
      <ShopHero />

      {/* Main Collection Content */}
      <section id="collection" className="section-shell py-12 md:py-20 px-4 scroll-mt-20">
        
        {/* Collection Section Title / Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl font-black tracking-tight text-[#080c0b] dark:text-[#f0ede8]">
              {category === 'All' ? 'Sacred Elements Directory' : `${category} Remedies`}
            </h2>
            <p className="text-[10px] text-[#6b8c82] uppercase tracking-[0.25em] font-mono mt-1 font-bold">
              Cleanse · Align · Elevate Spatial Flow
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-[#ebe4d8]/40 dark:bg-[#111715] p-1 rounded-full border border-black/5 dark:border-white/5 shadow-inner">
            <button 
              onClick={() => setCurrency('INR')}
              className={`px-3.5 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-full transition-all ${
                currency === 'INR' 
                  ? 'bg-[#080c0b] dark:bg-[#f0ede8] text-white dark:text-[#080c0b] shadow-sm' 
                  : 'text-[#6e8078] hover:text-[#080c0b]'
              }`}
            >
              INR ₹
            </button>
            <button 
              onClick={() => setCurrency('USD')}
              className={`px-3.5 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-full transition-all ${
                currency === 'USD' 
                  ? 'bg-[#080c0b] dark:bg-[#f0ede8] text-white dark:text-[#080c0b] shadow-sm' 
                  : 'text-[#6e8078] hover:text-[#080c0b]'
              }`}
            >
              USD $
            </button>
          </div>
        </div>

        {/* Master Control Hub Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6 p-4 bg-white dark:bg-[#111715] border border-black/5 dark:border-white/5 rounded-2xl shadow-sm">
          
          {/* Collapsible Toggler & Count */}
          <div className="flex items-center gap-4">
            {/* Desktop Collapsible Trigger */}
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`hidden lg:flex items-center gap-2 btn ${isFiltersOpen ? 'btn-gold' : 'btn-outline'} px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider shadow-sm active:scale-97`}
            >
              <SlidersHorizontal size={13} />
              <span>{isFiltersOpen ? 'Hide Refinement' : 'Filter & Refine'} {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Mobile Sidebar Trigger */}
            <button 
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 btn btn-outline px-4.5 py-2.5 font-mono text-[10px] uppercase tracking-wider shadow-sm"
            >
              <SlidersHorizontal size={13} />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>
            
            <span className="text-[12px] font-bold text-[#6e8078] font-mono border-l border-black/10 dark:border-white/10 pl-4 h-5 flex items-center">
              Collection matching: <strong className="text-[#080c0b] dark:text-white ml-1.5 tabular">{sortedProducts.length}</strong> elements
            </span>
          </div>

          {/* Sorting harmony */}
          <div className="relative group shrink-0">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-transparent rounded-[10px] pl-4 pr-10 py-2.5 text-xs font-extrabold uppercase tracking-wider font-mono focus:outline-none cursor-pointer text-[#3d4e49] dark:text-[#f0ede8] border border-black/5 dark:border-white/5 bg-[#f9f7f3] dark:bg-[#080c0b]"
            >
              <option value="default">Featured Harmony</option>
              <option value="newest">Newest Additions</option>
              <option value="bestselling">Best Sellers</option>
              <option value="popularity">Popularity Score</option>
              <option value="rating">Highest Star Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Greatest Savings</option>
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e8078] pointer-events-none group-focus-within:text-[#e5a93a]" />
          </div>
        </div>

        {/* Collapsible horizontal filter shelf for desktop & slide-out for mobile */}
        <FilterSidebar 
          categories={productCategories}
          activeCategory={category}
          setActiveCategory={setCategory}
          searchQuery={query}
          setSearchQuery={setQuery}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          minRating={minRating}
          setMinRating={setMinRating}
          stockStatus={stockStatus}
          setStockStatus={setStockStatus}
          isMobileDrawerOpen={isMobileDrawerOpen}
          setIsMobileDrawerOpen={setIsMobileDrawerOpen}
          resetFilters={resetFilters}
          currency={currency}
          isOpen={isFiltersOpen}
        />

        {/* Active Filters Summary Pills */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 p-3 bg-white dark:bg-[#111715]/40 border border-black/5 dark:border-white/5 rounded-xl animate-scale-in">
            <span className="text-[9px] font-bold text-[#6e8078] uppercase tracking-wider font-mono self-center pr-2 border-r border-black/10 dark:border-white/10 mr-2">Active filters</span>
            {category !== 'All' && (
              <span className="flex items-center gap-1.5 text-[10px] font-bold font-mono px-3 py-1.5 bg-[#0b6455]/10 text-[#0b6455] dark:text-[#14a090] rounded-full">
                Category: {category}
                <button onClick={() => setCategory('All')} className="hover:text-red-500"><X size={10} /></button>
              </span>
            )}
            {query !== '' && (
              <span className="flex items-center gap-1.5 text-[10px] font-bold font-mono px-3 py-1.5 bg-[#0b6455]/10 text-[#0b6455] dark:text-[#14a090] rounded-full">
                Search: "{query}"
                <button onClick={() => setQuery('')} className="hover:text-red-500"><X size={10} /></button>
              </span>
            )}
            {maxPrice < 6000 && (
              <span className="flex items-center gap-1.5 text-[10px] font-bold font-mono px-3 py-1.5 bg-[#0b6455]/10 text-[#0b6455] dark:text-[#14a090] rounded-full">
                Price under: {currency === 'USD' ? '$' + Math.round(maxPrice / 85) : '₹' + maxPrice}
                <button onClick={() => setMaxPrice(6000)} className="hover:text-red-500"><X size={10} /></button>
              </span>
            )}
            {selectedBrand !== 'All' && (
              <span className="flex items-center gap-1.5 text-[10px] font-bold font-mono px-3 py-1.5 bg-[#0b6455]/10 text-[#0b6455] dark:text-[#14a090] rounded-full">
                Brand: {selectedBrand}
                <button onClick={() => setSelectedBrand('All')} className="hover:text-red-500"><X size={10} /></button>
              </span>
            )}
            {selectedColor !== 'All' && (
              <span className="flex items-center gap-1.5 text-[10px] font-bold font-mono px-3 py-1.5 bg-[#0b6455]/10 text-[#0b6455] dark:text-[#14a090] rounded-full">
                Color: {selectedColor}
                <button onClick={() => setSelectedColor('All')} className="hover:text-red-500"><X size={10} /></button>
              </span>
            )}
            {selectedSize !== 'All' && (
              <span className="flex items-center gap-1.5 text-[10px] font-bold font-mono px-3 py-1.5 bg-[#0b6455]/10 text-[#0b6455] dark:text-[#14a090] rounded-full">
                Size: {selectedSize}
                <button onClick={() => setSelectedSize('All')} className="hover:text-red-500"><X size={10} /></button>
              </span>
            )}
            {minRating > 0 && (
              <span className="flex items-center gap-1.5 text-[10px] font-bold font-mono px-3 py-1.5 bg-[#0b6455]/10 text-[#0b6455] dark:text-[#14a090] rounded-full">
                Rating: {minRating}★+
                <button onClick={() => setMinRating(0)} className="hover:text-red-500"><X size={10} /></button>
              </span>
            )}
            {stockStatus !== 'all' && (
              <span className="flex items-center gap-1.5 text-[10px] font-bold font-mono px-3 py-1.5 bg-[#0b6455]/10 text-[#0b6455] dark:text-[#14a090] rounded-full">
                Availability: {stockStatus === 'in-stock' ? 'In Stock' : 'Low Stock'}
                <button onClick={() => setStockStatus('all')} className="hover:text-red-500"><X size={10} /></button>
              </span>
            )}
            <button 
              onClick={resetFilters} 
              className="text-[9px] font-bold uppercase tracking-widest text-[#b84030] hover:underline self-center ml-auto flex items-center gap-1 font-mono"
            >
              <RefreshCw size={9} /> Reset All
            </button>
          </div>
        )}

        {/* Product Grid Area (Full Width Spacious Layout) */}
        <div className="w-full">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                {paginatedProducts.map((product, index) => (
                  <div 
                    key={product.name} 
                    className="animate-slide-in-up" 
                    style={{ animationDelay: `${(index % 8) * 50}ms` }}
                  >
                    <ProductCard 
                      product={product}
                      isWishlisted={wishlist.includes(product.name)}
                      onToggleWishlist={toggleWishlist}
                      isInCart={!!cartItems.find(item => item.name === product.name)}
                      onToggleCart={handleToggleCart}
                      onQuickView={setActiveProduct}
                      currency={currency}
                    />
                  </div>
                ))}
              </div>

              {/* Luxury Pagination & Items per page panel */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-16 pt-8 border-t border-black/5 dark:border-white/5 font-mono">
                  
                  {/* Info text */}
                  <div className="text-xs text-[#6e8078] dark:text-[#a0b0aa] font-bold">
                    Showing <span className="text-[#080c0b] dark:text-white tabular">{Math.min((currentPage - 1) * itemsPerPage + 1, sortedProducts.length)}</span>–
                    <span className="text-[#080c0b] dark:text-white tabular">{Math.min(currentPage * itemsPerPage, sortedProducts.length)}</span> of{' '}
                    <span className="text-[#080c0b] dark:text-white tabular">{sortedProducts.length}</span> items
                  </div>
                  
                  {/* Page numbers */}
                  <div className="flex items-center gap-1 bg-white dark:bg-[#111715] p-1.5 rounded-full border border-black/5 dark:border-white/5 shadow-sm">
                    {/* Prev Button */}
                    <button
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                        currentPage === 1
                          ? 'opacity-40 cursor-not-allowed text-[#6e8078]'
                          : 'text-[#080c0b] dark:text-[#f0ede8] hover:bg-[#f9f7f3] dark:hover:bg-[#080c0b] active:scale-95'
                      }`}
                    >
                      Prev
                    </button>
                    
                    {/* Page Numbers mapping */}
                    {getPageNumbers().map((pageNum, idx) => {
                      if (pageNum === '...') {
                        return (
                          <span key={`dots-${idx}`} className="px-2 text-xs font-bold text-[#6e8078]">
                            ...
                          </span>
                        );
                      }
                      
                      return (
                        <button
                          key={`page-${pageNum}`}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-9 h-9 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                            currentPage === pageNum
                              ? 'bg-[#080c0b] dark:bg-[#f0ede8] text-white dark:text-[#080c0b] shadow-md scale-110 font-extrabold'
                              : 'text-[#6e8078] hover:text-[#080c0b] dark:hover:text-white hover:bg-[#f9f7f3] dark:hover:bg-[#080c0b]'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    {/* Next Button */}
                    <button
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                        currentPage === totalPages
                          ? 'opacity-40 cursor-not-allowed text-[#6e8078]'
                          : 'text-[#080c0b] dark:text-[#f0ede8] hover:bg-[#f9f7f3] dark:hover:bg-[#080c0b] active:scale-95'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                  
                  {/* Show: X Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#6e8078] font-bold">Show:</span>
                    <div className="flex bg-[#ebe4d8]/40 dark:bg-[#111715] p-1 rounded-full border border-black/5 dark:border-white/5 shadow-inner">
                      {[16, 24, 36].map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setItemsPerPage(size);
                            setCurrentPage(1);
                          }}
                          className={`px-3 py-1 text-[9px] font-bold rounded-full transition-all ${
                            itemsPerPage === size
                              ? 'bg-[#080c0b] dark:bg-[#f0ede8] text-white dark:text-[#080c0b] shadow-sm font-extrabold'
                              : 'text-[#6e8078] hover:text-[#080c0b] dark:hover:text-[#f0ede8]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                </div>
              )}
            </>
          ) : (
            <EmptyState onReset={resetFilters} />
          )}
        </div>
      </section>

      {/* Floating Bag Indicator Widget */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-[#080c0b] dark:bg-white text-white dark:text-[#080c0b] rounded-full shadow-2xl flex items-center justify-center z-[90] hover:scale-110 active:scale-95 hover:bg-[#e5a93a] dark:hover:bg-[#e5a93a] dark:hover:text-white transition-all group border border-white/10 dark:border-black/10 animate-bounce"
        aria-label="Open Cart Bag"
        style={{ animationDuration: '3.5s' }}
      >
        <div className="relative">
          <svg className="w-5.5 h-5.5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute -top-2.5 -right-2.5 bg-[#b84030] text-white text-[9px] font-extrabold w-5.5 h-5.5 rounded-full flex items-center justify-center shadow-lg font-mono scale-110 transition-transform">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </div>
      </button>

      {/* Cart Drawer sliding integration */}
      <CartDrawer 
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
        currency={currency}
      />

      {/* Recently Viewed Carousel Section */}
      {recentlyViewed.length > 0 && (
        <section className="bg-[#ebe4d8]/20 dark:bg-[#0c100f] py-16 border-t border-black/5 dark:border-white/5">
          <div className="section-shell px-4">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8">
              <div>
                <span className="eyebrow eyebrow--gold mb-2 block uppercase text-[10px] font-mono tracking-widest font-bold">Your energy trail</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold">Recently Viewed Elements</h3>
              </div>
              <button 
                onClick={() => { setRecentlyViewed([]); localStorage.removeItem('recentlyViewed'); }}
                className="text-[10px] font-bold text-[#b84030] uppercase tracking-wider hover:underline font-mono"
              >
                Clear History
              </button>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
              {recentlyViewed.map((name) => {
                const p = shopProducts.find(prod => prod.name === name);
                if (!p) return null;
                const isUSD = currency === 'USD';
                const displayPrice = isUSD ? Math.round(p.price / 85) : p.price;
                const symb = isUSD ? '$' : '₹';
                
                return (
                  <div 
                    key={p.name} 
                    className="w-48 shrink-0 bg-white dark:bg-[#111715] border border-black/5 dark:border-white/5 rounded-[16px] p-3 hover:shadow-lg hover:-translate-y-1 transition-all group relative cursor-pointer"
                    onClick={() => setActiveProduct(p)}
                  >
                    <div className="aspect-square bg-[#f9f7f3] dark:bg-[#080c0b] rounded-[12px] overflow-hidden mb-3.5 relative">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <h4 className="text-xs font-bold text-[#080c0b] dark:text-[#f0ede8] line-clamp-1 leading-snug mb-1 group-hover:text-[#0b6455] dark:group-hover:text-[#14a090] transition-colors">{p.name}</h4>
                    <div className="flex justify-between items-center mt-2.5">
                      <span className="text-xs font-extrabold text-[#e5a93a] font-mono">{symb}{displayPrice.toLocaleString()}</span>
                      <span className="text-[9px] font-bold text-[#6b8c82] uppercase font-mono">{p.category.split('(')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Expanded Quick View Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 animate-scale-in">
          <div 
            className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            onClick={() => setActiveProduct(null)}
          />
          <div className="bg-white dark:bg-[#111715] max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row max-h-[90vh] border border-white/10">
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 h-10 w-10 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#080c0b] dark:text-white rounded-full flex items-center justify-center transition-colors z-20 backdrop-blur-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-[#f9f7f3] dark:bg-[#0c100f] shrink-0 relative">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                {activeProduct.stockStatus === 'low-stock' && (
                  <span className="bg-[#b84030] text-white text-[9px] font-extrabold px-3 py-1 rounded-[6px] uppercase tracking-wider shadow-md font-mono">
                    Low Stock Alert
                  </span>
                )}
              </div>
            </div>
            
            {/* Modal Details content */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center overflow-y-auto no-scrollbar">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b8c82] mb-2.5 block font-mono">
                {activeProduct.category} · {activeProduct.brand}
              </span>
              
              <h2 className="font-display text-3xl font-bold text-[#080c0b] dark:text-white leading-tight mb-4">
                {activeProduct.name}
              </h2>

              <div className="flex items-center gap-2 text-[#e5a93a] mb-5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={`fill-current ${i < Math.floor(activeProduct.rating) ? 'text-[#e5a93a]' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold font-mono text-[#3d4e49] dark:text-[#a8b8b2]">{activeProduct.rating} / 5.0 ({activeProduct.reviewsCount} reviews)</span>
              </div>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-black text-[#080c0b] dark:text-white tracking-tight tabular">
                  {currency === 'USD' ? '$' + Math.round(activeProduct.price / 85) : '₹' + activeProduct.price.toLocaleString('en-IN')}
                </span>
                {activeProduct.discount > 0 && (
                  <span className="text-sm text-[#6e8078] line-through tabular">
                    {currency === 'USD' ? '$' + Math.round(activeProduct.originalPrice / 85) : '₹' + activeProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              
              <p className="text-[13px] text-[#6e8078] dark:text-[#a0b0aa] leading-relaxed mb-6 font-medium">
                {activeProduct.description}
              </p>
              
              {/* Trust Indicators */}
              <div className="p-4 bg-[#0b6455]/5 dark:bg-[#0b6455]/10 border border-[#0b6455]/10 rounded-[12px] mb-8 text-left">
                <h4 className="text-[10px] font-bold text-[#0b6455] dark:text-[#14a090] uppercase tracking-widest mb-1.5 font-mono">
                  Sacred Ritual & Blessing
                </h4>
                <p className="text-[11px] text-[#3d4e49] dark:text-[#a8b8b2] leading-relaxed">
                  Cleansed under running spring water, smudged with white sage, and energized under moonlight. Place this crystal in the east corner of your workspace to invite maximum wealth flow.
                </p>
              </div>
              
              {/* CTA buttons */}
              <div className="flex gap-4 mt-auto">
                <button
                  onClick={() => {
                    handleToggleCart(activeProduct.name);
                    setActiveProduct(null);
                  }}
                  className={`flex-1 btn py-4 text-xs font-mono uppercase tracking-wider ${
                    cartItems.find(item => item.name === activeProduct.name)
                      ? 'bg-[#b84030] text-white hover:bg-[#b84030]/90 shadow-inner'
                      : 'btn-gold'
                  }`}
                >
                  {cartItems.find(item => item.name === activeProduct.name) ? 'Remove from Bag' : 'Add to Bag'}
                </button>
                <button
                  onClick={() => toggleWishlist(activeProduct.name)}
                  className="w-14 h-14 shrink-0 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all group"
                  aria-label="Add to Wishlist"
                >
                  <svg 
                    width="18" height="18" 
                    viewBox="0 0 24 24" 
                    className={`transition-all duration-300 ${wishlist.includes(activeProduct.name) ? 'fill-[#b84030] stroke-[#b84030] scale-110' : 'stroke-[#080c0b] dark:stroke-white fill-none group-hover:stroke-[#b84030]'}`} 
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
