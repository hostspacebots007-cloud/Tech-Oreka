
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Menu, X, ArrowUpRight, 
  MessageCircle, Facebook, Instagram, Linkedin,
  ChevronRight, Filter
} from 'lucide-react';
import { Product, BrandInfo, CategoryInfo } from './types';
import { BRAND_ICONS, CATEGORY_MAPPING } from './constants';
import ProductCard from './components/ProductCard';
import DailyRoulette from './components/DailyRoulette';
import AIFinder from './components/AIFinder';

// Product data injection
const RAW_PRODUCTS = [{"id": "1293", "name": "Brother_DCP-1610W_MFD", "sku": "Brother_DCP-1610W_001", "short_desc": "Mono Laser 3-in-1, 20ppm, Print, Scan, Copy, Wireless", "description": "Compact A4 mono laser multifunction printer for home or small office use. Provides print, scan, and copy functions with a speed of up to 20 pages per minute. Features wireless and USB connectivity for easy setup and a space-saving design.", "price": 3359.0, "sale_price": 2701.57, "category": "Printer > Laser Multifunction", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_DCP-1610W_A4_Wi-Fi_Multifunction_Mono_Laser_Printer_Laser.png", "brand": "Brother", "in_stock": true}, {"id": "1294", "name": "Brother_DCP-L5510DW_MFD", "sku": "Brother_DCP-L5510DW_002", "short_desc": "Mono Laser 3-in-1, 48ppm, Duplex, ADF, Wireless", "description": "High-speed A4 mono laser multifunction printer designed for business use. Offers print, scan, and copy capabilities with speeds up to 48 pages per minute and automatic duplex printing. Includes an automatic document feeder, Gigabit Ethernet, and a colour touchscreen for efficient workflow.", "price": 6983.0, "sale_price": 6848.31, "category": "Printer > Laser Multifunction", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_DCP-L5510DW_A4_Multifunction_Mono_Laser_Printer.png", "brand": "Brother", "in_stock": true}, {"id": "1295", "name": "Brother_DCP-T430W_MFD", "sku": "Brother_DCP-T430W_003", "short_desc": "Ink Tank 3-in-1, 16ppm Mono, 9ppm Colour, Wireless", "description": "A4 3-in-1 Multifunction Ink Tank Printer for home or small office use. Provides reliable printing with economical ink tank system and wireless connectivity for modern printing needs.", "price": 2862.0, "sale_price": 2567.0, "category": "Printer > Inkjet Multifunction", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_DCP-T430W_A4_3-in-1_Multifunction_Ink_Tank_Printer_8CHA4300141.jpg", "brand": "Brother", "in_stock": true}, {"id": "1296", "name": "Brother_HL-1210W_SF", "sku": "Brother_HL-1210W_004", "short_desc": "Mono Laser Printer, 20ppm, 150-sheet tray, Wireless", "description": "Affordable mono laser printer with wireless and USB options. Prints up to 20 ppm at 2400 x 600 dpi. Compact design with 150-sheet tray for home or small office use.", "price": 2234.0, "sale_price": 1746.89, "category": "Printer > Laser Single Function", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_HL-1210W_A4_Wi-Fi_Mono_Laser_Printer_84UE0700124.jpg", "brand": "Brother", "in_stock": true}, {"id": "1297", "name": "Brother_DCP-T730DW_MFD", "sku": "Brother_DCP-T730DW_005", "short_desc": "Ink Tank 3-in-1, 16ppm Mono, Duplex, ADF, Wireless", "description": "Advanced ink tank printer with auto duplex and ADF. Prints up to 16 ipm mono and 15.5 ipm color at 1200 x 6000 dpi. Wireless connectivity and mobile app support included.", "price": 4987.0, "sale_price": 4582.0, "category": "Printer > Inkjet Multifunction", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_HL-L2365DW_A4_Mono_Laser_Printer_84UF7700124.png", "brand": "Brother", "in_stock": true}, {"id": "1298", "name": "Brother_HL-L2365DW_SF", "sku": "Brother_HL-L2365DW_006", "short_desc": "Mono Laser Printer, 30ppm, Duplex, 250-sheet tray, Wireless", "description": "Professional mono laser printer with auto duplex. Speeds up to 30 ppm and 2400 x 600 dpi resolution. Supports Wi-Fi, Ethernet, and mobile printing for flexible connectivity.", "price": 2676.0, "sale_price": null, "category": "Printer > Laser Single Function", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_HL-L3280CDW_A4_Colour_Laser_Printer_84E93300141.png", "brand": "Brother", "in_stock": true}, {"id": "1303", "name": "Brother_HL-L9430CDN_SF", "sku": "Brother_HL-L9430CDN_011", "short_desc": "A4 Color Laser Printer, 40ppm, Duplex, Network", "description": "Advanced A4 color laser printer for business needs. Delivers high-speed color and mono output at up to 40 ppm with professional quality. Includes standard network connectivity and robust paper handling.", "price": 12488.01, "sale_price": 11352.74, "category": "Printer > Color Laser Single Function", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_MFC-J2340DW_Professional_A3_Multifunction_Inkjet_Printer_8CH61300124.png", "brand": "Brother", "in_stock": true}, {"id": "1304", "name": "Brother_MFC-J2340DW_MFD", "sku": "Brother_MFC-J2340DW_012", "short_desc": "A3/A4 Inkjet MFC, Print, Scan, Copy, Fax", "description": "Professional A3/A4 multifunction inkjet printer. Provides print, scan, copy, and fax functions with wide-format support. Ideal for small businesses and design work requiring larger prints.", "price": 5002.17, "sale_price": 4547.43, "category": "Printer > Inkjet Multifunction", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_MFC-J3940DW_A3_4-in-1_Multifunction_Inkjet_Printer_8CH51700124.png", "brand": "Brother", "in_stock": true}, {"id": "1305", "name": "Brother_MFC-J3940DW_MFD", "sku": "Brother_MFC-J3940DW_013", "short_desc": "A3/A4 Inkjet MFC, 4-in-1, Duplex, ADF", "description": "A3/A4 4-in-1 multifunction inkjet printer for professional use. Features print, scan, copy, and fax with automatic duplex printing. Offers wireless connectivity and an automatic document feeder (ADF).", "price": 9544.28, "sale_price": 8676.62, "category": "Printer > Inkjet Multifunction", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_MFC-L2700DW_A4_Wi-Fi_Multifunction_Laser_Printer_8C5H4800124.png", "brand": "Brother", "in_stock": true}, {"id": "1307", "name": "Brother_MFC-L3760CDW_MFD", "sku": "Brother_MFC-L3760CDW_015", "short_desc": "A4 Color Laser MFC, Print, Scan, Copy, Fax, Wireless", "description": "A4 color laser multifunction printer for small to medium offices. Provides print, scan, copy, and fax capabilities with vibrant color output. Includes wireless networking and an automatic document feeder.", "price": 7048.29, "sale_price": 6407.54, "category": "Printer > Color Laser Multifunction", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_MFCL-5710DW_Professional_A4_Multifunction_Mono_Laser_Printer_8C5L0J00341.png", "brand": "Brother", "in_stock": true}, {"id": "1308", "name": "Brother_MFCL-5710DW_MFD", "sku": "Brother_MFCL-5710DW_016", "short_desc": "A4 Color Laser MFC, Print, Scan, Copy, Fax, Wireless", "description": "A4 color laser all-in-one printer for business. Offers print, scan, copy, and fax functions with fast color printing speeds. Features wireless connectivity and automatic two-sided printing.", "price": 8920.0, "sale_price": 8109.09, "category": "Printer > Color Laser Multifunction", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_MFC-L6910DN_A4_Multifunction_Mono_Laser_Printer_8C5L8800241.png", "brand": "Brother", "in_stock": true}, {"id": "1309", "name": "Brother_MFC-L6910DN_MFD", "sku": "Brother_MFC-L6910DN_017", "short_desc": "A4 Mono Laser MFC, 50ppm, Duplex, Network", "description": "Professional A4 mono laser multifunction printer for high-volume environments. Delivers fast print speeds, robust scanning, and copying functions. Includes standard network interface and automatic duplexing.", "price": 14605.13, "sale_price": 13277.39, "category": "Printer > Laser Multifunction", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_MFC-L8390CDW_A4_Wi-Fi_Multifunction_Colour_LED_Laser_Printer_8CE96300241.png", "brand": "Brother", "in_stock": true}, {"id": "1310", "name": "Brother_MFC-L8390CDW_MFD", "sku": "Brother_MFC-L8390CDW_018", "short_desc": "A4 Color Laser MFC, Print, Scan, Copy, Fax, Wireless", "description": "A4 color laser multifunction printer designed for workgroups. Combines high-quality color printing with scan, copy, and fax functions. Features a large touchscreen and advanced connectivity options.", "price": 8787.87, "sale_price": 7988.97, "category": "Printer > Color Laser Multifunction", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_MFC-L8690CDW_A4_Wi-Fi_Multifunction_Colour_Laser_Printer_8CE82300141.png", "brand": "Brother", "in_stock": true}, {"id": "1311", "name": "Brother_MFC-L8690CDW_MFD", "sku": "Brother_MFC-L8690CDW_019", "short_desc": "A4 Color Laser MFC, Print, Scan, Copy, Fax, Wireless", "description": "Advanced A4 color LED laser multifunction printer. Offers high-efficiency printing, scanning, copying, and faxing for busy offices. Includes wireless connectivity and a high-resolution touchscreen display.", "price": 12278.92, "sale_price": 11162.65, "category": "Printer > Color Laser Multifunction", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/11/Brother_TN-240C_Cyan_34.png", "brand": "Brother", "in_stock": true}, {"id": "1453", "name": "Asus Vivobook GO 15 15.6\" Intel Celeron 8GB 256GB Win 11 Home Black Notebook", "sku": "E1504GA-N82B0W", "short_desc": "Asus Vivobook GO 15 15.6\" Intel Celeron 8GB 256GB Win 11 Home Black Notebook", "description": "Asus Vivobook GO 15 15.6\" Intel Celeron 8GB 256GB Win 11 Home Black Notebook", "price": 4083.7, "sale_price": null, "category": "Computing > Client Devices > Notebooks", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/12/1_e317.png", "brand": "Asus", "in_stock": true}, {"id": "1475", "name": "Dell 15 15.6\" Core-i5 16GB 512GB Win 11 Pro Notebook", "sku": "DC15250_RPLU_004_P", "short_desc": "Dell 15 15.6\" Core-i5 16GB 512GB Win 11 Pro Notebook", "description": "Dell 15 15.6\" Core-i5 16GB 512GB Win 11 Pro Notebook", "price": 11365.35, "sale_price": null, "category": "Computing > Client Devices > Notebooks", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/12/1_8995.png", "brand": "Dell", "in_stock": true}, {"id": "1501", "name": "HP ProBook 465 G11 16\" AMD Ryzen-7 32GB 1TB Win11 Pro Silver Notebook", "sku": "AD1L1ET", "short_desc": "HP ProBook 465 G11 16\" AMD Ryzen-7 32GB 1TB Win11 Pro Silver Notebook", "description": "HP ProBook 465 G11 16\" AMD Ryzen-7 32GB 1TB Win11 Pro Silver Notebook", "price": 19769.88, "sale_price": null, "category": "Computing > Client Devices > Notebooks", "image": "http://shop.orekatech.co.bw/wp-content/uploads/2025/12/AD1L1ET_dc91.jpg", "brand": "HP", "in_stock": true}];

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // Stats
  const brands = useMemo(() => {
    const counts: Record<string, number> = {};
    RAW_PRODUCTS.forEach(p => { counts[p.brand] = (counts[p.brand] || 0) + 1; });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count, icon: BRAND_ICONS[name] || '🏷️' }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    RAW_PRODUCTS.forEach(p => {
      const main = p.category.split('>')[0].trim();
      counts[main] = (counts[main] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count, icon: CATEGORY_MAPPING[name]?.icon || '📦' }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return RAW_PRODUCTS.filter(p => {
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || p.category.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#E8A838] rounded-xl flex items-center justify-center font-black text-[#1A1D29] text-xl shadow-lg">O</div>
            <div className="hidden sm:block">
              <div className={`font-black text-xl leading-none tracking-tighter ${isScrolled ? 'text-[#1A1D29]' : 'text-white md:text-[#1A1D29]'}`}>OrekaTech</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-1">Botswana Gateway</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {['Today', 'AI Finder', 'Brands', 'Categories', 'Store'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className={`text-sm font-semibold transition-colors hover:text-[#0A7EA4] ${isScrolled ? 'text-gray-600' : 'text-white md:text-gray-600'}`}
              >
                {item}
              </a>
            ))}
            <a href="https://shop.orekatech.co.bw" className="bg-[#0A7EA4] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-blue-900/10 hover:bg-[#E8A838] transition-all">
              Shop Now
            </a>
          </nav>

          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-gray-900">
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white animate-in fade-in duration-300">
          <div className="p-6 flex items-center justify-between">
            <div className="w-10 h-10 bg-[#E8A838] rounded-lg flex items-center justify-center font-bold">O</div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2"><X size={28} /></button>
          </div>
          <div className="px-6 py-8 flex flex-col gap-6">
            {['Today', 'AI Finder', 'Brands', 'Categories'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black">{item}</a>
            ))}
            <a href="https://shop.orekatech.co.bw" className="bg-[#0A7EA4] text-white py-4 rounded-2xl text-center font-bold text-lg">Go to Store</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-gradient-to-br from-[#0A7EA4] via-[#2D6A4F] to-[#E8A838]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-200 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-white text-xs font-bold mb-8 uppercase tracking-widest">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              Trusted Since 2015
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 drop-shadow-2xl">
              TECH THAT <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">EMPOWERS</span> <br />
              BOTSWANA.
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl mb-12 leading-relaxed font-medium">
              From the heart of Gaborone to the rest of the nation, we provide world-class printers, workstations, and networking infrastructure. 🇧🇼
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#store" className="w-full sm:w-auto bg-white text-[#1A1D29] px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-[#E8A838] transition-all flex items-center justify-center gap-3">
                Browse Products <ChevronRight size={20} />
              </a>
              <a href="#ai-finder" className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                AI Product Finder <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 opacity-20 pointer-events-none">
          <div className="grid grid-cols-2 gap-8 rotate-12">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-white rounded-3xl animate-pulse-slow" style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'Products Available', value: '600+', color: 'text-blue-600' },
              { label: 'Trusted Brands', value: '38+', color: 'text-emerald-600' },
              { label: 'Support Ready', value: '24/7', color: 'text-amber-600' },
              { label: 'Local Business', value: '🇧🇼', color: '' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center group">
                <span className={`text-4xl md:text-5xl font-black mb-2 ${stat.color} font-mono`}>{stat.value}</span>
                <span className="text-xs uppercase font-bold text-gray-400 tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Roulette Section */}
      <DailyRoulette products={RAW_PRODUCTS} />

      {/* AI Finder Section */}
      <AIFinder products={RAW_PRODUCTS} />

      {/* Category Grid */}
      <section id="categories" className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-[#1A1D29]">Browse Categories</h2>
            <div className="h-1.5 w-20 bg-[#E8A838] rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <button 
                key={i}
                onClick={() => {
                  setSelectedCategory(cat.name === selectedCategory ? null : cat.name);
                  document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group flex items-center gap-5 p-6 rounded-3xl border transition-all duration-300 ${
                  selectedCategory === cat.name 
                    ? 'bg-[#0A7EA4] border-transparent text-white shadow-2xl shadow-blue-200' 
                    : 'bg-white border-gray-100 hover:border-[#0A7EA4] hover:shadow-xl'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-colors ${
                  selectedCategory === cat.name ? 'bg-white/20' : 'bg-blue-50 text-[#0A7EA4] group-hover:bg-[#0A7EA4] group-hover:text-white'
                }`}>
                  {cat.icon}
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg leading-tight">{cat.name}</div>
                  <div className={`text-xs ${selectedCategory === cat.name ? 'text-white/70' : 'text-gray-400'}`}>
                    {cat.count} Products
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Store Section */}
      <section id="store" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-[#1A1D29]">All Products</h2>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    !selectedCategory ? 'bg-[#1A1D29] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.slice(0, 5).map(cat => (
                  <button 
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                      selectedCategory === cat.name ? 'bg-[#0A7EA4] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A7EA4] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#0A7EA4] focus:bg-white outline-none transition-all font-medium"
              />
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.slice(0, visibleCount).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {visibleCount < filteredProducts.length && (
                <div className="mt-20 flex justify-center">
                  <button 
                    onClick={() => setVisibleCount(v => v + 12)}
                    className="group flex items-center gap-3 bg-white border-2 border-[#1A1D29] text-[#1A1D29] px-12 py-5 rounded-2xl font-black hover:bg-[#1A1D29] hover:text-white transition-all shadow-xl"
                  >
                    Load More Products <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }} className="mt-6 text-[#0A7EA4] font-bold">Clear All Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* Brands Slider Section */}
      <section id="brands" className="py-24 bg-[#FAFAFA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold">Shop by Brand</h2>
          <div className="flex gap-2">
            <div className="w-10 h-1 rounded-full bg-[#E8A838]" />
            <div className="w-3 h-1 rounded-full bg-gray-200" />
          </div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto no-scrollbar px-6 pb-8">
          {brands.map((brand, i) => (
            <a 
              key={i} 
              href={`https://shop.orekatech.co.bw/brand/${brand.name.toLowerCase().replace(' ', '-')}/`}
              target="_blank"
              className="flex-shrink-0 bg-white rounded-3xl p-8 border border-gray-100 flex flex-col items-center text-center w-48 transition-all hover:shadow-2xl hover:border-[#0A7EA4] hover:-translate-y-2 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{brand.icon}</div>
              <div className="font-bold text-[#1A1D29]">{brand.name}</div>
              <div className="text-[10px] uppercase font-bold text-gray-400 mt-1">{brand.count} Items</div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1D29] pt-24 pb-12 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <a href="#" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#E8A838] rounded-xl flex items-center justify-center font-black text-[#1A1D29] text-xl">O</div>
              <div className="font-black text-2xl tracking-tighter leading-none">OrekaTech</div>
            </a>
            <p className="text-gray-400 leading-relaxed text-sm">
              Botswana's premier destination for high-end IT hardware and software solutions. We bridge the gap between global innovation and local excellence.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E8A838] hover:text-[#1A1D29] transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 text-[#E8A838]">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              {['Home', 'Products', 'AI Finder', 'Brands', 'Contact'].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 text-[#E8A838]">Categories</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              {categories.slice(0, 5).map(cat => (
                <li key={cat.name}><a href="#" className="hover:text-white transition-colors">{cat.name}</a></li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="font-bold text-lg mb-4 text-[#E8A838]">Get in Touch</h4>
            <div className="space-y-4 text-sm font-medium text-gray-400">
              <p className="flex items-center gap-3"><MessageCircle size={18} className="text-[#E8A838]" /> +267 76 215 689</p>
              <p>📍 Gaborone, Botswana</p>
              <p>📧 info@orekatech.co.bw</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">WhatsApp Concierge</p>
              <a href="https://wa.me/26776215689" className="flex items-center gap-2 font-bold text-[#E8A838]">
                Start Chat <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          <p>© 2025 OrekaTech. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>MADE WITH ❤️ IN BOTSWANA</span>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <a 
        href="https://wa.me/26776215689" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[50] group"
      >
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#1A1D29] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl">
          Chat with us!
        </span>
        <div className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
          <MessageCircle size={32} />
        </div>
      </a>
    </div>
  );
};

export default App;
