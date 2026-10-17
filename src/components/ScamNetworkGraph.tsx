import React, { useState, useEffect } from 'react';
import { Phone, Mail, Globe, CreditCard, FileSpreadsheet, ShieldAlert, CheckCircle, Database } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  risk: 'danger' | 'warning' | 'safe';
  details: string;
  reports: number;
}

export const ScamNetworkGraph: React.FC<{ interactive?: boolean; className?: string }> = ({
  interactive = true,
  className = '',
}) => {
  const [activeNode, setActiveNode] = useState<string | null>('node-scam');
  const [pulseOffset, setPulseOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseOffset((prev) => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const nodes: Node[] = [
    {
      id: 'node-phone',
      label: 'Phone Number',
      type: '+91 98765 43210',
      icon: Phone,
      x: 18,
      y: 30,
      risk: 'danger',
      details: 'Flagged in 14 student WhatsApp groups; active fake job coordinator',
      reports: 14,
    },
    {
      id: 'node-email',
      label: 'Recruiter Email',
      type: 'hr.infosys.2026@gmail.com',
      icon: Mail,
      x: 48,
      y: 18,
      risk: 'danger',
      details: 'Free webmail impersonating corporate HR; SPF authentication missing',
      reports: 22,
    },
    {
      id: 'node-domain',
      label: 'Impersonated Domain',
      type: 'infosys-careerportal.live',
      icon: Globe,
      x: 80,
      y: 28,
      risk: 'danger',
      details: 'Registered 18 days ago via offshore anonymizer; hosting cloned login forms',
      reports: 37,
    },
    {
      id: 'node-upi',
      label: 'UPI Handle / VPA',
      type: 'refund-desk-portal99@ybl',
      icon: CreditCard,
      x: 24,
      y: 72,
      risk: 'danger',
      details: 'Reverse collect request fraud pretending to deposit tech fest stipend',
      reports: 29,
    },
    {
      id: 'node-offer',
      label: 'Forged Offer ID',
      type: 'INF-TEMP-8839',
      icon: FileSpreadsheet,
      x: 52,
      y: 82,
      risk: 'warning',
      details: 'Invalid checksum algorithm; rejected by central employer cryptographic registry',
      reports: 8,
    },
    {
      id: 'node-scam',
      label: 'Scam Intelligence Core',
      type: 'National Threat Node #IND-804',
      icon: ShieldAlert,
      x: 50,
      y: 48,
      risk: 'danger',
      details: 'Correlated syndication hub mapping multiple placement fraud vectors',
      reports: 110,
    },
    {
      id: 'node-registry',
      label: 'Employer Registry',
      type: 'Verified Institutional Node',
      icon: Database,
      x: 82,
      y: 74,
      risk: 'safe',
      details: 'Official verified corporate registry. Authorized candidate whitelist match: FALSE',
      reports: 0,
    },
  ];

  // Connections between nodes
  const links = [
    { from: 'node-phone', to: 'node-scam' },
    { from: 'node-email', to: 'node-scam' },
    { from: 'node-domain', to: 'node-scam' },
    { from: 'node-upi', to: 'node-scam' },
    { from: 'node-offer', to: 'node-scam' },
    { from: 'node-phone', to: 'node-email' },
    { from: 'node-email', to: 'node-domain' },
    { from: 'node-upi', to: 'node-offer' },
    { from: 'node-domain', to: 'node-registry' },
    { from: 'node-scam', to: 'node-registry' },
  ];

  const selectedNodeData = nodes.find((n) => n.id === activeNode);

  return (
    <div className={`relative w-full rounded-2xl glass-panel p-6 border border-white/8 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/8">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            CORRELATED THREAT INTELLIGENCE
          </span>
          <h3 className="text-base font-bold text-white tracking-tight">
            Scam Entity Graph & Cross-Signal Correlation
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Confirmed Scam Signal
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Verified Registry
          </span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-[320px] sm:h-[380px] bg-black/60 rounded-xl overflow-hidden border border-white/6">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(239,68,68,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
            <filter id="glowEffect">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Links */}
          {links.map((link, idx) => {
            const source = nodes.find((n) => n.id === link.from);
            const target = nodes.find((n) => n.id === link.to);
            if (!source || !target) return null;

            const isHighlighted = activeNode === source.id || activeNode === target.id;

            return (
              <g key={idx}>
                {/* Background hairline line */}
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isHighlighted ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={isHighlighted ? 0.6 : 0.3}
                  strokeDasharray={isHighlighted ? '1, 1' : 'none'}
                />
                {/* Moving pulse packet */}
                <circle
                  r={isHighlighted ? 0.9 : 0.6}
                  fill={isHighlighted ? '#ef4444' : 'rgba(255,255,255,0.7)'}
                  filter="url(#glowEffect)"
                >
                  <animateMotion
                    path={`M ${source.x} ${source.y} L ${target.x} ${target.y}`}
                    dur={`${2.5 + (idx % 3)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Nodes Layer (Positioned with CSS percentage for sharp icon rendering and accessibility) */}
        {nodes.map((node) => {
          const isSelected = activeNode === node.id;
          const IconComp = node.icon;
          const colorStyles =
            node.risk === 'danger'
              ? 'border-rose-500/50 bg-black/90 text-rose-400 hover:border-rose-400'
              : node.risk === 'warning'
              ? 'border-amber-500/50 bg-black/90 text-amber-400 hover:border-amber-400'
              : 'border-emerald-500/50 bg-black/90 text-emerald-400 hover:border-emerald-400';

          return (
            <div
              key={node.id}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => interactive && setActiveNode(node.id)}
              className={`absolute cursor-pointer flex flex-col items-center group transition-all duration-200 z-10 ${
                isSelected ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div
                className={`p-2 sm:p-2.5 rounded-xl border backdrop-blur-md transition-all ${colorStyles} ${
                  isSelected ? 'ring-2 ring-white/30 shadow-lg shadow-rose-950/40' : ''
                }`}
              >
                <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Node Label Below */}
              <div className="mt-1.5 text-center pointer-events-none">
                <span className="text-[10px] font-mono tracking-tight text-neutral-300 block bg-black/80 px-1.5 py-0.5 rounded border border-white/6 whitespace-nowrap">
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Detail Inspector Drawer */}
      {selectedNodeData && (
        <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-white">
                {selectedNodeData.label}:
              </span>
              <span className="text-xs font-mono text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/6">
                {selectedNodeData.type}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              {selectedNodeData.details}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase block">
              REPORTS LINKED
            </span>
            <span className="text-sm font-mono font-bold text-rose-400">
              {selectedNodeData.reports > 0 ? `${selectedNodeData.reports} verified reports` : 'Verified Entity'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
