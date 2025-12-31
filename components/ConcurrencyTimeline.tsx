import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../constants';

const ConcurrencyTimeline: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<{type: 'A' | 'B' | 'Switch', width: number}[]>([]);
  
  const intervalRef = useRef<number | null>(null);

  const SEGMENT_SIZE = 10;
  const TOTAL_SIZE = 100;

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= TOTAL_SIZE) {
            setRunning(false);
            return TOTAL_SIZE;
          }
          
          // Add history segment
          const isSwitch = prev % (SEGMENT_SIZE * 2) === SEGMENT_SIZE;
          const type = isSwitch ? 'Switch' : (Math.floor(prev / SEGMENT_SIZE) % 2 === 0 ? 'A' : 'B');
          
          setHistory(h => {
             // Optimization: prevent array from growing indefinitely if we looped, but here we stop at 100
             if (type === 'Switch') {
                 return [...h, { type: 'Switch', width: 2 }];
             }
             return [...h, { type: type === 'A' ? 'A' : 'B', width: 2 }];
          });

          return prev + 1;
        });
      }, 50);
    } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleRun = () => {
    setProgress(0);
    setHistory([]);
    setRunning(true);
  };

  return (
    <div className="flex flex-col gap-6">
       <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-2 text-white">Concurrency (The Illusion)</h2>
        <p className="text-slate-300">
           On a single-core CPU, tasks don't actually run at the same time. The CPU <strong>time-slices</strong> rapidly.
        </p>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl border border-fuchsia-900/50 shadow-lg">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-slate-200">
                <Icons.Cpu />
                <span className="font-mono font-bold">SINGLE CORE CPU</span>
            </div>
            <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div> Task A
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div> Task B
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div> Context Switch
                </div>
            </div>
        </div>

        {/* The Timeline Bar */}
        <div className="relative h-16 bg-slate-900 rounded-lg overflow-hidden border border-slate-700 w-full flex">
            {history.map((segment, idx) => (
                <div 
                    key={idx}
                    style={{ width: `${segment.width}%` }}
                    className={`h-full transition-none
                        ${segment.type === 'A' ? 'bg-blue-500' : ''}
                        ${segment.type === 'B' ? 'bg-orange-500' : ''}
                        ${segment.type === 'Switch' ? 'bg-red-500' : ''}
                    `}
                />
            ))}
            {/* Playhead */}
            {running && (
                <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10" style={{ left: `${(progress / TOTAL_SIZE) * 100}%` }}></div>
            )}
        </div>
        
        <div className="mt-4 flex justify-between text-xs text-slate-500 font-mono">
            <span>0ms</span>
            <span>Time &rarr;</span>
            <span>100ms</span>
        </div>

        <div className="mt-8 flex justify-center">
            <button
                onClick={handleRun}
                disabled={running}
                className="bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
                {running ? 'Executing...' : 'Run Tasks (Sequential Time-Slicing)'}
            </button>
        </div>

        {progress === 100 && (
            <div className="mt-6 p-4 bg-slate-900/80 rounded border border-slate-700 text-center animate-pulse">
                <p className="text-slate-300">
                    Notice the <span className="text-red-400 font-bold">Red Gaps</span>? That's overhead. The CPU stops Task A, saves state, loads Task B, then runs. It is NOT free!
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ConcurrencyTimeline;