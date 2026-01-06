
import React from 'react';

const AlumniConnect: React.FC = () => {
  const alumni = [
    { name: 'Sarah J.', company: 'Google', role: 'SDE-II', college: 'VIT Vellore', img: 'https://picsum.photos/id/64/100/100' },
    { name: 'Rajesh K.', company: 'Uber', role: 'Staff Engineer', college: 'IIT Bombay', img: 'https://picsum.photos/id/65/100/100' },
    { name: 'Anita M.', company: 'Zomato', role: 'Product Manager', college: 'BITS Pilani', img: 'https://picsum.photos/id/66/100/100' },
  ];

  const startups = [
    { name: 'NextGen AI', sector: 'EdTech', lookingFor: 'ML Interns', color: 'indigo' },
    { name: 'FinFlow', sector: 'FinTech', lookingFor: 'Backend Engineers', color: 'emerald' },
    { name: 'HealthSync', sector: 'HealthTech', lookingFor: 'Full Stack Devs', color: 'orange' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-12">
        <h2 className="text-4xl font-black text-slate-900 mb-2">Network Hub</h2>
        <p className="text-slate-500">Connect with those who have already paved the way.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <span className="mr-3">🤝</span> Featured Alumni
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {alumni.map((alum, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  <img src={alum.img} className="w-16 h-16 rounded-2xl object-cover" alt={alum.name} />
                  <div>
                    <h4 className="font-bold text-slate-900">{alum.name}</h4>
                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">{alum.company} • {alum.role}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{alum.college}</p>
                    <button className="mt-3 text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-200 transition-colors">
                      Book Mentorship
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <span className="mr-3">🚀</span> High-Growth Startups
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {startups.map((s, i) => (
                <div key={i} className={`p-6 bg-${s.color}-50 border border-${s.color}-100 rounded-2xl`}>
                  <h4 className={`text-xl font-black text-${s.color}-700`}>{s.name}</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase mt-1">{s.sector}</p>
                  <p className="text-xs text-slate-700 mt-4 font-medium italic">"{s.lookingFor}"</p>
                  <button className={`w-full mt-4 py-2 bg-${s.color}-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-${s.color}-100`}>
                    Request Referral
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white h-fit sticky top-8">
          <h4 className="text-xl font-bold mb-6">Upcoming Webinar</h4>
          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 mb-6">
            <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">Live Tomorrow</p>
            <h5 className="font-bold text-lg leading-tight mb-4">Cracking FAANG Interviews in 2024</h5>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span>📅 Jan 25</span>
              <span>•</span>
              <span>🕒 6:00 PM</span>
            </div>
          </div>
          <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold shadow-xl">
            Register for Free
          </button>
          <div className="mt-10 pt-10 border-t border-white/5">
             <h5 className="font-bold mb-4">Quick Stats</h5>
             <div className="flex items-center justify-between text-sm mb-2">
               <span className="text-slate-400">Total Mentors</span>
               <span className="font-bold">1.2k+</span>
             </div>
             <div className="flex items-center justify-between text-sm">
               <span className="text-slate-400">Jobs Listed</span>
               <span className="font-bold text-emerald-400">450+</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniConnect;
