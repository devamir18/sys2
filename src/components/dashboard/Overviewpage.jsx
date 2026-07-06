import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, MapPin, Camera } from 'lucide-react'
import LiveMap from './LiveMap'
import { EmergencyHotlineBanner } from './EmergencyCall'
import { USER_LOCATION, liveFeed, myReports, advisories, initials, avatarColor } from './mockData'

export default function OverviewPage({ onNavigate }) {
  const [reportOpen, setReportOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ type: '', desc: '', zone: '' })

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => { setReportOpen(false); setSubmitted(false) }, 2000)
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      <EmergencyHotlineBanner />

      {/* Map + live feed */}
      <div className="bg-[#0D1526] border border-white/5 rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                Live Incident Map
              </span>
              <button
                onClick={() => onNavigate?.('map')}
                className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                {liveFeed.length} active zones · view full map
              </button>
            </div>
            <div className="h-72">
              <LiveMap center={USER_LOCATION} markers={liveFeed} />
            </div>
          </div>

          <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l border-white/5 p-4 flex flex-col max-h-[420px] md:max-h-none overflow-y-auto">
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide">LIVE ALERTS FEED</h3>
            <div className="space-y-3">
              {liveFeed.map((item) => (
                <div key={item.id} className="rounded-xl bg-[#111827] p-4 border border-white/5">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#0B0E14] shrink-0"
                      style={{ background: avatarColor(item.author) }}
                    >
                      {initials(item.author)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{item.author}</p>
                      <p className="text-xs text-slate-500 truncate">{item.location} · {item.time}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* My Reports + Advisories */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#0D1526] border border-white/5 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>My Reports</span>
            <button onClick={() => setReportOpen(true)} className="text-xs font-medium text-cyan-400 hover:text-cyan-300">
              + New Report
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {myReports.map(r => (
              <div key={r.id} className="px-4 py-3 flex items-center gap-3 hover:bg-white/[0.03] transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  r.status === 'resolved' ? 'bg-emerald-500' : r.status === 'responding' ? 'bg-amber-500' : 'bg-slate-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{r.type}</p>
                  <p className="text-xs text-slate-500">{r.zone} · {r.time}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border capitalize font-medium ${
                  r.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : r.status === 'responding' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                }`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0D1526] border border-white/5 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5">
            <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Security Advisories</span>
          </div>
          <div className="divide-y divide-white/5">
            {advisories.map((a, i) => (
              <div key={i} className={`px-4 py-3 border-l-2 ${a.level === 'high' ? 'border-red-500' : a.level === 'medium' ? 'border-amber-500' : 'border-blue-500'}`}>
                <p className="text-xs text-slate-300 leading-relaxed mb-1">{a.text}</p>
                <p className="text-xs text-slate-600">{a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {reportOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 pointer-events-auto"
            onClick={(e) => e.target === e.currentTarget && setReportOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0D1526] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <span className="font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Report an Incident</span>
                <button onClick={() => setReportOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              {submitted ? (
                <div className="p-10 text-center">
                  <div className="w-14 h-14 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={26} className="text-emerald-400" />
                  </div>
                  <p className="text-white font-semibold text-lg mb-1">Report Submitted</p>
                  <p className="text-slate-400 text-sm">Security units have been alerted.</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Incident Type</label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                      onChange={e => setForm({ ...form, type: e.target.value })}
                    >
                      <option value="" className="bg-[#0D1526]">Select type...</option>
                      <option className="bg-[#0D1526]">Armed Robbery</option>
                      <option className="bg-[#0D1526]">Suspicious Activity</option>
                      <option className="bg-[#0D1526]">Trespassing</option>
                      <option className="bg-[#0D1526]">Vandalism</option>
                      <option className="bg-[#0D1526]">Noise Disturbance</option>
                      <option className="bg-[#0D1526]">Fight / Assault</option>
                      <option className="bg-[#0D1526]">Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Zone / Location</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        placeholder="e.g. Phase 2, Block C"
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
                        onChange={e => setForm({ ...form, zone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Describe what you saw..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 resize-none"
                      onChange={e => setForm({ ...form, desc: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-2 border border-dashed border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:border-white/20 transition-colors">
                    <Camera size={15} className="text-slate-500" />
                    <span className="text-xs text-slate-500">Attach photo evidence</span>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0B0E14] font-semibold py-3 rounded-xl transition-all text-sm"
                  >
                    Submit Report
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}