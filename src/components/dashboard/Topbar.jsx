import { Menu, Bell, Search } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function TopBar({ role, setRole, toggleSidebar, onBack }) {
  const [notifOpen, setNotifOpen] = useState(false)

  const notifications = [
    { text: 'Armed robbery reported — Phase 2', time: '2m ago', dot: 'bg-red-500' },
    { text: 'Unit Alpha dispatched to Zone 3', time: '5m ago', dot: 'bg-amber-500' },
    { text: 'Incident #0042 marked resolved', time: '12m ago', dot: 'bg-emerald-500' },
  ]

  return (
    <header className="h-14 bg-[#0a0f1e] border-b border-white/5 flex items-center px-4 gap-4 shrink-0">
      <button onClick={toggleSidebar} className="text-slate-400 hover:text-white transition-colors">
        <Menu size={20} />
      </button>

      {/* Back to landing */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft size={15} />
        <span className="hidden md:inline">Back to Home</span>
      </button>

      {/* Search */}
      <div className="flex-1 max-w-sm relative hidden md:block">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          placeholder="Search incidents, zones..."
          className="w-full bg-white/5 border border-white/5 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-white/15 transition-colors"
        />
      </div>

      <div className="flex-1" />

      {/* Role Switcher */}
      <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/5">
        {['resident', 'leader'].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200 ${
              role === r ? 'text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {role === r && (
              <motion.div
                layoutId="rolepill"
                className="absolute inset-0 bg-red-500 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{r === 'resident' ? 'Resident' : 'Leader'}</span>
          </button>
        ))}
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <AnimatePresence>
          {notifOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="absolute right-0 top-11 w-80 bg-[#111827] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-white/5">
                <span className="text-sm font-semibold text-white">Notifications</span>
              </div>
              {notifications.map((n, i) => (
                <div key={i} className="px-4 py-3 hover:bg-white/5 flex items-start gap-3 cursor-pointer">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                  <div className="flex-1">
                    <p className="text-sm text-slate-300">{n.text}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}