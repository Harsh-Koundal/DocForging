import { useState } from 'react';
import { SearchIcon, ActivityIcon,PlusIcon } from "lucide-react";
import FilePreviewLines from '../components/FilePreview';
import {useNavigate} from "react-router-dom";

const RECENT_FILES = [
  {
    id: 1, name: 'NerathiX_Ride_Platform_SRS', type: 'docx', date: 'Today, 9:11 AM',
    bg: 'bg-blue-50', lineBg: 'bg-blue-100', accentBg: 'from-blue-500 to-purple-500',
    avatars: [{ letter: 'A', color: 'bg-blue-500' }],
    badge: 'DOCX', badgeStyle: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2, name: 'Q3_Product_Roadmap_Final', type: 'pdf', date: 'Yesterday, 4:22 PM',
    bg: 'bg-orange-50', lineBg: 'bg-orange-100', accentBg: 'bg-orange-500',
    avatars: [{ letter: 'R', color: 'bg-green-500' }, { letter: 'M', color: 'bg-orange-500' }],
    badge: 'PDF', badgeStyle: 'bg-orange-100 text-orange-600'
  },
  {
    id: 3, name: 'Team_Sprint_Planning_Doc', type: 'collab', date: '2 hours ago',
    bg: 'bg-green-50', lineBg: 'bg-green-100', accentBg: 'bg-green-500',
    avatars: [{ letter: 'K', color: 'bg-purple-500' }, { letter: 'S', color: 'bg-red-500' }, { letter: 'T', color: 'bg-blue-500' }],
    badge: 'LIVE', badgeStyle: 'bg-green-100 text-green-600'
  },
];

const TEMPLATES = [
  { label: 'SRS Report', bg: 'bg-blue-50', accent: 'bg-blue-500', lineBg: 'bg-blue-100' },
  { label: 'Invoice', bg: 'bg-orange-50', accent: 'bg-orange-500', lineBg: 'bg-orange-100' },
  { label: 'Meeting Notes', bg: 'bg-green-50', accent: 'bg-green-500', lineBg: 'bg-green-100' },
  { label: 'Proposal', bg: 'bg-purple-50', accent: 'bg-purple-500', lineBg: 'bg-purple-100' },
];

const ACTIVITY = [
  { icon: 'edit', color: 'text-blue-500', bg: 'bg-blue-100', name: 'You edited NerathiX_Ride_Platform_SRS', sub: 'Section 2.1 updated · 12 changes', time: '9:11 AM' },
  { icon: 'user', color: 'text-green-500', bg: 'bg-green-100', name: 'Rohan joined Team_Sprint_Planning_Doc', sub: 'Now editing in real-time', time: '8:44 AM' },
  { icon: 'pdf', color: 'text-orange-500', bg: 'bg-orange-100', name: 'Q3_Product_Roadmap_Final converted', sub: 'PDF → DOCX · Ready to edit', time: 'Yesterday' },
  { icon: 'ai', color: 'text-purple-500', bg: 'bg-purple-100', name: 'AI drafted Business_Proposal_v2', sub: '1,240 words generated', time: 'Mon' },
];

const TABS = ['All files', 'Owned by me', 'Shared', 'Starred'];

const ArrowIcon = () => (
  <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" stroke="#3b7ef6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-dm-sans text-gray-900">
      <div className="max-w-8xl mx-auto px-8 py-8 pb-16">
        {/* Hero */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-12 mb-8 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-blue-500/20 rounded-full" />
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-purple-500/15 rounded-full" />
          <div className="relative z-10 flex items-center justify-between gap-8 flex-wrap">
            <div>
              <h1 className="font-syne text-4xl font-extrabold text-white leading-tight mb-3">
                Welcome back,<br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent">
                  Ankur.
                </span>
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-md mb-7">
                Your workspace is ready. Pick up where you left off, or start something new.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                onClick={navigate("/:id")}>
                  <PlusIcon/>
                  New Document
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/15 rounded-xl font-normal hover:bg-white/20 transition-colors">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Upload File
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 mb-8 shadow-sm">
          <SearchIcon className="text-gray-400" />
          <input
            type="text"
            placeholder="Search documents, templates, or teammates…"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            className="flex-1 border-none outline-none font-dm-sans text-sm text-gray-900 bg-transparent"
          />
          <div className="flex gap-0.5">
            {['⌘', 'K'].map(k => (
              <span key={k} className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs text-gray-500 font-mono">{k}</span>
            ))}
          </div>
        </div>

        {/* Quick Create */}
        <SectionHead title="Create new" />
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            {
              label: 'Blank Document', desc: 'Start fresh with a clean editor',
              color: 'text-blue-600', bg: 'bg-blue-100',
              icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#3b7ef6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><polyline points="14,2 14,8 20,8" stroke="#3b7ef6" strokeWidth="1.5" /><line x1="9" y1 ="13" x2="15" y2="13" stroke="#3b7ef6" strokeWidth="1.5" strokeLinecap="round" /><line x1="9" y1="17" x2="13" y2="17" stroke="#3b7ef6" strokeWidth="1.5" strokeLinecap="round" /></svg>
            },
            {
              label: 'Convert PDF', desc: 'PDF → editable DOCX instantly',
              color: 'text-orange-600', bg: 'bg-orange-100',
              icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#e07b20" strokeWidth="1.5" /><path d="M8 12h8M8 8h5M8 16h6" stroke="#e07b20" strokeWidth="1.5" strokeLinecap="round" /></svg>
            },
            {
              label: 'Collaborate', desc: 'Invite team to co-edit live',
              color: 'text-green-600', bg: 'bg-green-100',
              icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#18a870" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="#18a870" strokeWidth="1.5" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#18a870" strokeWidth="1.5" strokeLinecap="round" /></svg>
            },
            {
              label: 'AI Writer', desc: 'Generate drafts with AI assist',
              color: 'text-purple-600', bg: 'bg-purple-100',
              icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" stroke="#7b5bf7" strokeWidth="1.5" strokeLinejoin="round" /></svg>
            },
          ].map(({ label, desc, color, bg, icon }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 mb-4">
                {icon}
              </div>
              <div className={`font-syne text-sm font-bold ${color} mb-1`}>{label}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>

        {/* Recent Files */}
        <SectionHead title="Recent files" showLink />
        <div className="flex gap-1 p-1 bg-white border border-gray-200 rounded-lg mb-5 w-fit">
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} className={`px-3.5 py-1.5 rounded-md text-sm cursor-pointer font-medium transition-colors ${activeTab === i ? 'text-white bg-gradient-to-br from-blue-500 to-purple-500 shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>{tab}</button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {RECENT_FILES.map(file => (
            <div key={file.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className={`h-44 ${file.bg} p-6 relative`}>
                <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-semibold tracking-wide uppercase ${file.badgeStyle}`}>
                  {file.badge}
                </span>
                <FilePreviewLines lineBg={file.lineBg} accentBg={`bg-gradient-to-r ${file.accentBg}`} />
              </div>
              <div className="p-3.5 border-t border-gray-200">
                <div className="text-sm font-semibold text-gray-900 mb-1 truncate">{file.name}</div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{file.date}</span>
                  <div className="flex">
                    {file.avatars.map((av, i) => (
                      <div key={i} className={`w-5 h-5 rounded-full ${av.color} flex items-center justify-center text-xs font-semibold text-white border-2 border-white -ml-1.5`}>{av.letter}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Templates + Activity */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Templates */}
          <div>
            <SectionHead title="Templates" showLink />
            <div className="grid grid-cols-4 gap-3.5">
              {TEMPLATES.map(t => (
                <div key={t.label} className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className={`${t.bg} p-3 flex flex-col gap-1`}>
                    <div className={`h-1.5 rounded ${t.accent} w-3/5`} />
                    <div className={`h-1 rounded ${t.lineBg}`} />
                    <div className={`h-1 rounded ${t.lineBg} w-3/5`} />
                    <div className={`h-1 rounded ${t.lineBg}`} />
                    <div className={`h-1 rounded ${t.lineBg} w-2/5`} />
                  </div>
                  <div className="text-xs font-medium p-2 text-gray-900 border-t border-gray-200">{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div>
            <SectionHead title="Recent activity" />
            <div className="flex flex-col gap-2">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-center gap-3.5 p-2.5 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all">
                  <div className={`w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0`}>
                    <ActivityIcon type={a.icon} className={a.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{a.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{a.sub}</div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Storage */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex justify-between items-start mb-5">
            <div>
              <div className="font-syne text-base font-bold">Cloud Storage</div>
              <div className="text-xs text-gray-500 mt-0.5">3.8 GB used of 10 GB</div>
            </div>
            <button className="px-3.5 py-1.5 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg text-xs font-medium cursor-pointer hover:shadow-md transition-shadow">
              Upgrade to Pro
            </button>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
            <div className="h-full w-2/5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[['bg-blue-500', 'Documents · 1.2 GB'], ['bg-orange-500', 'PDFs · 1.8 GB'], ['bg-green-500', 'Images · 0.5 GB'], ['bg-gray-300', 'Free · 6.2 GB']].map(([color, label]) => (
              <div key={label} className="flex items-center gap-1 text-xs text-gray-500">
                <div className={`w-2 h-2 rounded ${color} flex-shrink-0`} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHead({ title, showLink }) {
  return (
    <div className="flex items-baseline justify-between mb-4 px-0.5">
      <span className="font-syne text-lg font-bold text-gray-900">{title}</span>
      {showLink && (
        <a className="text-sm text-blue-500 cursor-pointer no-underline font-medium flex items-center gap-1 hover:opacity-75 transition-opacity">
          View all <ArrowIcon />
        </a>
      )}
    </div>
  );
}

export default Home;