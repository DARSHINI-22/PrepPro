
import React, { useState } from 'react';
import { evaluateSpeaking, evaluateWriting, playTTS } from '../services/geminiService';
import { TOEFL_DATA } from '../data/syllabus';

const TOEFL: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'READING' | 'LISTENING' | 'WRITING' | 'SPEAKING'>('READING');
  const [writingInput, setWritingInput] = useState('');
  const [writingAnalysis, setWritingAnalysis] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const handleOptionClick = (qId: string, idx: number) => {
    setSelectedOption({ ...selectedOption, [qId]: idx });
    setShowExplanation({ ...showExplanation, [qId]: true });
  };

  const handlePlayLecture = async (text: string) => {
    await playTTS(text, 'Zephyr');
  };

  // Implemented missing handleWritingEvaluation function to fix build error
  const handleWritingEvaluation = async () => {
    if (!writingInput.trim()) return;
    setIsEvaluating(true);
    try {
      const prompt = "Discuss the impact of technology on traditional education systems.";
      const result = await evaluateWriting(prompt, writingInput);
      setWritingAnalysis(result);
    } catch (error) {
      console.error("Writing evaluation error:", error);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
        {['READING', 'LISTENING', 'WRITING', 'SPEAKING'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-3 rounded-full font-bold transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 border'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'READING' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-3xl border shadow-sm h-[600px] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">{TOEFL_DATA[0].title}</h3>
            <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">{TOEFL_DATA[0].passage}</p>
          </div>
          <div className="space-y-6 overflow-y-auto h-[600px]">
            {TOEFL_DATA[0].questions?.map((q, i) => {
              const qKey = `r-${i}`;
              return (
                <div key={i} className="bg-white p-8 rounded-3xl border shadow-sm">
                  <p className="font-bold text-lg mb-6">{q.q}</p>
                  <div className="space-y-3">
                    {q.opts.map((opt, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => handleOptionClick(qKey, idx)}
                        className={`w-full text-left p-4 border rounded-xl transition-all ${
                          selectedOption[qKey] === idx 
                            ? idx === q.ans ? 'bg-emerald-50 border-emerald-500' : 'bg-red-50 border-red-500'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {showExplanation[qKey] && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-xl text-sm italic text-slate-600 border">
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'LISTENING' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded-3xl border shadow-xl mb-10 text-center">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🎧</div>
            <h3 className="text-2xl font-bold mb-4">Renaissance Art Lecture</h3>
            <p className="text-slate-500 mb-8 italic">Listen to the lecture carefully before answering the questions.</p>
            <button 
              onClick={() => handlePlayLecture("In this lecture, we will explore the shift from medieval stylized icons to the humanistic realism of the Renaissance...")}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700"
            >
              ▶ Play Lecture
            </button>
          </div>
          <div className="space-y-6">
            {TOEFL_DATA[1].questions?.map((q, i) => {
              const qKey = `l-${i}`;
              return (
                <div key={i} className="bg-white p-8 rounded-3xl border shadow-sm">
                  <p className="font-bold text-lg mb-6">{q.q}</p>
                  <div className="space-y-3">
                    {q.opts.map((opt, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => handleOptionClick(qKey, idx)}
                        className={`w-full text-left p-4 border rounded-xl transition-all ${
                          selectedOption[qKey] === idx 
                            ? idx === q.ans ? 'bg-emerald-50 border-emerald-500' : 'bg-red-50 border-red-500'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'WRITING' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded-3xl border shadow-xl mb-10">
            <h3 className="text-xl font-bold mb-4">TOEFL Writing Prompt</h3>
            <p className="text-slate-600 mb-8 italic">"Discuss the impact of technology on traditional education systems."</p>
            <textarea 
              className="w-full h-64 p-6 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your essay..."
              value={writingInput}
              onChange={(e) => setWritingInput(e.target.value)}
            />
            <button 
              onClick={handleWritingEvaluation}
              disabled={isEvaluating || !writingInput}
              className="mt-6 w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg disabled:opacity-50"
            >
              {isEvaluating ? 'AI Analyzing...' : 'Evaluate Essay'}
            </button>
          </div>
          {writingAnalysis && (
            <div className="bg-slate-900 text-white p-8 rounded-3xl animate-in slide-in-from-bottom border border-slate-700">
               <div className="flex justify-between items-center mb-6">
                 <h4 className="text-2xl font-bold">Rubric Evaluation</h4>
                 <div className="text-right">
                   <p className="text-xs uppercase text-slate-400">Final Score</p>
                   <p className="text-4xl font-black text-blue-400">{writingAnalysis.score}/30</p>
                 </div>
               </div>
               <div className="space-y-4">
                 <p><span className="text-blue-400 font-bold">Grammar:</span> {writingAnalysis.grammarFeedback}</p>
                 <p><span className="text-blue-400 font-bold">Coherence:</span> {writingAnalysis.coherenceFeedback}</p>
               </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'SPEAKING' && (
        <div className="max-w-xl mx-auto text-center py-20">
          <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">🎙️</div>
          <h3 className="text-3xl font-black mb-4">Speaking Simulator</h3>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Practice independent speaking tasks. Record your response, and our AI will evaluate your fluency, vocabulary, and grammar accuracy.
          </p>
          <button className="px-12 py-4 bg-red-600 text-white rounded-2xl font-bold text-xl shadow-xl hover:bg-red-700">
            Start Record
          </button>
        </div>
      )}
    </div>
  );
};

export default TOEFL;
