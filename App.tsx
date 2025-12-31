import React, { useState } from 'react';
import Tabs from './components/Tabs';
import KitchenAnalogy from './components/KitchenAnalogy';
import ConcurrencyTimeline from './components/ConcurrencyTimeline';
import ParallelismTimeline from './components/ParallelismTimeline';
import WorkloadTest from './components/WorkloadTest';
import GopherModel from './components/GopherModel';
import Quiz from './components/Quiz';
import { TabId } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.Kitchen);

  const renderContent = () => {
    switch (activeTab) {
      case TabId.Kitchen: return <KitchenAnalogy />;
      case TabId.Concurrency: return <ConcurrencyTimeline />;
      case TabId.Parallelism: return <ParallelismTimeline />;
      case TabId.Workload: return <WorkloadTest />;
      case TabId.Gopher: return <GopherModel />;
      case TabId.Quiz: return <Quiz />;
      default: return <KitchenAnalogy />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-4xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
             Async Academy
           </h1>
           <p className="text-slate-400 text-sm mt-1">Interactive guide to Async concepts</p>
        </div>
        <div className="flex gap-2 text-xs font-mono text-slate-500 bg-slate-900 p-2 rounded border border-slate-800">
           <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-fuchsia-500"></div> Concurrency</span>
           <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-cyan-500"></div> Parallelism</span>
        </div>
      </header>

      <main className="w-full max-w-4xl flex-1 flex flex-col gap-6">
        <Tabs activeTab={activeTab} onChange={setActiveTab} />
        
        <div className="w-full min-h-[500px] transition-all duration-300 ease-in-out">
            {renderContent()}
        </div>
      </main>

      <footer className="mt-12 text-slate-600 text-sm py-4">
        <p>Built with React & Tailwind for Educational Purposes.</p>
      </footer>
    </div>
  );
};

export default App;