
import React, { useState, useEffect } from 'react';
import { User, Progress, ModuleType } from './types';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import DSA from './views/DSA';
import Aptitude from './views/Aptitude';
import GATE from './views/GATE';
import TOEFL from './views/TOEFL';
import Languages from './views/Languages';
import MockInterview from './views/MockInterview';
import AlumniConnect from './views/AlumniConnect';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [activeModule, setActiveModule] = useState<ModuleType>('DASHBOARD');
  // Fix: Added missing 'history' property to match Progress interface
  const [progress, setProgress] = useState<Progress>({
    dsa: 25,
    aptitude: 40,
    gate: 10,
    toefl: 0,
    languages: 5,
    overall: 16,
    history: {}
  });

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'DASHBOARD': return <Dashboard user={user} progress={progress} onNavigate={setActiveModule} />;
      case 'DSA': return <DSA />;
      case 'APTITUDE': return <Aptitude />;
      case 'GATE': return <GATE />;
      case 'TOEFL': return <TOEFL />;
      case 'LANGUAGES': return <Languages />;
      case 'INTERVIEW': return <MockInterview />;
      case 'ALUMNI': return <AlumniConnect />;
      default: return <Dashboard user={user} progress={progress} onNavigate={setActiveModule} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activeModule={activeModule} 
        onNavigate={setActiveModule} 
        onLogout={handleLogout}
        userName={user.name}
      />
      <main className="flex-1 overflow-y-auto pb-10">
        {renderModule()}
      </main>
    </div>
  );
};

export default App;
