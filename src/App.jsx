import React, { useState, useEffect } from 'react';
import { Timer, Wallet, Compass, Clock, Zap, MapPin, X, Plus, Trash2, Calendar, Coffee, GraduationCap } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Madchef Burger', amount: 450, cat: 'Food', time: '1:30 PM' },
    { id: 2, title: 'Rickshaw Fare', amount: 60, cat: 'Transport', time: '4:45 PM' }
  ]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  // Realistic UIU Locations
  const campusSpots = [
    { id: 1, name: "UIU Auditorium", cat: "EVENTS", status: "Booking Open", details: "State-of-the-art multipurpose hall for seminars and cultural programs." },
    { id: 2, name: "UIU Gymnasium", cat: "HEALTH", status: "Open", details: "Exclusive fitness center for UIU students located on the 4th floor." },
    { id: 3, name: "Canteen Area", cat: "FOOD", status: "Crowded", details: "Main cafeteria serving diverse meals for students and faculty." },
    { id: 4, name: "Robotics Lab", cat: "TECH", status: "Session On", details: "High-tech lab for UIU Robotics Club projects and research." }
  ];

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    else clearInterval(interval);
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans overflow-hidden">
      {/* Sidebar */}
      <nav className="w-72 bg-slate-900/40 border-r border-slate-800/60 p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/40"><Zap size={22} className="text-white" fill="white"/></div>
          <h1 className="text-2xl font-black tracking-tighter text-white">UIU NEXUS</h1>
        </div>
        
        <div className="flex flex-col gap-2">
          {[
            { id: 'explore', icon: Compass, label: 'Campus Map' },
            { id: 'wallet', icon: Wallet, label: 'Finance' },
            { id: 'focus', icon: Timer, label: 'Study Focus' },
            { id: 'routine', icon: Calendar, label: 'My Schedule' }
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/30' : 'hover:bg-slate-800 text-slate-400'}`}>
              <item.icon size={20} /> <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
        
        {/* Header Section */}
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Hello, Student! 👋</h2>
            <p className="text-slate-500">Welcome back to your UIU command center.</p>
          </div>
          <div className="bg-slate-900/80 px-5 py-3 rounded-2xl border border-slate-800 flex items-center gap-3">
            <Clock className="text-blue-500" size={18} />
            <span className="font-mono font-bold text-blue-400">03:34 PM</span>
          </div>
        </div>

        {/* EXPLORE TAB */}
        {activeTab === 'explore' && (
          <div className="grid grid-cols-2 gap-6 max-w-5xl">
            {campusSpots.map(spot => (
              <div key={spot.id} onClick={() => setSelectedSpot(spot)} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[32px] hover:border-blue-500 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/20">{spot.cat}</span>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {spot.status}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400">{spot.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{spot.details}</p>
              </div>
            ))}
          </div>
        )}

        {/* WALLET TAB */}
        {activeTab === 'wallet' && (
          <div className="max-w-xl mx-auto space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-10 rounded-[40px] shadow-2xl text-center">
              <p className="text-blue-100/70 text-[10px] font-black uppercase tracking-widest mb-2">Campus Spending Balance</p>
              <h2 className="text-5xl font-black text-white italic">৳ {expenses.reduce((a, b) => a + Number(b.amount), 0)}</h2>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-[28px] flex gap-3 shadow-lg">
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Item name..." className="flex-1 bg-slate-800/50 border border-slate-700 rounded-2xl px-5 outline-none focus:border-blue-500 text-sm" />
              <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="৳" className="w-24 bg-slate-800/50 border border-slate-700 rounded-2xl px-5 outline-none focus:border-blue-500 text-sm" />
              <button onClick={()=>{if(title && amount){setExpenses([{id:Date.now(), title, amount, cat:'Other', time:'Now'}, ...expenses]); setTitle(''); setAmount('');}}} className="bg-blue-600 p-4 rounded-2xl font-bold"><Plus /></button>
            </div>

            <div className="space-y-3">
              {expenses.map(ex => (
                <div key={ex.id} className="bg-slate-900/30 border border-slate-800/50 p-6 rounded-2xl flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-800 p-3 rounded-xl"><Coffee size={18} className="text-blue-400"/></div>
                    <div>
                      <h4 className="font-bold">{ex.title}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">{ex.time} • {ex.cat}</p>
                    </div>
                  </div>
                  <span className="font-black text-red-400">-৳{ex.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOCUS TAB */}
        {activeTab === 'focus' && (
          <div className="flex flex-col items-center justify-center h-[60%] space-y-10">
            <div className="text-[120px] font-black text-blue-500 font-mono tracking-tighter italic animate-pulse">
              {formatTime(timeLeft)}
            </div>
            <button onClick={() => setIsActive(!isActive)} className="px-16 py-5 bg-blue-600 text-white rounded-[24px] font-black uppercase tracking-widest shadow-2xl shadow-blue-900/50 hover:scale-105 active:scale-95 transition-all">
              {isActive ? 'Pause Focus' : 'Enter Deep Work'}
            </button>
          </div>
        )}

        {/* ROUTINE TAB (Realistic Schedule) */}
        {activeTab === 'routine' && (
          <div className="max-w-3xl mx-auto space-y-6">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Calendar className="text-blue-500"/> Today's Classes</h3>
             {[
               { time: '08:30 AM', subject: 'Data Structures', room: 'Room 412', tutor: 'Dr. Rahman' },
               { time: '11:45 AM', subject: 'Calculus II', room: 'Room 502', tutor: 'Prof. Karim' },
               { time: '02:00 PM', subject: 'Programming Lab', room: 'Lab 02', tutor: 'Sir Tarek' }
             ].map((cls, idx) => (
               <div key={idx} className="bg-slate-900/50 border-l-4 border-blue-600 p-6 rounded-r-2xl flex justify-between items-center shadow-md">
                 <div>
                   <h4 className="font-bold text-lg">{cls.subject}</h4>
                   <p className="text-sm text-slate-500">{cls.tutor} • {cls.room}</p>
                 </div>
                 <div className="text-blue-400 font-mono font-bold bg-blue-500/10 px-4 py-2 rounded-xl">{cls.time}</div>
               </div>
             ))}
          </div>
        )}

        {/* MODAL POPUP */}
        {selectedSpot && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-[40px] shadow-2xl relative overflow-hidden">
              <button onClick={() => setSelectedSpot(null)} className="absolute right-8 top-8 text-slate-400 hover:text-white"><X /></button>
              <div className="h-40 bg-gradient-to-br from-blue-600 to-indigo-900 flex items-end p-10">
                <h2 className="text-3xl font-black text-white">{selectedSpot.name}</h2>
              </div>
              <div className="p-10 space-y-6">
                <p className="text-slate-300 leading-relaxed text-lg">{selectedSpot.details}</p>
                <button onClick={() => setSelectedSpot(null)} className="w-full bg-white text-slate-950 py-5 rounded-[24px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Go Back</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;