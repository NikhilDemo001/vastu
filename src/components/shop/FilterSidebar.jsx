import React, { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, X, Star, RotateCcw, Clock } from 'lucide-react';
import { shopProducts } from '../../data/catalog';

const FilterSidebar = ({ 
  categories, 
  activeCategory, 
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  maxPrice,
  setMaxPrice,
  selectedBrand,
  setSelectedBrand,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  minRating,
  setMinRating,
  stockStatus,
  setStockStatus,
  isMobileDrawerOpen,
  setIsMobileDrawerOpen,
  resetFilters,
  currency = 'INR',
  isOpen = false // Control desktop horizontal shelf visibility
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);

  const isUSD = currency === 'USD';
  const symbol = isUSD ? '$' : '₹';

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Click outside search suggestions dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Save to recent searches
  const handleSearchSubmit = (queryStr) => {
    if (!queryStr.trim()) return;
    const cleanQuery = queryStr.trim().toLowerCase();
    const updated = [cleanQuery, ...recentSearches.filter(q => q !== cleanQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    setSearchQuery(queryStr);
    setIsFocused(false);
  };

  // Clear a recent search
  const clearRecent = (e, qToClear) => {
    e.stopPropagation();
    const updated = recentSearches.filter(q => q !== qToClear);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Compute suggestions based on products
  const suggestions = searchQuery.trim().length >= 2 
    ? shopProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  // Helper to highlight match in text
  const highlightMatch = (text, match) => {
    if (!match) return <span>{text}</span>;
    const index = text.toLowerCase().indexOf(match.toLowerCase());
    if (index === -1) return <span>{text}</span>;
    const before = text.substring(0, index);
    const middle = text.substring(index, index + match.length);
    const after = text.substring(index + match.length);
    return (
      <span>
        {before}
        <strong className="text-[#e5a93a] underline underline-offset-2">{middle}</strong>
        {after}
      </span>
    );
  };

  // List of brands, colors, sizes dynamically extracted
  const brands = ['All', 'Chakra Harmony', 'Vastu Elite', 'Ancient Elements', 'Hareshwar Aura'];
  const colors = [
    { name: 'All', value: 'all', class: 'bg-transparent border border-black/10 dark:border-white/20' },
    { name: 'Gold', value: 'gold', class: 'bg-[#e5a93a]' },
    { name: 'Purple', value: 'purple', class: 'bg-[#8b5cf6]' },
    { name: 'Green', value: 'green', class: 'bg-[#10b981]' },
    { name: 'Black', value: 'black', class: 'bg-[#111715]' },
    { name: 'Clear', value: 'clear', class: 'bg-white border border-black/10' }
  ];
  const sizes = ['All', 'Small', 'Medium', 'Large', 'Standard'];

  // Calculate counts for categories under current filters (excluding category filter itself)
  const getCategoryCount = (catName) => {
    return shopProducts.filter(p => {
      const matchesCategory = catName === 'All' || p.category === catName;
      const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.price <= maxPrice;
      const matchesBrand = selectedBrand === 'All' || p.brand === selectedBrand;
      const matchesColor = selectedColor === 'All' || (p.colors && p.colors.includes(selectedColor.toLowerCase()));
      const matchesSize = selectedSize === 'All' || (p.sizes && p.sizes.includes(selectedSize));
      const matchesRating = p.rating >= minRating;
      const matchesStock = stockStatus === 'all' || 
        (stockStatus === 'in-stock' && p.stockStatus === 'in-stock') ||
        (stockStatus === 'low-stock' && p.stockStatus === 'low-stock');

      return matchesCategory && matchesSearch && matchesPrice && matchesBrand && matchesColor && matchesSize && matchesRating && matchesStock;
    }).length;
  };

  const columnsContent = (
    <>
      {/* 1. SEARCH & BRAND CURATOR */}
      <div className="space-y-4">
        <div ref={searchRef} className="relative">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#6e8078] dark:text-[#a0b0aa] mb-2 font-mono">
            Search Element
          </h4>
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsFocused(true);
              }}
              onFocus={() => setIsFocused(true)}
              placeholder="Quartz, pendants..."
              className="w-full bg-white dark:bg-[#181f1c] border border-black/10 dark:border-white/10 rounded-[10px] pl-9 pr-7 py-2.5 text-xs focus:outline-none focus:border-[#e5a93a] transition-all text-[#080c0b] dark:text-[#f0ede8] font-medium"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6e8078] group-focus-within:text-[#e5a93a]" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6e8078] hover:text-[#080c0b] dark:hover:text-white">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Autocomplete Panels */}
          {isFocused && (searchQuery.trim().length >= 2 || recentSearches.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#111815] border border-black/10 dark:border-white/10 rounded-xl shadow-2xl z-[60] overflow-hidden">
              {recentSearches.length > 0 && searchQuery.trim().length === 0 && (
                <div className="p-3 border-b border-black/5 dark:border-white/5">
                  <span className="text-[9px] font-bold text-[#6e8078] uppercase tracking-wider flex items-center gap-1 mb-2 font-mono">
                    <Clock size={10} /> Recent Searches
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((q, idx) => (
                      <div 
                        key={idx}
                        onClick={() => { setSearchQuery(q); setIsFocused(false); }}
                        className="flex items-center gap-1 px-2.5 py-1 bg-[#f9f7f3] dark:bg-[#181f1c] hover:bg-[#e5a93a]/15 text-[10px] font-bold text-[#3d4e49] dark:text-[#a8b8b2] rounded-full cursor-pointer"
                      >
                        <span>{q}</span>
                        <button onClick={(e) => clearRecent(e, q)} className="hover:text-[#b84030]">
                          <X size={8} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {suggestions.length > 0 ? (
                <div className="p-1">
                  {suggestions.map((product) => (
                    <div
                      key={product.name}
                      onClick={() => {
                        setSearchQuery(product.name);
                        handleSearchSubmit(product.name);
                      }}
                      className="flex items-center gap-2.5 p-2 hover:bg-[#ebe4d8]/40 dark:hover:bg-[#1c2622] rounded-[6px] cursor-pointer transition-colors"
                    >
                      <img src={product.image} alt={product.name} className="w-7 h-9 object-cover rounded-[3px]" />
                      <div className="text-left">
                        <span className="block text-[11px] font-bold text-[#080c0b] dark:text-white leading-tight">
                          {highlightMatch(product.name, searchQuery)}
                        </span>
                        <span className="text-[8px] text-[#6b8c82] uppercase font-mono font-bold">{product.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery.trim().length >= 2 ? (
                <div className="p-3 text-center text-[10px] text-[#6e8078] font-mono">No matches found</div>
              ) : null}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#6e8078] dark:text-[#a0b0aa] mb-2 font-mono">
            Vedic Brand
          </h4>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full bg-white dark:bg-[#181f1c] border border-black/10 dark:border-white/10 rounded-[10px] px-3 py-2.5 text-xs font-bold focus:outline-none focus:border-[#e5a93a] cursor-pointer text-[#3d4e49] dark:text-[#f0ede8] font-mono uppercase tracking-wide"
          >
            {brands.map(b => (
              <option key={b} value={b}>{b === 'All' ? 'All Brands' : b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. CATEGORIES FILTER LIST */}
      <div>
        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#6e8078] dark:text-[#a0b0aa] mb-2 font-mono">
          Categories
        </h4>
        <div className="max-h-[140px] overflow-y-auto no-scrollbar pr-1 space-y-1">
          {categories.map((cat) => {
            const count = getCategoryCount(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-2.5 py-1.5 rounded-[8px] text-xs font-semibold transition-all flex items-center justify-between group ${
                  activeCategory === cat
                    ? 'bg-[#080c0b] dark:bg-white text-white dark:text-[#080c0b] shadow-sm'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-[#3d4e49] dark:text-[#d8d2c8]'
                }`}
              >
                <span className="truncate pr-2 text-xs">{cat}</span>
                <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat ? 'bg-[#e5a93a] text-[#080c0b]' : 'bg-black/5 dark:bg-white/10 text-[#6e8078]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. DYNAMIC PRICE RANGE SLIDER */}
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#6e8078] dark:text-[#a0b0aa] font-mono">
            Max Budget
          </h4>
          <span className="text-xs font-bold text-[#e5a93a] font-mono">
            {symbol}{isUSD ? Math.round(maxPrice / 85) : maxPrice.toLocaleString()}
          </span>
        </div>
        <div className="px-1 pt-2">
          <input
            type="range"
            min="0"
            max="6000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-[#e5a93a] outline-none"
          />
          <div className="flex justify-between text-[9px] text-[#6e8078] font-bold font-mono mt-2">
            <span>{symbol}0</span>
            <span>{symbol}{isUSD ? '70' : '6,000'}</span>
          </div>
        </div>
      </div>

      {/* 4. AURA COLORS & VIBRATIONAL SIZES */}
      <div className="space-y-4">
        <div>
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#6e8078] dark:text-[#a0b0aa] mb-2 font-mono">
            Aura Color
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${c.class} ${
                  selectedColor === c.name ? 'ring-2 ring-offset-1 ring-[#e5a93a] scale-110' : 'hover:scale-105'
                }`}
                title={c.name}
              >
                {selectedColor === c.name && (
                  <span className={`w-1 h-1 rounded-full ${c.name === 'Clear' || c.name === 'All' ? 'bg-[#080c0b]' : 'bg-white'}`}></span>
                )}
                {c.name === 'All' && <span className="text-[8px] font-bold text-[#6e8078] font-mono">ALL</span>}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#6e8078] dark:text-[#a0b0aa] mb-2 font-mono">
            Vibrational Size
          </h4>
          <div className="grid grid-cols-5 gap-1">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`py-1.5 text-[9px] font-extrabold font-mono rounded-[6px] border text-center transition-all ${
                  selectedSize === s
                    ? 'bg-[#080c0b] dark:bg-white border-[#080c0b] dark:border-white text-white dark:text-[#080c0b]'
                    : 'bg-white dark:bg-[#181f1c] border-black/5 dark:border-white/5 text-[#6e8078]'
                }`}
              >
                {s === 'All' ? 'ALL' : s.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. DIVINE RATINGS, ENERGY FLOW & CLEAR FILTERS */}
      <div className="space-y-4 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#6e8078] dark:text-[#a0b0aa] mb-1.5 font-mono">
              Rating
            </h4>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full bg-white dark:bg-[#181f1c] border border-black/10 dark:border-white/10 rounded-[8px] px-2 py-1.5 text-[10px] font-bold focus:outline-none focus:border-[#e5a93a] text-[#3d4e49] dark:text-[#f0ede8]"
            >
              <option value="0">All Ratings</option>
              <option value="4.8">4.8+ Stars</option>
              <option value="4.6">4.6+ Stars</option>
              <option value="4.4">4.4+ Stars</option>
            </select>
          </div>

          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#6e8078] dark:text-[#a0b0aa] mb-1.5 font-mono">
              Availability
            </h4>
            <select
              value={stockStatus}
              onChange={(e) => setStockStatus(e.target.value)}
              className="w-full bg-white dark:bg-[#181f1c] border border-black/10 dark:border-white/10 rounded-[8px] px-2 py-1.5 text-[10px] font-bold focus:outline-none focus:border-[#e5a93a] text-[#3d4e49] dark:text-[#f0ede8]"
            >
              <option value="all">All Flow</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
            </select>
          </div>
        </div>

        <button 
          onClick={resetFilters}
          className="w-full flex items-center justify-center gap-1.5 bg-[#b84030]/5 text-[#b84030] hover:bg-[#b84030]/10 border border-[#b84030]/10 py-3 rounded-[10px] text-[10px] font-extrabold uppercase tracking-widest transition-all font-mono active:scale-97"
        >
          <RotateCcw size={11} />
          Reset All Filters
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Collapsible Horizontal Panel for Desktop */}
      {isOpen && (
        <div className="hidden lg:block w-full bg-white dark:bg-[#111715] border border-black/5 dark:border-white/5 rounded-2xl p-6 mb-8 animate-scale-in shadow-xl shadow-[#080c0b]/5 border-t-2 border-t-[#e5a93a]/30">
          <div className="grid grid-cols-5 gap-8">
            {columnsContent}
          </div>
        </div>
      )}

      {/* Slide-out Drawer for Mobile */}
      {isMobileDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden transition-opacity"
          onClick={() => setIsMobileDrawerOpen(false)}
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 w-[320px] bg-[#fffaf2] dark:bg-[#080c0b] z-[101] lg:hidden shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto ${
          isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2 text-[#080c0b] dark:text-[#f0ede8]">
              <SlidersHorizontal size={18} className="text-[#e5a93a]" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wide">Filters</h2>
            </div>
            <button 
              onClick={() => setIsMobileDrawerOpen(false)}
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-[#6e8078]"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {columnsContent}
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
