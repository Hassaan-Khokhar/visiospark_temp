import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, PlusCircle, Sparkles, Activity } from 'lucide-react';

function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '' });
  const [loading, setLoading] = useState(false);

  // Dynamically target the backend using the host's IP so it works from any external browser
  const API_URL = `http://${window.location.hostname}:5000/api/events`;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(API_URL);
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, formData);
      setFormData({ title: '', description: '', date: '', location: '' });
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to connect to backend. Ensure port 5000 is forwarded.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>

      <div className="relative z-10 max-w-6xl mx-auto p-6 lg:p-12">
        <header className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-500/20 rounded-xl border border-brand-400/30">
              <Sparkles className="text-brand-400 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                VisioSpark Portal 2.0
              </h1>
              <p className="text-gray-400 text-sm tracking-wide">COMSATS WAH CAMPUS IT MEGA EVENT</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-brand-400 bg-brand-900/30 px-4 py-2 rounded-full border border-brand-500/20">
            <Activity className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold tracking-wider">SYSTEM ONLINE</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-brand-400" /> Register Event Segment
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Segment Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., E-Gaming Tournament" 
                         className="glass-input w-full p-3 rounded-xl transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Segment details..." rows="3"
                            className="glass-input w-full p-3 rounded-xl transition-all duration-200 resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Date & Time</label>
                  <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required 
                         className="glass-input w-full p-3 rounded-xl transition-all duration-200 text-gray-300" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Venue</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g., Main Auditorium" 
                         className="glass-input w-full p-3 rounded-xl transition-all duration-200" />
                </div>
                <button type="submit" disabled={loading}
                        className="w-full mt-4 bg-gradient-to-r from-brand-600 to-brand-400 hover:from-brand-500 hover:to-brand-300 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_15px_rgba(14,165,233,0.4)]">
                  {loading ? 'Processing...' : 'Deploy Event'}
                </button>
              </form>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Active Segments</h2>
            {events.length === 0 ? (
              <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center text-gray-500 border-dashed border-2 border-white/10">
                <Calendar className="w-12 h-12 mb-3 opacity-50" />
                <p>No active segments detected in the pipeline.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((evt) => (
                  <div key={evt._id} className="glass-panel p-5 rounded-2xl hover:bg-white/[0.08] transition-all duration-300 border-l-4 border-l-brand-500 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{evt.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">{evt.description}</p>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center gap-2 text-sm text-brand-300 bg-brand-900/20 w-fit px-3 py-1 rounded-lg">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(evt.date).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-purple-300 bg-purple-900/20 w-fit px-3 py-1 rounded-lg">
                        <MapPin className="w-4 h-4" />
                        <span>{evt.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
export default App;
