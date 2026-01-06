
import React, { useState, useEffect } from 'react';
import { APTITUDE_DATA } from '../data/syllabus';

const Aptitude: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [mode, setMode] = useState<'PRACTICE' | 'TEST' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [testFinished, setTestFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const topics = Object.keys(APTITUDE_DATA);

  useEffect(() => {
    let timer: any;
    if (mode === 'TEST' && timeLeft > 0 && !testFinished) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setTestFinished(true);
    }
    return () => clearInterval(timer);
  }, [mode, timeLeft, testFinished]);

  const handleSubmitPractice = () => {
    if (selectedOption === null || !selectedTopic) return;
    const q = (APTITUDE_DATA as any)[selectedTopic].practice[currentQuestion];
    setIsCorrect(selectedOption === q.correctAnswer);
  };

  const handleNextTest = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);
    
    const questions = (APTITUDE_DATA as any)[selectedTopic!].practice;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(answers[currentQuestion + 1] ?? null);
    } else {
      setTestFinished(true);
    }
  };

  if (testFinished && selectedTopic) {
    const questions = (APTITUDE_DATA as any)[selectedTopic].practice;
    const score = answers.reduce((acc, ans, idx) => acc + (ans === questions[idx].correctAnswer ? 1 : 0), 0);
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Test Performance Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border text-center">
            <p className="text-sm font-bold text-slate-500 uppercase">Score</p>
            <h3 className="text-4xl font-black text-blue-600">{score} / {questions.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border text-center">
            <p className="text-sm font-bold text-slate-500 uppercase">Accuracy</p>
            <h3 className="text-4xl font-black text-emerald-600">{Math.round((score/questions.length)*100)}%</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border text-center">
            <p className="text-sm font-bold text-slate-500 uppercase">Status</p>
            <h3 className={`text-4xl font-black ${score > questions.length/2 ? 'text-green-600' : 'text-red-600'}`}>
              {score > questions.length/2 ? 'Passed' : 'Failed'}
            </h3>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-slate-800">Review Answers</h4>
          {questions.map((q: any, i: number) => (
            <div key={i} className={`p-6 rounded-xl border ${answers[i] === q.correctAnswer ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
              <p className="font-bold text-slate-900 mb-2">Q{i+1}: {q.question}</p>
              <p className="text-sm text-slate-600 mb-2">Your Answer: {q.options[answers[i]!] || 'None'}</p>
              <p className="text-sm font-bold text-slate-800">Correct: {q.options[q.correctAnswer]}</p>
              <div className="mt-4 pt-4 border-t border-slate-200/50 text-sm italic">{q.explanation}</div>
            </div>
          ))}
        </div>
        <button onClick={() => { setMode(null); setTestFinished(false); setAnswers([]); setSelectedTopic(null); }} className="mt-10 w-full py-4 bg-slate-900 text-white rounded-xl font-bold">Back to Dashboard</button>
      </div>
    );
  }

  if (mode === 'TEST' && selectedTopic) {
    const questions = (APTITUDE_DATA as any)[selectedTopic].practice;
    const q = questions[currentQuestion];
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{selectedTopic} - Live Test</h3>
            <p className="text-sm text-slate-500">Q{currentQuestion + 1} of {questions.length}</p>
          </div>
          <div className="px-6 py-2 bg-slate-900 text-white rounded-full font-mono text-xl">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border shadow-xl">
          <p className="text-lg font-bold text-slate-800 mb-8">{q.question}</p>
          <div className="space-y-3 mb-10">
            {q.options.map((opt: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedOption === idx ? 'border-blue-600 bg-blue-50' : 'border-slate-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <button 
            onClick={handleNextTest}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'PRACTICE' && selectedTopic) {
    const questions = (APTITUDE_DATA as any)[selectedTopic].practice;
    const q = questions[currentQuestion];
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <button onClick={() => setMode(null)} className="mb-6 text-slate-500">← Back</button>
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <p className="text-xl font-bold text-slate-900 mb-6">{q.question}</p>
          <div className="space-y-3 mb-8">
            {q.options.map((opt: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => setSelectedOption(idx)}
                disabled={isCorrect !== null}
                className={`w-full text-left p-4 rounded-xl border-2 ${
                  selectedOption === idx ? (isCorrect === null ? 'border-blue-500' : (isCorrect ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50')) : 'border-slate-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {isCorrect !== null && (
            <div className="mb-8 p-6 bg-slate-50 rounded-2xl border">
              <p className="font-bold mb-2">Step-by-Step Explanation:</p>
              <p className="text-sm text-slate-600 mb-4">{q.explanation}</p>
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-indigo-800 text-sm">
                <strong>Formula:</strong> {q.formula}
              </div>
            </div>
          )}
          <div className="flex gap-4">
            <button 
              onClick={handleSubmitPractice} 
              disabled={isCorrect !== null || selectedOption === null}
              className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-50"
            >
              Check Answer
            </button>
            {isCorrect !== null && (
              <button 
                onClick={() => { setCurrentQuestion(prev => (prev + 1) % questions.length); setSelectedOption(null); setIsCorrect(null); }}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedTopic) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <button onClick={() => setSelectedTopic(null)} className="mb-6 text-slate-500">← Back</button>
        <h2 className="text-4xl font-black mb-12">{selectedTopic} Training</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div onClick={() => setMode('PRACTICE')} className="p-10 bg-white border-2 rounded-3xl hover:border-blue-500 cursor-pointer shadow-xl transition-all group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📚</div>
            <h4 className="text-2xl font-bold mb-2">Practice Mode</h4>
            <p className="text-slate-500">Learn at your own pace with step-by-step solutions.</p>
          </div>
          <div onClick={() => { setMode('TEST'); setAnswers(new Array(APTITUDE_DATA[selectedTopic].practice.length).fill(null)); }} className="p-10 bg-white border-2 rounded-3xl hover:border-red-500 cursor-pointer shadow-xl transition-all group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">⏱️</div>
            <h4 className="text-2xl font-bold mb-2">Test Mode</h4>
            <p className="text-slate-500">Simulate exam conditions with a 10-minute timer.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Aptitude & Logic</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topics.map(t => (
          <div key={t} onClick={() => setSelectedTopic(t)} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl cursor-pointer transition-all">
            <h4 className="text-2xl font-bold mb-2">{t}</h4>
            <p className="text-sm text-slate-500">20+ Practice Questions available</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aptitude;
