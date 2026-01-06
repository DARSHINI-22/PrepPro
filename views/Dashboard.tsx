
import React from 'react';
import { User, Progress, ModuleType } from '../types';

interface DashboardProps {
  user: User;
  progress: Progress;
  onNavigate: (module: ModuleType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, progress, onNavigate }) => {
  const cards: { id: ModuleType; title: string; desc: string; progress: number; color: string; icon: string }[] = [
    { id: 'DSA', title: 'Data Structures', desc: 'Master coding interviews', progress: progress.dsa, color: 'blue', icon: '💻' },
    { id: 'APTITUDE', title: 'Aptitude & Quant', desc: 'Sharpen logic & math', progress: progress.aptitude, color: 'green', icon: '🧩' },
    { id: 'GATE', title: 'GATE CSE', desc: 'Advanced core concepts', progress: progress.gate, color: 'orange', icon: '🎓' },
    { id: 'TOEFL', title: 'TOEFL & IELTS', desc: 'Language proficiency', progress: progress.toefl, color: 'indigo', icon: '🌐' },
    { id: 'LANGUAGES', title: 'Foreign Languages', desc: 'JLPT, Goethe, and more', progress: progress.languages, color: 'pink', icon: '🎌' },
    { id: 'INTERVIEW', title: 'AI Mock Interviews', desc: 'Practice with Real AI', progress: 0, color: 'purple', icon: '🎤' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Welcome back, {user.name}! 👋</h2>
        <p className="text-slate-500 mt-1">You're in the top 15% of students from {user.college}. Keep it up!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase mb-1">Overall Progress</p>
            <h3 className="text-4xl font-bold text-slate-900">{progress.overall}%</h3>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress.overall}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500 uppercase mb-1">Focus Areas</p>
          <div className="space-y-2 mt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700">Dynamic Programming</span>
              <span className="text-red-500 font-semibold">Weak</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700">Operating Systems</span>
              <span className="text-orange-500 font-semibold">Improving</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700">Quantiative Aptitude</span>
              <span className="text-green-500 font-semibold">Strong</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl shadow-lg text-white">
          <h4 className="font-bold text-lg mb-2">Interview Ready?</h4>
          <p className="text-blue-100 text-sm mb-4">You have an 85% chance of clearing the first technical round based on your current stats.</p>
          <button 
            onClick={() => onNavigate('INTERVIEW')}
            className="w-full py-2 bg-white text-blue-700 rounded-lg font-bold text-sm shadow-md"
          >
            Start Mock Interview
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-6">Learning Modules</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div 
            key={card.id}
            onClick={() => onNavigate(card.id)}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className={`w-12 h-12 bg-${card.color}-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <h4 className="text-lg font-bold text-slate-900">{card.title}</h4>
            <p className="text-sm text-slate-500 mb-6">{card.desc}</p>
            
            <div className="flex items-center justify-between text-sm font-semibold mb-2">
              <span className="text-slate-400 uppercase tracking-tight">Progress</span>
              <span className={`text-${card.color}-600`}>{card.progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div 
                className={`bg-${card.color}-500 h-1.5 rounded-full transition-all duration-500`} 
                style={{ width: `${card.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
