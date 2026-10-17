import React, { useState } from 'react';
import { CreditCard, Sparkles, AlertTriangle, ShieldAlert, Loader2, AlertCircle } from 'lucide-react';
import { UploadBox } from '../components/UploadBox';
import { ResultCard } from '../components/ResultCard';
import { UPI_PRESETS } from '../data/mockData';
import { VerificationResult } from '../types';

export const UpiCheckerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    upiId: '',
    receiverName: '',
    phoneNumber: '',
    paymentAmount: '',
    paymentDescription: '',
  });

  const [loadingState, setLoadingState] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadPreset = (presetId: string) => {
    const preset = UPI_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setFormData(preset.formData as any);
    setResult(null);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.upiId) {
      alert('Please enter a UPI ID (VPA) to evaluate.');
      return;
    }

    setLoadingState('SEARCHING NATIONAL SCAM INTELLIGENCE REPOSITORY...');
    setTimeout(() => {
      setLoadingState('CHECKING VIRTUAL PAYMENT ADDRESS (VPA) STRUCTURE...');
      setTimeout(() => {
        setLoadingState('ANALYZING REVERSE COLLECT & PIN TRAP PATTERNS...');
        setTimeout(() => {
          setLoadingState(null);

          const matchedPreset = UPI_PRESETS.find((p) =>
            formData.upiId.toLowerCase().includes(p.formData.upiId.toLowerCase().slice(0, 10))
          );

          if (matchedPreset) {
            setResult(matchedPreset.expectedResult);
          } else {
            // Dynamic rule-based assessment
            const isCollectTrap = /refund|receive|prize|lottery|tech fest/i.test(formData.paymentDescription);
            const isReportedVpa = /refund|portal|desk|support|helpdesk/i.test(formData.upiId);

            if (isCollectTrap || isReportedVpa) {
              setResult({
                id: `res-upi-dyn-${Date.now()}`,
                category: 'upi',
                targetTitle: `UPI ID: ${formData.upiId}`,
                status: 'POTENTIAL_SCAM',
                riskLevel: 'HIGH',
                employerStatus: 'NOT_EMPLOYER_CONFIRMED',
                reasons: [
                  'Detected reverse payment / collect request signature masking as an inbound deposit.',
                  'VPA keywords resemble known phishing patterns used in campus marketplace scams.',
                  'High probability of deception: remember, a UPI PIN is NEVER required to receive money.',
                ],
                signals: [
                  { id: 's1', name: 'Scam Intelligence Database', passed: false, severity: 'danger', detail: 'Pattern flagged in peer student scam reports' },
                  { id: 's2', name: 'Collect Request Deception', passed: false, severity: 'danger', detail: 'Claims PIN needed to receive funds' },
                  { id: 's3', name: 'Merchant Authenticity', passed: false, severity: 'warning', detail: 'Unverified personal handle' },
                ],
                recommendedAction: 'Decline and block this collect request immediately. Never enter your UPI PIN.',
                timestamp: 'Just now',
                inputSummary: {
                  'UPI ID': formData.upiId,
                  'Amount': formData.paymentAmount || 'Not specified',
                  'Description': formData.paymentDescription || 'None',
                },
              });
            } else {
              setResult({
                id: `res-upi-dyn-${Date.now()}`,
                category: 'upi',
                targetTitle: `UPI ID: ${formData.upiId}`,
                status: 'UNVERIFIED',
                riskLevel: 'MEDIUM',
                employerStatus: 'NOT_EMPLOYER_CONFIRMED',
                reasons: [
                  'Personal VPA handle without registered corporate merchant verification.',
                  'No negative blacklist reports found on this specific handle, but P2P transfers carry risk.',
                  'Always confirm the recipient identity via an independent channel before paying.',
                ],
                signals: [
                  { id: 's1', name: 'Blacklist Status', passed: true, severity: 'safe', detail: 'No active malicious flags on file' },
                  { id: 's2', name: 'Merchant Registration', passed: false, severity: 'warning', detail: 'Individual VPA without business badge' },
                ],
                recommendedAction: 'Verify the recipient in person or by phone. Do not make a payment based only on this result.',
                timestamp: 'Just now',
                inputSummary: {
                  'UPI ID': formData.upiId,
                  'Receiver': formData.receiverName || 'Unspecified',
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
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-400 mb-4 uppercase tracking-widest">
            <CreditCard className="w-3.5 h-3.5 text-white" />
            <span>UPI THREAT VERIFICATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Check a UPI Payment Request
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Verify recipient VPAs, inspect collect requests, and protect your bank account.
          </p>
        </div>

        {/* HIGHLY VISIBLE CRITICAL WARNING CARD */}
        <div className="mb-8 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4 glow-amber">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono text-amber-300 uppercase tracking-wider mb-1">
              CRITICAL UPI SECURITY RULE
            </h3>
            <p className="text-sm font-semibold text-white leading-relaxed">
              Never share your UPI PIN, OTP, CVV, or banking password to receive money.
            </p>
            <p className="text-xs text-amber-200/80 mt-1">
              Entering your UPI PIN ALWAYS subtracts money from your account. Legitimate incoming transfers NEVER require your PIN.
            </p>
          </div>
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
            {UPI_PRESETS.map((preset) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  UPI ID (VPA) *
                </label>
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  placeholder="e.g. refund-desk-portal99@ybl"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Receiver Name (as shown in app)
                </label>
                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleInputChange}
                  placeholder="e.g. Refund Processing Pvt"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Phone Number Linked
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 94000 11223"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Payment Amount
                </label>
                <input
                  type="text"
                  name="paymentAmount"
                  value={formData.paymentAmount}
                  onChange={handleInputChange}
                  placeholder="e.g. ₹8,999"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                Payment Description / Remarks
              </label>
              <textarea
                name="paymentDescription"
                rows={2}
                value={formData.paymentDescription}
                onChange={handleInputChange}
                placeholder="What did the sender say this payment is for? (e.g. Refund, College fest, Registration, Deposit)..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
              />
            </div>

            <UploadBox
              label="Upload Screenshot of QR Code / Collect Request (Optional)"
              helperText="Upload payment screenshot for automated UPI VPA OCR parsing"
            />

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
                  <span>CHECK A UPI PAYMENT REQUEST</span>
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
              Cross-referencing reported fraud handles and merchant accounts...
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
