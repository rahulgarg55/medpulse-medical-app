import React, { useState } from 'react';
import { TabType, MedicationSchedule, Doctor } from '../types';
import { INITIAL_SCHEDULE, TOP_DOCTORS } from '../data/mockData';
import { 
  Stethoscope, 
  Pill, 
  ScanLine, 
  Bot, 
  Video, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  PhoneCall, 
  Clock, 
  Star, 
  ChevronRight,
  Flame,
  X
} from 'lucide-react';

interface HomeTabProps {
  setActiveTab: (tab: TabType) => void;
  onOpenDoctorModal: (doctor: Doctor) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ setActiveTab, onOpenDoctorModal }) => {
  const [schedule, setSchedule] = useState<MedicationSchedule[]>(INITIAL_SCHEDULE);
  const [inCallModal, setInCallModal] = useState(false);

  const toggleMedication = (id: string) => {
    setSchedule(prev => prev.map(item => item.id === id ? { ...item, taken: !item.taken } : item));
  };

  const takenCount = schedule.filter(s => s.taken).length;
  const progressPercent = Math.round((takenCount / schedule.length) * 100);

  return (
    <div className="p-4 space-y-5 pb-8">
      {/* Greeting & Emergency Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 font-medium">Welcome back,</span>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
            Rahul Garg <span className="text-sm">👋</span>
          </h2>
        </div>
        <a 
          href="tel:911" 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/20 transition-all"
        >
          <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
          <span>SOS 911</span>
        </a>
      </div>

      {/* Quick Action Icons Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        <button
          onClick={() => onOpenDoctorModal(TOP_DOCTORS[0])}
          className="flex flex-col items-center p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all hover:scale-105"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center mb-1.5 shadow-sm">
            <Stethoscope className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-200">Doctor</span>
        </button>

        <button
          onClick={() => setActiveTab('pharmacy')}
          className="flex flex-col items-center p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all hover:scale-105"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-1.5 shadow-sm">
            <Pill className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-200">Pharmacy</span>
        </button>

        <button
          onClick={() => setActiveTab('scanner')}
          className="flex flex-col items-center p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all hover:scale-105"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-1.5 shadow-sm">
            <ScanLine className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-200">Scan Rx</span>
        </button>

        <button
          onClick={() => setActiveTab('claude_ai')}
          className="flex flex-col items-center p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all hover:scale-105"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-1.5 shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-200">AI Triage</span>
        </button>
      </div>

      {/* Upcoming Telehealth Consultation Card */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-teal-900/60 to-emerald-950/80 border border-teal-500/30 relative overflow-hidden shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
            Confirmed Appointment
          </span>
          <span className="text-xs text-teal-300 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            In 2 Hours
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3.5">
          <div className="w-12 h-12 rounded-xl bg-teal-800/60 text-2xl flex items-center justify-center border border-teal-500/40">
            👩‍⚕️
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Dr. Sarah Jenkins, MD</h3>
            <p className="text-xs text-teal-200/80">Chief Cardiologist • Cardiology Review</p>
            <p className="text-[11px] text-teal-300/70">Today, 3:30 PM (EST)</p>
          </div>
        </div>

        <button
          onClick={() => setInCallModal(true)}
          className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 transition-all active:scale-95"
        >
          <Video className="w-4 h-4 fill-current" />
          <span>Enter Telehealth Video Suite</span>
        </button>
      </div>

      {/* Medication Schedule & Adherence */}
      <div className="rounded-2xl bg-slate-800/60 p-4 border border-slate-700/60">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Medication Adherence</h3>
            <span className="text-xs text-amber-400 flex items-center gap-0.5 font-semibold">
              <Flame className="w-3.5 h-3.5 fill-current" /> 14 Day Streak
            </span>
          </div>
          <span className="text-xs font-bold text-teal-400 mono">{progressPercent}%</span>
        </div>

        <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden mb-3">
          <div 
            className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="space-y-2">
          {schedule.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleMedication(item.id)}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                item.taken
                  ? 'bg-teal-950/20 border-teal-500/30 text-slate-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.taken ? (
                  <CheckCircle2 className="w-4 h-4 text-teal-400 fill-teal-400/20" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500" />
                )}
                <div>
                  <span className={`text-xs font-semibold block ${item.taken ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.dosage} • {item.mealTiming}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-md">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Clinical Specialists */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured Specialists</h3>
          <button 
            onClick={() => onOpenDoctorModal(TOP_DOCTORS[0])}
            className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center"
          >
            See All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {TOP_DOCTORS.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onOpenDoctorModal(doc)}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-700/60 text-xl flex items-center justify-center border border-slate-600">
                  {doc.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">
                    {doc.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">{doc.specialty}</p>
                  <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold mt-0.5">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{doc.rating}</span>
                    <span className="text-slate-500">({doc.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-white mono">${doc.fee}</span>
                <span className="text-[10px] text-slate-500 block">per consult</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Telehealth Video Consultation Modal */}
      {inCallModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-teal-500/40 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setInCallModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <div className="w-20 h-20 rounded-full bg-teal-500/20 border-2 border-teal-400 mx-auto flex items-center justify-center text-4xl mb-3 shadow-lg shadow-teal-500/20 animate-pulse">
                👩‍⚕️
              </div>
              <h3 className="text-base font-bold text-white">Dr. Sarah Jenkins, MD</h3>
              <p className="text-xs text-teal-400">Cardiology Video Room #9401</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                ● Encrypted WebRTC Live Stream
              </span>
            </div>

            <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Audio/Video Codec</span>
                <span className="mono text-white">Opus / VP9 1080p</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Latency</span>
                <span className="mono text-emerald-400">24ms (Cloudflare Edge)</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Compliance</span>
                <span className="text-teal-400">HIPAA Protected</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setInCallModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors"
              >
                End Call
              </button>
              <button
                onClick={() => {
                  alert("Simulated: Sharing real-time vital telemetry with Dr. Jenkins.");
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors"
              >
                Share Vitals
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
