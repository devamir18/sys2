import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Clock, CheckCircle, Radio, X, MapPin, Camera, ChevronRight, Bell, FileText, Settings } from 'lucide-react'
import { myReports, advisories } from './mockData'

const ReportsView = () => {
  const [reportOpen, setReportOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ type: '', desc: '', zone: '' })

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => { setReportOpen(false); setSubmitted(false) }, 2000)
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>My Reports</h1>
        <button
          onClick={() => setReportOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-400 text-[#0B0E14] font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + New Report
        </button>
      </div>

      <div className="grid gap-4">
        {myReports.map(r => (
          <div key={r.id} className="bg-[#0D1526] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                r.status === 'resolved' ? 'bg-emerald-500' : r.status === 'responding' ? 'bg-amber-500' : 'bg-slate-500'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-white font-semibold">{r.type}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full border capitalize font-medium shrink-0 ${
                    r.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : r.status === 'responding' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}>
                    {r.status}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-2">{r.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>ID: {r.id}</span>
                  <span>{r.zone}</span>
                  <span>{r.time}</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-600 shrink-0 mt-1" />
            </div>
          </div>
        ))}
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

const AdvisoriesView = () => {
  const advisoryStyle = {
    high: 'border-red-500/30 bg-red-500/5 text-red-400',
    medium: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
    low: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Security Advisories</h1>

      <div className="grid gap-4">
        {advisories.map((a, i) => (
          <div key={i} className={`rounded-xl border p-4 flex items-start gap-4 ${advisoryStyle[a.level]}`}>
            <AlertTriangle size={20} className="shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-relaxed mb-2">{a.text}</p>
              <p className="text-xs opacity-75">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SettingsView = () => {
  return (
    <div className="p-4 md:p-6 space-y-5">
      <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Settings</h1>

      <div className="bg-[#0D1526] border border-white/5 rounded-xl overflow-hidden">
        <div className="divide-y divide-white/5">
          <div className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
            <div>
              <p className="text-white font-medium">Push Notifications</p>
              <p className="text-xs text-slate-500 mt-1">Receive instant alerts for incidents</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
            <div>
              <p className="text-white font-medium">Email Alerts</p>
              <p className="text-xs text-slate-500 mt-1">Get daily security summary</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
            <div>
              <p className="text-white font-medium">SMS Notifications</p>
              <p className="text-xs text-slate-500 mt-1">Receive urgent alerts via SMS</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
            <div>
              <p className="text-white font-medium">Dark Mode</p>
              <p className="text-xs text-slate-500 mt-1">Always active</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
          </div>
        </div>
      </div>

      <div className="bg-[#0D1526] border border-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Account Information</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-slate-500 mb-1">Resident ID</p>
            <p className="text-white font-medium">RES-GW-2024-001</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Estate</p>
            <p className="text-white font-medium">Gwarinpa Estate</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Unit / Block</p>
            <p className="text-white font-medium">Phase 2, Block A, Unit 45</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResidentView({ page = 'overview' }) {
  switch (page) {
    case 'reports':
      return <ReportsView />
    case 'advisories':
      return <AdvisoriesView />
    case 'settings':
      return <SettingsView />
    default:
      return <ReportsView />
  }
}