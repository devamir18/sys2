import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '2,400+', label: 'Incidents Resolved', sub: 'Since platform launch' },
  { value: '< 4 min', label: 'Avg Response Time', sub: 'Down from 40+ minutes' },
  { value: '180+', label: 'Communities', sub: 'Across 12 Nigerian states' },
  { value: '98%', label: 'Resident Satisfaction', sub: 'Based on post-incident surveys' },
]

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-6 border-y border-white/5" ref={ref}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display text-4xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">{s.label}</div>
            <div className="text-xs text-slate-500">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}