import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Star, Clock, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product, onAdd }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    // Scroll reveal
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none none"
          }
        }
      );
    }, cardRef);
    
    return () => ctx.revert();
  }, []);

  // Fallbacks for missing data
  const rating = product.rating || '4.5';
  const prepTime = product.prepTime || '10-15 mins';
  const calories = product.calories || '320 kcal';

  return (
    <div 
      ref={cardRef}
      className="relative rounded-3xl h-[22rem] overflow-hidden group cursor-pointer border border-white/10 hover:border-customer-accent/50 shadow-lg hover:shadow-[0_0_30px_rgba(45,106,79,0.3)] transition-all duration-500"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-customer-primary/20 flex items-center justify-center text-6xl">
        {product.imageUrl && product.imageUrl.length > 5 && product.imageUrl.startsWith('http') ? (
          <img src={product.imageUrl} alt={product.productName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <span className="drop-shadow-lg transition-transform duration-700 group-hover:scale-110">{product.imageUrl || '☕'}</span>
        )}
      </div>

      {/* Dark Gradient Overlay for Default State */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-0 transition-opacity duration-500" />
      
      {/* Full Dark Overlay for Hover State */}
      <div className="absolute inset-0 bg-customer-bg/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Default View Content (Always visible unless hovered) */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-customer-accent text-xs font-bold uppercase tracking-widest mb-2 drop-shadow-md">{product.category}</p>
            <h3 className="text-2xl font-bold text-customer-text font-sans leading-tight drop-shadow-lg">{product.productName}</h3>
          </div>
          <div className="flex items-center gap-1 bg-black/60 px-2 py-1.5 rounded-lg backdrop-blur-md border border-white/10 shadow-lg">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-white">{rating}</span>
          </div>
        </div>
      </div>

      {/* Hover View Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0">
        <h3 className="text-2xl font-bold text-customer-accent font-sans mb-3">{product.productName}</h3>
        <p className="text-sm text-customer-text/80 mb-5 line-clamp-3 leading-relaxed">{product.description}</p>
        
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-xs text-customer-text/90 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 shadow-inner">
            <Clock size={14} className="text-customer-accent" />
            <span className="font-medium">{prepTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-customer-text/90 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 shadow-inner">
            <Flame size={14} className="text-orange-400" />
            <span className="font-medium">{calories}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-white/10">
          <span className="text-3xl font-bold text-customer-text font-sans drop-shadow-md">₹{product.price}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-customer-primary text-customer-text font-bold hover:bg-customer-accent hover:text-customer-bg transition-colors duration-300 shadow-[0_4px_15px_rgba(45,106,79,0.5)] hover:shadow-[0_4px_20px_rgba(212,163,115,0.6)]"
          >
            <Plus size={20} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
