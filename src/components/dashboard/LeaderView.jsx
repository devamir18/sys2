import { motion } from 'framer-motion'
import { AlertTriangle, Users, CheckCircle, Clock, ChevronRight, Radio } from 'lucide-react'
import LiveMap from './LiveMap'

const incidents = [
  { id: 'INC-001', type: 'Armed Robbery', zone: 'Phase 2', status: 'active', reporter: 'Anonymous', time: '2m ago', unit: 'Alpha Unit' },
  { id: 'INC-002', type: 'Suspicious Activity', zone: 'Gate A', status: 'responding', reporter: 'Resident #14', time: '8m ago', unit: 'Beta Unit' },
  { id: 'INC-003', type: 'Vandalism', zone: 'Block D', status: 'responding', reporter: 'Resident #07', time: '15m ago', unit: 'Alpha Unit' },
  { id: 'INC-004', type: 'Noise Complaint', zone: 'Phase 1', status: 'resolved', reporter: 'Resident #22', time: '32m ago', unit: '—' },
  { id: 'INC-005', type: 'Trespassing', zone: 'Perimeter', status: 'active', reporter: 'Guard Post 3', time: '4m ago', unit: 'Gamma Unit' },
]

const units = [
  { name: 'Alpha Unit', members: 4, status: 'deployed', zone: 'Phase 2 / Block D' },
  { name: 'Beta Unit', members: 3, status: 'deployed', zone: 'Gate A' },
  { name: 'Gamma Unit', members: 4, status: 'deployed', zone: 'Perimeter' },
  { name: 'Delta Unit', members: 3, status: 'standby', zone: 'Base' },
]

const statusStyle = {
  active: 'bg-red-500/15 text-red-400 border-red-500/25',
  responding: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  resolved: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
}

const unitStyle = {
  deployed: 'bg-amber-500/15 text-amber-400',
  standby: 'bg-emerald-500/15 text-emerald-400',
}

export default function LeaderView() {
  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Command Center</h1>
          <p className="text-xs text-slate-500 mt-0.5">Gwarinpa Estate — Security Leader View</p>
        </div>
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
          <Radio size={13} className="text-red-400 animate-pulse" />
          <span className="text-xs font-mono text-red-400">5 incidents active</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active Incidents', value: '5', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', delta: '+2 this hour' },
          { label: 'Units Deployed', value: '3/4', icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10', delta: '1 on standby' },
          { label: 'Resolved Today', value: '12', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', delta: '↑ 4 vs yesterday' },
          { label: 'Avg Response', value: '4.2m', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10', delta: '↓ 1.3m improved' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-[#0d1526] border border-white/5 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center`}>
                <s.icon size={15} className={s.color} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-0.5" style={{ fontFamily: 'Space Grotesk' }}>{s.value}</div>
            <div className="text-xs text-slate-500 mb-1">{s.label}</div>
            <div className="text-xs text-slate-600">{s.delta}</div>
          </motion.div>
        ))}
      </div>

      {/* Map + Units */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Map */}
        <div className="md:col-span-2 bg-[#0d1526] border border-white/5 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Live Incident Map</span>
            <span className="text-xs font-mono text-slate-500">Click dots for details</span>
          </div>
          <div className="h-64">
            <LiveMap />
          </div>
        </div>

        {/* Dispatch Units */}
        <div className="bg-[#0d1526] border border-white/5 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5">
            <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Dispatch Units</span>
          </div>
          <div className="divide-y divide-white/5">
            {units.map((u) => (
              <div key={u.name} className="px-4 py-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-white">{u.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${unitStyle[u.status]}`}>
                    {u.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{u.zone}</span>
                  <span className="text-xs text-slate-600">{u.members} members</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-[#0d1526] border border-white/5 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>All Incidents</span>
          <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
            View all <ChevronRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {['ID', 'Type', 'Zone', 'Reporter', 'Unit', 'Time', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs text-slate-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {incidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-white/3 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">{inc.id}</td>
                  <td className="px-4 py-3 text-white font-medium text-xs">{inc.type}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{inc.zone}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{inc.reporter}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{inc.unit}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{inc.time}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium capitalize ${statusStyle[inc.status]}`}>
                      {inc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}