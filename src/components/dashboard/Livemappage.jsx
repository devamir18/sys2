import { useState, useEffect } from 'react'
import LiveMap from './Livemap'

const GET_REPORTS_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'}/getreports`
const fallbackUserLocation = { lat: 0, lng: 0 }

export default function MapOverviewPage() {
  const [userLocation, setUserLocation] = useState(null)
  const [incidentFeed, setIncidentFeed] = useState([])

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
          
        const normalizedIncidents = rawIncidents.map((item) => ({
          id: item.id || item._id || Math.random().toString(),
          author: item.author || 'Anonymous',
          type: item.type || 'Alert',
          text: item.text || item.desc || item.description || '',
          lat: item.lat || 0,
          lng: item.lng || 0,
        }))

        setUserLocation(data.userLocation || null)
        setIncidentFeed(normalizedIncidents)
      } catch (err) {
        console.error(err)
      }
    }

    loadData()
  }, [])

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="rounded-xl border border-white/5 bg-[#0D1526] p-4 flex flex-col h-[500px]">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-slate-400">
            Your Location:{' '}
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mx-1 align-middle" />
            <span className="text-white font-medium">
              {userLocation?.name || (userLocation ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` : 'Your current area')}
            </span>
          </span>
          <span className="text-slate-500 font-mono">Live map view</span>
        </div>
        <div className="flex-1 rounded-lg overflow-hidden relative bg-[#111827]">
          <LiveMap center={userLocation || fallbackUserLocation} markers={incidentFeed} />
        </div>
      </div>
    </div>
  )
}