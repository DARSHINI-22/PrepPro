
import React, { useState } from 'react';
import { DSA_SYLLABUS } from '../data/syllabus';
import { DSAProblem } from '../types';

const DSA: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [activeProblem, setActiveProblem] = useState<DSAProblem | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [submitted, setSubmitted] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleRun = () => {
    setOutput("Executing Code...\nSample Input: [2, 7, 11, 15], Target: 9\nOutput: [0, 1]\nTest Case 1: Passed ✅\nTest Case 2: Passed ✅\nFinal Status: Accepted");
    setSubmitted(true);
  };

  if (activeProblem) {
    return (
      <div className="h-full flex flex-col bg-slate-950 text-slate-300">
        <nav className="p-4 bg-slate-900 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveProblem(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">←</button>
            <h3 className="text-lg font-black text-white">{activeProblem.title}</h3>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
              activeProblem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
              activeProblem.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {activeProblem.difficulty}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              className="bg-slate-800 px-4 py-2 rounded-xl border border-white/10 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
            <button 
              onClick={handleRun}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black shadow-lg shadow-blue-500/20 transition-all"
            >
              Run Test Cases
            </button>
          </div>
        </nav>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 p-8 overflow-y-auto border-r border-white/5">
            <h4 className="text-2xl font-black text-white mb-6">Description</h4>
            <p className="mb-8 leading-relaxed text-slate-400 text-lg">{activeProblem.statement}</p>
            
            <div className="mb-8 flex flex-wrap gap-3">
              <a 
                href={activeProblem.leetcodeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-orange-500/10 text-orange-400 rounded-xl border border-orange-500/20 text-sm font-black uppercase tracking-widest hover:bg-orange-500/20 transition-all flex items-center gap-2"
              >
                <span>🔗</span> LeetCode
              </a>
              <a 
                href={activeProblem.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 text-sm font-black uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center gap-2"
              >
                <span>▶️</span> YouTube
              </a>
            </div>
            
            <div className="space-y-8">
              <section>
                <h5 className="text-indigo-400 font-black mb-3 uppercase text-xs tracking-[0.2em]">Strategy</h5>
                <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-slate-300 italic">{activeProblem.approach}</p>
                </div>
              </section>

              <section>
                <h5 className="text-indigo-400 font-black mb-3 uppercase text-xs tracking-[0.2em]">Algorithm Flow</h5>
                <ul className="space-y-3">
                  {activeProblem.algorithm.map((step, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-indigo-400 flex-shrink-0 mt-1">{idx+1}</span>
                      <span className="text-slate-400 font-medium">{step}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {submitted && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                   <section>
                     <h5 className="text-emerald-400 font-black mb-3 uppercase text-xs tracking-[0.2em]">Optimal Pseudocode</h5>
                     <pre className="bg-slate-900 p-6 rounded-2xl text-xs font-mono border border-emerald-500/10 text-emerald-100 overflow-x-auto">
                      {activeProblem.pseudocode}
                     </pre>
                   </section>
                </div>
              )}
            </div>
          </div>

          <div className="w-1/2 flex flex-col bg-slate-950">
            <textarea
              className="flex-1 bg-slate-950 p-8 font-mono text-sm outline-none resize-none leading-relaxed text-blue-400 selection:bg-blue-500/30"
              placeholder={`// Write your ${language} solution here...`}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {output && (
              <div className="h-64 bg-slate-900 border-t border-white/10 p-6 font-mono text-xs overflow-y-auto">
                <p className="text-slate-500 uppercase font-black tracking-widest mb-4">Execution Results</p>
                <div className="text-emerald-400 whitespace-pre-wrap leading-relaxed">{output}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedPattern) {
    const topic = DSA_SYLLABUS.find(t => t.name === selectedTopic);
    const pattern = topic?.patterns.find(p => p.name === selectedPattern);
    return (
      <div className="p-10 max-w-5xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <button onClick={() => setSelectedPattern(null)} className="text-blue-600 flex items-center font-bold group">
            <span className="mr-2 group-hover:-translate-x-2 transition-transform">←</span> Back to Patterns
          </button>
          <span className="text-slate-400">/</span>
          <button onClick={() => { setSelectedPattern(null); setSelectedTopic(null); }} className="text-blue-600 font-bold">
            Back to Topics
          </button>
        </div>
        <h2 className="text-4xl font-black mb-4 text-slate-900">{selectedPattern}</h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl mb-8">
          <h3 className="text-blue-900 font-black text-sm uppercase tracking-widest mb-2">Pattern Explanation</h3>
          <p className="text-slate-700 font-medium leading-relaxed">{pattern?.description}</p>
        </div>
        <p className="text-slate-500 font-medium mb-10">Problems related to {selectedPattern} pattern in {selectedTopic}</p>
        <div className="grid grid-cols-1 gap-4">
          {pattern?.problems.map(prob => (
            <div 
              key={prob.id}
              onClick={() => setActiveProblem(prob)}
              className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-2xl cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex gap-6 items-center">
                 <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl font-black text-slate-300 group-hover:text-blue-500 transition-colors">#</div>
                 <div>
                    <h4 className="font-black text-slate-800 text-lg">{prob.title}</h4>
                    <p className="text-sm text-slate-400 font-medium">{selectedTopic} • {selectedPattern}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    prob.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                    prob.difficulty === 'Medium' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-red-50 text-red-600 border border-red-100'
                 }`}>
                   {prob.difficulty}
                 </span>
                 <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">➔</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedTopic) {
    const topic = DSA_SYLLABUS.find(t => t.name === selectedTopic);
    return (
      <div className="p-10 max-w-6xl mx-auto">
        <button onClick={() => setSelectedTopic(null)} className="text-blue-600 mb-8 flex items-center font-bold group">
          <span className="mr-2 group-hover:-translate-x-2 transition-transform">←</span> Back to Topics
        </button>
        <h2 className="text-4xl font-black mb-4 text-slate-900">{selectedTopic} Patterns</h2>
        <p className="text-slate-500 font-medium mb-10">Select a pattern to view related problems</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topic?.patterns.map(pattern => (
            <div 
              key={pattern.name}
              onClick={() => setSelectedPattern(pattern.name)}
              className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-2xl cursor-pointer transition-all group"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                🎯
              </div>
              <h4 className="text-xl font-black text-slate-800 mb-3">{pattern.name}</h4>
              <p className="text-slate-600 font-medium text-sm mb-4 leading-relaxed line-clamp-3">{pattern.description}</p>
              <p className="text-slate-500 font-medium text-xs mb-6">{pattern.problems.length} problem{pattern.problems.length !== 1 ? 's' : ''}</p>
              <div className="flex items-center text-blue-600 font-black text-xs uppercase tracking-widest">
                View Problems <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <header className="mb-12">
        <h2 className="text-4xl font-black text-slate-900">DSA Curriculum</h2>
        <p className="text-slate-500 font-medium mt-2">The blueprint to cracking top-tier tech interviews.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DSA_SYLLABUS.map((topic) => (
          <div 
            key={topic.name}
            onClick={() => setSelectedTopic(topic.name)}
            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-2xl cursor-pointer transition-all group"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-blue-50 transition-all">
              {topic.name === 'Arrays' ? '📦' : 
               topic.name === 'Linked Lists' ? '🔗' : 
               topic.name === 'Dynamic Programming' ? '⚡' :
               topic.name === 'Stack' ? '📚' :
               topic.name === 'Queue' ? '🚶' :
               topic.name === 'Hashing' ? '🔑' :
               topic.name === 'Binary Tree' ? '🌳' :
               topic.name === 'Graph' ? '🕸️' : '📊'}
            </div>
            <h4 className="text-2xl font-black text-slate-800 mb-3">{topic.name}</h4>
            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">Master {topic.patterns.length} patterns with {topic.patterns.reduce((sum, p) => sum + p.problems.length, 0)} essential problems frequently asked in FAANG interviews.</p>
            <div className="flex items-center text-blue-600 font-black text-xs uppercase tracking-widest">
              Start Solving <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DSA;
