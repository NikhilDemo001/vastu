import React from 'react';
import { SearchX } from 'lucide-react';

const EmptyState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 text-[#6e8078]">
        <SearchX size={32} strokeWidth={1.5} />
      </div>
      
      <h3 className="font-display text-2xl font-bold text-[#111715] dark:text-[#f9f7f3] mb-2">
        No matches found
      </h3>
      
      <p className="text-[#6e8078] max-w-md mx-auto mb-8 text-sm leading-relaxed">
        We couldn't find any premium crystals or remedies matching your current filters. Try adjusting your search or clearing all filters to explore the full collection.
      </p>
      
      <button 
        onClick={onReset}
        className="btn btn-dark px-8 py-3"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default EmptyState;
