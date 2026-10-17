import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, FileCheck, ArrowUpRight } from 'lucide-react';
import { MANDATORY_LEGAL_NOTE } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/8 pt-16 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Disclaimer Banner on Trust Principle */}
        <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/8 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0 mt-0.5">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block">
                Foundational Trust Principle
              </span>
              <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                “{MANDATORY_LEGAL_NOTE}”
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
              DEMO PLATFORM · INDIA
            </span>
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/6 text-xs">
          {/* Col 1: Brand & Mission */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-sm tracking-tight text-white font-mono">
                VERIFYSAFE
              </span>
            </div>
            <p className="text-neutral-500 leading-relaxed text-[11px]">
              Cybersecurity and scam verification platform helping students and job seekers across India verify internship offers, employment letters, UPI payment requests, and suspicious SMS communications.
            </p>
          </div>

          {/* Col 2: Verification Tools */}
          <div>
            <h4 className="font-mono text-[11px] tracking-widest text-neutral-300 uppercase mb-3">
              VERIFICATION TOOLS
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/internship-scam" className="hover:text-white transition-colors">
                  Internship Scam Checker
                </Link>
              </li>
              <li>
                <Link to="/job-offer-scam" className="hover:text-white transition-colors">
                  Job Offer Scam Checker
                </Link>
              </li>
              <li>
                <Link to="/upi-scam" className="hover:text-white transition-colors">
                  UPI Payment Risk Checker
                </Link>
              </li>
              <li>
                <Link to="/sms-scam" className="hover:text-white transition-colors">
                  SMS & Phishing Analyzer
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ecosystem & Protection */}
          <div>
            <h4 className="font-mono text-[11px] tracking-widest text-neutral-300 uppercase mb-3">
              ECOSYSTEM & SAFETY
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/verified-employers" className="hover:text-white transition-colors">
                  Verified Employers Registry
                </Link>
              </li>
              <li>
                <Link to="/college-dashboard" className="hover:text-white transition-colors">
                  College Cyber Placement Desk
                </Link>
              </li>
              <li>
                <Link to="/report-scam" className="hover:text-rose-400 transition-colors">
                  Report a Scam / Fraud
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="hover:text-white transition-colors">
                  How Verification Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: National Cyber Guidance */}
          <div>
            <h4 className="font-mono text-[11px] tracking-widest text-neutral-300 uppercase mb-3">
              NATIONAL CYBER RESOURCES
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-center justify-between">
                <span>National Cyber Helpline</span>
                <span className="font-mono text-white">1930</span>
              </li>
              <li className="flex items-center justify-between">
                <span>SMS Spam Reporting</span>
                <span className="font-mono text-white">1909</span>
              </li>
              <li className="pt-2">
                <span className="text-[11px] text-neutral-500 block">
                  Cyber Crime Portal:
                </span>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white flex items-center gap-1 font-mono text-[11px]"
                >
                  cybercrime.gov.in <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p className="font-mono tracking-widest text-neutral-300 uppercase">
            VERIFY BEFORE YOU TRUST · STAY SAFE.
          </p>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Demo Data Edition</span>
            <span aria-hidden="true">·</span>
            <span>No real corporate affiliation claimed</span>
            <span aria-hidden="true">·</span>
            <span>VerifySafe © 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
