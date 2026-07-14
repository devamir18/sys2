import { Menu, Bell, Search, ArrowLeft, ShieldAlert, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const notifications = [
  { text: 'Armed robbery reported — Phase 2', time: '2m ago', dot: 'bg-red-500' },
  { text: 'Unit Alpha dispatched to Zone 3', time: '5m ago', dot: 'bg-amber-500' },
  { text: 'Incident #0042 marked resolved', time: '12m ago', dot: 'bg-emerald-500' },
]

export default function TopBar({ role, setRole, toggleSidebar, onBack, searchQuery, setSearchQuery }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // 🧠 Internal fallback state so typing is NEVER blocked even if props fail
  const [localQuery, setLocalQuery] = useState('')

  // Determine if we are controlled by parent or self-controlled
  const isControlled = searchQuery !== undefined && setSearchQuery !== undefined
  const currentInputValue = isControlled ? searchQuery : localQuery

  const handleInputChange = (e) => {
    const value = e.target.value
    if (isControlled) {
      setSearchQuery(value)
    } else {
      setLocalQuery(value)
    }
  }

  const handleRoleClick = (targetRole) => {
    if (targetRole === 'leader') {
      setIsModalOpen(true)
    } else {
      setRole?.(targetRole)
    }
  }

  return (
    <>
      <header className="h-14 bg-[#0D1526] border-b border-white/5 flex items-center px-4 gap-4 shrink-0 relative z-30">
        <button onClick={toggleSidebar} className="text-slate-400 hover:text-white transition-colors">
          <Menu size={20} />
        </button>

        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={15} />
            <span className="hidden md:inline">Back to Home</span>
          </button>
        )}

        {/* 🔍 Search Input */}
        <div className="flex-1 max-w-sm relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={currentInputValue}
            onChange={handleInputChange}
            placeholder="Search incidents, zones..."
            className="w-full bg-white/5 border border-white/5 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 transition-colors"
          />
        </div>
        <div className="flex-1" />

        {/* Role switcher — dev/demo convenience until auth distinguishes accounts */}
        <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/5">
          {['resident', 'leader'].map((r) => (
            <button
              key={r}
              onClick={() => handleRoleClick(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                role === r ? 'bg-cyan-500 text-[#0B0E14]' : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

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
                className="absolute right-0 top-11 w-80 bg-[#0D1526] border border-white/10 rounded-xl shadow-2xl z-40 overflow-hidden"
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

      {/* 🚨 Access Restricted Modal Layer */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-[#0D1526] border border-red-500/20 rounded-2xl p-6 shadow-2xl overflow-hidden z-10"
            >
              {/* Corner Close Cross Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mx-auto">
                  <ShieldAlert size={24} className="text-red-400" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Leader View Blocked
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed px-2">
                    Command console environment is currently under configuration. High-tier administrative authorization roles are unavailable.
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-4 rounded-xl transition-colors"
                >
                  Acknowledge Restriction
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}