import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Radio, 
  X, 
  MapPin, 
  ChevronRight, 
  Bell, 
  FileText, 
  Settings,
  Activity,       
  Cpu,            
  CheckCircle2,
  ShieldAlert,
  Server,
  Terminal,
  Layers,
  Lock,
  User,
  Sliders
} from 'lucide-react'

// ============================================================================
// 1. ADVISORIES VIEW (Tactical Incident Reporting & Log Hub)
// ============================================================================
const AdvisoriesView = () => {
  const [reportOpen, setReportOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ type: '', desc: '', zone: '' })
  const [reports, setReports] = useState([])

  const handleSubmit = () => {
    // Generate a quick mock report structure to append to state
    const newReport = {
      id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      type: form.type || 'General Incident',
      description: form.desc || 'No description provided.',
      zone: form.zone || 'Zone Unspecified',
      time: 'Just now',
      status: 'pending'
    }
    setReports([newReport, ...reports])
    setSubmitted(true)
    setTimeout(() => { 
      setReportOpen(false)
      setSubmitted(false) 
      setForm({ type: '', desc: '', zone: '' })
    }, 1800)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D1526]/50 border border-white/5 rounded-2xl p-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-400">Incident Control Desk</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
            My Active Reports
          </h1>
        </div>
        <button
          onClick={() => setReportOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-400 text-[#0B0E14] text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] shrink-0"
        >
          + File Incident Report
        </button>
      </div>

      {/* Reports Feed */}
      <div className="grid gap-3">
        {reports.length === 0 ? (
          <div className="bg-[#0D1526]/30 border border-white/5 rounded-2xl p-10 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center">
              <FileText size={20} className="text-slate-500" />
            </div>
            <div>
              <p className="text-white font-semibold">Clear Record Sheet</p>
              <p className="text-sm text-slate-500 mt-1">You haven't dispatched any incident reports yet.</p>
            </div>
          </div>
        ) : (
          reports.map(r => (
            <div 
              key={r.id} 
              className="bg-[#0D1526]/40 border border-white/5 hover:border-white/10 rounded-xl p-4 transition-all duration-200 group hover:bg-[#0D1526]/60 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 animate-pulse ${
                  r.status === 'resolved' ? 'bg-emerald-500' : r.status === 'responding' ? 'bg-amber-500' : 'bg-cyan-500'
                }`} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                      {r.type}
                    </h3>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-md border capitalize font-mono tracking-wider font-bold shrink-0 ${
                      r.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : r.status === 'responding' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-3 leading-relaxed">{r.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-slate-500">
                    <span className="bg-white/5 px-1.5 py-0.5 rounded text-slate-400">ID: {r.id}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {r.zone}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {r.time}</span>
                  </div>
                </div>
                
                <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 mt-1" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {reportOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setReportOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.97, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 15 }}
              className="bg-[#0A0F1D] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={16} className="text-cyan-400" />
                  <span className="font-semibold text-white font-mono uppercase text-sm tracking-wide">File Security Report</span>
                </div>
                <button onClick={() => setReportOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>

              {submitted ? (
                <div className="p-10 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle size={30} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">Report Dispatched</p>
                    <p className="text-slate-500 text-xs mt-1 font-mono">Routing signal to central command node...</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 mb-1.5 block uppercase tracking-wider">Incident Category</label>
                    <select
                      className="w-full bg-[#0D1526] border border-white/10 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                      onChange={e => setForm({ ...form, type: e.target.value })}
                      value={form.type}
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
                    <label className="text-xs font-mono text-slate-400 mb-1.5 block uppercase tracking-wider">Operational Zone</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        placeholder="e.g. Phase 2, Block C"
                        className="w-full bg-[#0D1526] border border-white/10 rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                        onChange={e => setForm({ ...form, zone: e.target.value })}
                        value={form.zone}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 mb-1.5 block uppercase tracking-wider">Event Details</label>
                    <textarea
                      rows={3}
                      placeholder="Input highly specific notes on actors, behavior, or direction..."
                      className="w-full bg-[#0D1526] border border-white/10 rounded-xl px-3.5 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-none"
                      onChange={e => setForm({ ...form, desc: e.target.value })}
                      value={form.desc}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0B0E14] font-bold py-3.5 rounded-xl transition-all text-sm mt-2 active:scale-[0.98]"
                  >
                    Transmit Signal
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

// ============================================================================
// 2. REPORTS VIEW (Telemetry/System Monitoring Feed)
// ============================================================================
const monitorLogs = [
  { level: 'critical', source: 'Node-14 Perimeter', text: 'Unscheduled security boundary crossing attempt detected.', time: 'Just now' },
  { level: 'warning', source: 'Database Sync', text: 'Database replication delay exceeded normal thresholds (+140ms).', time: '2 mins ago' },
  { level: 'healthy', source: 'Auth Gateway', text: 'User session verification key successfully handshaked.', time: '5 mins ago' },
]

const ReportsView = () => {
  const statusStyle = {
    critical: 'border-red-500/20 bg-red-500/[0.02] text-red-400 hover:border-red-500/30',
    warning: 'border-amber-500/20 bg-amber-500/[0.02] text-amber-400 hover:border-amber-500/30',
    healthy: 'border-emerald-500/20 bg-emerald-500/[0.02] text-emerald-400 hover:border-emerald-500/30',
  }

  const getStatusIcon = (level) => {
    switch (level) {
      case 'critical':
        return (
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
            <Activity size={16} className="text-red-400 animate-pulse" />
          </div>
        )
      case 'warning':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
            <Cpu size={16} className="text-amber-400" />
          </div>
        )
      case 'healthy':
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
        )
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D1526]/50 border border-white/5 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
            System Monitoring Feed
          </h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#080D1A] border border-white/5">
          <Server size={12} className="text-cyan-400" />
          <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Gateway Link Active</span>
        </div>
      </div>

      {/* Signals List */}
      <div className="grid gap-3">
        {(!monitorLogs || monitorLogs.length === 0) ? (
          <div className="bg-[#0D1526]/30 border border-white/5 rounded-2xl p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <Radio size={28} className="text-slate-600 animate-pulse" />
            <p className="text-sm font-mono tracking-wider text-slate-500">Telemetry connection dropped. Syncing...</p>
          </div>
        ) : (
          monitorLogs.map((log, i) => (
            <div 
              key={i} 
              className={`rounded-xl border p-4 flex items-start gap-4 transition-all duration-200 ${statusStyle[log.level]}`}
            >
              {getStatusIcon(log.level)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {log.source}
                  </span>
                  <span className="text-[10px] font-mono opacity-40">• {log.time}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{log.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ============================================================================
// 3. SETTINGS VIEW (Interactive Infrastructure Settings)
// ============================================================================
const SettingsView = () => {
  const [notifState, setNotifState] = useState({ push: true, email: true, sms: false })

  const toggleNotif = (key) => {
    setNotifState(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      
      {/* Header */}
      <div className="space-y-1 bg-[#0D1526]/30 border border-white/5 p-5 rounded-2xl">
        <div className="flex items-center gap-2">
          <Settings size={14} className="text-slate-400" />
          <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Terminal Config</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
          Settings
        </h1>
      </div>

      {/* Grid Layout splits Settings Panels */}
      <div className="grid md:grid-cols-5 gap-6 items-start">
        
        {/* Toggle Panel */}
        <div className="md:col-span-3 bg-[#0D1526]/50 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
          <div className="px-5 py-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
            <div className="space-y-1">
              <p className="text-white text-sm font-semibold">Real-Time Push Signals</p>
              <p className="text-xs text-slate-500 leading-normal">Transmit critical updates instantly directly to your viewport.</p>
            </div>
            <button 
              onClick={() => toggleNotif('push')}
              className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 shrink-0 ${notifState.push ? 'bg-cyan-500' : 'bg-slate-800'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-[#0B0E14] transition-transform ${notifState.push ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="px-5 py-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
            <div className="space-y-1">
              <p className="text-white text-sm font-semibold">Email Summary Archives</p>
              <p className="text-xs text-slate-500 leading-normal">Send a clean operational overview to your mailbox every 24h.</p>
            </div>
            <button 
              onClick={() => toggleNotif('email')}
              className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 shrink-0 ${notifState.email ? 'bg-cyan-500' : 'bg-slate-800'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-[#0B0E14] transition-transform ${notifState.email ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="px-5 py-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
            <div className="space-y-1">
              <p className="text-white text-sm font-semibold">Critical SMS Override</p>
              <p className="text-xs text-slate-500 leading-normal">Bypass quiet-hours during red-level active events.</p>
            </div>
            <button 
              onClick={() => toggleNotif('sms')}
              className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 shrink-0 ${notifState.sms ? 'bg-cyan-500' : 'bg-slate-800'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-[#0B0E14] transition-transform ${notifState.sms ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="px-5 py-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
            <div className="space-y-1">
              <p className="text-white text-sm font-semibold">Default Dark Sub-system</p>
              <p className="text-xs text-slate-500 leading-normal">Optimized visual layout to minimize operational eye strain.</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
              Locked Dark
            </span>
          </div>
        </div>

        {/* Metadata Panel */}
        <div className="md:col-span-2 bg-[#0D1526]/50 border border-white/5 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <User size={14} className="text-cyan-400" />
            <h3 className="text-white text-xs font-mono font-bold tracking-wider uppercase">Identity Parameters</h3>
          </div>
          
          <div className="space-y-3.5">
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Resident Anchor Code</p>
              <p className="text-white font-mono text-sm font-medium mt-1">RES-GW-2024-001</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Assigned Sector</p>
              <p className="text-white font-medium text-sm mt-1">Gwarinpa Estate</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Grid Coordination</p>
              <p className="text-white font-medium text-sm mt-1">Phase 2, Block A, Unit 45</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


export default function ResidentView({ page = 'overview' }) {
  switch (page) {
    case 'advisories':
      return <AdvisoriesView />
    case 'reports':
      return <ReportsView />
    case 'settings':
      return <SettingsView />
    default:
      return <AdvisoriesView />
  }
}