import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// ---- Config -----------------------------------------------------------
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

// ---- Map Handlers & Icons -----------------------------------------------
function MapReadyHandler() {
  const map = useMap()
  useEffect(() => { setTimeout(() => map.invalidateSize(), 0) }, [map])
  return (
    <style>{`
      @keyframes crisis-ping { 0% { transform: scale(1); opacity: 1; } 75%, 100% { transform: scale(2.4); opacity: 0; } }
      .crisis-user-marker, .crisis-alert-marker { background: transparent; border: none; }
      .leaflet-container { background: #060b14; font-family: inherit; }
      .leaflet-control-zoom a { background: #0a0f1e !important; color: #94a3b8 !important; border: 1px solid rgba(255,255,255,0.08) !important; }
      .leaflet-control-zoom a:hover { background: #111827 !important; color: #22d3ee !important; }
      .leaflet-control-attribution { background: rgba(10,15,30,0.7) !important; color: #64748b !important; }
      .leaflet-control-attribution a { color: #64748b !important; }
    `}</style>
  )
}

function userDivIcon() {
  return L.divIcon({
    className: 'crisis-user-marker',
    html: `
      <div style="position:relative; width:16px; height:16px;">
        <span style="position:absolute; inset:-8px; border-radius:9999px; background:rgba(34,211,238,0.3); animation: crisis-ping 1.8s cubic-bezier(0,0,0.2,1) infinite;"></span>
        <span style="position:relative; display:block; width:16px; height:16px; border-radius:9999px; background:#22d3ee; border:2px solid #060b14; box-shadow:0 0 10px #22d3ee;"></span>
      </div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

function alertDivIcon() {
  return L.divIcon({
    className: 'crisis-alert-marker',
    html: `<span style="display:block; width:10px; height:10px; border-radius:9999px; background:#ef4444; border:2px solid #060b14; box-shadow:0 0 8px #ef4444;"></span>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  })
}

// ---- Component -----------------------------------------------------------------
export default function LiveMap({ center, markers }) {
  return (
    <MapContainer center={[center.lat, center.lng]} zoom={14} className="w-full h-full z-0">
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} maxZoom={19} />
      <MapReadyHandler />
      <Marker position={[center.lat, center.lng]} icon={userDivIcon()} />
      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]} icon={alertDivIcon()} />
      ))}
    </MapContainer>
  )
}
 