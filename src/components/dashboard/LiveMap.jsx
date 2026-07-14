import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const userIcon = new L.DivIcon({
  html: `
    <div style="
      background:#06b6d4;
      width:18px;
      height:18px;
      border-radius:50%;
      border:3px solid white;
      box-shadow:0 0 12px #06b6d4;
    "></div>
  `,
  className: '',
  iconSize: [18,18],
  iconAnchor:[9,9]
})

const alertIcon = new L.DivIcon({
  html: `
    <div style="
      background:#ef4444;
      width:14px;
      height:14px;
      border-radius:50%;
      border:2px solid white;
    "></div>
  `,
  className:'',
  iconSize:[14,14],
  iconAnchor:[7,7]
})


function safeNumber(value){
  const num = Number(value)
  return Number.isFinite(num) ? num : null
}


export default function LiveMap({center, markers=[]}){

  const lat = safeNumber(center?.lat) ?? 6.5244
  const lng = safeNumber(center?.lng) ?? 3.3792


  const safeMarkers = markers
    .map((item,index)=>{

      const markerLat = safeNumber(item.lat)
      const markerLng = safeNumber(item.lng)

      if(markerLat === null || markerLng === null){
        return null
      }

      return {
        id:index,
        lat:markerLat,
        lng:markerLng
      }

    })
    .filter(Boolean)


  return (
    <MapContainer
      center={[lat,lng]}
      zoom={13}
      style={{
        height:"100%",
        width:"100%"
      }}
    >

      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />


      <Marker
        position={[lat,lng]}
        icon={userIcon}
      />


      {
        safeMarkers.map(marker=>(
          <Marker
            key={marker.id}
            position={[marker.lat,marker.lng]}
            icon={alertIcon}
          />
        ))
      }

    </MapContainer>
  )
}

export default LiveMap