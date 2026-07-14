import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X } from 'lucide-react'

export default function Navbar({ onDashboard, onOpenLogin }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['How It Works', 'Features', 'Community', 'Contact']

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#0A0F1E]/95 backdrop-blur-md border-b border-white/5 shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white tracking-tight">
            Secure<span className="text-red-500">Net</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onOpenLogin?.()}
            className="text-sm text-slate-400 hover:text-white transition-colors font-medium px-4 py-2 border border-white/10 hover:border-white/20 rounded-lg"
          >
            Dashboard
          </button>
          <button className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25">
            Report Incident
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-slate-400" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#111827] border-t border-white/5 px-6 py-4 flex flex-col gap-4"
          >

            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-slate-300 hover:text-white text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => { onOpenLogin?.(); setMenuOpen(false) }}
              className="text-sm border border-white/10 text-slate-300 font-semibold px-5 py-2.5 rounded-lg"
            >
              Dashboard
            </button>
            <button className="bg-red-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg">
              Report Incident
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}