import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Clock, CheckCircle, Radio, X, MapPin, Camera, ChevronRight } from 'lucide-react'
import LiveMap from './LiveMap'

const myReports = [
  { id: 'INC-039', type: 'Suspicious Vehicle', status: 'resolved', time: '2 days ago', zone: 'Block A' },
  { id: 'INC-041', type: 'Noise Disturbance', status: 'responding', time: '1 hour ago', zone: 'Phase 1' },
]

const advisories = [
  { level: 'high', text: 'Increased patrol in Phase 2 following armed robbery report. Residents advised to stay indoors after 9PM.', time: '1h ago' },
  { level: 'medium', text: 'Gate B will be temporarily closed for maintenance tonight 10PM – 12AM.', time: '3h ago' },
  { level: 'low', text: 'Community security meeting scheduled for Saturday 10AM at the Estate Hall.', time: '1d ago' },
]

const advisoryStyle = {
  high: 'border-red-500/30 bg-red-500/5 text-red-400',
  medium: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
  low: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
}

export default function ResidentView() {
  const [reportOpen, setReportOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ type: '', desc: '', zone: '' })

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => { setReportOpen(false); setSubmitted(false) }, 2000)
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>My Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">Gwarinpa Estate — Zone 3</p>
        </div>
        <button
          onClick={() => setReportOpen(true)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-red-500/25"
        >
          <AlertTriangle size={15} />
          Report Incident
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'My Reports', value: '4', icon: Radio, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'In Progress', value: '1', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Resolved', value: '3', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map(s => (
          <div key={s.label} className="bg-[#0d1526] border border-white/5 rounded-xl p-4 flex flex-col gap-2">
            <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center`}>
              <s.icon size={15} className={s.color} />
            </div>
            <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Live Map */}
      <div className="bg-[#0d1526] border border-white/5 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Live Incident Map</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-red-400">6 active zones</span>
          </div>
        </div>
        <div className="h-72">
          <LiveMap />
        </div>
      </div>

      {/* My Reports + Advisories */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* My Reports */}
        <div className="bg-[#0d1526] border border-white/5 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5">
            <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>My Reports</span>
          </div>
          <div className="divide-y divide-white/5">
            {myReports.map(r => (
              <div key={r.id} className="px-4 py-3 flex items-center gap-3 hover:bg-white/3 transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full shrink-0 ${r.status === 'resolved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{r.type}</p>
                  <p className="text-xs text-slate-500">{r.zone} · {r.time}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border capitalize font-medium ${r.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Advisories */}
        <div className="bg-[#0d1526] border border-white/5 rounded-xl overflow-hidden">
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setReportOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111827] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
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
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50"
                      onChange={e => setForm({ ...form, type: e.target.value })}
                    >
                      <option value="" className="bg-[#111827]">Select type...</option>
                      <option className="bg-[#111827]">Armed Robbery</option>
                      <option className="bg-[#111827]">Suspicious Activity</option>
                      <option className="bg-[#111827]">Trespassing</option>
                      <option className="bg-[#111827]">Vandalism</option>
                      <option className="bg-[#111827]">Noise Disturbance</option>
                      <option className="bg-[#111827]">Fight / Assault</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Zone / Location</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        placeholder="e.g. Phase 2, Block C"
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500/50"
                        onChange={e => setForm({ ...form, zone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Describe what you saw..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 resize-none"
                      onChange={e => setForm({ ...form, desc: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-2 border border-dashed border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:border-white/20 transition-colors">
                    <Camera size={15} className="text-slate-500" />
                    <span className="text-xs text-slate-500">Attach photo evidence (optional)</span>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all text-sm"
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