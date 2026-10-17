import React, { useState } from 'react';
import { 
  AlertOctagon, 
  CheckCircle2, 
  ArrowDown, 
  Phone, 
  Mail, 
  Globe, 
  CreditCard, 
  FileText, 
  ShieldAlert, 
  Send,
  RefreshCw,
  Share2
} from 'lucide-react';
import { UploadBox } from '../components/UploadBox';

export const ReportScamPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    scamType: 'Internship Fraud',
    targetName: '',
    phone: '',
    email: '',
    domain: '',
    upiId: '',
    amountRequested: '',
    message: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      scamType: 'Internship Fraud',
      targetName: '',
      phone: '',
      email: '',
      domain: '',
      upiId: '',
      amountRequested: '',
      message: '',
      description: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-400 mb-4 uppercase tracking-widest">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span>COMMUNITY DEFENSE NETWORK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Report a Scam
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Your report can help protect other students and job seekers across India.
          </p>
        </div>

        {!submitted ? (
          /* Report Form */
          <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Scam Type */}
              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Scam Category *
                </label>
                <select
                  name="scamType"
                  value={formData.scamType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-white/30"
                >
                  <option value="Internship Fraud" className="bg-neutral-900 text-white">Internship Offer / Training Fee Fraud</option>
                  <option value="Fake Job Offer" className="bg-neutral-900 text-white">Fake Job Offer / Telegram Task Scam</option>
                  <option value="UPI Money Request" className="bg-neutral-900 text-white">UPI Reverse Collect Request / QR Scam</option>
                  <option value="Suspicious SMS / Phishing" className="bg-neutral-900 text-white">Suspicious SMS / Phishing / KYC Threat</option>
                </select>
              </div>

              {/* Target / Company Name */}
              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Company / Recruiter / Person Name *
                </label>
                <input
                  type="text"
                  name="targetName"
                  required
                  value={formData.targetName}
                  onChange={handleChange}
                  placeholder="e.g. Infosys Cloud Hiring / Rohan Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                    Phone Number (WhatsApp / Calling)
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                    Email Address Used
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. hr.recruiter@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                    Website / Impersonated Domain
                  </label>
                  <input
                    type="text"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    placeholder="e.g. fakecompany-portal.xyz"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                    UPI ID Requested (if any)
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder="e.g. payment-desk99@ybl"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              {/* Amount Demanded */}
              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Amount Demanded / Lost (₹)
                </label>
                <input
                  type="text"
                  name="amountRequested"
                  value={formData.amountRequested}
                  onChange={handleChange}
                  placeholder="e.g. ₹4,500 (training deposit)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              {/* Message text */}
              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Message / Chat Transcript Received
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Paste the WhatsApp, SMS, or email conversation..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Detailed Description of Scam Modus Operandi *
                </label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Explain what happened: what they promised, when they demanded money, how they pressured you..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              {/* Upload Screenshot */}
              <UploadBox
                label="Screenshot / Evidence Upload"
                helperText="Upload WhatsApp chat screenshot, offer letter PDF, or UPI transaction receipt"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 text-xs font-semibold uppercase tracking-widest text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all glow-red flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT REPORT</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ==================================================== */
          /* SUCCESS STATE: REPORT RECEIVED + SCAM GRAPH          */
          /* ==================================================== */
          <div className="space-y-8 animate-fadeIn">
            {/* Top Success Banner */}
            <div className="p-8 rounded-2xl glass-panel border border-emerald-500/30 text-center glow-green">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 block mb-1">
                TELEMETRY INGESTION COMPLETE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                REPORT RECEIVED
              </h2>
              <p className="mt-2 text-sm text-neutral-300 max-w-lg mx-auto">
                Thank you. Your report has been added to the demo scam intelligence system.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/8 text-xs font-mono text-neutral-400">
                <span>Incident Reference ID:</span>
                <span className="text-white font-bold">#VS-RPT-{(Math.random() * 90000 + 10000).toFixed(0)}</span>
              </div>
            </div>

            {/* FUTURISTIC SCAM GRAPH */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/8">
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
                  CORRELATION PIPELINE
                </span>
                <h3 className="text-lg font-bold text-white">
                  Ingested Threat Vector Propagation
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Your submitted entities are mapped across the intelligence chain to block downstream victims.
                </p>
              </div>

              {/* Vertical Animated Pipeline: PHONE -> EMAIL -> DOMAIN -> UPI ID -> SCAM REPORTS */}
              <div className="max-w-md mx-auto space-y-2">
                {/* 1. PHONE */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase block">PHONE NUMBER</span>
                      <span className="text-xs font-mono text-white font-semibold">
                        {formData.phone || '+91 98765 43210 (Logged)'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                    Blacklisted
                  </span>
                </div>

                <div className="flex justify-center text-neutral-500 py-0.5">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>

                {/* 2. EMAIL */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase block">RECRUITER EMAIL</span>
                      <span className="text-xs font-mono text-white font-semibold">
                        {formData.email || 'hr.recruiter@gmail.com (Logged)'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                    Unauthenticated
                  </span>
                </div>

                <div className="flex justify-center text-neutral-500 py-0.5">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>

                {/* 3. DOMAIN */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase block">IMPERSONATED DOMAIN</span>
                      <span className="text-xs font-mono text-white font-semibold">
                        {formData.domain || 'fakecompany-portal.xyz (Flagged)'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                    DNS Flagged
                  </span>
                </div>

                <div className="flex justify-center text-neutral-500 py-0.5">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>

                {/* 4. UPI ID */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase block">UPI ID / VPA</span>
                      <span className="text-xs font-mono text-white font-semibold">
                        {formData.upiId || 'payment-desk99@ybl (Logged)'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                    Collect Trap
                  </span>
                </div>

                <div className="flex justify-center text-neutral-500 py-0.5">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>

                {/* 5. SCAM REPORTS */}
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-rose-300 uppercase block">SCAM REPORTS REPOSITORY</span>
                      <span className="text-xs font-mono text-white font-bold">
                        Linked to National Campus Threat Index
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-200 bg-rose-600/30 px-2 py-0.5 rounded font-bold">
                    ACTIVE ALERT
                  </span>
                </div>
              </div>

              {/* Reset / Report another button */}
              <div className="mt-8 text-center pt-4 border-t border-white/8 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Submit Another Report</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
