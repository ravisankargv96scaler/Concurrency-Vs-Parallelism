import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../constants';

const KitchenAnalogy: React.FC = () => {
  const [running, setRunning] = useState(false);
  // 0 = at Board, 1 = at Stove
  const [chefPosition, setChefPosition] = useState(0); 
  const [tasksCompleted, setTasksCompleted] = useState(0);

  // Simulation Refs
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setChefPosition((prev) => (prev === 0 ? 1 : 0));
        setTasksCompleted(c => c + 1);
      }, 1500); // Switch every 1.5s
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setChefPosition(0);
      setTasksCompleted(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-2 text-white">The Kitchen Analogy</h2>
        <p className="text-slate-300">
          <strong>Concurrency</strong> is about dealing with multiple things at once (structure). 
          <strong> Parallelism</strong> is about doing multiple things at once (execution).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CONCURRENCY */}
        <div className="bg-slate-800 p-6 rounded-xl border border-fuchsia-900/50 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500"></div>
          <h3 className="text-xl font-bold text-fuchsia-400 mb-4 flex items-center gap-2">
            <Icons.Clock /> Concurrency
          </h3>
          <p className="text-sm text-slate-400 mb-8 h-12">
            One chef switching context between chopping and stirring. They are never doing both *exactly* at the same time.
          </p>

          <div className="relative h-40 bg-slate-900/50 rounded-lg flex items-center justify-between px-10 border border-slate-700">
             {/* Stations */}
             <div className="flex flex-col items-center">
                <div className="bg-slate-700 p-3 rounded-full text-slate-300 mb-2">
                    <Icons.Knife />
                </div>
                <span className="text-xs text-slate-500">Board</span>
             </div>

             <div className="flex flex-col items-center">
                <div className="bg-slate-700 p-3 rounded-full text-slate-300 mb-2">
                    <Icons.Flame />
                </div>
                <span className="text-xs text-slate-500">Stove</span>
             </div>

             {/* The Chef */}
             <div 
                className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out flex flex-col items-center
                  ${chefPosition === 0 ? 'left-[20%]' : 'left-[70%]'}
                `}
             >
                <div className="bg-fuchsia-600 p-3 rounded-full text-white shadow-xl shadow-fuchsia-500/20 z-10">
                   <Icons.Chef />
                </div>
                <span className="text-xs font-bold text-fuchsia-300 mt-2 bg-slate-900 px-2 py-1 rounded">
                   {running ? (chefPosition === 0 ? "Chopping..." : "Stirring...") : "Idle"}
                </span>
             </div>
          </div>
        </div>

        {/* PARALLELISM */}
        <div className="bg-slate-800 p-6 rounded-xl border border-cyan-900/50 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500"></div>
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <Icons.Zap /> Parallelism
          </h3>
          <p className="text-sm text-slate-400 mb-8 h-12">
            Two chefs working simultaneously. Chopping and stirring happen at the exact same instant.
          </p>

          <div className="relative h-40 bg-slate-900/50 rounded-lg flex items-center justify-between px-10 border border-slate-700">
             {/* Station 1 + Chef A */}
             <div className="flex flex-col items-center relative">
                <div className="bg-slate-700 p-3 rounded-full text-slate-300 mb-2">
                    <Icons.Knife />
                </div>
                <span className="text-xs text-slate-500">Board</span>
                {running && (
                  <div className="absolute -top-4 bg-cyan-600 p-2 rounded-full text-white scale-75 animate-bounce">
                    <Icons.Chef />
                  </div>
                )}
             </div>

             {/* Station 2 + Chef B */}
             <div className="flex flex-col items-center relative">
                <div className="bg-slate-700 p-3 rounded-full text-slate-300 mb-2">
                    <Icons.Flame />
                </div>
                <span className="text-xs text-slate-500">Stove</span>
                {running && (
                  <div className="absolute -top-4 bg-emerald-500 p-2 rounded-full text-white scale-75 animate-bounce" style={{ animationDelay: '0.2s' }}>
                    <Icons.Chef />
                  </div>
                )}
             </div>
             
             {!running && <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">Chefs waiting...</div>}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setRunning(!running)}
          className={`px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg
            ${running 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' 
              : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/20'
            }
          `}
        >
          {running ? 'Stop Service' : 'Start Dinner Service'}
        </button>
      </div>
    </div>
  );
};

export default KitchenAnalogy;