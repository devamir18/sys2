import { motion } from 'framer-motion'
import { Shield, LayoutDashboard, AlertTriangle, MapPin, Bell, FileText, Settings, Radio, Users } from 'lucide-react'

const residentLinks = [
  { key: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { key: 'map', icon: MapPin, label: 'Live Map' },
  { key: 'reports', icon: Radio, label: 'My Reports' },
  { key: 'advisories', icon: Bell, label: 'Advisories' },
  { key: 'settings', icon: Settings, label: 'Settings' },
]

const leaderLinks = [
  { key: 'command', icon: LayoutDashboard, label: 'Command Center' },
  { key: 'map', icon: MapPin, label: 'Live Map' },
  { key: 'incidents', icon: AlertTriangle, label: 'All Incidents' },
  { key: 'dispatch', icon: Users, label: 'Dispatch Units' },
  { key: 'reports', icon: FileText, label: 'Reports & Logs' },
  { key: 'advisories', icon: Bell, label: 'Advisories' },
  { key: 'settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar({ role, open, activePage, onNavigate }) {
  const links = role === 'resident' ? residentLinks : leaderLinks

  return (
    <motion.aside
      animate={{ width: open ? 220 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-full bg-[#0D1526] border-r border-white/5 flex flex-col overflow-hidden shrink-0 relative z-20"
    >
      <div className="p-5 border-b border-white/5 flex items-center gap-2.5 whitespace-nowrap">
        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shrink-0">
          <Shield size={16} className="text-[#0B0E14]" />
        </div>
        <span className="font-bold text-white text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Secure<span className="text-cyan-500">Net</span>
        </span>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-hidden">
        {links.map((link) => {
          const active = activePage === link.key
          return (
            <button
              key={link.key}
              onClick={() => onNavigate?.(link.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                active
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <link.icon size={17} className="shrink-0" />
              {link.label}
            </button>
          )
        })}
      </nav>

      <div className="p-3 border-t border-white/5 whitespace-nowrap overflow-hidden">
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-full flex items-center justify-center text-[#0B0E14] text-xs font-bold shrink-0">
            {role === 'resident' ? 'RA' : 'SL'}
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-medium text-white truncate">
              {role === 'resident' ? 'Resident User' : 'Security Leader'}
            </div>
            <div className="text-xs text-slate-500 truncate">Gwarinpa Estate</div>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}