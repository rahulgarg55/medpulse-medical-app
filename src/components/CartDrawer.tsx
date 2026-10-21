import React, { useState } from 'react';
import { CartItem } from '../types';
import { ShoppingBag, X, Plus, Minus, Trash2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (medicineId: string, delta: number) => void;
  clearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  clearCart
}) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.medicine.price * item.quantity, 0);
  const hasRx = cart.some(item => item.medicine.rxRequired);

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setOrderReceipt(`MP-RX-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  const handleFinish = () => {
    setOrderReceipt(null);
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-teal-400" />
            <h3 className="text-base font-bold text-white">Your Medical Bag</h3>
            <span className="text-xs text-slate-400">({cart.length} items)</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {orderReceipt ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border-2 border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-white">Order Confirmed!</h4>
              <p className="text-xs text-slate-400 mt-1">Prescription verified & dispatched to pharmacy</p>
              <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs mono text-teal-300">
                Tracking ID: {orderReceipt}
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-xs">
              Estimated delivery: <strong>Today by 5:30 PM</strong> via MedPulse Express Courier.
            </p>
            <button
              onClick={handleFinish}
              className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 text-3xl flex items-center justify-center">
              💊
            </div>
            <h4 className="text-sm font-bold text-white">Your bag is empty</h4>
            <p className="text-xs text-slate-400 max-w-xs">
              Explore the pharmacy catalog or scan a prescription to add items.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-3 custom-scrollbar">
              {cart.map((item) => (
                <div
                  key={item.medicine.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.medicine.image}</span>
                    <div>
                      <h4 className="font-bold text-white line-clamp-1">{item.medicine.name}</h4>
                      <p className="text-[10px] text-slate-400">{item.medicine.dosage}</p>
                      <span className="text-xs font-bold text-teal-400 mono">
                        ${(item.medicine.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.medicine.id, -1)}
                      className="p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-xs mono w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.medicine.id, 1)}
                      className="p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              {hasRx && (
                <div className="p-3 bg-teal-950/30 border border-teal-500/30 rounded-xl flex items-start gap-2 text-teal-300 text-xs">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-tight">
                    <strong>Digital Rx Attached:</strong> Clinical prescription verified with Dr. Sarah Jenkins (License #MED-94021).
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Pharmacy Delivery</span>
                  <span className="text-emerald-400 font-bold uppercase text-[10px]">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Rx Verification</span>
                  <span className="text-emerald-400 font-bold uppercase text-[10px]">Included</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-teal-400 mono">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all active:scale-95"
              >
                {checkingOut ? (
                  <span>Processing Encrypted Payment...</span>
                ) : (
                  <>
                    <span>Proceed to Express Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
