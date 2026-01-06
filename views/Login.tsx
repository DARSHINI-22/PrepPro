
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [signedUp, setSignedUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    department: '',
    year: '1st Year',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'SIGNUP') {
      setSignedUp(true);
      setTimeout(() => {
        setMode('LOGIN');
        setSignedUp(false);
      }, 2000);
    } else {
      if (formData.email && formData.password) {
        onLogin({
          name: formData.name || 'Student',
          college: formData.college || 'Engineering College',
          department: formData.department || 'CSE',
          year: formData.year,
          email: formData.email
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-slate-200">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-2">PrepPro</h1>
          <p className="text-slate-500 font-medium">Elevate your career trajectory</p>
        </div>

        {signedUp && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-center font-bold animate-pulse">
            Signup Successful! Redirecting to Login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'SIGNUP' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-widest">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Alex Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-widest">College</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="IIT Madras"
                    value={formData.college}
                    onChange={(e) => setFormData({...formData, college: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-widest">Year</label>
                  <select
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-widest">Department</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Computer Science"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-widest">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="name@university.edu"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-widest">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl mt-6 transition-all shadow-xl shadow-slate-200"
          >
            {mode === 'LOGIN' ? 'Welcome Back' : 'Create My Account'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <button 
            onClick={() => setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
            className="text-sm font-bold text-blue-600 hover:underline"
          >
            {mode === 'LOGIN' ? "Don't have an account? Sign Up" : "Already a member? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
