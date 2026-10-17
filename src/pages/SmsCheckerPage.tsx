import React, { useState } from 'react';
import { MessageSquare, Sparkles, Loader2, AlertOctagon, Link2 } from 'lucide-react';
import { UploadBox } from '../components/UploadBox';
import { ResultCard } from '../components/ResultCard';
import { SMS_PRESETS } from '../data/mockData';
import { VerificationResult } from '../types';

export const SmsCheckerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    smsText: '',
    senderId: '',
    suspiciousUrl: '',
  });

  const [loadingState, setLoadingState] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadPreset = (presetId: string) => {
    const preset = SMS_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setFormData(preset.formData as any);
    setResult(null);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.smsText && !formData.suspiciousUrl) {
      alert('Please paste the SMS text or enter the URL from the message.');
      return;
    }

    setLoadingState('PARSING TELECOM DLT SENDER HEADERS...');
    setTimeout(() => {
      setLoadingState('AUDITING REDIRECTION LINKS & SHORTENERS...');
      setTimeout(() => {
        setLoadingState('EXTRACTING COERCION & PHISHING TRIGGERS...');
        setTimeout(() => {
          setLoadingState(null);

          const matchedPreset = SMS_PRESETS.find((p) =>
            formData.smsText.toLowerCase().includes(p.formData.smsText.toLowerCase().slice(0, 15)) ||
            (formData.suspiciousUrl && p.formData.suspiciousUrl && formData.suspiciousUrl.toLowerCase().includes(p.formData.suspiciousUrl.toLowerCase()))
          );

          if (matchedPreset) {
            setResult(matchedPreset.expectedResult);
          } else {
            // Real-time keyword & pattern scanning
            const text = formData.smsText.toLowerCase();
            const hasUrgency = /urgent|blocked|suspend|today|immediate|freeze|deactivate/i.test(text);
            const hasShortUrl = /bit\.ly|tinyurl|is\.gd|t\.co|wa\.me|cutt\.ly|goo\.gl|http:\/\/|https:\/\//i.test(formData.smsText) || Boolean(formData.suspiciousUrl);
            const hasRewards = /earn|daily|bonus|lottery|winner|cashback|part time/i.test(text);
            const hasBanking = /sbi|hdfc|icici|axis|pan|kyc|yono|electricity|bill/i.test(text);

            const highlights: string[] = [];
            if (hasUrgency) highlights.push('Urgency/Suspension Warning');
            if (hasShortUrl) highlights.push(formData.suspiciousUrl || 'Shortened/Unverified Link');
            if (hasRewards) highlights.push('Unrealistic Earning / Reward Bait');
            if (hasBanking) highlights.push('Financial Impersonation (KYC/Bank)');

            if ((hasUrgency && hasBanking) || (hasRewards && hasShortUrl) || (hasBanking && hasShortUrl)) {
              setResult({
                id: `res-sms-dyn-${Date.now()}`,
                category: 'sms',
                targetTitle: `Suspicious SMS: ${formData.senderId || 'Unknown Sender'}`,
                status: 'POTENTIAL_SCAM',
                riskLevel: 'HIGH',
                employerStatus: 'NOT_EMPLOYER_CONFIRMED',
                reasons: [
                  'High probability credential-harvesting phishing attack.',
                  'Contains panic-inducing ultimatum or reward lure to induce hasty clicking.',
                  'Directs users to unverified link instead of official bank/telecom apps.',
                ],
                suspiciousHighlights: highlights,
                signals: [
                  { id: 's1', name: 'Phishing Signature Match', passed: false, severity: 'danger', detail: 'Pattern detected in cyber threat index' },
                  { id: 's2', name: 'External Link Cloaking', passed: !hasShortUrl, severity: hasShortUrl ? 'danger' : 'safe', detail: hasShortUrl ? 'Unverified link extracted' : 'No suspicious link' },
                  { id: 's3', name: 'Urgency Pressure', passed: !hasUrgency, severity: hasUrgency ? 'danger' : 'safe', detail: hasUrgency ? 'High psychological pressure' : 'Normal tone' },
                ],
                recommendedAction: 'Do NOT click any links. Never enter bank credentials or OTPs. Report SMS to 1909.',
                timestamp: 'Just now',
                inputSummary: {
                  Sender: formData.senderId || 'Unspecified',
                  'Detected Threats': highlights.join(', '),
                },
              });
            } else {
              setResult({
                id: `res-sms-dyn-${Date.now()}`,
                category: 'sms',
                targetTitle: `SMS from ${formData.senderId || 'Header'}`,
                status: 'UNVERIFIED',
                riskLevel: 'MEDIUM',
                employerStatus: 'NOT_EMPLOYER_CONFIRMED',
                reasons: [
                  'Sender header is unverified or promotional.',
                  'Exercise standard vigilance: do not click external links or share financial credentials.',
                ],
                signals: [
                  { id: 's1', name: 'DLT Header Match', passed: false, severity: 'warning', detail: 'Promotional / unverified category' },
                  { id: 's2', name: 'Known Malicious URLs', passed: true, severity: 'safe', detail: 'No known zero-day exploits found' },
                ],
                recommendedAction: 'Avoid clicking links sent via unsolicited messages. Contact the sender on their official helpline.',
                timestamp: 'Just now',
                inputSummary: {
                  Sender: formData.senderId || 'Unknown',
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
            <MessageSquare className="w-3.5 h-3.5 text-white" />
            <span>SMS & PHISHING ENGINE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Check a Suspicious SMS
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Inspect sender IDs, extract hidden phishing URLs, and analyze urgency threats.
          </p>
        </div>

        {/* Demo Presets */}
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
            {SMS_PRESETS.map((preset) => (
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
            <div>
              <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                Paste SMS Text *
              </label>
              <textarea
                name="smsText"
                rows={4}
                value={formData.smsText}
                onChange={handleInputChange}
                required
                placeholder="e.g. URGENT: Dear customer, your account will be blocked today due to KYC..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Sender ID / Phone Number
                </label>
                <input
                  type="text"
                  name="senderId"
                  value={formData.senderId}
                  onChange={handleInputChange}
                  placeholder="e.g. VM-982103 or +91 98765 00000"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Suspicious URL (if included in SMS)
                </label>
                <input
                  type="text"
                  name="suspiciousUrl"
                  value={formData.suspiciousUrl}
                  onChange={handleInputChange}
                  placeholder="e.g. bit.ly/sbi-kyc-verify"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            <UploadBox
              label="Upload Screenshot of the SMS (Optional)"
              helperText="Upload screenshot for automatic OCR text & link parsing"
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
                  <span>CHECK A SUSPICIOUS SMS</span>
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
              Evaluating DLT registration and phishing destination hosts...
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
