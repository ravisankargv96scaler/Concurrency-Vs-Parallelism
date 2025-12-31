import React, { useState } from 'react';
import { Icons } from '../constants';

const GopherModel: React.FC = () => {
  const [mode, setMode] = useState<'concurrent' | 'parallel'>('concurrent');
  
  return (
    <div className="flex flex-col gap-6">
       <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-2 text-white">The Go Analogy</h2>
        <p className="text-slate-300 italic mb-4">"Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once." — Rob Pike</p>
        
        <div className="flex gap-4">
            <button 
                onClick={() => setMode('concurrent')}
                className={`px-4 py-2 rounded text-sm font-bold transition-colors ${mode === 'concurrent' ? 'bg-fuchsia-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
                Concurrent Structure
            </button>
            <button 
                onClick={() => setMode('parallel')}
                className={`px-4 py-2 rounded text-sm font-bold transition-colors ${mode === 'parallel' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
                Parallel Execution
            </button>
        </div>
      </div>

      <div className="bg-slate-800 h-64 relative rounded-xl border border-slate-700 overflow-hidden flex items-end p-8">
        
        {/* Environment */}
        <div className="absolute top-8 right-8 bg-orange-900/40 p-4 rounded border border-orange-700 text-center w-24">
            <Icons.Flame />
            <div className="text-xs text-orange-400 mt-1">Furnace</div>
        </div>
        
        <div className="absolute top-8 left-8 bg-slate-700/40 p-4 rounded border border-slate-600 text-center w-24">
            <Icons.Box />
            <div className="text-xs text-slate-400 mt-1">Bricks</div>
        </div>

        {/* Animation Zone */}
        <div className="w-full relative h-20 border-b-2 border-slate-600">
            
            {/* Gopher 1 */}
            <div className={`absolute bottom-0 transition-all duration-[2000ms] ease-in-out infinite-gopher-move flex flex-col items-center
                 ${mode === 'concurrent' ? 'animate-[shuttle_4s_ease-in-out_infinite]' : 'animate-[shuttle_4s_ease-in-out_infinite]'}`}
            >
                 <div className="bg-blue-400 text-slate-900 p-2 rounded-full mb-2">
                    <Icons.Box /> {/* Using Box as generic gopher carrying something */}
                 </div>
                 <span className="text-xs bg-slate-900 px-1 rounded text-blue-300">Gopher 1</span>
            </div>

            {/* Gopher 2 (Only in Parallel) */}
             <div className={`absolute bottom-0 transition-all duration-[2000ms] ease-in-out flex flex-col items-center
                 ${mode === 'parallel' ? 'opacity-100 animate-[shuttle_4s_ease-in-out_infinite_reverse]' : 'opacity-0'}`}
                 style={{ animationDelay: '0.5s' }}
            >
                 <div className="bg-teal-400 text-slate-900 p-2 rounded-full mb-2">
                    <Icons.Box />
                 </div>
                 <span className="text-xs bg-slate-900 px-1 rounded text-teal-300">Gopher 2</span>
            </div>

        </div>

        {/* CSS for custom shuttle animation defined in style tag within component for simplicity in this constrained environment, 
            or usually in global css. Since we use Tailwind arbitrary values, let's inject a style tag. */}
        <style>{`
            @keyframes shuttle {
                0% { left: 10%; transform: scaleX(1); }
                45% { left: 80%; transform: scaleX(1); }
                50% { left: 80%; transform: scaleX(-1); } /* Flip */
                95% { left: 10%; transform: scaleX(-1); }
                100% { left: 10%; transform: scaleX(1); }
            }
        `}</style>
      </div>

      <div className="p-4 bg-slate-900/80 rounded border border-slate-800 text-sm text-slate-400">
         {mode === 'concurrent' 
            ? "Structure: One entity managing the workload. It handles the task, but is limited by its own speed." 
            : "Execution: Two entities working on the same problem independently. Double the throughput."}
      </div>
    </div>
  );
};

export default GopherModel;