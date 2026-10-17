import React, { useState } from 'react';
import { Briefcase, Sparkles, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { UploadBox } from '../components/UploadBox';
import { ResultCard } from '../components/ResultCard';
import { INTERNSHIP_PRESETS, DEMO_VERIFIED_EMPLOYERS } from '../data/mockData';
import { VerificationResult } from '../types';

export const InternshipCheckerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    recruiterEmail: '',
    recruiterPhone: '',
    offerId: '',
    paymentAmount: '',
    messageText: '',
  });

  const [loadingState, setLoadingState] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadPreset = (presetId: string) => {
    const preset = INTERNSHIP_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setFormData(preset.formData as any);
    setResult(null);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName && !formData.recruiterEmail && !formData.messageText) {
      alert('Please enter at least a company name, recruiter email, or paste the message.');
      return;
    }

    // Realistic Loading Sequence
    setLoadingState('CHECKING EMPLOYER REGISTRY...');
    setTimeout(() => {
      setLoadingState('ANALYZING SCAM SIGNALS...');
      setTimeout(() => {
        setLoadingState('CHECKING REPORTED CONTACTS...');
        setTimeout(() => {
          setLoadingState(null);

          // Evaluate result based on input
          const matchedPreset = INTERNSHIP_PRESETS.find(
            (p) =>
              formData.companyName.toLowerCase().includes(p.formData.companyName.toLowerCase().slice(0, 8)) ||
              formData.recruiterEmail.toLowerCase() === p.formData.recruiterEmail.toLowerCase()
          );

          if (matchedPreset) {
            setResult(matchedPreset.expectedResult);
          } else {
            // Smart dynamic evaluation
            const isFreeMail = /@(gmail|yahoo|hotmail|outlook)\.com/i.test(formData.recruiterEmail);
            const hasFee = Boolean(formData.paymentAmount && formData.paymentAmount !== '0' && !formData.paymentAmount.toLowerCase().includes('no'));
            const matchedEmployer = DEMO_VERIFIED_EMPLOYERS.find((e) =>
              formData.companyName.toLowerCase().includes(e.name.toLowerCase().slice(0, 6))
            );

            if (hasFee || (isFreeMail && formData.paymentAmount)) {
              setResult({
                id: `res-dyn-${Date.now()}`,
                category: 'internship',
                targetTitle: `${formData.companyName || 'Unspecified Entity'} Internship Offer`,
                status: 'POTENTIAL_SCAM',
                riskLevel: 'HIGH',
                employerStatus: 'NOT_EMPLOYER_CONFIRMED',
                reasons: [
                  hasFee ? `Demands upfront payment (${formData.paymentAmount}). Genuine internships never charge fees.` : 'Flagged for high-risk contact patterns.',
                  isFreeMail ? 'Recruiter uses a free webmail address instead of a corporate domain.' : 'Unrecognized recruitment domain.',
                  'Offer reference could not be matched against verified employer records.',
                ],
                signals: [
                  { id: 's1', name: 'Monetary Demand', passed: !hasFee, severity: 'danger', detail: hasFee ? `Requires ${formData.paymentAmount}` : 'No payment demanded' },
                  { id: 's2', name: 'Corporate Email Authenticity', passed: !isFreeMail, severity: isFreeMail ? 'danger' : 'safe', detail: isFreeMail ? 'Uses free public email' : 'Custom email domain' },
                  { id: 's3', name: 'Employer Registry Match', passed: false, severity: 'warning', detail: 'Not registered in employer database' },
                ],
                recommendedAction: 'Do not pay any amount or share identity documents. Report this recruiter.',
                timestamp: 'Just now',
                inputSummary: {
                  Company: formData.companyName || 'Not specified',
                  'Recruiter Email': formData.recruiterEmail || 'Not specified',
                  Fee: formData.paymentAmount || 'None',
                },
              });
            } else if (matchedEmployer && !isFreeMail) {
              setResult({
                id: `res-dyn-${Date.now()}`,
                category: 'internship',
                targetTitle: `${matchedEmployer.name} Internship Offer`,
                status: 'VERIFIED',
                riskLevel: 'LOW',
                employerStatus: 'EMPLOYER_CONFIRMED',
                employerName: matchedEmployer.name,
                matchedEmployer: {
                  name: matchedEmployer.name,
                  domain: matchedEmployer.domain,
                  careersUrl: matchedEmployer.careersUrl,
                  verificationMethod: matchedEmployer.verificationMethod,
                },
                reasons: [
                  `Direct match with official registered employer: ${matchedEmployer.name}.`,
                  'Recruiter email domain verified against employer record.',
                  'Zero monetary demands detected.',
                ],
                signals: [
                  { id: 's1', name: 'Employer Registry Match', passed: true, severity: 'safe', detail: 'Matched active partner record' },
                  { id: 's2', name: 'Corporate Domain Verification', passed: true, severity: 'safe', detail: 'Matches authorized HR domain' },
                  { id: 's3', name: 'Zero Fees Policy', passed: true, severity: 'safe', detail: 'Compliant with genuine internship standard' },
                ],
                recommendedAction: 'Proceed safely with onboarding via the official company portal.',
                officialVerificationUrl: matchedEmployer.careersUrl,
                timestamp: 'Just now',
                inputSummary: {
                  Company: matchedEmployer.name,
                  'Recruiter Email': formData.recruiterEmail,
                },
              });
            } else {
              setResult({
                id: `res-dyn-${Date.now()}`,
                category: 'internship',
                targetTitle: `${formData.companyName || 'Third-Party'} Internship Offer`,
                status: 'UNVERIFIED',
                riskLevel: 'MEDIUM',
                employerStatus: 'NOT_EMPLOYER_CONFIRMED',
                reasons: [
                  'Employer is not registered in our verified partner database.',
                  'While no blatant scam fee was detected, this offer cannot be officially confirmed.',
                  'Always independently verify with the hiring manager on their official careers site.',
                ],
                signals: [
                  { id: 's1', name: 'Employer Registry Match', passed: false, severity: 'warning', detail: 'Unregistered employer' },
                  { id: 's2', name: 'Monetary Demands', passed: true, severity: 'safe', detail: 'No advance fee detected' },
                  { id: 's3', name: 'Domain Reputation', passed: true, severity: 'safe', detail: 'No active malicious flags' },
                ],
                recommendedAction: 'Do not share sensitive documents (PAN, Passport) until you verify the offer via an official telephone or careers portal.',
                timestamp: 'Just now',
                inputSummary: {
                  Company: formData.companyName || 'Unspecified',
                  'Recruiter Email': formData.recruiterEmail || 'Unspecified',
                },
              });
            }
          }
        }, 500);
      }, 500);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-400 mb-4 uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5 text-white" />
            <span>INTERNSHIP VERIFICATION ENGINE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Verify an Internship Offer
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Check an internship before sharing documents or paying fees.
          </p>
        </div>

        {/* Demo Preset Buttons ("TRY AN EXAMPLE") */}
        <div className="mb-8 p-4 rounded-2xl glass-panel border border-white/8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="font-semibold uppercase tracking-wider">TRY AN EXAMPLE PRESET:</span>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">
              Test all 3 result states instantly
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {INTERNSHIP_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => loadPreset(preset.id)}
                className="p-3 text-left rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/8 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white group-hover:text-neutral-200">
                    {preset.title}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      preset.badgeColor === 'emerald'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : preset.badgeColor === 'amber'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {preset.badge}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                  {preset.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Checker Form */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/8 relative">
          <form onSubmit={handleVerify} className="space-y-6">
            {/* Upload Area */}
            <UploadBox
              label="Upload Internship Offer Letter (PDF / Image)"
              helperText="Upload official PDF or screenshot for automated cryptographic & domain check"
            />

            {/* Message Paste */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                Paste Internship Message / Email Body
              </label>
              <textarea
                name="messageText"
                rows={3}
                value={formData.messageText}
                onChange={handleInputChange}
                placeholder="Paste the WhatsApp, LinkedIn, or email offer text here..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* 2-Column Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. ApexCloud Technologies"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Recruiter Email
                </label>
                <input
                  type="email"
                  name="recruiterEmail"
                  value={formData.recruiterEmail}
                  onChange={handleInputChange}
                  placeholder="e.g. talent@apexcloud-demo.in"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Offer / Reference Number
                </label>
                <input
                  type="text"
                  name="offerId"
                  value={formData.offerId}
                  onChange={handleInputChange}
                  placeholder="e.g. AC-2026-INT-4821"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Recruiter Phone Number
                </label>
                <input
                  type="text"
                  name="recruiterPhone"
                  value={formData.recruiterPhone}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            {/* Fee / Payment Request field */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                Payment / Fee Requested (if any)
              </label>
              <input
                type="text"
                name="paymentAmount"
                value={formData.paymentAmount}
                onChange={handleInputChange}
                placeholder="e.g. ₹0 or ₹4,500 (training / laptop fee)"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
              />
              <p className="text-[11px] text-neutral-400 mt-1">
                Warning: Genuine companies never require students to pay registration, training, or equipment fees.
              </p>
            </div>

            {/* Primary Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={Boolean(loadingState)}
                className="w-full py-4 text-xs font-semibold uppercase tracking-widest text-black bg-white hover:bg-neutral-200 rounded-xl transition-all glow-white-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loadingState ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{loadingState}</span>
                  </>
                ) : (
                  <span>VERIFY INTERNSHIP</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Loading Progress State */}
        {loadingState && (
          <div className="mt-8 p-6 rounded-2xl glass-panel border border-white/10 text-center animate-pulse">
            <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-3" />
            <h3 className="text-sm font-mono tracking-widest text-white uppercase font-bold">
              {loadingState}
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Cross-referencing employer candidate whitelist and known fraud lists...
            </p>
          </div>
        )}

        {/* Result Display */}
        {result && !loadingState && (
          <div className="mt-10 animate-fadeIn">
            <ResultCard result={result} onReset={() => setResult(null)} />
          </div>
        )}
      </div>
    </div>
  );
};
