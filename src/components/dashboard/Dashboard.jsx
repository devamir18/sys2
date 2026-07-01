import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import ResidentView from './ResidentView'
import LeaderView from './LeaderView'

function Dashboard() {
  const [role, setRole] = useState('resident') // 'resident' | 'leader'
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-[#060b14] overflow-hidden font-['Inter']">
      <Sidebar role={role} open={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar role={role} setRole={setRole} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {role === 'resident' ? (
              <motion.div
                key="resident"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ResidentView />
              </motion.div>
            ) : (
              <motion.div
                key="leader"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <LeaderView />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
export default Dashboard;