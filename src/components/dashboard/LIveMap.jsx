import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Shield, Clock } from 'lucide-react'

const incidents = [
  { id: 'INC-001', x: 28, y: 35, type: 'Armed Robbery', zone: 'Phase 2', status: 'active', time: '2m ago' },
  { id: 'INC-002', x: 58, y: 22, type: 'Suspicious Activity', zone: 'Gate A', status: 'responding', time: '8m ago' },
  { id: 'INC-003', x: 72, y: 55, type: 'Vandalism', zone: 'Block D', status: 'responding', time: '15m ago' },
  { id: 'INC-004', x: 45, y: 70, type: 'Noise Complaint', zone: 'Phase 1', status: 'resolved', time: '32m ago' },
  { id: 'INC-005', x: 15, y: 60, type: 'Trespassing', zone: 'Perimeter', status: 'active', time: '4m ago' },
  { id: 'INC-006', x: 83, y: 30, type: 'Fight Report', zone: 'Market Area', status: 'responding', time: '20m ago' },
]

const colorMap = {
  active: { dot: '#EF4444', ring: 'rgba(239,68,68,0.3)', label: 'bg-red-500/20 text-red-400 border-red-500/30' },
  responding: { dot: '#F59E0B', ring: 'rgba(245,158,11,0.3)', label: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  resolved: { dot: '#10B981', ring: 'rgba(16,185,129,0.3)', label: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
}

export default function LiveMap() {
  const [selected, setSelected] = useState(null)
  const [scanPos, setScanPos] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(p => (p >= 100 ? 0 : p + 0.5))
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full bg-[#060b14] overflow-hidden rounded-xl border border-white/5">
      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a2235" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapgrid)" />
      </svg>

      {/* Estate outline zones */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50%" cy="50%" rx="42%" ry="38%" fill="none" stroke="#1a2235" strokeWidth="1.5" strokeDasharray="6 4"/>
        <rect x="20%" y="25%" width="25%" height="20%" rx="4" fill="#0d1526" stroke="#1e2d45" strokeWidth="1"/>
        <rect x="55%" y="30%" width="22%" height="18%" rx="4" fill="#0d1526" stroke="#1e2d45" strokeWidth="1"/>
        <rect x="30%" y="55%" width="30%" height="18%" rx="4" fill="#0d1526" stroke="#1e2d45" strokeWidth="1"/>
        {/* Roads */}
        <line x1="47%" y1="10%" x2="47%" y2="90%" stroke="#0f1c30" strokeWidth="8"/>
        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#0f1c30" strokeWidth="8"/>
        <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#0f1c30" strokeWidth="5"/>
      </svg>

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none z-10"
        style={{
          top: `${scanPos}%`,
          background: 'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.5) 50%, transparent 100%)',
          boxShadow: '0 0 8px rgba(16,185,129,0.3)',
        }}
      />

      {/* Incident dots */}
      {incidents.map((inc) => {
        const col = colorMap[inc.status]
        const isSelected = selected?.id === inc.id
        return (
          <button
            key={inc.id}
            onClick={() => setSelected(isSelected ? null : inc)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
            style={{ left: `${inc.x}%`, top: `${inc.y}%` }}
          >
            {/* Pulse ring */}
            {inc.status !== 'resolved' && (
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: col.ring, scale: 1.5 }}
              />
            )}
            <span
              className="relative block w-3.5 h-3.5 rounded-full border-2 border-[#060b14] transition-transform group-hover:scale-125"
              style={{ background: col.dot, boxShadow: `0 0 10px ${col.dot}` }}
            />
          </button>
        )
      })}

      {/* Selected incident card */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-[#111827] border border-white/10 rounded-xl p-4 z-30 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-slate-500">{selected.id}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${colorMap[selected.status].label}`}>
                {selected.status}
              </span>
            </div>
            <p className="text-white font-semibold text-sm mb-1">{selected.type}</p>
            <p className="text-slate-400 text-xs mb-3 flex items-center gap-1">
              <Shield size={11} /> {selected.zone}
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={11} /> Reported {selected.time}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute top-3 left-3 flex flex-col gap-1.5 bg-[#0a0f1e]/80 backdrop-blur-sm border border-white/5 rounded-lg p-2.5">
        {Object.entries(colorMap).map(([status, col]) => (
          <div key={status} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: col.dot }} />
            <span className="text-xs text-slate-400 capitalize">{status}</span>
          </div>
        ))}
      </div>

      {/* Live badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#0a0f1e]/80 backdrop-blur-sm border border-white/5 rounded-lg px-2.5 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs font-mono text-red-400">LIVE</span>
      </div>
    </div>
  )
}