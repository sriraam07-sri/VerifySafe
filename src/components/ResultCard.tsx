import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Building2, 
  Cpu, 
  ExternalLink, 
  Flag, 
  RefreshCw,
  Info,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { VerificationResult } from '../types';
import { MANDATORY_LEGAL_NOTE } from '../data/mockData';

interface ResultCardProps {
  result: VerificationResult;
  onReset?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const isVerified = result.status === 'VERIFIED';
  const isUnverified = result.status === 'UNVERIFIED';
  const isScam = result.status === 'POTENTIAL_SCAM';

  // Status-driven styling
  const statusConfig = {
    VERIFIED: {
      label: 'VERIFIED',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      glowClass: 'glow-green',
      statusDot: 'bg-emerald-400',
      riskText: 'LOW RISK',
      riskColor: 'text-emerald-400',
    },
    UNVERIFIED: {
      label: 'UNVERIFIED',
      icon: AlertTriangle,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      glowClass: 'glow-amber',
      statusDot: 'bg-amber-400',
      riskText: 'MEDIUM RISK',
      riskColor: 'text-amber-400',
    },
    POTENTIAL_SCAM: {
      label: 'POTENTIAL SCAM',
      icon: ShieldAlert,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/35',
      glowClass: 'glow-red',
      statusDot: 'bg-rose-500',
      riskText: 'HIGH RISK',
      riskColor: 'text-rose-500',
    },
  }[result.status];

  const StatusIcon = statusConfig.icon;

  return (
    <div className={`relative w-full rounded-2xl glass-panel p-6 sm:p-8 border ${statusConfig.borderColor} ${statusConfig.glowClass} transition-all duration-300`}>
      {/* Top Header Status Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/8">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
            VERIFICATION RESULT · {result.category.toUpperCase()}
          </span>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${statusConfig.bgColor} border ${statusConfig.borderColor}`}>
              <StatusIcon className={`w-6 h-6 ${statusConfig.color}`} />
            </div>
            <div>
              <h3 className={`text-2xl font-bold tracking-tight ${statusConfig.color} flex items-center gap-2`}>
                <span>{statusConfig.label}</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Target evaluated: <span className="text-neutral-200 font-medium">{result.targetTitle}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Risk Level Gauge */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center p-3 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border sm:border-0 border-white/8">
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
            RISK ASSESSMENT
          </span>
          <span className={`text-sm sm:text-base font-bold font-mono tracking-wider ${statusConfig.riskColor}`}>
            {result.riskLevel} RISK
          </span>
          <span className="text-[10px] text-neutral-500 font-mono mt-0.5">
            {result.timestamp}
          </span>
        </div>
      </div>

      {/* UPI Safety Warning Box if applicable */}
      {result.category === 'upi' && (
        <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-amber-200">
            <strong className="text-amber-300 font-semibold block mb-0.5">Critical UPI Safety Principle:</strong>
            Never share your UPI PIN, OTP, CVV, or banking password to receive money. Do not make a payment based only on this result.
          </div>
        </div>
      )}

      {/* SMS Suspicious Highlighted Words */}
      {result.suspiciousHighlights && result.suspiciousHighlights.length > 0 && (
        <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/8">
          <span className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase block mb-2">
            DETECTED SUSPICIOUS PATTERNS / STRINGS
          </span>
          <div className="flex flex-wrap gap-2">
            {result.suspiciousHighlights.map((hl, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 text-xs font-mono rounded bg-rose-500/15 border border-rose-500/30 text-rose-300"
              >
                {hl}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* WHY WE GAVE THIS RESULT */}
      <div className="mt-6">
        <h4 className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3 flex items-center gap-2">
          <span>WHY WE GAVE THIS RESULT</span>
        </h4>
        <ul className="space-y-2.5">
          {result.reasons.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed">
              <span className="text-neutral-500 mt-1 shrink-0 text-xs">◆</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Signals Breakdown Grid */}
      {result.signals && result.signals.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/8">
          <h4 className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
            VERIFICATION SIGNALS AUDITED
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.signals.map((sig) => (
              <div 
                key={sig.id} 
                className="p-3 rounded-xl bg-white/[0.02] border border-white/6 flex items-start gap-3"
              >
                {sig.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : sig.severity === 'danger' ? (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-medium text-neutral-200">
                    {sig.name}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5 leading-normal">
                    {sig.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDED ACTION */}
      <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/8">
        <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
          RECOMMENDED ACTION
        </span>
        <p className="text-sm text-neutral-200 leading-relaxed font-medium">
          {result.recommendedAction}
        </p>
      </div>

      {/* CORE TRUST PRINCIPLE TWO-BOX SEPARATION */}
      <div className="mt-6 pt-6 border-t border-white/8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Employer Status */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/8">
            <div className="flex items-center gap-2 mb-2 text-neutral-300">
              <Building2 className="w-4 h-4 text-neutral-400" />
              <span className="text-xs font-mono tracking-wider uppercase text-neutral-400">
                EMPLOYER STATUS
              </span>
            </div>
            {result.employerStatus === 'EMPLOYER_CONFIRMED' ? (
              <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Employer-Confirmed</span>
              </div>
            ) : (
              <div className="text-sm font-semibold text-neutral-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-neutral-500" />
                <span>Not employer-confirmed</span>
              </div>
            )}
            <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">
              {result.employerStatus === 'EMPLOYER_CONFIRMED'
                ? `Matched against official records for ${result.employerName || 'partner employer'}.`
                : 'Not matched against an official registered employer portal record.'}
            </p>
          </div>

          {/* Card 2: System Risk Assessment */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/8">
            <div className="flex items-center gap-2 mb-2 text-neutral-300">
              <Cpu className="w-4 h-4 text-neutral-400" />
              <span className="text-xs font-mono tracking-wider uppercase text-neutral-400">
                SYSTEM RISK ASSESSMENT
              </span>
            </div>
            <div className={`text-sm font-semibold ${statusConfig.riskColor}`}>
              {result.riskLevel === 'HIGH' ? 'High Risk Indicator Score' : result.riskLevel === 'MEDIUM' ? 'Moderate Risk / Unverified' : 'Low Scam Signal Probability'}
            </div>
            <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">
              Automated heuristics scan across known domain records, phone registries, and scam databases.
            </p>
          </div>
        </div>

        {/* MANDATORY LEGAL TRUST NOTE */}
        <div className="mt-4 p-3.5 rounded-lg bg-black/60 border border-white/6 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-neutral-400 leading-relaxed italic">
            “{MANDATORY_LEGAL_NOTE}”
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 pt-6 border-t border-white/8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {isScam && (
            <Link
              to="/report-scam"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-rose-600/90 hover:bg-rose-600 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-rose-900/30"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>REPORT THIS SCAM</span>
            </Link>
          )}

          {result.matchedEmployer?.careersUrl && (
            <a
              href={result.matchedEmployer.careersUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              <span>VERIFY THROUGH OFFICIAL COMPANY WEBSITE</span>
            </a>
          )}

          {isUnverified && (
            <Link
              to="/verified-employers"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-2"
            >
              <Building2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>VIEW VERIFIED EMPLOYERS REGISTRY</span>
            </Link>
          )}
        </div>

        {onReset && (
          <button
            onClick={onReset}
            className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2 ml-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Check Another</span>
          </button>
        )}
      </div>
    </div>
  );
};
