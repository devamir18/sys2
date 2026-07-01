import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Camera, MapPin, MessageSquareWarning, Activity, Users, Lock } from 'lucide-react'

const features = [
  { icon: Camera, title: 'Photo Evidence Upload', desc: 'Attach photos and videos directly to incident reports for accurate documentation.', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: MapPin, title: 'GPS Location Tagging', desc: 'Automatically pin incident location on the map for precise responder routing.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: MessageSquareWarning, title: 'Instant SMS Alerts', desc: 'Community leaders and agencies get notified via platform push and SMS fallback.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: Activity, title: 'Live Response Tracking', desc: 'Watch incident status update in real time — from reported to resolved.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Users, title: 'Community Dashboard', desc: 'Leaders get a command view of all active incidents, advisories, and unit status.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: Lock, title: 'Anonymous Reporting', desc: 'Residents can report sensitive incidents anonymously to protect their identity.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
]

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-28 px-6 bg-[#080d18]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-red-400 tracking-widest uppercase">Platform Features</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
            Built for real emergencies
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Every feature designed around how Nigerian communities actually experience and respond to security threats.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-[#111827] border border-white/5 rounded-2xl p-7 hover:border-white/10 hover:bg-[#1a2235] transition-all duration-300 cursor-default"
            >
              <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon size={20} className={f.color} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}