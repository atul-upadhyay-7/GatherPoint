import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, prefix = '', suffix = '', delay = 0 }) => {
  const cardRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    // Reveal Animation
    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power3.out' }
    );

    // Hover Animation
    const card = cardRef.current;
    const hoverIn = () => gsap.to(card, { y: -5, scale: 1.02, duration: 0.3, ease: 'power2.out', boxShadow: '0 10px 25px -5px rgba(212, 163, 115, 0.1)' });
    const hoverOut = () => gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' });
    
    card.addEventListener('mouseenter', hoverIn);
    card.addEventListener('mouseleave', hoverOut);

    // Count Up Animation
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.5,
      delay: delay + 0.2,
      ease: 'power3.out',
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.innerText = Math.floor(obj.val).toLocaleString();
        }
      }
    });

    return () => {
      card.removeEventListener('mouseenter', hoverIn);
      card.removeEventListener('mouseleave', hoverOut);
    };
  }, [value, delay]);

  const isPositive = trend === 'up';

  return (
    <div 
      ref={cardRef}
      className="bg-[#0A261C]/60 backdrop-blur-md border border-[#D4A373]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-2xl p-6 hover:border-[#D4A373]/50 hover:bg-[#0A261C]/70 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="h-12 w-12 rounded-xl bg-[#2D6A4F]/20 flex items-center justify-center text-[#D4A373]">
          <Icon size={24} />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${
          isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trendValue}
        </div>
      </div>
      
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <div className="text-3xl font-bold text-[#FAF8F1] flex items-baseline gap-1">
          {prefix}<span ref={numberRef}>0</span>{suffix}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
