
import React, { useState } from 'react';
import { JLPT_DATA } from '../data/syllabus';
import { playTTS, evaluateSpeaking } from '../services/geminiService';
import { LanguageLesson } from '../types';

const Languages: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [skill, setSkill] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const [speakingResult, setSpeakingResult] = useState<any>(null);

  const handleHear = async (text: string, id: string) => {
    setLoadingAudio(id);
    await playTTS(text, 'Kore');
    setLoadingAudio(null);
  };

  const handleSpell = async (text: string, id: string) => {
    setLoadingAudio(id + '-spell');
    const spelling = text.split('').join('... ');
    await playTTS(spelling, 'Kore');
    setLoadingAudio(null);
  };

  const simulateSpeaking = async (lesson: LanguageLesson) => {
    setLoadingAudio('speaking');
    // In a real app, this would use the browser's MediaRecorder and a Speech-to-Text API.
    // For this prototype, we simulate a "transcript" of the user's attempt.
    const mockTranscript = lesson.japanese; // Simulate perfect pronunciation
    const evaluation = await evaluateSpeaking(mockTranscript, lesson.japanese);
    setSpeakingResult(evaluation);
    setLoadingAudio(null);
  };

  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const skills = ['Kanji', 'Vocabulary', 'Grammar', 'Reading', 'Listening', 'Speaking'];

  if (skill && level && selectedLang) {
    const lessons = (JLPT_DATA[level] || []).filter(l => l.category === skill);
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <button onClick={() => setSkill(null)} className="text-blue-600 mb-6 font-bold flex items-center">← Skills List</button>
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black">{skill} Module</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Japanese {level} Progression</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-3 h-3 rounded-full ${i <= 3 ? 'bg-orange-500' : 'bg-slate-200'}`}></div>)}
          </div>
        </header>

        <div className="space-y-6">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white p-8 rounded-3xl border shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="text-5xl font-black text-slate-900">{lesson.japanese}</span>
                    <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-tighter">{lesson.romaji}</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">English & Context</p>
                    <p className="text-xl font-bold text-slate-800 mb-3">{lesson.english}</p>
                    <p className="text-sm text-slate-500 italic leading-relaxed">Example: "{lesson.example}"</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => handleHear(lesson.japanese, lesson.id)}
                    disabled={!!loadingAudio}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center"
                  >
                    {loadingAudio === lesson.id ? '...' : '🔊 Hear'}
                  </button>
                  <button 
                    onClick={() => handleSpell(lesson.japanese, lesson.id)}
                    disabled={!!loadingAudio}
                    className="px-8 py-3 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center"
                  >
                    {loadingAudio === lesson.id + '-spell' ? '...' : '🔤 Spell'}
                  </button>
                  {skill === 'Speaking' && (
                    <button 
                      onClick={() => simulateSpeaking(lesson)}
                      disabled={loadingAudio === 'speaking'}
                      className="px-8 py-3 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-100 hover:bg-red-700 transition-all flex items-center justify-center"
                    >
                      {loadingAudio === 'speaking' ? 'AI Analyzing...' : '🎙️ Record'}
                    </button>
                  )}
                </div>
              </div>

              {speakingResult && skill === 'Speaking' && (
                <div className="mt-8 p-6 bg-slate-900 text-white rounded-2xl animate-in fade-in zoom-in duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-bold text-emerald-400">AI Pronunciation Report</h5>
                    <span className="text-2xl font-black">{speakingResult.score}%</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">{speakingResult.feedback}</p>
                  <div className="flex flex-wrap gap-2">
                    {speakingResult.improvements.map((imp: string, i: number) => (
                      <span key={i} className="text-[10px] bg-white/10 px-3 py-1 rounded-full">{imp}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {lessons.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
              <p className="text-slate-400 font-bold">Lessons for this skill are being unlocked...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (level && selectedLang) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <button onClick={() => setLevel(null)} className="text-blue-600 mb-6 font-bold flex items-center">← Level Select</button>
        <h2 className="text-3xl font-black mb-10 text-center">{selectedLang} {level} Track</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map(s => (
            <div 
              key={s} 
              onClick={() => setSkill(s)}
              className="bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-blue-500 cursor-pointer shadow-sm text-center group transition-all"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {s === 'Kanji' ? '🈴' : s === 'Vocabulary' ? '📖' : s === 'Grammar' ? '🛠️' : s === 'Reading' ? '📚' : s === 'Listening' ? '🎧' : '🗣️'}
              </div>
              <h4 className="font-black text-slate-800">{s}</h4>
              <div className="mt-4 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[40%]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedLang) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <button onClick={() => setSelectedLang(null)} className="text-blue-600 mb-6 font-bold">← Languages</button>
        <h2 className="text-3xl font-black mb-10 text-center">{selectedLang} Progression Path</h2>
        <div className="flex flex-col items-center gap-6">
          {levels.map((l, idx) => (
            <div key={l} className="flex flex-col items-center">
              <div 
                onClick={() => setLevel(l)}
                className={`w-32 h-32 rounded-full border-8 flex items-center justify-center cursor-pointer transition-all shadow-xl ${
                  idx === 0 ? 'bg-orange-500 border-orange-200 text-white' : 'bg-white border-slate-100 text-slate-300 hover:border-blue-500 hover:text-blue-500'
                }`}
              >
                <span className="text-3xl font-black">{l}</span>
              </div>
              {idx < levels.length - 1 && <div className="w-2 h-12 bg-slate-200 mt-2 rounded-full"></div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-12">
        <h2 className="text-4xl font-black text-slate-900">Foreign Language Lab</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Duolingo-Style Master Track</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {['Japanese', 'German', 'French', 'Spanish', 'Mandarin'].map(lang => (
          <div 
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className="bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 hover:border-blue-500 shadow-sm hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-center gap-5 mb-6">
              <div className="text-5xl group-hover:rotate-12 transition-transform">
                {lang === 'Japanese' ? '🇯🇵' : lang === 'German' ? '🇩🇪' : lang === 'French' ? '🇫🇷' : lang === 'Spanish' ? '🇪🇸' : '🇨🇳'}
              </div>
              <h4 className="text-2xl font-black text-slate-800">{lang}</h4>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 mb-6">
              <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Current Progress</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-800">Unit 3: Intro</span>
                <span className="text-xs font-black text-emerald-600">45%</span>
              </div>
            </div>
            <div className="flex items-center text-sm font-bold text-blue-600">
              Continue Learning <span className="ml-2 group-hover:translate-x-3 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;
