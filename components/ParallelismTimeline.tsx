import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../constants';

const ParallelismTimeline: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  
  const intervalRef = useRef<number | null>(null);
  const TOTAL_SIZE = 100;

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= TOTAL_SIZE) {
            setRunning(false);
            return TOTAL_SIZE;
          }
          return prev + 2; // Fills 2x "faster" conceptually because 2 cores work
        });
      }, 50);
    }
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleRun = () => {
    setProgress(0);
    setRunning(true);
  };

  return (
    <div className="flex flex-col gap-6">
       <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-2 text-white">Parallelism (True Power)</h2>
        <p className="text-slate-300">
           With Multi-Core CPUs, hardware executes instructions for different threads at the <strong className="text-cyan-400">exact same time</strong>.
        </p>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl border border-cyan-900/50 shadow-lg">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-slate-200">
                <Icons.Cpu />
                <span className="font-mono font-bold">DUAL CORE CPU</span>
            </div>
             <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div> Task A (Core 1)
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div> Task B (Core 2)
                </div>
            </div>
        </div>

        <div className="grid gap-4">
            {/* Core 1 */}
            <div className="relative">
                <div className="text-xs text-slate-500 mb-1 font-mono">CORE 1</div>
                <div className="relative h-12 bg-slate-900 rounded-lg overflow-hidden border border-slate-700 w-full">
                    <div 
                        className="h-full bg-blue-500 transition-all ease-linear duration-75"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Core 2 */}
            <div className="relative">
                <div className="text-xs text-slate-500 mb-1 font-mono">CORE 2</div>
                <div className="relative h-12 bg-slate-900 rounded-lg overflow-hidden border border-slate-700 w-full">
                    <div 
                        className="h-full bg-orange-500 transition-all ease-linear duration-75"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>

        <div className="mt-8 flex justify-center">
            <button
                onClick={handleRun}
                disabled={running}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
                {running ? 'Executing...' : 'Run Parallel Execution'}
            </button>
        </div>

        {progress === 100 && (
            <div className="mt-6 p-4 bg-emerald-900/30 border border-emerald-500/30 rounded text-center animate-bounce-short">
                <p className="text-emerald-300 font-bold text-lg">
                    Completed in half the time! 
                </p>
                <p className="text-emerald-400/70 text-sm">No context switching overhead. Pure speed.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ParallelismTimeline;