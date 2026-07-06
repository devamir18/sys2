import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Sidebar from './components/dashboard/Sidebar'
import TopBar from './components/dashboard/Topbar'
import OverviewPage from './components/dashboard/Overviewpage'
import LiveMapPage from './components/dashboard/Livemappage'
import ResidentView from './components/dashboard/ResidentView'

function DashboardLayout() {
  const [role, setRole] = useState('resident')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activePage, setActivePage] = useState('overview')

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <OverviewPage onNavigate={setActivePage} />
      case 'map':
        return <LiveMapPage />
      case 'reports':
        return <ResidentView page="reports" />
      case 'advisories':
        return <ResidentView page="advisories" />
      case 'settings':
        return <ResidentView page="settings" />
      case 'command':
        return <ResidentView page="command" />
      case 'incidents':
        return <ResidentView page="incidents" />
      case 'dispatch':
        return <ResidentView page="dispatch" />
      default:
        return <OverviewPage onNavigate={setActivePage} />
    }
  }

  return (
    <div className="flex h-screen bg-[#060b14] overflow-hidden font-['Inter'] relative z-0">
      <div className="relative z-10">
        <Sidebar role={role} open={sidebarOpen} activePage={activePage} onNavigate={setActivePage} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden relative z-0">
        <TopBar role={role} setRole={setRole} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('landing')

  if (view === 'dashboard') {
    return <DashboardLayout />
  }

  return (
    <main className="bg-[#0A0F1E] min-h-screen overflow-x-hidden">
      <Navbar onDashboard={() => setView('dashboard')} />
      <Hero onDashboard={() => setView('dashboard')} />
      <HowItWorks />
      <Features />
      <Stats />
      <Testimonials />
      <Footer />
    </main>
  )
}