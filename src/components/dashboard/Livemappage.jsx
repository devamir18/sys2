import { useState, useRef } from 'react'
import { Camera, X, MapPin } from 'lucide-react'
import LiveMap from './LiveMap'
import { EmergencyHotlineBanner } from './EmergencyCall'
import { USER_LOCATION, liveFeed as initialFeed, initials, avatarColor } from './mockData'

export default function LiveMapPage() {
  const [feed, setFeed] = useState(initialFeed)
  const [reportText, setReportText] = useState('')
  const [photoPreview, setPhotoPreview] = useState(null)
  const fileInputRef = useRef(null)

  function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoPreview(URL.createObjectURL(file))
  }

  function handleSubmitReport() {
    if (!reportText.trim()) return
    setFeed((prev) => [
      {
        id: Date.now(),
        author: 'You',
        location: USER_LOCATION.name,
        time: 'just now',
        text: reportText.trim(),
        image: photoPreview,
        lat: USER_LOCATION.lat,
        lng: USER_LOCATION.lng,
      },
      ...prev,
    ])
    setReportText('')
    setPhotoPreview(null)
  }

  return (
    <div className="p-4 md:p-6 space-y-4 h-full flex flex-col">
      <EmergencyHotlineBanner compact />

      <div className="flex-1 flex gap-4 min-h-0 flex-col lg:flex-row">
        {/* Left: map + report */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="rounded-xl border border-white/5 bg-[#0D1526] p-4 flex-1 flex flex-col min-h-[320px]">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="text-slate-400">
                Your Location:{' '}
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mx-1 align-middle" />
                <span className="text-white font-medium">{USER_LOCATION.name}</span>
              </span>
              <span className="text-slate-500 font-mono">
                {USER_LOCATION.lat.toFixed(4)}°, {USER_LOCATION.lng.toFixed(4)}°
              </span>
            </div>
            <div className="flex-1 rounded-lg overflow-hidden min-h-[260px]">
              <LiveMap center={USER_LOCATION} markers={feed} />
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#0D1526] p-4">
            <p className="text-sm font-semibold mb-3 text-white">Report Threat to Area Feed</p>
            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Describe what's happening..."
              rows={2}
              className="w-full resize-none bg-[#111827] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
            />
            <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 bg-[#111827] hover:bg-white/10 text-slate-300 text-xs font-medium px-3 py-2 rounded-lg border border-white/10 transition-colors"
                >
                  <Camera size={13} /> Add Photo Evidence
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                {photoPreview && (
                  <div className="relative w-10 h-10 rounded-md overflow-hidden border border-white/10">
                    <img src={photoPreview} alt="evidence preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setPhotoPreview(null)}
                      className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5"
                    >
                      <X size={10} />
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleSubmitReport}
                className="bg-cyan-500 hover:bg-cyan-400 text-[#0B0E14] text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>

        {/* Right: live feed */}
        <div className="w-full lg:w-[340px] shrink-0 rounded-xl border border-white/5 bg-[#0D1526] flex flex-col min-h-0 max-h-[420px] lg:max-h-none">
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <p className="text-xs font-bold tracking-wide text-slate-300">LIVE ALERTS FEED</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {feed.map((item) => (
              <div key={item.id} className="rounded-xl border border-white/5 bg-[#111827] p-3">
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-[#0B0E14] shrink-0"
                    style={{ background: avatarColor(item.author) }}
                  >
                    {initials(item.author)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{item.author}</p>
                    <p className="text-[10px] text-slate-500 truncate">{item.location} · {item.time}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">{item.text}</p>
                {item.image && (
                  <img src={item.image} alt="evidence" className="w-full h-32 object-cover rounded-lg mb-2 border border-white/5" />
                )}
                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                  <MapPin size={10} className="text-red-400" /> {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}