
import React from 'react';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured }) => {
  const hasSale = product.sale_price !== null && product.sale_price < product.price;
  const currentPrice = hasSale ? product.sale_price : product.price;
  const storeUrl = `https://shop.orekatech.co.bw/?p=${product.id}`;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-square bg-[#F8F9FA] flex items-center justify-center p-6">
        {featured && (
          <span className="absolute top-3 left-3 bg-[#E8A838] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
            Featured
          </span>
        )}
        {hasSale && (
          <span className="absolute top-3 right-3 bg-[#2D6A4F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
            Save
          </span>
        )}
        <img 
          src={product.image || 'https://picsum.photos/400/400?text=No+Image'} 
          alt={product.name}
          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      <div className="p-5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A7EA4] mb-1 block">
          {product.brand}
        </span>
        <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-[#0A7EA4] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[32px]">
          {product.short_desc}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-[#1A1D29]">
                BWP {currentPrice?.toLocaleString()}
              </span>
            </div>
            {hasSale && (
              <span className="text-[11px] text-gray-400 line-through">
                BWP {product.price.toLocaleString()}
              </span>
            )}
          </div>
          
          <a 
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#0A7EA4] text-white flex items-center justify-center hover:bg-[#E8A838] transition-colors shadow-lg shadow-blue-100"
          >
            <ShoppingCart size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
