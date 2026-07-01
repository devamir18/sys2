import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Alhaji Musa Bello',
    role: 'Estate Chairman, Gwarinpa — Abuja',
    text: 'Before SecureNet, incidents were reported via WhatsApp and often got lost. Now we have a proper record of every case and response. It has transformed how we manage security.',
    initials: 'MB',
    color: 'bg-red-500',
  },
  {
    name: 'Mrs. Chidinma Okafor',
    role: 'Resident, Lekki Phase 1 — Lagos',
    text: 'I reported a suspicious vehicle at 11pm and within 6 minutes security arrived. The live tracking gave me peace of mind that someone was actually responding.',
    initials: 'CO',
    color: 'bg-emerald-500',
  },
  {
    name: 'Insp. Rabiu Tanko',
    role: 'Security Coordinator, Plateau State',
    text: 'The dispatch board gives us a clear picture of active incidents across all estates. We can prioritize and deploy units faster than ever before.',
    initials: 'RT',
    color: 'bg-amber-500',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="community" className="py-28 px-6 bg-[#080d18]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-red-400 tracking-widest uppercase">Community Voices</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
            Trusted by communities
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-[#111827] border border-white/5 rounded-2xl p-7 flex flex-col gap-5"
            >
              <Quote size={24} className="text-red-500/40" />
              <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-sm font-bold font-display`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}