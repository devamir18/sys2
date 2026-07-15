import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, MapPin, Camera, Loader2 } from 'lucide-react'
import LiveMap from "./LiveMap";
import { EmergencyHotlineBanner } from './Emergencycall'

const ACTIVE_USER = typeof RESIDENT_ID !== 'undefined' ? RESIDENT_ID : 'Resident';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://security-sys-1.onrender.com/'
const REPORTS_ENDPOINT = `${API_BASE_URL}/reports`
const GET_REPORTS_ENDPOINT = `${API_BASE_URL}/getreports`
const IMAGE_UPLOAD_URL = import.meta.env.VITE_IMAGE_UPLOAD_URL || `${API_BASE_URL}/api/reports`
const fallbackUserLocation = { lat: 0, lng: 0 }; 

const initials = (name) => {
  const safeName = typeof name === 'string' && name.trim() ? name : 'Anonymous'
  const parts = safeName.split(' ')
  return parts.map((p) => p[0]).join('').toUpperCase().slice(0, 2)
}

const avatarColor = (name) => {
  const safeName = typeof name === 'string' && name.trim() ? name : 'Anonymous'
  const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444']
  const hash = safeName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

export default function OverviewPage({ onNavigate }) {
  const [reportOpen, setReportOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ type: '', desc: '', zone: '' })
  const [reportText, setReportText] = useState('')
  const [photoPreview, setPhotoPreview] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [incidentFeed, setIncidentFeed] = useState([])
  const [advisories, setAdvisories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const fileInputRef = useRef(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(GET_REPORTS_ENDPOINT, {
          headers: { Accept: 'application/json' },
        })
        if (!response.ok) throw new Error('Unable to load incidents')

        const data = await response.json()
        const rawIncidents = Array.isArray(data)
          ? data
          : data.reports || data.incidents || data.data || []
          
        const normalizedIncidents = rawIncidents.map((item) => {
          const latitude = item.lat || 0;
          const longitude = item.lng || 0;
          
          const derivedLocation = item.location || item.zone || 
            ((typeof latitude === 'number' || latitude) && (typeof longitude === 'number' || longitude) 
              ? `${Number(latitude).toFixed(4)}, ${Number(longitude).toFixed(4)}` 
              : 'General Zone');

          return {
            id: item.id || item._id || Math.random().toString(),
            author: item.author || item.residentId || item.name || 'Anonymous',
            type: item.type || 'Alert',
            text: item.text || item.desc || item.description || '',
            location: derivedLocation,
            time: item.time || '',
            lat: latitude,
            lng: longitude,
            image: item.image || item.imageUrl || ''
          }
        })

        const advisoriesData = Array.isArray(data.advisories)
          ? data.advisories
          : data.advisory || []

        setUserLocation(data.userLocation || null)
        setIncidentFeed(normalizedIncidents)
        setAdvisories(advisoriesData)
      } catch (err) {
        console.error(err)
        setErrorMessage('Unable to reach the backend yet. Please check your API URL and backend CORS settings.')
        setIncidentFeed([])
        setAdvisories([])
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  async function submitReportPayload(payload) {
    try {
      const response = await fetch(REPORTS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => '')
        throw new Error(errorText || 'Could not submit incident report')
      }

      const serverDoc = await response.json()
      
      const latitude = serverDoc.lat || payload.lat || 0;
      const longitude = serverDoc.lng || payload.lng || 0;
      const fallbackLocString = latitude && longitude ? `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` : 'General Zone';

      const unifiedIncident = {
        id: serverDoc.id || serverDoc._id || Math.random().toString(),
        author: serverDoc.author || serverDoc.residentId || serverDoc.name || payload.author || 'Anonymous',
        type: serverDoc.type || payload.type || 'Alert',
        text: serverDoc.text || serverDoc.desc || payload.text,
        location: serverDoc.location || serverDoc.zone || payload.location || fallbackLocString,
        time: serverDoc.time || payload.time,
        lat: latitude,
        lng: longitude,
        image: serverDoc.image || serverDoc.imageUrl || payload.image
      }

      setIncidentFeed((prev) => [unifiedIncident, ...prev])
      setErrorMessage('')
      return true
    } catch (err) {
      console.error("Submission Error:", err)
      setErrorMessage(err.message || 'Something went wrong while submitting the report.')
      return false
    }
  }

  async function handleQuickReportSubmit() {
    if (!reportText.trim() || isUploading) return

    const currentTimeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const activeZone = userLocation?.name || (coordinates ? `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}` : 'General Zone')

    const payload = {
      author: ACTIVE_USER,
      residentId: ACTIVE_USER,
      name: ACTIVE_USER,
      type: 'Community Report',
      text: reportText.trim(),
      description: reportText.trim(),
      location: activeZone,
      zone: activeZone,
      time: currentTimeString,
      lat: coordinates?.lat || 0,
      lng: coordinates?.lng || 0,
      image: uploadedImageUrl || '',
    }

    const success = await submitReportPayload(payload)
    if (success) {
      setReportText('')
      setPhotoPreview(null)
      setCoordinates(null)
      setUploadedImageUrl(null)
    }
  }

  async function handleModalSubmit() {
    if (!form.type || !form.desc.trim() || !form.zone.trim() || isUploading) {
      setErrorMessage('Please fill out all fields before submitting.')
      return
    }

    const currentTimeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const activeZone = form.zone.trim()

    const payload = {
      author: ACTIVE_USER,
      residentId: ACTIVE_USER,
      name: ACTIVE_USER,
      type: form.type,
      text: form.desc.trim(),
      description: form.desc.trim(),
      location: activeZone,
      zone: activeZone,
      time: currentTimeString,
      lat: coordinates?.lat || 0,
      lng: coordinates?.lng || 0,
      image: uploadedImageUrl || '',
    }

    const success = await submitReportPayload(payload)
    if (success) {
      setSubmitted(true)
      setForm({ type: '', desc: '', zone: '' })
      setPhotoPreview(null)
      setCoordinates(null)
      setUploadedImageUrl(null)
      setTimeout(() => {
        setReportOpen(false)
        setSubmitted(false)
      }, 2000)
    }
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    const localPreview = URL.createObjectURL(file)
    setPhotoPreview(localPreview)
    setUploadedImageUrl(null)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(IMAGE_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Image upload failed')

      const data = await response.json().catch(() => ({}))
      const remoteImageUrl = data.url || data.imageUrl || data.fileUrl || data.path || data.filename || null

      if (remoteImageUrl) {
        setUploadedImageUrl(remoteImageUrl)
        setPhotoPreview(remoteImageUrl)
      }
    } catch (err) {
      console.error(err)
      setErrorMessage('Photo upload failed, but the report can still be submitted without it.')
    } finally {
      setIsUploading(false)
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Error retrieving geolocation:', error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      )
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-7xl mx-auto">
      <EmergencyHotlineBanner />

      <div className="bg-[#0D1526] border border-white/5 rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 min-w-0 flex flex-col">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between ">
              <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                Live Incident Map
              </span>
              <button
                onClick={() => onNavigate?.('map')}
                className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                {incidentFeed.length} active zones · view full map
              </button>
            </div>
            
            <div className="h-96 w-full relative">
              <LiveMap 
                center={userLocation || fallbackUserLocation}
                markers={incidentFeed}
              />
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0D1526] p-4 mb-4 w-full mt-12 max-w-3xl mx-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold text-white">Report Threat to Area Feed</p>
                <button 
                  onClick={() => setReportOpen(true)}
                  className="text-xs text-cyan-400 underline decoration-cyan-500/30 hover:text-cyan-300"
                >
                  Detailed Form
                </button>
              </div>
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
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 bg-[#111827] hover:bg-white/10 text-slate-300 text-xs font-medium px-3 py-2 rounded-lg border border-white/10 transition-colors disabled:opacity-50"
                  >
                    {isUploading ? <Loader2 size={13} className="animate-spin" /> : <Camera size={13} />} 
                    {isUploading ? 'Uploading...' : 'Add Photo Evidence'}
                  </button>
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    className="hidden" 
                    onChange={handlePhotoChange} 
                  />
                  {photoPreview && (
                    <div className="relative w-10 h-10 rounded-md overflow-hidden border border-white/10">
                      <img src={photoPreview} alt="evidence preview" className="w-full h-full object-cover" />
                      <button
                        onClick={() => { setPhotoPreview(null); setCoordinates(null); setUploadedImageUrl(null); }}
                        className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 animate-none text-white flex items-center justify-center"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  )}
                  {coordinates && (
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-1 rounded">
                      GPS Locked
                    </span>
                  )}
                </div>
                <button
                  disabled={isUploading}
                  onClick={handleQuickReportSubmit}
                  className="bg-cyan-500 hover:bg-cyan-400 text-[#0B0E14] text-xs font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l border-white/5 p-4 flex flex-col h-[550px] md:h-[620px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide sticky top-0 bg-[#0D1526] py-1 z-10">LIVE ALERTS FEED</h3>
            {errorMessage && <p className="text-xs text-amber-400 mb-3">{errorMessage}</p>}
            {isLoading ? (
              <p className="text-sm text-slate-400">Loading live alerts…</p>
            ) : (
              <div className="space-y-3 pb-4">
                {incidentFeed.map((item) => (
                  <div key={item.id} className="rounded-xl bg-[#111827] p-4 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#0B0E14] shrink-0"
                        style={{ background: avatarColor(item.author || item.type) }}
                      >
                        {initials(item.author || 'Anonymous')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white truncate">{item.author}</p>
                        <p className="text-xs text-slate-500 truncate" title={item.location}>{item.location} · {item.time}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-3 break-words">{item.text}</p>
                    
                    {item.image && (
                      <div className="mt-2 rounded-lg overflow-hidden border border-white/10 bg-[#0D1526]/40 max-h-44 flex items-center justify-center">
                        <img 
                          src={item.image} 
                          alt="Incident evidence" 
                          className="w-full h-full object-cover max-h-44"
                          onError={(e) => { e.target.classList.add('hidden') }} 
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0D1526] border border-white/5 rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="px-4 py-3 border-b border-white/5">
            <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Security Advisories</span>
          </div>
          <div className="divide-y divide-white/5">
            {(advisories.length ? advisories : []).map((a, i) => (
              <div key={i} className={`px-4 py-3 border-l-2 ${a.level === 'high' ? 'border-red-500' : a.level === 'medium' ? 'border-amber-500' : 'border-blue-500'}`}>
                <p className="text-xs text-slate-300 leading-relaxed mb-1">{a.text}</p>
                <p className="text-xs text-slate-600">{a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {reportOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 pointer-events-auto"
            onClick={(e) => e.target === e.currentTarget && setReportOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0D1526] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl z-50 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <span className="font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Report an Incident</span>
                <button onClick={() => setReportOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              {submitted ? (
                <div className="p-10 text-center">
                  <div className="w-14 h-14 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={26} className="text-emerald-400" />
                  </div>
                  <p className="text-white font-semibold text-lg mb-1">Report Submitted</p>
                  <p className="text-slate-400 text-sm">Security units have been alerted.</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {errorMessage && <p className="text-xs text-amber-400">{errorMessage}</p>}
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Incident Type</label>
                    <select
                      value={form.type}
                      className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                      onChange={e => setForm({ ...form, type: e.target.value })}
                    >
                      <option value="" className="bg-[#0D1526]">Select type...</option>
                      <option className="bg-[#0D1526]">Armed Robbery</option>
                      <option className="bg-[#0D1526]">Suspicious Activity</option>
                      <option className="bg-[#0D1526]">Trespassing</option>
                      <option className="bg-[#0D1526]">Vandalism</option>
                      <option className="bg-[#0D1526]">Noise Disturbance</option>
                      <option className="bg-[#0D1526]">Fight / Assault</option>
                      <option className="bg-[#0D1526]">Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Zone / Location</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        value={form.zone}
                        placeholder="e.g. Phase 2, Block C"
                        className="w-full bg-[#111827] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
                        onChange={e => setForm({ ...form, zone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Description</label>
                    <textarea
                      rows={3}
                      value={form.desc}
                      placeholder="Describe what you saw..."
                      className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 resize-none"
                      onChange={e => setForm({ ...form, desc: e.target.value })}
                    />
                  </div>
                  <div 
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                    className={`flex items-center gap-2 border border-dashed border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:border-white/20 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Camera size={15} className="text-slate-500" />
                    <span className="text-xs text-slate-500">
                      {isUploading ? "Uploading file..." : photoPreview ? "Photo attached" : "Attach photo evidence"}
                    </span>
                  </div>
                  <button
                    disabled={isUploading}
                    onClick={handleModalSubmit}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0B0E14] font-semibold py-3 rounded-xl transition-all text-sm disabled:opacity-50"
                  >
                    Submit Report
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}