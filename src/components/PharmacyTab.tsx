import React, { useState } from 'react';
import { MedicineItem, CartItem } from '../types';
import { MEDICINES_DATA } from '../data/mockData';
import { Search, ShoppingBag, Plus, Star, ShieldAlert, Check, X, FileText, CheckCircle2 } from 'lucide-react';

interface PharmacyTabProps {
  cart: CartItem[];
  addToCart: (med: MedicineItem) => void;
  openCart: () => void;
}

export const PharmacyTab: React.FC<PharmacyTabProps> = ({ cart, addToCart, openCart }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalMed, setActiveModalMed] = useState<MedicineItem | null>(null);

  const categories = ['All', 'Cardiology', 'Diabetes', 'Antibiotics', 'Pain Relief', 'Respiratory', 'Vitamins'];

  const filteredMedicines = MEDICINES_DATA.filter(med => {
    const matchesCat = selectedCategory === 'All' || med.category === selectedCategory;
    const matchesSearch = med.name.toLowerCase().includes(search.toLowerCase()) ||
                          med.genericName.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-4 space-y-4 pb-8">
      {/* Search & Cart Top Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search medicines, salts, brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-800 text-xs text-white rounded-xl border border-slate-700/80 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredMedicines.map(med => {
          const inCart = cart.find(c => c.medicine.id === med.id);
          return (
            <div
              key={med.id}
              className="rounded-2xl bg-slate-800/80 border border-slate-700/70 p-3 flex flex-col justify-between hover:border-slate-600 transition-all group"
            >
              <div>
                {/* Image & Badges */}
                <div 
                  onClick={() => setActiveModalMed(med)}
                  className="cursor-pointer relative rounded-xl bg-slate-900/80 p-3 text-center mb-2.5 flex items-center justify-center text-3xl h-24 hover:bg-slate-900 transition-colors"
                >
                  <span>{med.image}</span>
                  {med.rxRequired && (
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      Rx Req
                    </span>
                  )}
                  <span className="absolute bottom-1.5 right-1.5 text-[10px] text-amber-400 font-bold flex items-center gap-0.5 bg-slate-950/70 px-1.5 py-0.5 rounded">
                    <Star className="w-2.5 h-2.5 fill-current" /> {med.rating}
                  </span>
                </div>

                {/* Info */}
                <div onClick={() => setActiveModalMed(med)} className="cursor-pointer">
                  <span className="text-[10px] font-semibold text-teal-400 uppercase tracking-wider block">
                    {med.category}
                  </span>
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-teal-300 transition-colors">
                    {med.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1">
                    {med.genericName}
                  </p>
                </div>
              </div>

              {/* Price & Add Action */}
              <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white mono">${med.price.toFixed(2)}</span>
                  {med.originalPrice && (
                    <span className="text-[10px] text-slate-500 line-through ml-1 mono">
                      ${med.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(med)}
                  className={`p-1.5 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                    inCart
                      ? 'bg-teal-500 text-slate-950'
                      : 'bg-slate-700 hover:bg-teal-500 hover:text-slate-950 text-slate-200'
                  }`}
                  title="Add to Bag"
                >
                  {inCart ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      {activeModalMed && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto custom-scrollbar">
            <button 
              onClick={() => setActiveModalMed(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 text-4xl mx-auto flex items-center justify-center mb-2 shadow-inner">
                {activeModalMed.image}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                {activeModalMed.category}
              </span>
              <h3 className="text-base font-bold text-white">{activeModalMed.name}</h3>
              <p className="text-xs text-slate-400">{activeModalMed.genericName}</p>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Clinical Dosage
                </div>
                <p className="text-slate-200 font-medium">{activeModalMed.dosage}</p>
              </div>

              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Active Ingredients
                </div>
                <p className="text-slate-200">{activeModalMed.activeIngredients}</p>
              </div>

              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Instructions & Cautions
                </div>
                <p className="text-slate-300 leading-relaxed">{activeModalMed.instructions}</p>
              </div>

              {activeModalMed.rxRequired && (
                <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-3 flex items-start gap-2 text-rose-300">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-tight">
                    <strong>Prescription Required:</strong> Valid clinical script verified prior to dispatch.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block">Total Price</span>
                <span className="text-base font-extrabold text-white mono">${activeModalMed.price.toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  addToCart(activeModalMed);
                  setActiveModalMed(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-teal-500/20"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
