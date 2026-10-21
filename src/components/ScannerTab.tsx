import React, { useState } from 'react';
import { MedicineItem, PrescriptionScan } from '../types';
import { SAMPLE_PRESCRIPTIONS, MEDICINES_DATA } from '../data/mockData';
import { ScanLine, CheckCircle2, ShieldCheck, ArrowRight, Upload, Sparkles, RefreshCw } from 'lucide-react';

interface ScannerTabProps {
  onAddPrescribedMedicines: (medicines: MedicineItem[]) => void;
}

export const ScannerTab: React.FC<ScannerTabProps> = ({ onAddPrescribedMedicines }) => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<PrescriptionScan | null>(SAMPLE_PRESCRIPTIONS[0]);
  const [added, setAdded] = useState(false);

  const triggerScan = () => {
    setScanning(true);
    setAdded(false);
    setTimeout(() => {
      setScanning(false);
      setScannedData(SAMPLE_PRESCRIPTIONS[0]);
    }, 1500);
  };

  const handleAddAllToCart = () => {
    if (!scannedData) return;
    const itemsToAdd: MedicineItem[] = [];
    scannedData.medications.forEach(med => {
      const found = MEDICINES_DATA.find(m => m.id === med.matchedMedicineId);
      if (found) itemsToAdd.push(found);
    });
    onAddPrescribedMedicines(itemsToAdd);
    setAdded(true);
  };

  return (
    <div className="p-4 space-y-4 pb-8">
      <div>
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ScanLine className="w-5 h-5 text-teal-400" />
          AI Prescription Scanner & OCR
        </h2>
        <p className="text-xs text-slate-400">
          Upload or capture physical prescription for instant neural OCR & inventory mapping.
        </p>
      </div>

      {/* Scanner Viewfinder Box */}
      <div className="relative rounded-2xl bg-slate-950 border-2 border-dashed border-teal-500/40 p-4 overflow-hidden flex flex-col items-center justify-center min-h-[200px]">
        {scanning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_15px_#2dd4bf] animate-[bounce_2s_infinite]"></div>
        )}

        <div className="text-center space-y-2 z-10">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 mx-auto flex items-center justify-center border border-teal-500/20">
            {scanning ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">
              {scanning ? 'Neural OCR Analyzing Prescription...' : 'Prescription Document Ready'}
            </h3>
            <p className="text-[11px] text-slate-400">
              {scanning ? 'Extracting dosages & doctor credentials' : 'Metropolitan Clinical Institute • Script #49281'}
            </p>
          </div>
        </div>

        <button
          onClick={triggerScan}
          disabled={scanning}
          className="mt-3 px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 text-xs font-semibold transition-all flex items-center gap-1.5 z-10"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Rescan Document</span>
        </button>
      </div>

      {/* OCR Extracted Results Card */}
      {scannedData && (
        <div className="rounded-2xl bg-slate-800/80 border border-slate-700/70 p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Verified Clinical Prescription</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {scannedData.confidenceScore}% Confidence
            </span>
          </div>

          {/* Doctor & Patient Details */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div>
              <span className="text-slate-500 block text-[10px]">Patient</span>
              <span className="font-semibold">{scannedData.patientName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Doctor</span>
              <span className="font-semibold">{scannedData.doctorName}</span>
            </div>
          </div>

          {/* Extracted Medications */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Identified Medications ({scannedData.medications.length})
            </span>

            {scannedData.medications.map((med, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
              >
                <div>
                  <h4 className="font-bold text-teal-300">{med.name}</h4>
                  <p className="text-[10px] text-slate-400">{med.dosage} • {med.frequency}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {med.duration}
                </span>
              </div>
            ))}
          </div>

          {/* Add to Bag Action */}
          <button
            onClick={handleAddAllToCart}
            disabled={added}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20'
            }`}
          >
            {added ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>All Prescribed Medications Added to Bag!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Add All Prescribed Medicines to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
