import { useEffect, useState } from 'react';
import {
  FileText, ChevronDown,
  LogOut, Moon, Sun
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout } = useAuth();

  useEffect(()=>{
    const handleClick = () => setProfileOpen(false);
    if(profileOpen) {
      window.addEventListener('click', handleClick);
    }
    return () => window.removeEventListener('click', handleClick);
  },[profileOpen]);

  return (
    <nav className="nav-font sticky top-0 z-50 w-full bg-white border-b border-slate-200/80 backdrop-blur-sm">

        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-[60px] flex items-center gap-3 justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 no-underline flex-shrink-0 mr-2">
            <div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30">
              <FileText size={15} color="#fff" strokeWidth={2.2} />
            </div>
            <span className="logo-font text-[1.1rem] font-bold text-slate-800 hidden sm:block">
              Doc<span className="text-blue-500">Forging</span>
            </span>
          </a>
          <div className="flex items-center gap-1">
            <div className="border-t border-slate-100 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[13px] text-slate-600">
                {darkMode ? <Moon size={14} className="text-slate-400" strokeWidth={1.8} /> : <Sun size={14} className="text-slate-400" strokeWidth={1.8} />}
                Dark mode
              </div>
              <button
                onClick={() => setDarkMode(p => !p)}
                className={`relative w-9 h-5 rounded-full border-none cursor-pointer transition-all duration-200 ${darkMode ? 'bg-blue-500' : 'bg-slate-200'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${darkMode ? 'left-[calc(100%-18px)]' : 'left-0.5'}`} />
              </button>
            </div>
            {/* Profile */}
            {user ? (
              <div className="relative ml-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setProfileOpen(p => !p) }}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 bg-transparent border-none cursor-pointer transition-all duration-150"
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-500">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
                  </div>
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-[12.5px] font-medium text-slate-700 leading-tight">{user?.name || 'Guest'}</span>
                  </div>
                  <ChevronDown size={13} className={`hidden lg:block text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>


                {profileOpen && (
                  <div className="dropdown-enter absolute right-0 top-[calc(100%+8px)] w-[220px] bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden z-50"
                  onClick={(e)=> e.stopPropagation()}>
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[13px] font-bold bg-gradient-to-br from-blue-500 to-purple-500">{user?.name ? user.name.charAt(0).toUpperCase() : 'Guest'}</div>
                        <div>
                          <p className="text-[13px] font-semibold text-slate-800">{user?.name || 'Guest'}</p>
                          <p className="text-[11px] text-slate-400">{user?.email || 'Guest Email'}</p>
                        </div>
                      </div>
                    </div>
                    {/* Logout */}
                    <div className="border-t border-slate-100 py-1.5">
                      <button className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-red-500 hover:bg-red-50 bg-transparent border-none cursor-pointer transition-colors duration-100 text-left"
                        onClick={logout}>
                        <LogOut size={14} strokeWidth={1.8} />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a href="/login" className="px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-150">
                  Sign in
                </a>
                <a href="/signup" className="px-3 py-1.5 text-[13px] text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors duration-150">
                  Sign up
                </a>
              </div>
            )}
        </div>
        </div>

      </nav>
  );
}

export default Navbar;