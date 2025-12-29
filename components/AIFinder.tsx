
import React, { useState } from 'react';
import { Search, Bot, ArrowRight, Loader2, Sparkles, Link as LinkIcon, Info } from 'lucide-react';
import { Product, GroundingSource } from '../types';
import { findProductsWithAI } from '../services/geminiService';
import ProductCard from './ProductCard';

interface AIFinderProps {
  products: Product[];
}

const AIFinder: React.FC<AIFinderProps> = ({ products }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [reasoning, setReasoning] = useState('');
  const [sources, setSources] = useState<GroundingSource[]>([]);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const { productIds, reasoning, sources } = await findProductsWithAI(query, products);
      const matched = products.filter(p => productIds.includes(p.id));
      setResults(matched);
      setReasoning(reasoning);
      setSources(sources || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "High-speed networking for a Gaborone tech startup",
    "Heavy-duty printer for blueprint architecture prints",
    "Entry-level laptop for university computer science",
    "Secure external backup for legal documents"
  ];

  return (
    <section id="ai-finder" className="py-24 bg-[#FDFCFB]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-8 md:p-16 border border-gray-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
          
          <div className="text-center mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#0A7EA4]/5 border border-[#0A7EA4]/10 px-4 py-2 rounded-full text-[#0A7EA4] text-xs font-bold mb-6 uppercase tracking-widest">
              <Bot size={16} />
              Powered by Gemini 3 Intelligence
            </div>
            <h2 className="text-4xl font-extrabold text-[#1A1D29] mb-4 tracking-tight">Expert Tech Consultation</h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Describe your business requirements or personal tech goals. Our AI analyzes global benchmarks and local inventory to find your perfect match.
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative mb-10 z-10">
            <div className="group relative">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking to achieve today?"
                className="w-full pl-8 pr-20 py-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus:border-[#0A7EA4] focus:bg-white outline-none transition-all text-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
              />
              <button 
                disabled={loading}
                className="absolute right-3 top-3 bottom-3 px-6 bg-[#1A1D29] text-white rounded-2xl flex items-center justify-center hover:bg-[#0A7EA4] transition-all disabled:opacity-50 shadow-lg shadow-black/10"
              >
                {loading ? <Loader2 className="animate-spin" /> : <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest">Consult AI <ArrowRight size={18} /></div>}
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2 mb-12 relative z-10">
            {suggestions.map((s, idx) => (
              <button 
                key={idx}
                onClick={() => { setQuery(s); }}
                className="text-xs font-bold px-5 py-2.5 bg-white hover:bg-gray-900 hover:text-white rounded-full transition-all text-gray-400 border border-gray-100 shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>

          {(results.length > 0 || reasoning) && (
            <div className="mt-16 pt-16 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#E8A838]/10 text-[#E8A838] flex items-center justify-center">
                        <Sparkles size={18} />
                      </div>
                      <h3 className="font-black text-xl tracking-tight">Consultant's Insight</h3>
                    </div>
                    <div className="bg-[#1A1D29] text-white p-6 rounded-3xl text-sm leading-relaxed relative overflow-hidden">
                      <div className="relative z-10 opacity-90">{reasoning}</div>
                      <Bot className="absolute -bottom-4 -right-4 text-white/5" size={100} />
                    </div>
                  </div>

                  {sources.length > 0 && (
                    <div className="animate-in fade-in duration-1000 delay-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0A7EA4] flex items-center justify-center">
                          <LinkIcon size={16} />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-widest">Verified Sources</h3>
                      </div>
                      <div className="space-y-2">
                        {sources.map((source, i) => (
                          <a 
                            key={i} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors group"
                          >
                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                            <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-700 line-clamp-1 truncate">{source.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100/50">
                    <div className="flex gap-3">
                      <Info className="text-amber-500 shrink-0" size={18} />
                      <p className="text-[11px] font-medium text-amber-800 leading-normal">
                        Prices and availability are tracked locally in Botswana. Shipping may vary by location.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-black text-xl tracking-tight">Selected Solutions</h3>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{results.length} Matches Found</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {results.map(product => (
                      <ProductCard key={`ai-${product.id}`} product={product} featured />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIFinder;
