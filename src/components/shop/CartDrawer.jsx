import React from 'react';
import { X, Trash2, ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import { shopProducts } from '../../data/catalog';

const CartDrawer = ({ 
  isOpen, 
  setIsOpen, 
  cartItems, 
  setCartItems,
  currency = 'INR'
}) => {
  const isUSD = currency === 'USD';
  const symbol = isUSD ? '$' : '₹';

  const updateQuantity = (itemName, delta) => {
    setCartItems((current) =>
      current
        .map((item) => {
          if (item.name === itemName) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (itemName) => {
    setCartItems((current) => current.filter((item) => item.name !== itemName));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, cartItem) => {
      const product = shopProducts.find((p) => p.name === cartItem.name);
      return total + (product ? product.price * cartItem.quantity : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const displaySubtotal = isUSD ? Math.round(subtotal / 85) : subtotal;

  const handleCheckout = () => {
    const itemsText = cartItems
      .map((item) => {
        const product = shopProducts.find((p) => p.name === item.name);
        const itemPrice = product ? (isUSD ? Math.round(product.price / 85) : product.price) : 0;
        return `- ${item.name} [Qty: ${item.quantity} x ${symbol}${itemPrice.toLocaleString()}] = ${symbol}${(itemPrice * item.quantity).toLocaleString()}`;
      })
      .join('\n');

    const text = `Hi Hareshwar Vastu, I would like to inquire about these sacred items:\n\n${itemsText}\n\n*Grand Total: ${symbol}${displaySubtotal.toLocaleString('en-IN')}*\n\nPlease guide me on availability and energizing rituals. Thank you!`;
    window.open(`https://wa.me/917319178910?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* Dynamic Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-[150] transition-opacity duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Drawer Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-[#fffaf2] dark:bg-[#080c0b] z-[151] shadow-[0_0_80px_rgba(0,0,0,0.3)] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col border-l border-black/5 dark:border-white/5 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5 bg-white/20 dark:bg-[#111715]/20 backdrop-blur-md">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display text-2xl font-bold text-[#080c0b] dark:text-[#f0ede8]">
              Your Sacred Bag
            </h2>
            <span className="text-[11px] font-bold text-[#e5a93a] bg-[#e5a93a]/10 px-3 py-1 rounded-full font-mono">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-[#080c0b] dark:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Items Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((cartItem) => {
                const product = shopProducts.find((p) => p.name === cartItem.name);
                if (!product) return null;
                
                const itemPrice = isUSD ? Math.round(product.price / 85) : product.price;
                const rowTotal = itemPrice * cartItem.quantity;
                
                return (
                  <div key={cartItem.name} className="flex gap-4 p-3 bg-white dark:bg-[#111715] rounded-[16px] border border-black/5 dark:border-white/5 transition-all hover:shadow-md">
                    {/* Item Thumbnail */}
                    <div className="w-20 h-24 shrink-0 rounded-[12px] overflow-hidden bg-[#f9f7f3] dark:bg-[#0c100f] border border-black/5">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Item Info details */}
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-bold text-[13px] text-[#080c0b] dark:text-[#f0ede8] line-clamp-1 leading-snug">
                            {product.name}
                          </h4>
                          <button 
                            onClick={() => removeItem(cartItem.name)}
                            className="text-[#6e8078] hover:text-[#b84030] transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-[#6b8c82] font-mono mt-0.5 block">
                          {product.category}
                        </span>
                      </div>
                      
                      {/* Quantity & Row Total line */}
                      <div className="flex items-center justify-between mt-3">
                        {/* Incrementor / Decrementor */}
                        <div className="flex items-center border border-black/10 dark:border-white/10 rounded-full p-1 bg-[#f9f7f3] dark:bg-[#080c0b]">
                          <button
                            onClick={() => updateQuantity(cartItem.name, -1)}
                            className="p-1 hover:text-[#b84030] transition-colors"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-[11px] font-bold font-mono px-3 select-none">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartItem.name, 1)}
                            className="p-1 hover:text-[#0b6455] transition-colors"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        
                        {/* Final Row Total */}
                        <span className="font-mono text-sm font-extrabold text-[#080c0b] dark:text-[#f0ede8]">
                          {symbol}{rowTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#ebe4d8]/50 dark:bg-white/5 flex items-center justify-center text-[#6e8078] animate-float">
                <ShoppingBag size={28} strokeWidth={1.5} className="text-[#e5a93a]" />
              </div>
              <div className="space-y-1.5">
                <p className="font-display text-xl font-bold text-[#080c0b] dark:text-[#f0ede8]">Your bag is currently empty</p>
                <p className="text-xs text-[#6e8078] max-w-[250px] mx-auto leading-relaxed">Ensure a steady flow of positivity. Select a ritually energized remedy to begin your journey.</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="btn btn-gold text-[10px] tracking-wider uppercase font-mono px-8 py-3.5"
              >
                Continue Exploring
              </button>
            </div>
          )}
        </div>

        {/* Footer Billing Section */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white dark:bg-[#111715] border-t border-black/5 dark:border-white/5 shadow-[0_-15px_45px_rgba(0,0,0,0.06)] z-10 relative">
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6e8078] font-mono">Grand Subtotal</span>
                <span className="block text-[9px] text-[#6b8c82] leading-tight">Ritual cleansing & blessing included</span>
              </div>
              <div className="text-right">
                <span className="block font-display text-3xl font-extrabold text-[#080c0b] dark:text-white tabular">
                  {symbol}{displaySubtotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full btn btn-gold py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group font-mono shadow-md hover:shadow-lg active:scale-97"
            >
              Secure Order via WhatsApp
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
