import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Briefcase, 
  CreditCard, 
  MessageSquare, 
  ArrowRight, 
  Database, 
  PhoneCall, 
  Globe2, 
  Search, 
  Lock, 
  AlertTriangle,
  Building2,
  FileCheck2,
  Shield,
  CheckCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { HeroCanvas } from '../components/HeroCanvas';
import { ScamNetworkGraph } from '../components/ScamNetworkGraph';
import { DEMO_VERIFIED_EMPLOYERS, MANDATORY_LEGAL_NOTE } from '../data/mockData';

export const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#000000] text-white selection:bg-white/20">
      {/* ==================================================== */}
      {/* 1. CINEMATIC HERO SECTION                            */}
      {/* ==================================================== */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-white/8">
        {/* Subtle background cyber grid */}
        <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-400 mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            <span>SCAM VERIFICATION · DIGITAL TRUST · INDIA</span>
          </div>

          {/* Large Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.08] text-balance">
            Don’t Trust It. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
              Verify It.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Check internship offers, job offers, UPI requests, and suspicious SMS messages before you lose money.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/internship-scam"
              className="w-full sm:w-auto px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-black bg-white rounded-xl hover:bg-neutral-200 transition-all glow-white-md flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>CHECK A SCAM</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/report-scam"
              className="w-full sm:w-auto px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/12 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>REPORT A SCAM</span>
            </Link>
          </div>
        </div>

        {/* Futuristic Verification Core / Terrain Visual Canvas */}
        <div className="relative mt-2 max-w-7xl mx-auto px-2 sm:px-6">
          <HeroCanvas />
        </div>

        {/* Technology & Security Ecosystem Labels */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-6">
          <div className="py-4 px-6 rounded-2xl glass-panel border border-white/8 flex flex-wrap items-center justify-around gap-6 text-neutral-400">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <Database className="w-3.5 h-3.5 text-neutral-300" />
              <span>EMPLOYER REGISTRY</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-neutral-300" />
              <span>SCAM INTELLIGENCE</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <PhoneCall className="w-3.5 h-3.5 text-neutral-300" />
              <span>PHONE DATABASE</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5 text-neutral-300" />
              <span>DOMAIN CHECK</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <CreditCard className="w-3.5 h-3.5 text-neutral-300" />
              <span>UPI INTELLIGENCE</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5 text-neutral-300" />
              <span>SMS ANALYSIS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. INTRODUCTION SECTION                              */}
      {/* ==================================================== */}
      <section className="py-20 border-b border-white/8 bg-[#030303]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase block mb-2">
              INTRODUCTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              What is VerifySafe?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
              VerifySafe helps students and job seekers identify suspicious internship offers, job offers, UPI requests, and SMS messages before they become victims of fraud.
            </p>
          </div>

          {/* 4 Premium Horizontal Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Internship Scam */}
            <Link
              to="/internship-scam"
              className="p-6 rounded-2xl glass-panel glass-panel-hover flex items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/8 text-white group-hover:border-white/20 transition-all">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-neutral-200 transition-colors">
                    Internship Scam
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-md">
                    Verify offer letters demanding training fees, caution money, or laptop dispatch charges before signing or paying.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 mt-2" />
            </Link>

            {/* Card 2: Job Offer Scam */}
            <Link
              to="/job-offer-scam"
              className="p-6 rounded-2xl glass-panel glass-panel-hover flex items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/8 text-white group-hover:border-white/20 transition-all">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-neutral-200 transition-colors">
                    Job Offer Scam
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-md">
                    Audit recruiter credentials, unauthorized Telegram job funnels, spoofed domain headers, and forged appointment letters.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 mt-2" />
            </Link>

            {/* Card 3: UPI Scam */}
            <Link
              to="/upi-scam"
              className="p-6 rounded-2xl glass-panel glass-panel-hover flex items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/8 text-white group-hover:border-white/20 transition-all">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-neutral-200 transition-colors">
                    UPI Scam
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-md">
                    Inspect suspicious VPA handles, deceptive &quot;Enter PIN to receive money&quot; collect requests, and reported fraud VPAs.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 mt-2" />
            </Link>

            {/* Card 4: SMS Scam */}
            <Link
              to="/sms-scam"
              className="p-6 rounded-2xl glass-panel glass-panel-hover flex items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/8 text-white group-hover:border-white/20 transition-all">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-neutral-200 transition-colors">
                    SMS Scam
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-md">
                    Extract shortened bit.ly URLs, fake bank account suspension threats, YouTube task rewards, and unverified sender headers.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 mt-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 3. HOW IT WORKS                                      */}
      {/* ==================================================== */}
      <section id="how-it-works" className="py-20 border-b border-white/8 bg-[#000000]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase block mb-2">
              CHECK · ANALYZE · VERIFY · PROTECT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              How It Works
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
              Enter the details you received. We check available employer records and scam indicators, then give you a clear result.
            </p>
          </div>

          {/* 4 Large Vertical Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 01 */}
            <div className="p-6 rounded-2xl glass-panel border border-white/8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-neutral-400 tracking-wider">01. STEP</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">
                  Enter Details
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  Upload or paste the message, document, or payment request you received.
                </p>
                <div className="space-y-1.5 text-[11px] text-neutral-300 font-mono">
                  <div className="p-2 rounded bg-white/[0.02] border border-white/6">✓ Offer letter (PDF / img)</div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/6">✓ SMS text or screenshot</div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/6">✓ UPI VPA / Payment link</div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/6">✓ Recruiter email & phone</div>
                </div>
              </div>
            </div>

            {/* Card 02 */}
            <div className="p-6 rounded-2xl glass-panel border border-white/8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-neutral-400 tracking-wider">02. STEP</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">
                  Check Signals
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  The system scans known scam databases and verified employer registries.
                </p>
                <div className="space-y-1.5 text-[11px] text-neutral-300 font-mono">
                  <div className="p-2 rounded bg-white/[0.02] border border-white/6">◆ Employer Registry</div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/6">◆ Phone Reports</div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/6">◆ Domain Signals</div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/6">◆ UPI Reports</div>
                </div>
              </div>
            </div>

            {/* Card 03 */}
            <div className="p-6 rounded-2xl glass-panel border border-white/8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-neutral-400 tracking-wider">03. STEP</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">
                  Get Clear Result
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  Receive an unequivocal evaluation separating employer records from risk telemetry.
                </p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-semibold">
                    🟢 VERIFIED
                  </div>
                  <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-semibold">
                    🟡 UNVERIFIED
                  </div>
                  <div className="p-2 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 font-semibold">
                    🔴 POTENTIAL SCAM
                  </div>
                </div>
              </div>
            </div>

            {/* Card 04 */}
            <div className="p-6 rounded-2xl glass-panel border border-white/8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-neutral-400 tracking-wider">04. STEP</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">
                  Take Safe Action
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  Act according to concrete cybersecurity rules before sharing money or credentials.
                </p>
                <div className="space-y-1.5 text-[11px] text-neutral-300 font-mono">
                  <div className="p-2 rounded bg-white/[0.02] border border-white/6 text-rose-300">✕ Do not pay fees</div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/6 text-rose-300">✕ Do not share OTP</div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/6 text-rose-300">✕ Do not enter UPI PIN</div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/6 text-emerald-300">✓ Verify official site</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 4. CORE TRUST PRINCIPLE SECTION                      */}
      {/* ==================================================== */}
      <section className="py-20 border-b border-white/8 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase block mb-2">
              FOUNDATIONAL TRUST ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              AI Can Detect Signals. <br />
              Only Employers Can Confirm Offers.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We never label an offer legitimate simply because its formatting looks real. Trust requires dual verification.
            </p>
          </div>

          {/* Two Side-by-Side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Employer Confirmed */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-emerald-500/25 bg-emerald-500/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-1">
                TIER 1 · AUTHORITATIVE CONFIRMATION
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                EMPLOYER-CONFIRMED
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                This means the offer was matched directly against an employer registry where the employer has authorized and confirmed the offer.
              </p>
              <ul className="space-y-2 text-xs text-neutral-400 font-mono">
                <li className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle className="w-3.5 h-3.5" /> Official candidate registry match
                </li>
                <li className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle className="w-3.5 h-3.5" /> Authorized company domain SPF/DKIM
                </li>
                <li className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle className="w-3.5 h-3.5" /> Cryptographic reference ID verification
                </li>
              </ul>
            </div>

            {/* Card 2: System Risk Assessment */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 bg-white/[0.01]">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-neutral-300 flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block mb-1">
                TIER 2 · HEURISTIC INTELLIGENCE
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                SYSTEM RISK ASSESSMENT
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                This is only an analysis of scam indicators. Even if risk signals are absent, an offer cannot be guaranteed unless the employer confirms it.
              </p>
              <ul className="space-y-2 text-xs text-neutral-400 font-mono">
                <li className="flex items-center gap-2 text-neutral-300">
                  <Shield className="w-3.5 h-3.5 text-neutral-400" /> Free email detection (@gmail, @hotmail)
                </li>
                <li className="flex items-center gap-2 text-neutral-300">
                  <Shield className="w-3.5 h-3.5 text-neutral-400" /> Upfront fee & deposit demand scanning
                </li>
                <li className="flex items-center gap-2 text-neutral-300">
                  <Shield className="w-3.5 h-3.5 text-neutral-400" /> Phone number & UPI handle blacklist query
                </li>
              </ul>
            </div>
          </div>

          {/* Note Box */}
          <div className="mt-8 p-4 rounded-xl bg-black border border-white/10 text-center">
            <p className="text-xs text-neutral-300 font-mono italic">
              “{MANDATORY_LEGAL_NOTE}”
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 5. SCAM INTELLIGENCE NETWORK VISUAL                  */}
      {/* ==================================================== */}
      <section className="py-20 border-b border-white/8 bg-[#000000]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase block mb-2">
              REAL-TIME FRAUD CORRELATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Scam Intelligence Network
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
              When one student reports a scam recruiter, our graph correlates their phone number, email, domain, UPI ID, and offer format to protect all other students.
            </p>
          </div>

          <ScamNetworkGraph />
        </div>
      </section>

      {/* ==================================================== */}
      {/* 6. VERIFIED EMPLOYERS SHOWCASE                       */}
      {/* ==================================================== */}
      <section className="py-20 border-b border-white/8 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase block mb-2">
                DEMO PARTNER REGISTRY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Verified Employers
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-400">
                Employers can independently confirm their recruitment records. (Demo companies only)
              </p>
            </div>
            <Link
              to="/verified-employers"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              <span>REGISTER AS AN EMPLOYER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEMO_VERIFIED_EMPLOYERS.map((emp) => (
              <div
                key={emp.id}
                className="p-5 rounded-xl glass-panel border border-white/8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-white">
                      {emp.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      Demo Verified
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    {emp.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 line-clamp-1 mb-3">
                    {emp.industry}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/6 text-[10px] font-mono text-neutral-400">
                  <div className="flex justify-between">
                    <span>Domain:</span>
                    <span className="text-neutral-200">{emp.domain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="text-neutral-200">{emp.offerIdFormat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Method:</span>
                    <span className="text-emerald-400">Employer-confirmed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-[11px] text-neutral-400 font-mono">
              Note: VerifySafe uses demo companies for safe testing. Real enterprise onboarding requires corporate registry verification.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 7. CTA STRIP                                         */}
      {/* ==================================================== */}
      <section className="py-20 bg-[#000000]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-white/12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Received an offer or UPI request today?
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
              Take 60 seconds to inspect the email domain, phone number, and offer ID before transferring money or sending your identity credentials.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/internship-scam"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white rounded-xl hover:bg-neutral-200 transition-all glow-white-sm"
              >
                VERIFY INTERNSHIP
              </Link>
              <Link
                to="/job-offer-scam"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
              >
                VERIFY JOB OFFER
              </Link>
              <Link
                to="/upi-scam"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
              >
                CHECK UPI
              </Link>
              <Link
                to="/sms-scam"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
              >
                CHECK SMS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
