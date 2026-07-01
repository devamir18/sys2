import { motion } from 'framer-motion'
import { AlertTriangle, MapPin, ArrowRight, ShieldCheck, Radio } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' }
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFhMjIzNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60" />

      {/* Red glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono px-4 py-2 rounded-full mb-8">
          <Radio size={12} className="animate-pulse" />
          LIVE — Community Safety Network Active
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          Report. Alert.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
            Protect.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.35)}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          A real-time digital platform for Nigerian communities to report security incidents,
          alert responders, and track resolution — all from your phone.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.45)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="group flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-red-500/30 text-base">
            <AlertTriangle size={18} />
            Report an Incident
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="flex items-center gap-2 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium px-8 py-4 rounded-xl transition-all duration-200 text-base bg-white/5 hover:bg-white/10">
            <MapPin size={18} />
            View Live Map
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.55)}
          className="grid grid-cols-3 gap-6 max-w-xl mx-auto"
        >
          {[
            { value: '2,400+', label: 'Incidents Resolved' },
            { value: '4 min', label: 'Avg Response Time' },
            { value: '180+', label: 'Communities' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Floating incident card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 max-w-sm mx-auto bg-[#111827] border border-white/10 rounded-2xl p-5 text-left shadow-2xl"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="relative w-2.5 h-2.5">
                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                <span className="relative block w-2.5 h-2.5 rounded-full bg-red-500" />
              </div>
              <span className="text-xs font-mono text-red-400">ACTIVE INCIDENT</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">2 min ago</span>
          </div>
          <p className="text-sm text-white font-medium mb-1">Armed robbery reported</p>
          <p className="text-xs text-slate-400 mb-3">Phase 2, Gwarinpa Estate — Abuja</p>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-amber-400" />
            <span className="text-xs text-amber-400 font-medium">Security unit dispatched</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}