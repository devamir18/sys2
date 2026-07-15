import { motion } from 'framer-motion'
import { Shield, LayoutDashboard, AlertTriangle, MapPin, Bell, FileText, Settings, Radio, Users, LogOut } from 'lucide-react'
import { useAuth } from '../../App' // ⚡ Adjust path if App.jsx is higher or lower in your workspace tree

const residentLinks = [
  { key: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { key: 'map', icon: MapPin, label: 'Live Map' },
  { key: 'reports', icon: Radio, label: 'Monitor' },
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

// ✅ Added 'user' to the destructured props so it captures the prop passed from DashboardLayout
export default function Sidebar({ role, open, activePage, onNavigate, user }) {
  const { currentUser, logoutUser } = useAuth() 
  
  // ✅ Dynamically choose the prop 'user' first, falling back to context 'currentUser'
  const activeUser = user || currentUser;

  const links = role === 'resident' ? residentLinks : leaderLinks

  const getInitials = () => {
    // ✅ Use the unified activeUser reference
    const dynamicName = activeUser?.username || activeUser?.name || activeUser?.fullName;
    if (!dynamicName) return role === 'resident' ? 'RA' : 'SL';
    
    return dynamicName
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

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

      {/* Profile & Session Controls Footer */}
      <div className="p-3 border-t border-white/5 whitespace-nowrap overflow-hidden flex flex-col gap-1.5">
        <div className="flex items-center gap-3 px-3 py-2">
          {/* Dynamic Initials Badge */}
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-full flex items-center justify-center text-[#0B0E14] text-xs font-bold shrink-0">
            {getInitials()}
          </div>
          <div className="overflow-hidden">
            {/* Real-time reactive username field */}
            <div className="text-sm font-medium text-white truncate">
              {/* ✅ Fallbacks covering multiple DB conventions (username, name, fullName) */}
              {activeUser?.username || 
               activeUser?.name || 
               activeUser?.fullName || 
               (role === 'resident' ? 'Resident User' : 'Security Leader')}
            </div>
            {/* Dynamic context location tracking */}
            <div className="text-xs text-slate-500 truncate">
              {activeUser?.activeLocation || 'Gwarinpa Estate'}
            </div>
          </div>
        </div>

        {/* ⚡ Dynamic Session Sign-Out Action Button */}
        <button
          onClick={logoutUser}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent transition-all group"
        >
          <LogOut size={14} className="shrink-0 text-slate-500 group-hover:text-red-400 transition-colors" />
          Log Out Session
        </button>
      </div>
    </motion.aside>
  )
}