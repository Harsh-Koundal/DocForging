import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

/* ─── Feature Carousel Data ─────────────────────────────────────── */
const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="9" y1="17" x2="13" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'PDF → DOCX Conversion',
    desc: 'Extract, preserve, and edit any PDF instantly — tables, images, and layouts all included.',
    color: '#3b7ef6',
    bg: 'rgba(59,126,246,0.08)',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Rich Document Editor',
    desc: 'Full-featured editing: headings, tables, lists, images, comments, and track changes.',
    color: '#18a870',
    bg: 'rgba(24,168,112,0.08)',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Real-time Collaboration',
    desc: 'Co-edit documents live. See cursors, comments, and changes from your entire team.',
    color: '#e07b20',
    bg: 'rgba(224,123,32,0.08)',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    label: 'Cloud Storage & Sync',
    desc: 'All your documents stored securely in the cloud, accessible from any device, anywhere.',
    color: '#9333ea',
    bg: 'rgba(147,51,234,0.08)',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'AI-Powered Writing',
    desc: 'Let AI draft, rewrite, summarize, or translate your documents instantly on demand.',
    color: '#e0285a',
    bg: 'rgba(224,40,90,0.08)',
  },
];

const EyeOff = () => (
  <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const EyeOn = () => (
  <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
   });
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    intervalRef.current = setInterval(() => {
      setActiveFeature(p => (p + 1) % FEATURES.length);
    }, 3200);
    return () => clearInterval(intervalRef.current);
  }, []);

  const selectFeature = (i) => {
    setActiveFeature(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveFeature(p => (p + 1) % FEATURES.length);
    }, 3200);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/signup`,
        formData,
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
      setFormData({ name: '', email: '', password: '' });
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    setOauthLoading(provider);
    window.location.href = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/${provider}`;
  };

  const f = FEATURES[activeFeature];

  return (
    <div className="min-h-screen bg-slate-50 flex relative overflow-hidden">

      {/* Subtle background mesh */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 40%, rgba(59,126,246,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 80% 70%, rgba(147,51,234,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 60% 10%, rgba(24,168,112,0.03) 0%, transparent 60%)
          `,
        }}
      />

      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div className="flex w-full min-h-screen relative z-10">

        {/* ── Left Panel ── */}
        <div className="flex-1 hidden lg:flex flex-col px-14 py-12 border-r border-slate-200 bg-white">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <div
              className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #3b7ef6 0%, #7b5bf7 100%)',
                boxShadow: '0 4px 16px rgba(59,126,246,0.25)',
              }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="9" y1="13" x2="15" y2="13" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <line x1="9" y1="17" x2="13" y2="17" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-slate-800 text-xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Doc<span className="text-[#3b7ef6]">Forging</span>
            </span>
          </a>

          {/* Showcase */}
          <div className="flex-1 flex flex-col justify-center py-12">
            <h1
              className={`font-extrabold leading-[1.1] tracking-tight mb-4 text-5xl text-slate-800 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Every document,
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #3b7ef6, #7b5bf7)' }}
              >
                perfectly forged.
              </span>
            </h1>

            <p
              className={`text-[15px] leading-[1.7] max-w-[440px] mb-12 text-slate-500 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            >
              Convert PDFs, edit documents, collaborate in real-time — the all-in-one workspace for professional teams.
            </p>

            {/* Animated Feature Card */}
            <div
              className={`bg-slate-50 border border-slate-200 rounded-2xl p-7 max-w-[460px] mb-6 min-h-[130px] shadow-sm transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3.5 transition-all duration-300"
                style={{ background: f.bg, color: f.color }}
              >
                {f.icon}
              </div>
              <div className="text-base font-semibold mb-1.5 transition-colors duration-300" style={{ color: f.color }}>
                {f.label}
              </div>
              <div className="text-[13.5px] leading-[1.65] text-slate-500">
                {f.desc}
              </div>
            </div>

            {/* Dot navigation */}
            <div className={`flex gap-2 transition-opacity duration-700 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              {FEATURES.map((ft, i) => (
                <button
                  key={i}
                  onClick={() => selectFeature(i)}
                  className="cursor-pointer border-none bg-transparent py-1 flex items-center"
                >
                  <div
                    className="h-[3px] rounded-sm transition-all duration-300"
                    style={{
                      width: activeFeature === i ? '32px' : '20px',
                      background: activeFeature === i ? ft.color : 'rgba(0,0,0,0.12)',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Brand strip */}
          <div className="flex items-center gap-1.5 text-xs tracking-widest text-slate-400">
            <span className="inline-block w-4 h-px bg-slate-300" />
            Trusted by 50,000+ professionals
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div
          className={`w-full lg:w-[480px] flex-shrink-0 flex flex-col justify-center px-8 lg:px-14 py-12 bg-white max-w-[480px] mx-auto lg:max-w-none lg:mx-0 transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}
        >
          <h2
            className="text-slate-800 text-[26px] font-bold tracking-tight mb-1.5"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Welcome To DocForging
          </h2>
          <p className="text-sm mb-9 text-slate-500">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#3b7ef6] font-medium bg-transparent border-none cursor-pointer p-0 hover:underline"
            >
              Sign in instead
            </button>
          </p>

          {/* OAuth */}
          <div className="grid grid-cols-2 gap-2.5 mb-7">
            {[
              {
                provider: 'google',
                label: 'Google',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                ),
              },
              {
                provider: 'microsoft',
                label: 'Microsoft',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M11.4 2H2v9.4h9.4V2z" fill="#f25022"/>
                    <path d="M22 2h-9.4v9.4H22V2z" fill="#7fba00"/>
                    <path d="M11.4 12.6H2V22h9.4v-9.4z" fill="#00a4ef"/>
                    <path d="M22 12.6h-9.4V22H22v-9.4z" fill="#ffb900"/>
                  </svg>
                ),
              },
            ].map(({ provider, label, icon }) => (
              <button
                key={provider}
                disabled={!!oauthLoading}
                onClick={() => handleOAuth(provider)}
                className="flex items-center justify-center gap-2.5 px-4 py-[11px] bg-white border border-slate-200 rounded-xl text-[13.5px] font-medium text-slate-700 cursor-pointer transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-px shadow-sm active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {oauthLoading === provider ? (
                  <div className="w-3.5 h-3.5 border border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                ) : icon}
                {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3.5 mb-7 text-xs tracking-widest uppercase text-slate-400">
            <span className="flex-1 h-px bg-slate-200" />
            or continue with email
            <span className="flex-1 h-px bg-slate-200" />
          </div>

          <form onSubmit={handleSignup}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-[13px] font-medium mb-2 text-slate-600">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                autoComplete="name"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[14.5px] text-slate-800 outline-none transition-all duration-200 placeholder-slate-300 focus:border-[#3b7ef6] focus:shadow-[0_0_0_3px_rgba(59,126,246,0.1)] shadow-sm"
                style={{ fontFamily: 'inherit' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[13px] font-medium mb-2 text-slate-600">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                autoComplete="email"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[14.5px] text-slate-800 outline-none transition-all duration-200 placeholder-slate-300 focus:border-[#3b7ef6] focus:shadow-[0_0_0_3px_rgba(59,126,246,0.1)] shadow-sm"
                style={{ fontFamily: 'inherit' }}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-[13px] font-medium mb-2 text-slate-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  autoComplete="current-password"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-12 text-[14.5px] text-slate-800 outline-none transition-all duration-200 placeholder-slate-300 focus:border-[#3b7ef6] focus:shadow-[0_0_0_3px_rgba(59,126,246,0.1)] shadow-sm"
                  style={{ fontFamily: 'inherit' }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0.5 flex items-center text-slate-400 transition-colors duration-200 hover:text-slate-600"
                >
                  {showPass ? <EyeOff /> : <EyeOn />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-[13px] px-5 border-none rounded-xl text-[14.5px] font-semibold text-white cursor-pointer flex items-center justify-center gap-2 mb-6 transition-all duration-200 hover:opacity-90 hover:-translate-y-px active:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{
                background: 'linear-gradient(135deg, #3b7ef6 0%, #6a5bf7 100%)',
                boxShadow: '0 4px 16px rgba(59,126,246,0.3)',
                fontFamily: 'inherit',
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signuping in…
                </>
              ) : 'Sign in to DocForging'}
            </button>
          </form>

          <p className="text-center text-[13.5px] text-slate-500">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#3b7ef6] font-semibold bg-transparent border-none cursor-pointer p-0 hover:underline"
            >
              Sign in instead
            </button>
          </p>

          <p className="mt-8 text-[11.5px] text-center leading-relaxed text-slate-400">
            By signing in, you agree to our{' '}
            <a href="#" className="text-slate-500 hover:opacity-70 transition-opacity">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-slate-500 hover:opacity-70 transition-opacity">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;