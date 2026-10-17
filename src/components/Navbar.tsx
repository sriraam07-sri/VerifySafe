import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ChevronRight, AlertOctagon, Building, GraduationCap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Internship Scam', href: '/internship-scam' },
    { label: 'Job Offer Scam', href: '/job-offer-scam' },
    { label: 'UPI Scam', href: '/upi-scam' },
    { label: 'SMS Scam', href: '/sms-scam' },
    { label: 'Verified Employers', href: '/verified-employers' },
    { label: 'College Dashboard', href: '/college-dashboard' },
    { label: 'Report Scam', href: '/report-scam' },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#000000]/80 backdrop-blur-md border-b border-white/8 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark & Security Glyph */}
        <Link 
          to="/" 
          onClick={closeMenu}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/12 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/[0.08] transition-all">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white font-mono flex items-center gap-1.5">
              VERIFYSAFE
            </span>
            <span className="text-[10px] tracking-wider text-neutral-400 -mt-1 font-sans hidden sm:block">
              Verify Before You Trust
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-neutral-400">
          <Link
            to="/internship-scam"
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              location.pathname === '/internship-scam' ? 'text-white font-semibold' : ''
            }`}
          >
            Internship Scam
          </Link>
          <Link
            to="/job-offer-scam"
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              location.pathname === '/job-offer-scam' ? 'text-white font-semibold' : ''
            }`}
          >
            Job Offer Scam
          </Link>
          <Link
            to="/upi-scam"
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              location.pathname === '/upi-scam' ? 'text-white font-semibold' : ''
            }`}
          >
            UPI Scam
          </Link>
          <Link
            to="/sms-scam"
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              location.pathname === '/sms-scam' ? 'text-white font-semibold' : ''
            }`}
          >
            SMS Scam
          </Link>
          <Link
            to="/report-scam"
            className={`hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              location.pathname === '/report-scam' ? 'text-rose-400 font-semibold' : ''
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Report Scam</span>
          </Link>
          <Link
            to="/college-dashboard"
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              location.pathname === '/college-dashboard' ? 'text-white font-semibold' : ''
            }`}
          >
            College Desk
          </Link>
        </nav>

        {/* Zone 3: 1 Primary Action (CHECK NOW button with white glow) & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/internship-scam"
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-white rounded-lg hover:bg-neutral-200 transition-all glow-white-sm whitespace-nowrap shrink-0"
          >
            CHECK NOW
          </Link>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 border border-white/8 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/8 bg-[#050505]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="p-3 bg-white/[0.02] border border-white/6 rounded-xl mb-4">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
              SCAM CATEGORIES
            </span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Link
                to="/internship-scam"
                onClick={closeMenu}
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/6 text-xs font-medium text-neutral-200 hover:text-white hover:bg-white/[0.06]"
              >
                Internship Scam
              </Link>
              <Link
                to="/job-offer-scam"
                onClick={closeMenu}
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/6 text-xs font-medium text-neutral-200 hover:text-white hover:bg-white/[0.06]"
              >
                Job Offer Scam
              </Link>
              <Link
                to="/upi-scam"
                onClick={closeMenu}
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/6 text-xs font-medium text-neutral-200 hover:text-white hover:bg-white/[0.06]"
              >
                UPI Scam
              </Link>
              <Link
                to="/sms-scam"
                onClick={closeMenu}
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/6 text-xs font-medium text-neutral-200 hover:text-white hover:bg-white/[0.06]"
              >
                SMS Scam
              </Link>
            </div>
          </div>

          <div className="space-y-1">
            <Link
              to="/verified-employers"
              onClick={closeMenu}
              className="flex items-center justify-between px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white rounded-lg hover:bg-white/5"
            >
              <span className="flex items-center gap-2">
                <Building className="w-4 h-4 text-neutral-400" />
                Verified Employers Registry
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
            </Link>

            <Link
              to="/college-dashboard"
              onClick={closeMenu}
              className="flex items-center justify-between px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white rounded-lg hover:bg-white/5"
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-neutral-400" />
                College Cyber Desk
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
            </Link>

            <Link
              to="/report-scam"
              onClick={closeMenu}
              className="flex items-center justify-between px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10"
            >
              <span className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4" />
                Report a Scam
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-rose-500" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
