
import React from 'react';
import { 
  Printer, Laptop, HardDrive, Wifi, Shield, 
  Store, Tv, Keyboard, Briefcase, Wrench, 
  Building2, Tag, Smartphone, MousePointer2 
} from 'lucide-react';

export const COLORS = {
  kalahariSand: '#F5E6D3',
  okavangoBlue: '#0A7EA4',
  okavangoDeep: '#065A78',
  savannaGold: '#E8A838',
  acaciaGreen: '#2D6A4F',
  sunsetCoral: '#E07A5F',
  nightSky: '#1A1D29'
};

export const BRAND_ICONS: Record<string, string> = {
  'Brother': '🖨️', 'HP': '💻', 'Lenovo': '💼', 'Dell': '🖥️', 'Asus': '⚡',
  'Microsoft': '🪟', 'Kingston': '💾', 'Sandisk': '📀', 'Seagate': '💿',
  'Western Digital': '🗄️', 'Hiksemi': '📸', 'TP-Link': '📶', 'D-Link': '🌐',
  'Huawei': '📱', 'LG': '📺', 'Logitech': '🖱️', 'TARGUS': '🎒', 'Port': '👜',
  'Zebra': '🏷️', 'Corning': '🔌', 'Eaton': '🔋', 'Ruckus': '📡', 'Mercusys': '📶',
  'Bixolon': '🧾', 'PinnPOS': '🏪', 'Proline': '🖥️', 'Hisense': '📺', 'VERBATIM': '💿'
};

export const CATEGORY_MAPPING: Record<string, { icon: React.ReactNode; color: string }> = {
  'Printer': { icon: <Printer size={20} />, color: 'bg-blue-100 text-blue-700' },
  'Computing': { icon: <Laptop size={20} />, color: 'bg-emerald-100 text-emerald-700' },
  'Storage': { icon: <HardDrive size={20} />, color: 'bg-amber-100 text-amber-700' },
  'Networking': { icon: <Wifi size={20} />, color: 'bg-indigo-100 text-indigo-700' },
  'Security': { icon: <Shield size={20} />, color: 'bg-red-100 text-red-700' },
  'Point Of Sale': { icon: <Store size={20} />, color: 'bg-orange-100 text-orange-700' },
  'Displays': { icon: <Tv size={20} />, color: 'bg-purple-100 text-purple-700' },
  'Keyboards': { icon: <Keyboard size={20} />, color: 'bg-slate-100 text-slate-700' },
  'Cases': { icon: <Briefcase size={20} />, color: 'bg-rose-100 text-rose-700' },
  'Accessories': { icon: <Wrench size={20} />, color: 'bg-gray-100 text-gray-700' },
  'Enterprise': { icon: <Building2 size={20} />, color: 'bg-sky-100 text-sky-700' },
  'On Promo': { icon: <Tag size={20} />, color: 'bg-yellow-100 text-yellow-700' },
  'Tablets': { icon: <Smartphone size={20} />, color: 'bg-cyan-100 text-cyan-700' }
};
