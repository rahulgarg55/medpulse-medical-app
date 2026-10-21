import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Heart, Activity, Droplets, Wind } from 'lucide-react';

Chart.register(...registerables);

export const VitalsTab: React.FC = () => {
  const [liveSimulation, setLiveSimulation] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'hr' | 'bp' | 'glucose' | 'spo2'>('hr');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const [metrics, setMetrics] = useState({
    hr: { current: 72, unit: 'BPM', status: 'Normal', data: [68, 70, 72, 75, 71, 74, 72] },
    bp: { current: '118/78', unit: 'mmHg', status: 'Optimal', data: [115, 116, 118, 120, 119, 117, 118] },
    glucose: { current: 98, unit: 'mg/dL', status: 'Normal', data: [94, 96, 99, 102, 98, 97, 98] },
    spo2: { current: 99, unit: '%', status: 'Optimal', data: [98, 99, 99, 98, 100, 99, 99] },
  });

  // Simulated live telemetry stream
  useEffect(() => {
    if (!liveSimulation) return;
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newHr = Math.floor(70 + Math.random() * 8);
        const newGlucose = Math.floor(95 + Math.random() * 8);
        const newSpo2 = Math.random() > 0.3 ? 99 : 98;

        return {
          ...prev,
          hr: { ...prev.hr, current: newHr, data: [...prev.hr.data.slice(1), newHr] },
          glucose: { ...prev.glucose, current: newGlucose, data: [...prev.glucose.data.slice(1), newGlucose] },
          spo2: { ...prev.spo2, current: newSpo2, data: [...prev.spo2.data.slice(1), newSpo2] },
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [liveSimulation]);

  const chartDataMap = {
    hr: {
      label: 'Heart Rate (BPM)',
      borderColor: '#14b8a6',
      backgroundColor: 'rgba(20, 184, 166, 0.15)',
      data: metrics.hr.data,
    },
    bp: {
      label: 'Systolic Blood Pressure (mmHg)',
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.15)',
      data: metrics.bp.data,
    },
    glucose: {
      label: 'Blood Glucose (mg/dL)',
      borderColor: '#a855f7',
      backgroundColor: 'rgba(168, 85, 247, 0.15)',
      data: metrics.glucose.data,
    },
    spo2: {
      label: 'Oxygen Saturation SpO2 (%)',
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      data: metrics.spo2.data,
    },
  };

  const currentChart = chartDataMap[selectedMetric];

  // Initialize and update Chart.js instance
  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['10m', '8m', '6m', '4m', '2m', '1m', 'Now'],
        datasets: [
          {
            fill: true,
            label: currentChart.label,
            data: currentChart.data,
            borderColor: currentChart.borderColor,
            backgroundColor: currentChart.backgroundColor,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: currentChart.borderColor,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#94a3b8',
            bodyColor: '#ffffff',
            borderColor: '#334155',
            borderWidth: 1,
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b', font: { size: 10 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#64748b', font: { size: 10 } }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [selectedMetric, metrics]);

  return (
    <div className="p-4 space-y-4 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-400" />
            Clinical Vitals Telemetry
          </h2>
          <p className="text-xs text-slate-400">Bluetooth LE & Apple HealthKit / Health Connect Sync</p>
        </div>

        <button
          onClick={() => setLiveSimulation(!liveSimulation)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
            liveSimulation
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${liveSimulation ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`}></span>
          <span>{liveSimulation ? 'Live Syncing' : 'Paused'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div
          onClick={() => setSelectedMetric('hr')}
          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
            selectedMetric === 'hr'
              ? 'bg-teal-950/40 border-teal-500/80 shadow-md shadow-teal-500/10'
              : 'bg-slate-800/70 border-slate-700/60 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <Heart className="w-4 h-4 text-teal-400" />
            <span className="text-[10px] font-bold text-teal-400">{metrics.hr.status}</span>
          </div>
          <span className="text-2xl font-extrabold text-white mono">{metrics.hr.current}</span>
          <span className="text-[10px] text-slate-400 ml-1">{metrics.hr.unit}</span>
        </div>

        <div
          onClick={() => setSelectedMetric('bp')}
          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
            selectedMetric === 'bp'
              ? 'bg-blue-950/40 border-blue-500/80 shadow-md shadow-blue-500/10'
              : 'bg-slate-800/70 border-slate-700/60 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold text-blue-400">{metrics.bp.status}</span>
          </div>
          <span className="text-2xl font-extrabold text-white mono">{metrics.bp.current}</span>
          <span className="text-[10px] text-slate-400 ml-1">{metrics.bp.unit}</span>
        </div>

        <div
          onClick={() => setSelectedMetric('glucose')}
          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
            selectedMetric === 'glucose'
              ? 'bg-purple-950/40 border-purple-500/80 shadow-md shadow-purple-500/10'
              : 'bg-slate-800/70 border-slate-700/60 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <Droplets className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-bold text-purple-400">{metrics.glucose.status}</span>
          </div>
          <span className="text-2xl font-extrabold text-white mono">{metrics.glucose.current}</span>
          <span className="text-[10px] text-slate-400 ml-1">{metrics.glucose.unit}</span>
        </div>

        <div
          onClick={() => setSelectedMetric('spo2')}
          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
            selectedMetric === 'spo2'
              ? 'bg-emerald-950/40 border-emerald-500/80 shadow-md shadow-emerald-500/10'
              : 'bg-slate-800/70 border-slate-700/60 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <Wind className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-400">{metrics.spo2.status}</span>
          </div>
          <span className="text-2xl font-extrabold text-white mono">{metrics.spo2.current}</span>
          <span className="text-[10px] text-slate-400 ml-1">{metrics.spo2.unit}</span>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-800/80 border border-slate-700/70 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200">{currentChart.label}</span>
          <span className="text-[10px] font-mono text-slate-400">Past 10 Minutes</span>
        </div>
        <div className="h-44 relative">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};
