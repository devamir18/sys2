import { Shield, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 bg-[#0A0F1E] py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">
              Secure<span className="text-red-500">Net</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
            Empowering Nigerian communities with real-time security incident reporting and response coordination.
          </p>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            <div className="flex items-center gap-2"><Phone size={14} className="text-red-400" /> Emergency: 09135492350</div>
            <div className="flex items-center gap-2"><Mail size={14} className="text-red-400" /> support@securenet.ng</div>
            <div className="flex items-center gap-2"><MapPin size={14} className="text-red-400" /> jos, Nigeria</div>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display font-semibold text-white mb-4">Platform</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            {['Report Incident', 'Live Map', 'Track Status', 'Advisories', 'Community Dashboard'].map(l => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            {['About Us', 'Partner with Us', 'Privacy Policy', 'Terms of Use', 'Contact'].map(l => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <span>© 2025 SecureNet Nigeria. All rights reserved.</span>
        <span className="font-mono">Building safer communities, one report at a time.</span>
      </div>
    </footer>
  )
}