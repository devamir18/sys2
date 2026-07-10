// User location (Jos Plateau State)
export const USER_LOCATION = {
   lat: 9.9269,
  lng: 8.8961,
  name: 'Jos Plateau State',
}

// Live feed data
export const liveFeed = [
  {
    id: 1,
    author: 'John Okafor',
    location: 'Central Business District',
    time: '2 min ago',
    text: 'Armed robbery suspected in CBD. Two armed men spotted near the mall.',
    lat: 9.9280,
    lng: 8.8975,
  },
  {
    id: 2,
    author: 'Amina Hassan',
    location: 'Rayfield Estate',
    time: '5 min ago',
    text: 'Suspicious vehicle loitering near the residential area. White van with obscured plates.',
    lat: 9.9200,
    lng: 8.9050,
  },
  {
    id: 3,
    author: 'Chukwu Nwankwo',
    location: 'Bukuru',
    time: '12 min ago',
    text: 'Power outage reported in the residential section. Street lights are off.',
    lat: 9.9350,
    lng: 8.8900,
  },
  {
    id: 4,
    author: 'Security Unit Alpha',
    location: 'Gada Market Area',
    time: '8 min ago',
    text: 'Responded to theft report. Perimeter patrol increased in market zone.',
    lat: 9.9320,
    lng: 8.8850,
  },
  {
    id: 5,
    author: 'Blessing Okoro',
    location: 'Tudun Wada',
    time: '15 min ago',
    text: 'Suspicious activity reported. Neighborhood watch alerted.',
    lat: 9.9250,
    lng: 8.8920,
  },
  {
    id: 6,
    author: 'Tunde Adeyemi',
    location: 'Zaria Road',
    time: '20 min ago',
    text: 'Unauthorized persons attempting to access restricted area. Turned away by security.',
    lat: 9.9150,
    lng: 8.9100,
  },
]

// My reports
export const myReports = [
  {
    id: 'INC-039',
    type: 'Suspicious Vehicle',
    status: 'resolved',
    time: '2 days ago',
    zone: 'Central CBD',
    description: 'Unknown vehicle parked outside building for 2 hours.',
  },
  {
    id: 'INC-041',
    type: 'Noise Disturbance',
    status: 'responding',
    time: '1 hour ago',
    zone: 'Rayfield Estate',
    description: 'Loud music and shouting around midnight.',
  },
  {
    id: 'INC-038',
    type: 'Gate Malfunction',
    status: 'resolved',
    time: '3 days ago',
    zone: 'Gada Market Entrance',
    description: 'Main gate stuck open. Security notified.',
  },
]

// Advisories
export const advisories = [
  {
    level: 'high',
    text: 'Increased patrol in Central CBD following armed robbery report. Residents advised to stay indoors after 9PM.',
    time: '1h ago',
  },
  {
    level: 'medium',
    text: 'Rayfield Estate entrance will be temporarily closed for maintenance tonight 10PM – 12AM.',
    time: '3h ago',
  },
  {
    level: 'low',
    text: 'Community security meeting scheduled for Saturday 10AM at the Main Hall.',
    time: '1d ago',
  },
]

// Helper functions
export const initials = (name) => {
  const parts = name.split(' ')
  return parts.map((p) => p[0]).join('').toUpperCase().slice(0, 2)
}

export const avatarColor = (name) => {
  const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444']
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}
