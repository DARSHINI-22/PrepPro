
import React from 'react';
import { ModuleType } from '../types';

interface SidebarProps {
  activeModule: ModuleType;
  onNavigate: (module: ModuleType) => void;
  onLogout: () => void;
  userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onNavigate, onLogout, userName }) => {
  const navItems: { id: ModuleType; label: string; icon: string }[] = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: '🏠' },
    { id: 'DSA', label: 'DSA Practice', icon: '💻' },
    { id: 'APTITUDE', label: 'Aptitude', icon: '🧩' },
    { id: 'GATE', label: 'GATE CSE', icon: '🎓' },
    { id: 'TOEFL', label: 'TOEFL Prep', icon: '🌐' },
    { id: 'LANGUAGES', label: 'Languages', icon: '🎌' },
    { id: 'INTERVIEW', label: 'Mock Interview', icon: '🎤' },
    { id: 'ALUMNI', label: 'Alumni Connect', icon: '🤝' },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-slate-200 flex flex-col shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          PrepPro
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Student Portal</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
              activeModule === item.id 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className="text-xl mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
            {activeModule === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
            {userName.charAt(0)}
          </div>
          <div className="ml-3 truncate">
            <p className="text-sm font-semibold text-slate-800">{userName}</p>
            <p className="text-xs text-slate-500">Student</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
        >
          <span className="mr-3">🚪</span> Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
