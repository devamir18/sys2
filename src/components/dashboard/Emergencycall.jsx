import { Phone, AlertCircle } from 'lucide-react'

export const EmergencyHotlineBanner = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <AlertCircle size={16} className="text-red-400 shrink-0" />
          <p className="text-xs text-red-300">
            <span className="font-semibold">Emergency Hotline:</span> Call 112 (Lagos) if in immediate danger
          </p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors">
          Call 112
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-red-600 bg-red-500/5 p-5 flex justify-between items-center gap-4">
      <div>
        <h2 className="font-bold text-red-400 flex items-center gap-2">
          <AlertCircle size={18} />
          🚨 Emergency Hotline (Lagos Region)
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          If you are in direct danger, do not wait for code updates. Call emergency services immediately.
        </p>
      </div>

      <div className="flex gap-3 shrink-0">
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors">
          <Phone size={16} />
          Call 112
        </button>

        <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
          Direct Line
        </button>
      </div>
    </div>
  )
}
