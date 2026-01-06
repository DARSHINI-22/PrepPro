
import React, { useState, useEffect, useRef } from 'react';
import { startAIInterview, getInterviewFeedback } from '../services/geminiService';

const MockInterview: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([]);
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const startInterview = async () => {
    setIsInterviewing(true);
    setLoading(true);
    const initialPrompt = [
      { role: 'user', text: 'Start the interview for a Software Engineering role.' }
    ];
    const aiResponse = await startAIInterview(initialPrompt);
    setMessages([{ role: 'ai', text: aiResponse || 'Hello! Let’s begin. Tell me about your most challenging technical project.' }]);
    setLoading(false);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessages = [...messages, { role: 'user' as const, text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);
    
    const aiResponse = await startAIInterview(newMessages);
    setMessages([...newMessages, { role: 'ai' as const, text: aiResponse || "Interesting. How did you handle that specific issue?" }]);
    setLoading(false);
  };

  const endInterview = async () => {
    setLoading(true);
    const history = messages.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');
    const evaluation = await getInterviewFeedback(history);
    setFeedback(evaluation);
    setIsInterviewing(false);
    setLoading(false);
  };

  if (feedback) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-10">AI Recruiter Report</h2>
        <div className="bg-white p-10 rounded-3xl border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div className="p-6 bg-slate-50 rounded-2xl border text-center">
              <h5 className="text-sm font-bold text-slate-400 uppercase mb-1">Tech Ability</h5>
              <p className="text-5xl font-black text-slate-900">{feedback.technicalRating}/10</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border text-center">
              <h5 className="text-sm font-bold text-slate-400 uppercase mb-1">Communication</h5>
              <p className="text-5xl font-black text-slate-900">{feedback.communicationRating}/10</p>
            </div>
          </div>
          <div className="space-y-8">
            <section>
              <h4 className="font-bold text-emerald-600 mb-3 uppercase tracking-widest text-xs">Strengths</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {feedback.strengths.map((s: string, i: number) => <li key={i} className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm border border-emerald-100">{s}</li>)}
              </ul>
            </section>
            <section>
              <h4 className="font-bold text-blue-600 mb-3 uppercase tracking-widest text-xs">Growth Plan</h4>
              <p className="p-6 bg-blue-50 text-blue-900 rounded-2xl border border-blue-100 text-sm leading-relaxed">{feedback.improvementPlan}</p>
            </section>
          </div>
          <button onClick={() => setFeedback(null)} className="mt-10 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">New Session</button>
        </div>
      </div>
    );
  }

  if (isInterviewing) {
    return (
      <div className="h-full flex flex-col max-w-5xl mx-auto p-4">
        <div className="bg-white p-6 border rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">🤖</div>
            <div>
              <h4 className="font-bold">Interviewer Bot</h4>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Active Session</p>
            </div>
          </div>
          <button onClick={endInterview} className="px-6 py-2 bg-red-50 text-red-600 font-bold rounded-full text-sm">End Interview</button>
        </div>
        <div ref={scrollRef} className="flex-1 bg-slate-50 border-x p-8 overflow-y-auto space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-5 rounded-2xl shadow-sm ${m.role === 'ai' ? 'bg-white border rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-slate-400 text-xs italic">AI is thinking...</div>}
        </div>
        <div className="bg-white p-6 border rounded-b-3xl">
          <div className="flex gap-4">
            <input 
              className="flex-1 px-6 py-3 bg-slate-100 rounded-full outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your answer..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">➔</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-8 shadow-xl">🎤</div>
        <h2 className="text-4xl font-black mb-6">Master Your Interview</h2>
        <p className="text-slate-500 mb-10 text-lg">Practice with our advanced AI Recruiter. It asks follow-up questions, evaluates your body language (simulated via transcript), and provides a detailed growth roadmap.</p>
        <button onClick={startInterview} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:bg-blue-700 transition-all">Start Mock Session</button>
      </div>
    </div>
  );
};

export default MockInterview;
