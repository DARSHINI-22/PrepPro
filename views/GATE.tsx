
import React, { useState, useEffect } from 'react';
import { GATE_SYLLABUS, GATE_PRACTICE_QUESTIONS } from '../data/syllabus';
import { GATESubject, GATEQuestion } from '../types';

const GATE: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<GATESubject | null>(null);
  const [activeMode, setActiveMode] = useState<'PRACTICE' | 'LEARN' | 'MOCK' | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [mockScore, setMockScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 mins for mock

  useEffect(() => {
    let timer: any;
    if (activeMode === 'MOCK' && timeLeft > 0 && mockScore === null) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      calculateMockResult();
    }
    return () => clearInterval(timer);
  }, [activeMode, timeLeft, mockScore]);

  const calculateMockResult = () => {
    setMockScore(Math.floor(Math.random() * 10) + 10); // Simulated scoring for demo
  };

  if (mockScore !== null) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-black mb-6 text-black">Mock Test Result</h2>
        <div className="bg-white p-12 rounded-3xl border shadow-2xl mb-10">
          <div className="text-7xl font-black text-indigo-600 mb-4">{mockScore}/20</div>
          <p className="text-xl text-slate-500 font-bold uppercase tracking-widest">Calculated Rank: ~1240</p>
        </div>
        <button 
          onClick={() => { setMockScore(null); setActiveMode(null); setSelectedSubject(null); }}
          className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold"
        >
          Back to Subjects
        </button>
      </div>
    );
  }

  if (activeMode === 'LEARN' && selectedSubject) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <button onClick={() => setActiveMode(null)} className="text-blue-600 mb-6 font-bold">← Subject Options</button>
        <h2 className="text-3xl font-black mb-8">Video Masterclasses: {selectedSubject.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {selectedSubject.learnVideos.map((video, idx) => (
            <div key={idx} className="bg-white rounded-3xl border shadow-sm overflow-hidden group">
              <div className="aspect-video bg-slate-900 flex items-center justify-center text-white relative">
                 <a href={video.url} target="_blank" className="z-10 bg-red-600 px-6 py-2 rounded-full font-bold shadow-xl hover:scale-110 transition-transform">Watch Now</a>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-1 text-black">{video.title}</h4>
                <p className="text-slate-400 text-sm font-bold uppercase">{video.duration} duration</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeMode === 'PRACTICE' && selectedSubject) {
    if (!selectedSubtopic) {
      return (
        <div className="p-8 max-w-4xl mx-auto">
          <button onClick={() => setActiveMode(null)} className="text-blue-600 mb-6 font-bold">← Subject Options</button>
          <h2 className="text-3xl font-black mb-8 text-black">Select Subtopic</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedSubject.subtopics.map(s => (
              <div 
                key={s} 
                onClick={() => setSelectedSubtopic(s)}
                className="bg-white p-6 rounded-2xl border-2 hover:border-blue-500 cursor-pointer transition-all shadow-sm"
              >
                <h4 className="font-bold text-black">{s}</h4>
                <p className="text-xs text-slate-400 mt-2">15 Questions Available</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const questions = GATE_PRACTICE_QUESTIONS[selectedSubtopic] || [];
    const q = questions[currentQIndex];

    return (
      <div className="p-8 max-w-3xl mx-auto">
        <button onClick={() => setSelectedSubtopic(null)} className="text-blue-600 mb-6 font-bold">← Subtopics</button>
        {q ? (
          <div className="bg-white p-10 rounded-3xl border shadow-xl">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-4 block">Question {currentQIndex + 1}</span>
            <p className="text-xl font-bold text-slate-800 mb-10 leading-relaxed">{q.question}</p>
            <div className="space-y-3 mb-10">
              {q.options?.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => { setUserAnswer(opt); setShowExplanation(true); }}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                    userAnswer === opt 
                      ? opt === q.correctAnswer ? 'bg-emerald-50 border-emerald-500' : 'bg-red-50 border-red-500'
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {showExplanation && (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-top-2">
                <p className="font-bold text-sm text-slate-500 uppercase mb-2">Detailed Explanation</p>
                <p className="text-slate-700 italic">{q.explanation}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
            <p className="text-slate-400 font-bold">More questions for "{selectedSubtopic}" are being synced...</p>
          </div>
        )}
      </div>
    );
  }

  if (selectedSubject) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <button onClick={() => setSelectedSubject(null)} className="text-blue-600 mb-10 font-bold">← Subject List</button>
        <h2 className="text-4xl font-black mb-12 text-black">{selectedSubject.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <button onClick={() => setActiveMode('PRACTICE')} className="group p-10 bg-white border-2 rounded-3xl hover:border-blue-500 transition-all shadow-xl">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">✍️</div>
            <h4 className="text-2xl font-bold text-black">Practice</h4>
            <p className="text-sm text-slate-400 mt-2">Sub-topic wise PYQs</p>
          </button>
          <button onClick={() => setActiveMode('LEARN')} className="group p-10 bg-white border-2 rounded-3xl hover:border-red-500 transition-all shadow-xl">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📺</div>
            <h4 className="text-2xl font-bold text-black">Video Learn</h4>
            <p className="text-sm text-slate-400 mt-2">Curated lectures</p>
          </button>
          <button onClick={() => setActiveMode('MOCK')} className="group p-10 bg-white border-2 rounded-3xl hover:border-emerald-500 transition-all shadow-xl">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">⏱️</div>
            <h4 className="text-2xl font-bold text-black">Mock Test</h4>
            <p className="text-sm text-slate-400 mt-2">Timed exam pattern</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-black mb-10 text-black">GATE CSE Mastery Portal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GATE_SYLLABUS.map(subject => (
          <div 
            key={subject.name}
            onClick={() => setSelectedSubject(subject)}
            className="bg-white p-8 rounded-3xl border shadow-sm hover:shadow-2xl cursor-pointer transition-all group"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-black group-hover:text-blue-600 transition-colors">{subject.name}</h3>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl">➔</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {subject.subtopics.slice(0, 3).map(s => (
                <span key={s} className="px-3 py-1 bg-slate-50 text-[10px] font-bold uppercase text-slate-400 rounded-full">{s}</span>
              ))}
              {subject.subtopics.length > 3 && <span className="text-[10px] font-bold text-slate-300">+{subject.subtopics.length - 3} more</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GATE;
