import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhoneCall, X, AlertTriangle, MessageSquare } from 'lucide-react'

const EMERGENCY_NUMBER = '112' // Nigeria national emergency number
const EMERGENCY_SMS_MESSAGE = 'EMERGENCY! I need immediate assistance. Please send help to my location.'

function EmergencyCallComponent({ variant = 'button' }) {
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState(null) // 'call' or 'sms'

  const handleCall = () => {
    window.location.href = `tel:${EMERGENCY_NUMBER}`
    setOpen(false)
    setActionType(null)
  }

  const handleSMS = () => {
    const smsBody = encodeURIComponent(EMERGENCY_SMS_MESSAGE)
    window.location.href = `sms:${EMERGENCY_NUMBER}?body=${smsBody}`
    setOpen(false)
    setActionType(null)
  }

  return (
    <>
      {variant === 'button' ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25"
        >
          <PhoneCall size={15} />
          Call Emergency
        </button>
      ) : variant === 'banner' ? (
        <div className="w-full bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 border border-red-400/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <AlertTriangle size={20} className="text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-white">Emergency Hotline Available</h4>
                <p className="text-sm text-white/80">Call or SMS emergency services ({EMERGENCY_NUMBER})</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="bg-white hover:bg-gray-100 text-red-600 font-semibold px-6 py-2 rounded-lg transition-all whitespace-nowrap"
            >
              Contact Now
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-red-500/25"
        >
          <PhoneCall size={18} />
          Call Emergency ({EMERGENCY_NUMBER})
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111827] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center relative"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={26} className="text-red-400" />
              </div>

              <h3 className="font-display text-lg font-semibold text-white mb-2">
                Emergency Services
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Contact emergency services at <span className="text-white font-mono">{EMERGENCY_NUMBER}</span>. Choose your preferred method.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCall}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <PhoneCall size={15} />
                  Call Now
                </button>
                <button
                  onClick={handleSMS}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <MessageSquare size={15} />
                  Send Emergency SMS
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-full border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium py-3 rounded-xl transition-all text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EmergencyCallComponent

export const EmergencyHotlineBanner = () => <EmergencyCallComponent variant="banner" />