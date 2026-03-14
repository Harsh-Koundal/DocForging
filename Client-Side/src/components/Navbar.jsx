import { useState } from 'react';
import {
  FileText, Upload, Search, Bell, Settings, ChevronDown,
  LayoutGrid, Clock, Star, Users, Zap, Menu, X, HelpCircle,
  LogOut, User, CreditCard, Moon, Sun
} from 'lucide-react';
import "../index.css";



 function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeLink, setActiveLink] = useState('My Documents');

  return (
    <>

      <nav className="nav-font sticky top-0 z-50 w-full bg-white border-b border-slate-200/80 backdrop-blur-sm">

        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-[60px] flex items-center gap-3 justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 no-underline flex-shrink-0 mr-2">
            <div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#3b7ef6 0%,#7b5bf7 100%)', boxShadow: '0 3px 12px rgba(59,126,246,0.3)' }}>
              <FileText size={15} color="#fff" strokeWidth={2.2} />
            </div>
            <span className="logo-font text-[1.1rem] font-bold text-slate-800 hidden sm:block">
              Doc<span style={{ color: '#3b7ef6' }}>Forging</span>
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
            <div className="relative ml-1">
              <button
                onClick={() => { setProfileOpen(p => !p); setNotifOpen(false); }}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 bg-transparent border-none cursor-pointer transition-all duration-150"
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#3b7ef6,#7b5bf7)' }}>
                  A
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-[12.5px] font-medium text-slate-700 leading-tight">Ankur</span>
                </div>
                <ChevronDown size={13} className={`hidden lg:block text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
              

              {profileOpen && (
                <div className="dropdown-enter absolute right-0 top-[calc(100%+8px)] w-[220px] bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[13px] font-bold"
                        style={{ background: 'linear-gradient(135deg,#3b7ef6,#7b5bf7)' }}>A</div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-800">Ankur Dev</p>
                        <p className="text-[11px] text-slate-400">ankur@docforging.io</p>
                      </div>
                    </div>
                  </div>
                  {/* Logout */}
                  <div className="border-t border-slate-100 py-1.5">
                    <button className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-red-500 hover:bg-red-50 bg-transparent border-none cursor-pointer transition-colors duration-100 text-left">
                      <LogOut size={14} strokeWidth={1.8} />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(p => !p)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 bg-transparent border-none cursor-pointer ml-1 transition-all duration-150"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="mobile-slide lg:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-3">
            {/* Mobile Search */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 mb-3">
              <Search size={14} className="text-slate-400" />
              <input type="text" placeholder="Search documents…" className="flex-1 bg-transparent border-none outline-none text-[13px] text-slate-700 placeholder-slate-400 nav-font" />
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-0.5 mb-3">
              {NAV_LINKS.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => { setActiveLink(label); setMobileOpen(false); }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 border-none cursor-pointer text-left
                    ${activeLink === label ? 'text-[#3b7ef6] bg-blue-50' : 'text-slate-600 bg-transparent hover:bg-slate-50'}`}
                >
                  <Icon size={16} strokeWidth={1.8} />
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-medium text-slate-600 bg-slate-100 border-none cursor-pointer">
                <Upload size={14} strokeWidth={1.8} />
                Upload
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-white border-none cursor-pointer"
                style={{ background: 'linear-gradient(135deg,#3b7ef6,#7b5bf7)' }}>
                <span className="text-base leading-none">+</span>
                New Document
              </button>
            </div>
          </div>
        )}

      </nav>

      {/* Backdrop for dropdowns */}
      {(profileOpen || notifOpen) && (
        <div className="fixed inset-0 z-40" onClick={() => { setProfileOpen(false); setNotifOpen(false); }} />
      )}
    </>
  );
}

export default Navbar;