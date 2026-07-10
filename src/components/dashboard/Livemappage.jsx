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

      <div className="flex-1 flex gap-4  flex-col lg:flex-row">
        {/* Left: map + report */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="rounded-xl border border-white/5 bg-[#0D1526] p-4 flex-1 flex flex-col h-full">
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
        </div>    
      </div>
    </div>
  )
}