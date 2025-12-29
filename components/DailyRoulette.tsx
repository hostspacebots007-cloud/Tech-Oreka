
import React, { useState, useEffect, useMemo } from 'react';
import { Timer, Sparkles } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface DailyRouletteProps {
  products: Product[];
}

const DailyRoulette: React.FC<DailyRouletteProps> = ({ products }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  const dailyProducts = useMemo(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    return [...products]
      .filter(p => p.image && p.price > 0)
      .sort((a, b) => seededRandom(seed + Number(a.id)) - seededRandom(seed + Number(b.id)))
      .slice(0, 6);
  }, [products]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="today" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#E8A838]">
              <Sparkles size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Limited Offers</span>
            </div>
            <h2 className="text-4xl font-extrabold text-[#1A1D29]">Today's Picks</h2>
            <p className="text-gray-500 max-w-md">Our algorithm selects the best value-for-money deals everyday just for you.</p>
          </div>
          
          <div className="bg-[#1A1D29] text-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-xl">
            <Timer className="text-[#E8A838] animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter leading-none mb-1">Refreshing In</span>
              <span className="text-2xl font-mono leading-none tracking-wider">{timeLeft || '00:00:00'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {dailyProducts.map(product => (
            <ProductCard key={`daily-${product.id}`} product={product} featured />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyRoulette;
