import React from 'react';
import { TabId } from '../types';

interface TabsProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onChange }) => {
  const tabs = [
    { id: TabId.Kitchen, label: '1. The Analogy' },
    { id: TabId.Concurrency, label: '2. Concurrency' },
    { id: TabId.Parallelism, label: '3. Parallelism' },
    { id: TabId.Workload, label: '4. Workloads' },
    { id: TabId.Gopher, label: '5. Go Model' },
    { id: TabId.Quiz, label: '6. Quiz' },
  ];

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="flex gap-2 min-w-max px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border
                ${isActive 
                  ? 'bg-slate-100 text-slate-900 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-200'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;