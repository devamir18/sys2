import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Dashboard from './components/dashboard/Dashboard'

export default function App() {
  const [view, setView] = useState('landing')

  if (view === 'dashboard') {
    return <Dashboard onBack={() => setView('landing')} />
  }

  return (
    <main className="bg-[#0A0F1E] min-h-screen overflow-x-hidden">
      <Navbar onDashboard={() => setView('dashboard')} />
      <Hero onDashboard={() => setView('dashboard')} />
      <Dashboard onBack={() => setView('landing')} />
      <HowItWorks />
      <Features />
      <Stats />
      <Testimonials />
      <Footer />
    </main>
  )
}