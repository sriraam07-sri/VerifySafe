import React, { useState } from 'react';
import { FileCheck, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { UploadBox } from '../components/UploadBox';
import { ResultCard } from '../components/ResultCard';
import { JOB_PRESETS, DEMO_VERIFIED_EMPLOYERS } from '../data/mockData';
import { VerificationResult } from '../types';

export const JobCheckerPage: React.FC = () => {
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
    const preset = JOB_PRESETS.find((p) => p.id === presetId);
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

    setLoadingState('VERIFYING OFFICIAL COMPANY DOMAIN...');
    setTimeout(() => {
      setLoadingState('CHECKING RECRUITER REGISTRATION & TELEGRAM VECTORS...');
      setTimeout(() => {
        setLoadingState('ANALYZING MONETARY ADVANCE INDICATORS...');
        setTimeout(() => {
          setLoadingState(null);

          const matchedPreset = JOB_PRESETS.find(
            (p) =>
              formData.companyName.toLowerCase().includes(p.formData.companyName.toLowerCase().slice(0, 8)) ||
              formData.recruiterEmail.toLowerCase() === p.formData.recruiterEmail.toLowerCase()
          );

          if (matchedPreset) {
            setResult(matchedPreset.expectedResult);
          } else {
            // Smart dynamic check
            const hasBondFee = Boolean(formData.paymentAmount && formData.paymentAmount !== '0' && !formData.paymentAmount.toLowerCase().includes('no'));
            const isFreeMail = /@(gmail|yahoo|hotmail|outlook)\.com/i.test(formData.recruiterEmail);
            const isTelegramRedirect = formData.recruiterPhone.toLowerCase().includes('telegram') || formData.messageText.toLowerCase().includes('telegram');

            if (hasBondFee || isTelegramRedirect) {
              setResult({
                id: `res-job-dyn-${Date.now()}`,
                category: 'job',
                targetTitle: `${formData.companyName || 'Corporate Role'} Offer Evaluation`,
                status: 'POTENTIAL_SCAM',
                riskLevel: 'HIGH',
                employerStatus: 'NOT_EMPLOYER_CONFIRMED',
                reasons: [
                  hasBondFee ? `Demanded advance deposit (${formData.paymentAmount}) for equipment, visa, or interview slot.` : 'Off-platform redirect to anonymous messaging channel.',
                  isFreeMail ? 'Recruiter uses free webmail rather than official company email.' : 'Unverified corporate credentials.',
                  'Offer reference could not be cryptographically authenticated.',
                ],
                signals: [
                  { id: 's1', name: 'Equipment / Processing Deposit', passed: !hasBondFee, severity: 'danger', detail: hasBondFee ? 'Demands upfront payment' : 'Zero upfront charges' },
                  { id: 's2', name: 'Communication Channels', passed: !isTelegramRedirect, severity: 'danger', detail: isTelegramRedirect ? 'Telegram redirect detected' : 'Standard business channel' },
                  { id: 's3', name: 'Employer Registry Confirmation', passed: false, severity: 'warning', detail: 'Not verified in employer system' },
                ],
                recommendedAction: 'Do not pay any deposit. Do not transfer funds or submit bank credentials. Report this offer immediately.',
                timestamp: 'Just now',
                inputSummary: {
                  Company: formData.companyName || 'Not specified',
                  'Recruiter Email': formData.recruiterEmail || 'Not specified',
                  'Requested Fee': formData.paymentAmount || 'None',
                },
              });
            } else {
              setResult({
                id: `res-job-dyn-${Date.now()}`,
                category: 'job',
                targetTitle: `${formData.companyName || 'Corporate'} Job Offer`,
                status: 'UNVERIFIED',
                riskLevel: 'MEDIUM',
                employerStatus: 'NOT_EMPLOYER_CONFIRMED',
                reasons: [
                  'Entity has not registered in our verified employer registry.',
                  'While no acute scam fee was detected, employment validity cannot be automatically guaranteed.',
                  'Verify directly on the employer official website careers page.',
                ],
                signals: [
                  { id: 's1', name: 'Direct Employer Registry', passed: false, severity: 'warning', detail: 'Unconfirmed third-party' },
                  { id: 's2', name: 'Monetary Demands', passed: true, severity: 'safe', detail: 'Zero fee requested' },
                ],
                recommendedAction: 'Contact the hiring company HR department directly using verified telephone numbers from their official domain.',
                timestamp: 'Just now',
                inputSummary: {
                  Company: formData.companyName || 'Not specified',
                  'Recruiter Email': formData.recruiterEmail || 'Not specified',
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
            <FileCheck className="w-3.5 h-3.5 text-white" />
            <span>EMPLOYMENT LETTER AUDIT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Verify a Job Offer
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Audit appointment letters, recruiter domains, and fee requests before accepting.
          </p>
        </div>

        {/* Demo Preset Buttons */}
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
            {JOB_PRESETS.map((preset) => (
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

        {/* Form Box */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/8 relative">
          <form onSubmit={handleVerify} className="space-y-6">
            <UploadBox
              label="Upload Job Offer Letter / Employment Agreement"
              helperText="Upload official letterhead PDF or scan for signature & domain validation"
            />

            <div>
              <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                Job Offer Email / Message Body
              </label>
              <textarea
                name="messageText"
                rows={3}
                value={formData.messageText}
                onChange={handleInputChange}
                placeholder="Paste the job offer email, Telegram message, or appointment note..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
              />
            </div>

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
                  placeholder="e.g. NovaByte Labs"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Offer / Reference ID
                </label>
                <input
                  type="text"
                  name="offerId"
                  value={formData.offerId}
                  onChange={handleInputChange}
                  placeholder="e.g. NVB-OFFER-773104"
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
                  placeholder="e.g. careers@novabytelabs-demo.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Recruiter Phone / Telegram
                </label>
                <input
                  type="text"
                  name="recruiterPhone"
                  value={formData.recruiterPhone}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 22 6789 0100"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                Requested Payment / Security Deposit Amount
              </label>
              <input
                type="text"
                name="paymentAmount"
                value={formData.paymentAmount}
                onChange={handleInputChange}
                placeholder="e.g. ₹0 or ₹18,500 (laptop bond / courier fee)"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
              />
            </div>

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
                  <span>VERIFY JOB OFFER</span>
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
              Evaluating official enterprise domains and employment fraud lists...
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
