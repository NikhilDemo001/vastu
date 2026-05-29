import React, { useState } from 'react';
import { Heart, ShoppingBag, Loader2, Check, Star } from 'lucide-react';

const ProductCard = ({ 
  product, 
  isWishlisted, 
  onToggleWishlist, 
  onQuickView, 
  onToggleCart, 
  isInCart,
  currency = 'INR'
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const isUSD = currency === 'USD';
  const symbol = isUSD ? '$' : '₹';
  
  // Clean currency conversion
  const displayPrice = isUSD ? Math.round(product.price / 85) : product.price;
  const displayOriginalPrice = isUSD ? Math.round(product.originalPrice / 85) : product.originalPrice;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (isInCart) {
      onToggleCart(product.name);
    } else {
      setIsAdding(true);
      setTimeout(() => {
        setIsAdding(false);
        onToggleCart(product.name);
      }, 600);
    }
  };

  const handleMouseMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = (x / rect.width) - 0.5;
    const yc = (y / rect.height) - 0.5;

    const maxTilt = 8; // gentle, premium tilt
    const rotateX = -yc * maxTilt;
    const rotateY = xc * maxTilt;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    
    const shineEl = el.querySelector('.product-card-shine');
    if (shineEl) {
      shineEl.style.opacity = '1';
      shineEl.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 252, 240, 0.12) 0%, transparent 65%)`;
    }
  };

  const handleMouseLeave = (e) => {
    const el = e.currentTarget;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    el.style.transition = 'transform 0.6s var(--ease-out), box-shadow 0.6s var(--ease-out)';
    
    const shineEl = el.querySelector('.product-card-shine');
    if (shineEl) {
      shineEl.style.opacity = '0';
      shineEl.style.transition = 'opacity 0.6s var(--ease-out)';
    }
  };

  const handleMouseEnter = (e) => {
    const el = e.currentTarget;
    el.style.transition = 'transform 0.1s var(--ease-out), box-shadow 0.1s var(--ease-out)';
  };

  return (
    <article 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      className="group product-card card-surface overflow-hidden flex flex-col h-full bg-white dark:bg-[#111715] rounded-[16px] border border-black/5 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-[#c8922a]/10"
    >
      {/* 3D Glare Shine Overlay */}
      <div 
        className="product-card-shine absolute inset-0 pointer-events-none z-20 opacity-0 transition-opacity duration-300"
        style={{ mixBlendMode: 'overlay' }}
      />
      
      {/* Image & Badges Container */}
      <div 
        className="relative aspect-[1/1.15] bg-[#f9f7f3] dark:bg-[#0c100f] overflow-hidden group"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
          loading="lazy"
          style={{ transform: 'translateZ(0px)' }}
        />
        
        {/* Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Dynamic Badges */}
        <div 
          className="absolute top-4 left-4 flex flex-col gap-2 z-10"
          style={{ transform: 'translateZ(30px) scale(0.9)' }}
        >
          {product.discount > 0 && (
            <span className="bg-[#b84030] text-white text-[9px] font-extrabold px-2.5 py-1 rounded-[6px] uppercase tracking-widest shadow-md">
              -{product.discount}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#080c0b] text-[#e5a93a] text-[9px] font-extrabold px-2.5 py-1 rounded-[6px] border border-[#e5a93a]/20 uppercase tracking-widest shadow-md dark:bg-white dark:text-[#080c0b]">
              Best Seller
            </span>
          )}
        </div>

        {/* Premium Wishlist Heart Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.name); }}
          className="absolute top-4 right-4 h-9 w-9 bg-white/90 dark:bg-[#111815]/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform z-10 border border-black/5 dark:border-white/10 group/heart"
          style={{ transform: 'translateZ(35px)' }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={15} 
            className={`transition-all duration-300 ${isWishlisted ? 'fill-[#b84030] text-[#b84030] scale-110' : 'text-[#2d3835] dark:text-[#a0b0aa] group-hover/heart:text-[#b84030]'}`} 
          />
        </button>

        {/* Quick View Glass Action (Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-black/35 backdrop-blur-[2px] hidden md:flex">
          <button
            onClick={() => onQuickView(product)}
            className="bg-white text-[#080c0b] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#e5a93a] hover:text-white active:scale-95 transition-all shadow-xl font-mono"
            style={{ transform: 'translateZ(40px)' }}
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div 
        className="p-5 flex flex-col flex-grow justify-between bg-white dark:bg-[#111715]"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(15px)' }}
      >
        <div>
          {/* Brand and Stars Line */}
          <div className="flex justify-between items-center mb-2" style={{ transform: 'translateZ(10px)' }}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b8c82] dark:text-[#a0b0aa] font-mono">
              {product.brand || 'Vastu Atelier'}
            </span>
            
            {/* Real ratings display */}
            <div className="flex items-center gap-1 bg-[#ebe4d8]/40 dark:bg-[#181f1c] px-2 py-0.5 rounded-[4px] text-[#e5a93a]">
              <Star size={10} className="fill-current" />
              <span className="text-[10px] font-extrabold tabular">{product.rating.toFixed(1)}</span>
              <span className="text-[9px] text-[#6e8078] dark:text-[#607870] font-normal">({product.reviewsCount})</span>
            </div>
          </div>
          
          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-display text-[17px] font-bold text-[#080c0b] dark:text-[#f0ede8] leading-snug mb-2 group-hover:text-[#0b6455] dark:group-hover:text-[#14a090] transition-colors cursor-pointer line-clamp-1"
            style={{ transform: 'translateZ(25px)' }}
          >
            {product.name}
          </h3>

          {/* Pricing & Stock Banner */}
          <div className="flex justify-between items-baseline mt-3" style={{ transform: 'translateZ(15px)' }}>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-[#080c0b] dark:text-white tracking-tight tabular">
                {symbol}{displayPrice.toLocaleString('en-IN')}
              </span>
              {product.discount > 0 && (
                <span className="text-xs text-[#6e8078] line-through tabular">
                  {symbol}{displayOriginalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Urgency Stock Warnings */}
            <div>
              {product.stockStatus === 'low-stock' ? (
                <span className="text-[10px] font-bold text-[#b84030] bg-[#b84030]/10 px-2 py-0.5 rounded-[4px] animate-pulse">
                  Only {product.stockCount} left!
                </span>
              ) : (
                <span className="text-[10px] font-bold text-[#0b6455] bg-[#0b6455]/80 text-white dark:bg-[#0b6455]/30 dark:text-[#14a090] px-2 py-0.5 rounded-[4px]">
                  Energized
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Luxury Button */}
        <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5" style={{ transform: 'translateZ(20px)' }}>
          <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`w-full flex items-center justify-center gap-2 font-bold text-[11px] uppercase tracking-wider py-3.5 px-4 rounded-full transition-all duration-300 font-mono ${
              isInCart
                ? 'bg-[#0f766e] text-white hover:bg-[#0b6455] shadow-inner'
                : 'bg-[#080c0b] dark:bg-[#f0ede8] text-white dark:text-[#080c0b] hover:bg-[#e5a93a] dark:hover:bg-[#e5a93a] dark:hover:text-white hover:-translate-y-0.5 shadow-md hover:shadow-lg'
            }`}
          >
            {isAdding ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span>Adding...</span>
              </>
            ) : isInCart ? (
              <>
                <Check size={13} className="stroke-[3]" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
