import { useState, createContext, useContext, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Mail, Lock, ArrowRight, MapPin, User } from 'lucide-react'
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

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [view, setView] = useState('landing');

  useEffect(() => {
    const savedUser = localStorage.getItem('blockforge_user');
    
    if (savedUser && savedUser !== 'undefined') {
      try {
        setCurrentUser(JSON.parse(savedUser));
        setView('dashboard');
      } catch (e) {
        console.error("Corrupted local auth token detected. Resetting payload session tracker.");
        localStorage.removeItem('blockforge_user');
      }
    }
    setAuthChecked(true);
  }, []);

  const loginUser = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('blockforge_user', JSON.stringify(userData));
    setView('dashboard');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('blockforge_user');
    setView('landing');
  };

  if (!authChecked) return null;

  return (
    <AuthContext.Provider value={{ currentUser, view, setView, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}


function EmbeddedLoginForm() {
  const { loginUser } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [locatingStatus, setLocatingStatus] = useState('Determining network node...');

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocatingStatus('GPS Telemetry unsupported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoordinates({ lat: latitude.toFixed(4), lng: longitude.toFixed(4) });
        setLocatingStatus(`Node Lock: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      },
      (err) => {
        console.warn("Location permission denied or timeout. Using secure gateway.");
        setLocatingStatus('Fallback Protocol: Dynamic Network Gateway');
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim() || (isSignUp && !fullName.trim())) {
      setError('Please fill in all standard credentials.');
      return;
    }

    setIsLoading(true);

    const dynamicLocation = userCoordinates 
      ? `Lat: ${userCoordinates.lat}, Lng: ${userCoordinates.lng}`
      : "Secure Perimeter Proxy";

    try {
      const endpoint = isSignUp 
        ? 'https://security-sys-1.onrender.com//signup' 
        : 'https://security-sys-1.onrender.com//login';
      
      const payload = isSignUp 
        ? { username: fullName.trim(), email: email.trim(), password, activeLocation: dynamicLocation }
        : { email: email.trim(), password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'System authorization failed.');
      }

      console.log("Raw Server Authorization Payload Received:", data);

      const authenticatedUserObject = data.user || data;

      if (!authenticatedUserObject || typeof authenticatedUserObject !== 'object') {
        throw new Error("Server response did not contain a valid user data layout.");
      }

      loginUser(authenticatedUserObject);

    } catch (err) {
      setError(err.message || 'Network connectivity link lost. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060b14] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0D1526] border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl relative">
        <div className="mb-6 text-center">
          <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Shield size={20} className="text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {isSignUp ? 'System Registration' : 'System Authentication'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isSignUp ? 'Create network profile to initialize access' : 'Provide credentials to sync your active session'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Operator Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <User size={15} />
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Dev amir"
                  disabled={isLoading}
                  className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Mail size={15} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                disabled={isLoading}
                className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Security Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Lock size={15} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          <div className="bg-[#0b101d] border border-white/[0.03] rounded-xl p-3 flex items-center gap-2.5">
            <MapPin size={14} className={userCoordinates ? "text-emerald-400" : "text-cyan-500 animate-pulse"} />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold font-mono">Telemetry Feed</p>
              <p className="text-xs text-slate-300 font-mono truncate">{locatingStatus}</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-cyan-500 hover:bg-cyan-400 text-[#0B0E14] font-semibold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-1.5 transition-colors group disabled:opacity-50"
          >
            {isLoading ? 'Processing Network Link...' : isSignUp ? 'Register Network Profile' : 'Authenticate Portal'}
            {!isLoading && <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-400">
          {isSignUp ? 'Already have an initialized link?' : 'New deployment vector?'}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            disabled={isLoading}
            className="text-cyan-400 font-medium ml-1.5 hover:underline focus:outline-none disabled:opacity-50"
          >
            {isSignUp ? 'Authenticate Portal' : 'Register Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}


function DashboardLayout() {
  const { currentUser } = useAuth();
  
  // DYNAMIC FIX: Derive baseline initialization and sync seamlessly via context updates
  const [role, setRole] = useState(currentUser?.role || 'resident');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('overview');

  useEffect(() => {
    if (currentUser?.role) {
      setRole(currentUser.role);
    }
  }, [currentUser]);

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
  };

  return (
    <div className="flex h-screen bg-[#060b14] overflow-hidden font-['Inter'] relative z-0">
      <div className="relative z-10">
        <Sidebar 
          role={role} 
          open={sidebarOpen} 
          activePage={activePage} 
          onNavigate={setActivePage} 
          user={currentUser} 
        />
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
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

function AppContent() {
  const { currentUser, view, setView } = useAuth();

  useEffect(() => {
    if (view === 'dashboard' && !currentUser) {
      setView('landing');
    }
  }, [view, currentUser, setView]);

  if (view === 'dashboard' && !currentUser) {
    return null; 
  }

  if (view === 'dashboard') {
    return <DashboardLayout />
  }

  if (view === 'auth') {
    return <EmbeddedLoginForm />
  }

  return (
    <main className="bg-[#0A0F1E] min-h-screen overflow-x-hidden">
      <Navbar 
        onDashboard={() => setView(currentUser ? 'dashboard' : 'auth')} 
        onOpenLogin={() => setView(currentUser ? 'dashboard' : 'auth')} 
      />
      <Hero onOpenLogin={() => setView(currentUser ? 'dashboard' : 'auth')} />
      <HowItWorks />
      <Features />
      <Stats />
      <Testimonials />
      <Footer />
    </main>
  );
}