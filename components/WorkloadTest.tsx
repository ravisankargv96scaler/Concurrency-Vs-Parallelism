import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';

type WorkloadType = 'IO' | 'CPU';

const WorkloadTest: React.FC = () => {
  const [workload, setWorkload] = useState<WorkloadType>('IO');
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Progress for 3 tasks
  const [progress, setProgress] = useState([0, 0, 0]);

  useEffect(() => {
    let interval: number;

    if (isSimulating) {
        setProgress([0,0,0]);
        let ticks = 0;
        
        interval = window.setInterval(() => {
            ticks++;
            
            setProgress(prev => {
                const next = [...prev];
                
                if (workload === 'IO') {
                    // CONCURRENCY WIN:
                    // Initiate all quickly (ticks 1-3), then they fill in background
                    if (ticks > 0) next[0] = Math.min(100, next[0] + 5);
                    if (ticks > 5) next[1] = Math.min(100, next[1] + 5);
                    if (ticks > 10) next[2] = Math.min(100, next[2] + 5);
                } else {
                    // CPU BOUND (Single Core Concurrency Struggle):
                    // Must finish 1 before starting 2 fully (simplified visual)
                    if (next[0] < 100) {
                        next[0] += 5;
                    } else if (next[1] < 100) {
                        next[1] += 5;
                    } else if (next[2] < 100) {
                        next[2] += 5;
                    }
                }
                
                if (next[0] >= 100 && next[1] >= 100 && next[2] >= 100) {
                    setIsSimulating(false);
                    clearInterval(interval);
                }
                
                return next;
            });

        }, 50);
    }
    
    return () => clearInterval(interval);
  }, [isSimulating, workload]);

  return (
    <div className="flex flex-col gap-6">
       <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-2 text-white">When to use which?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <button 
                onClick={() => { setWorkload('IO'); setProgress([0,0,0]); setIsSimulating(false); }}
                className={`p-4 rounded-lg border text-left transition-all ${workload === 'IO' ? 'bg-indigo-900/50 border-indigo-500 ring-2 ring-indigo-500/20' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
            >
                <div className="flex items-center gap-2 mb-2 text-indigo-400 font-bold"><Icons.Download /> I/O Bound</div>
                <p className="text-sm text-slate-400">Waiting for network, disk, or DB. Concurrency shines here. The CPU kicks off a request and switches to the next while waiting.</p>
            </button>

            <button 
                onClick={() => { setWorkload('CPU'); setProgress([0,0,0]); setIsSimulating(false); }}
                className={`p-4 rounded-lg border text-left transition-all ${workload === 'CPU' ? 'bg-amber-900/50 border-amber-500 ring-2 ring-amber-500/20' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
            >
                <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold"><Icons.Image /> CPU Bound</div>
                <p className="text-sm text-slate-400">Heavy calculations (Encoding, Math, Graphics). Concurrency hurts here (context switching overhead). You need Parallelism.</p>
            </button>
        </div>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-lg">
        <h3 className="text-lg font-medium text-white mb-6 flex justify-between items-center">
            <span>Simulation: Single Core Handling {workload === 'IO' ? 'Network Requests' : 'Image Rendering'}</span>
            <span className={`text-xs px-2 py-1 rounded ${workload === 'IO' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                {workload === 'IO' ? 'Concurrency Efficient' : 'Concurrency Inefficient'}
            </span>
        </h3>

        <div className="space-y-6">
            {[0, 1, 2].map((idx) => (
                <div key={idx} className="relative">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Task {idx + 1}</span>
                        <span>{progress[idx] < 100 ? (progress[idx] > 0 ? 'Processing...' : 'Waiting') : 'Done'}</span>
                    </div>
                    <div className="h-4 bg-slate-900 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-100 ease-linear ${workload === 'IO' ? 'bg-indigo-500' : 'bg-amber-500'}`}
                            style={{ width: `${progress[idx]}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-8 text-center">
             <button
                onClick={() => setIsSimulating(true)}
                disabled={isSimulating}
                className="bg-white text-slate-900 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-full font-bold transition-colors"
            >
                {isSimulating ? 'Running Simulation...' : `Simulate ${workload} Workload`}
            </button>
            <p className="mt-4 text-sm text-slate-500">
                {workload === 'IO' 
                    ? "Notice how the bars fill almost together? The CPU didn't have to do much work, just wait."
                    : "Notice the 'Staircase' pattern? The CPU is stuck working on Task 1 and can't touch Task 2 until it's done."}
            </p>
        </div>
      </div>
    </div>
  );
};

export default WorkloadTest;