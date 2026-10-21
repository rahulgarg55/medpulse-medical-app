import React, { useState } from 'react';
import { Doctor } from '../types';
import { X, Star, Calendar, Clock, Video, CheckCircle2, ShieldCheck } from 'lucide-react';

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
}

export const DoctorModal: React.FC<DoctorModalProps> = ({ doctor, onClose }) => {
  const [selectedSlot, setSelectedSlot] = useState('Today, 3:30 PM');
  const [booked, setBooked] = useState(false);

  if (!doctor) return null;

  const slots = [
    'Today, 3:30 PM',
    'Today, 5:00 PM',
    'Tomorrow, 10:00 AM',
    'Tomorrow, 2:15 PM'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {booked ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white">Consultation Confirmed!</h3>
            <p className="text-xs text-slate-300">
              Appointment booked with <strong>{doctor.name}</strong> for <strong>{selectedSlot}</strong>.
            </p>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-teal-400">
              Telehealth video link sent to patient email & SMS.
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-3xl flex items-center justify-center border border-slate-700">
                {doctor.avatar}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{doctor.name}</h3>
                <p className="text-xs text-teal-400">{doctor.specialty}</p>
                <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold mt-0.5">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{doctor.rating}</span>
                  <span className="text-slate-500">({doctor.reviews} patient reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-300 block">Select Telehealth Time Slot:</span>
              <div className="grid grid-cols-2 gap-2">
                {slots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      selectedSlot === slot
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Consultation Fee</span>
                <span className="font-bold text-white mono">${doctor.fee}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Platform Security</span>
                <span className="text-emerald-400 font-medium">HIPAA Encrypted</span>
              </div>
            </div>

            <button
              onClick={() => setBooked(true)}
              className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 transition-all active:scale-95"
            >
              <Video className="w-4 h-4 fill-current" />
              <span>Confirm & Book Consultation</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
