import React, { useState } from 'react';
import { DeviceType, TabType, MedicineItem, CartItem, Doctor } from './types';
import { Header } from './components/Header';
import { DeviceFrame } from './components/DeviceFrame';
import { BottomTabBar } from './components/BottomTabBar';
import { HomeTab } from './components/HomeTab';
import { PharmacyTab } from './components/PharmacyTab';
import { ScannerTab } from './components/ScannerTab';
import { ClaudeAITab } from './components/ClaudeAITab';
import { VitalsTab } from './components/VitalsTab';
import { ClaudeUXStudioTab } from './components/ClaudeUXStudioTab';
import { CartDrawer } from './components/CartDrawer';
import { DoctorModal } from './components/DoctorModal';
import { MEDICINES_DATA } from './data/mockData';

export function App() {
  const [deviceType, setDeviceType] = useState<DeviceType>('iphone');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [cart, setCart] = useState<CartItem[]>([
    { medicine: MEDICINES_DATA[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const addToCart = (med: MedicineItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.medicine.id === med.id);
      if (existing) {
        return prev.map(item => item.medicine.id === med.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { medicine: med, quantity: 1 }];
    });
  };

  const updateQuantity = (medicineId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.medicine.id === medicineId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => setCart([]);

  const handleAddPrescribedMedicines = (medicines: MedicineItem[]) => {
    medicines.forEach(m => addToCart(m));
    setIsCartOpen(true);
  };

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Global Bar */}
      <Header
        deviceType={deviceType}
        setDeviceType={setDeviceType}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
      />

      {/* Main Mobile Viewport Frame */}
      <main className="flex-1 flex justify-center items-center">
        <DeviceFrame deviceType={deviceType}>
          {/* Screen Body */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {activeTab === 'home' && (
                <HomeTab
                  setActiveTab={setActiveTab}
                  onOpenDoctorModal={(doc) => setSelectedDoctor(doc)}
                />
              )}
              {activeTab === 'pharmacy' && (
                <PharmacyTab
                  cart={cart}
                  addToCart={addToCart}
                  openCart={() => setIsCartOpen(true)}
                />
              )}
              {activeTab === 'scanner' && (
                <ScannerTab onAddPrescribedMedicines={handleAddPrescribedMedicines} />
              )}
              {activeTab === 'claude_ai' && <ClaudeAITab />}
              {activeTab === 'vitals' && <VitalsTab />}
              {activeTab === 'claude_ux' && <ClaudeUXStudioTab />}
            </div>

            {/* Bottom App Tab Navigation */}
            <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </DeviceFrame>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
      />

      {/* Doctor Consultation Booking Modal */}
      <DoctorModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />
    </div>
  );
}

export default App;
