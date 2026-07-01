import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FileText, BellRing, ShieldCheck } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    number: '01',
    title: 'Report the Incident',
    desc: 'Residents submit a report with description, location pin, and optional photos directly from their phone.',
    color: 'text-red-400',
    border: 'border-red-500/20',
    bg: 'bg-red-500/10',
  },
  {
    icon: BellRing,
    number: '02',
    title: 'Alert Sent Instantly',
    desc: 'Community leaders and nearby security agencies receive real-time alerts via the platform and SMS.',
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/10',
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: 'Track & Resolve',
    desc: 'Residents track response status live. Incidents are documented and marked resolved with full audit trail.',
    color: 'text-emerald-400',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/10',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-red-400 tracking-widest uppercase">How It Works</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
            Three steps to safer communities
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Designed for speed. From incident to resolution in minutes, not hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-14 left-1/4 right-1/4 h-px bg-gradient-to-r from-red-500/30 via-amber-500/30 to-emerald-500/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative bg-[#111827] border ${step.border} rounded-2xl p-8 hover:bg-[#1a2235] transition-colors duration-300`}
            >
              <div className={`w-12 h-12 ${step.bg} rounded-xl flex items-center justify-center mb-6`}>
                <step.icon size={22} className={step.color} />
              </div>
              <div className={`font-mono text-xs ${step.color} mb-2`}>{step.number}</div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}