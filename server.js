import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 5000
const dataFile = path.join(__dirname, 'data', 'incidents.json')

const defaultPayload = {
  userLocation: {
    lat: 9.9269,
    lng: 8.8961,
    name: 'Jos Plateau State',
  },
  incidents: [
    {
      id: 1,
      author: 'Security Unit Alpha',
      location: 'Central Business District',
      time: '2 min ago',
      text: 'Armed robbery reported near the mall. Patrol units have been dispatched.',
      lat: 9.928,
      lng: 8.8975,
    },
    {
      id: 2,
      author: 'Amina Hassan',
      location: 'Rayfield Estate',
      time: '5 min ago',
      text: 'Suspicious vehicle seen loitering near the residential area.',
      lat: 9.92,
      lng: 8.905,
    },
  ],
  advisories: [
    {
      level: 'high',
      text: 'Increased patrols in Central CBD after a robbery report.',
      time: '1h ago',
    },
    {
      level: 'medium',
      text: 'Rayfield Estate entrance will be temporarily closed for maintenance tonight.',
      time: '3h ago',
    },
  ],
}

async function loadData() {
  try {
    const raw = await fs.readFile(dataFile, 'utf8')
    return JSON.parse(raw)
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true })
    await fs.writeFile(dataFile, JSON.stringify(defaultPayload, null, 2))
    return defaultPayload
  }
}

async function saveData(payload) {
  await fs.writeFile(dataFile, JSON.stringify(payload, null, 2))
}

app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/incidents', async (_req, res) => {
  const payload = await loadData()
  res.json(payload)
})

app.post('/api/incidents', async (req, res) => {
  const { type = 'Other', desc, zone, author = 'Resident', lat, lng } = req.body

  if (!desc?.trim() || !zone?.trim()) {
    return res.status(400).json({ message: 'Description and zone are required.' })
  }

  const payload = await loadData()
  const nextIncident = {
    id: Date.now(),
    author: author.trim() || 'Resident',
    location: zone.trim(),
    time: 'just now',
    text: `${type}: ${desc.trim()}`,
    lat: Number(lat) || payload.userLocation.lat,
    lng: Number(lng) || payload.userLocation.lng,
  }

  payload.incidents.unshift(nextIncident)
  payload.advisories.unshift({
    level: /robbery|assault|fight/i.test(type) ? 'high' : 'medium',
    text: `${type} reported in ${zone.trim()}. Security teams are monitoring the area.`,
    time: 'just now',
  })

  if (payload.incidents.length > 12) {
    payload.incidents = payload.incidents.slice(0, 12)
  }

  if (payload.advisories.length > 4) {
    payload.advisories = payload.advisories.slice(0, 4)
  }

  await saveData(payload)
  res.status(201).json(nextIncident)
})

app.listen(port, () => {
  console.log(`Security backend running on http://localhost:${port}`)
})
