import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Send, 
  ShieldAlert, 
  Users, 
  Building2, 
  CheckCircle, 
  TrendingUp, 
  AlertTriangle,
  X,
  Bell,
  Filter
} from 'lucide-react';
import { DEMO_SUSPICIOUS_RECRUITERS, COLLEGE_DASHBOARD_STATS } from '../data/mockData';

export const CollegeDashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<'ALL' | 'HIGH' | 'MEDIUM'>('ALL');
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertBroadcastSuccess, setAlertBroadcastSuccess] = useState(false);
  const [alertForm, setAlertForm] = useState({
    title: 'URGENT: Placement Cell Alert on Fake Telegram Recruiters',
    targetCompany: 'TechSphere Global / NextGen Cloud Labs Clone',
    message: 'Students are warned not to transfer any registration or laptop fee. Genuine recruiters never ask for advance payments.',
    channel: 'Campus Portal + WhatsApp Student Groups',
  });

  const filteredRecruiters = DEMO_SUSPICIOUS_RECRUITERS.filter((rec) => {
    const matchesSearch =
      rec.recruiter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRisk === 'ALL' || rec.risk === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const handleBroadcastAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertBroadcastSuccess(true);
    setTimeout(() => {
      setAlertBroadcastSuccess(false);
      setAlertModalOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Broadcast Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-400 mb-2 uppercase tracking-widest">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
              <span>COLLEGE & UNIVERSITY PLACEMENT CYBERSECURITY DESK</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Institutional Placement Dashboard
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400">
              Real-time threat monitoring, recruiter verification logs, and campus student alert broadcasts.
            </p>
          </div>

          <button
            onClick={() => setAlertModalOpen(true)}
            className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-xl transition-all glow-white-sm flex items-center gap-2 self-start md:self-auto whitespace-nowrap"
          >
            <Bell className="w-4 h-4 text-black" />
            <span>SEND SCAM ALERT TO STUDENTS</span>
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          {/* Stat 1 */}
          <div className="p-5 rounded-2xl glass-panel border border-white/8">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
              VERIFIED EMPLOYERS
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
              {COLLEGE_DASHBOARD_STATS.verifiedEmployers}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-2 font-mono">
              <CheckCircle className="w-3 h-3" />
              <span>Active Partner Whitelist</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-5 rounded-2xl glass-panel border border-white/8">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
              OFFERS CHECKED
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
              {COLLEGE_DASHBOARD_STATS.offersChecked.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-2 font-mono">
              <span>Across 48 Institutions</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-5 rounded-2xl glass-panel border border-white/8">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
              SCAMS REPORTED
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-500 tabular-nums">
              {COLLEGE_DASHBOARD_STATS.scamsReported.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-rose-400 mt-2 font-mono">
              <ShieldAlert className="w-3 h-3" />
              <span>Blacklisted Recruiter VPAs</span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-5 rounded-2xl glass-panel border border-white/8">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
              STUDENTS PROTECTED
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
              {COLLEGE_DASHBOARD_STATS.studentsProtected.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-2 font-mono">
              <span>Zero-Loss Fraud Preventions</span>
            </div>
          </div>
        </div>

        {/* Threat Trend Activity Chart & Risk Intelligence Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart Panel (2 cols) */}
          <div className="lg:col-span-2 p-6 rounded-2xl glass-panel border border-white/8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">
                    MONTHLY INTELLIGENCE TELEMETRY
                  </span>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Recruiter Fraud Attempts vs Prevented Scams
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span> Blocked Scams
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400"></span> Verified Offers
                  </span>
                </div>
              </div>

              {/* Responsive SVG Bar & Line Trend */}
              <div className="h-48 w-full mt-4 flex items-end justify-between gap-3 pt-6 border-b border-white/8 pb-2">
                {[
                  { month: 'May', scams: 84, verified: 120 },
                  { month: 'Jun', scams: 142, verified: 260 },
                  { month: 'Jul', scams: 210, verified: 340 },
                  { month: 'Aug', scams: 180, verified: 290 },
                  { month: 'Sep', scams: 290, verified: 410 },
                  { month: 'Oct', scams: 384, verified: 520 },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      {/* Scams bar */}
                      <div
                        style={{ height: `${(item.scams / 520) * 100}%` }}
                        className="w-1/2 max-w-[20px] bg-rose-500/80 rounded-t hover:bg-rose-400 transition-all"
                        title={`${item.month}: ${item.scams} scam attempts blocked`}
                      />
                      {/* Verified bar */}
                      <div
                        style={{ height: `${(item.verified / 520) * 100}%` }}
                        className="w-1/2 max-w-[20px] bg-emerald-500/70 rounded-t hover:bg-emerald-400 transition-all"
                        title={`${item.month}: ${item.verified} legitimate offers validated`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono mt-3">
              Trend Notice: Surge in fake WhatsApp recruitment bonds noted during October campus placement season.
            </p>
          </div>

          {/* Quick Threat Vectors */}
          <div className="p-6 rounded-2xl glass-panel border border-white/8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
                TOP SCAM MODI OPERANDI
              </span>
              <h3 className="text-base font-bold text-white tracking-tight mb-4">
                Active Campus Threat Vectors
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-rose-400">1. Laptop / Courier Advance</span>
                    <span className="font-mono text-[10px] text-neutral-400">54% reports</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">Asking ₹3,000–₹8,000 before sending company laptop</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-rose-400">2. Reverse UPI Collect Trap</span>
                    <span className="font-mono text-[10px] text-neutral-400">28% reports</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">Claiming student must enter UPI PIN to get stipend deposit</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-rose-400">3. Telegram Task Scam</span>
                    <span className="font-mono text-[10px] text-neutral-400">18% reports</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">Redirecting to anonymous groups for prepaid ratings tasks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suspicious Recruiters Table Section */}
        <div className="rounded-2xl glass-panel border border-white/8 overflow-hidden">
          {/* Table Controls Bar */}
          <div className="p-5 border-b border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Suspicious Recruiters & Flagged Entities
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Blacklisted phone numbers, email domains, and VPAs reported by placement cells.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search input */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search phone, domain or UPI ID..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                />
              </div>

              {/* Risk Filter Buttons */}
              <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/8 rounded-lg text-xs font-mono">
                <button
                  onClick={() => setFilterRisk('ALL')}
                  className={`px-2.5 py-1 rounded ${filterRisk === 'ALL' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  ALL
                </button>
                <button
                  onClick={() => setFilterRisk('HIGH')}
                  className={`px-2.5 py-1 rounded ${filterRisk === 'HIGH' ? 'bg-rose-500 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  HIGH RISK
                </button>
                <button
                  onClick={() => setFilterRisk('MEDIUM')}
                  className={`px-2.5 py-1 rounded ${filterRisk === 'MEDIUM' ? 'bg-amber-500 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  MEDIUM
                </button>
              </div>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] border-b border-white/6 text-neutral-400 font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-5">Recruiter / Entity</th>
                  <th className="py-3 px-4">Company Claimed</th>
                  <th className="py-3 px-4">Contact Handle</th>
                  <th className="py-3 px-4">Risk Level</th>
                  <th className="py-3 px-4 text-center">Reports</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-5 text-right">Last Seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {filteredRecruiters.length > 0 ? (
                  filteredRecruiters.map((row) => (
                    <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-white">
                        <div>{row.recruiter}</div>
                        <div className="text-[11px] text-neutral-500 font-normal line-clamp-1 mt-0.5 font-sans">
                          {row.scamModus}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-300">
                        {row.company}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-neutral-300">
                        <span className="text-[10px] text-neutral-500 block">{row.contactType}:</span>
                        <span>{row.contact}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            row.risk === 'HIGH'
                              ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {row.risk}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-center font-bold text-white tabular-nums">
                        {row.reports}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[11px] font-medium ${
                            row.status === 'Blacklisted'
                              ? 'text-rose-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono text-neutral-400 text-[11px]">
                        {row.lastSeen}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-neutral-500 font-mono">
                      No suspicious recruiters found matching &quot;{searchQuery}&quot;
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEND SCAM ALERT MODAL */}
        {alertModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-2xl glass-panel border border-white/15 p-6 bg-[#0a0a0a] shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Bell className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Broadcast Scam Alert to Students
                  </h3>
                </div>
                <button
                  onClick={() => setAlertModalOpen(false)}
                  className="p-1 rounded text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {alertBroadcastSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">
                    ALERT BROADCAST DISPATCHED
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Warning push notification and portal banner deployed to 28,450 active campus student accounts.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBroadcastAlert} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      Alert Title
                    </label>
                    <input
                      type="text"
                      required
                      value={alertForm.title}
                      onChange={(e) => setAlertForm({ ...alertForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      Target Entity / Flagged Recruiter
                    </label>
                    <input
                      type="text"
                      required
                      value={alertForm.targetCompany}
                      onChange={(e) => setAlertForm({ ...alertForm, targetCompany: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      Warning Message Body
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={alertForm.message}
                      onChange={(e) => setAlertForm({ ...alertForm, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      Dispatch Target Channels
                    </label>
                    <input
                      type="text"
                      value={alertForm.channel}
                      onChange={(e) => setAlertForm({ ...alertForm, channel: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setAlertModalOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>DISPATCH ALERT NOW</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
