import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  ExternalLink, 
  PlusCircle, 
  ShieldCheck, 
  X, 
  Send,
  Info,
  Search
} from 'lucide-react';
import { DEMO_VERIFIED_EMPLOYERS, MANDATORY_LEGAL_NOTE } from '../data/mockData';
import { VerifiedEmployer } from '../types';

export const VerifiedEmployersPage: React.FC = () => {
  const [employersList, setEmployersList] = useState<VerifiedEmployer[]>(DEMO_VERIFIED_EMPLOYERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    domain: '',
    careersUrl: '',
    hrDomain: '',
    offerIdFormat: '',
    verificationMethod: 'Cryptographic Offer Registry + HR Verification Webhook',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployer: VerifiedEmployer = {
      id: `emp-dyn-${Date.now()}`,
      name: `${formData.name} (Demo)`,
      industry: formData.industry || 'Technology & Software',
      domain: formData.domain,
      careersUrl: formData.careersUrl.startsWith('http') ? formData.careersUrl : `https://${formData.careersUrl}`,
      hrDomain: formData.hrDomain,
      offerIdFormat: formData.offerIdFormat || 'EMP-2026-[6 digits]',
      verificationMethod: formData.verificationMethod,
      registeredDate: new Date().toISOString().split('T')[0],
      verifiedInternshipsCount: 1,
      badge: 'Employer Registered (Demo)',
    };

    setEmployersList([newEmployer, ...employersList]);
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setModalOpen(false);
      setFormData({
        name: '',
        industry: '',
        domain: '',
        careersUrl: '',
        hrDomain: '',
        offerIdFormat: '',
        verificationMethod: 'Cryptographic Offer Registry + HR Verification Webhook',
      });
    }, 1800);
  };

  const filteredEmployers = employersList.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#000000] text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>EMPLOYER PARTNER REGISTRY (DEMO)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Verified Employers
            </h1>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-2xl">
              Employers can independently confirm their recruitment records and candidate issuance whitelists.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-xl transition-all glow-white-sm flex items-center gap-2 self-start md:self-auto whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4 text-black" />
            <span>REGISTER AS AN EMPLOYER</span>
          </button>
        </div>

        {/* Legal Trust Notice Banner */}
        <div className="my-8 p-4 rounded-xl bg-white/[0.02] border border-white/8 flex items-start gap-3">
          <Info className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-300 leading-relaxed">
            <strong className="text-white block mb-0.5">Strict Sandbox Demo Policy:</strong>
            All companies listed below are sandbox demo entities created for educational verification testing. VerifySafe never claims real external corporations are verified without authorized institutional cryptographic hooks.
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search verified employer name, domain, or industry..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
            />
          </div>
          <span className="text-xs font-mono text-neutral-400 hidden sm:block">
            {filteredEmployers.length} Demo Employers Active
          </span>
        </div>

        {/* Employers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredEmployers.map((emp) => (
            <div
              key={emp.id}
              className="p-6 rounded-2xl glass-panel border border-white/8 hover:border-white/18 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono font-bold text-base text-white group-hover:border-white/20 transition-colors">
                      {emp.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-neutral-100">
                        {emp.name}
                      </h3>
                      <p className="text-xs text-neutral-400">
                        {emp.industry}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>✓ Employer Registered (Demo)</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-y border-white/6 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block">Official Domain:</span>
                    <span className="text-white font-medium">{emp.domain}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block">Authorized HR Mail:</span>
                    <span className="text-white font-medium">{emp.hrDomain}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block">Offer ID Format:</span>
                    <span className="text-neutral-300">{emp.offerIdFormat}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block">Verification Method:</span>
                    <span className="text-emerald-400">{emp.verificationMethod}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs">
                <span className="text-neutral-400 text-[11px] font-mono">
                  Registered: {emp.registeredDate} · {emp.verifiedInternshipsCount} verified records
                </span>

                <a
                  href={emp.careersUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white flex items-center gap-1 font-mono text-[11px] hover:underline"
                >
                  <span>Careers</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* REGISTER AS AN EMPLOYER MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-2xl glass-panel border border-white/15 p-6 sm:p-8 bg-[#0a0a0a] shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Register as an Employer (Demo)
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Submit company recruitment telemetry to the candidate whitelist.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {registerSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">
                    DEMO EMPLOYER REGISTERED
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Your company profile and offer ID format have been added to the demo candidate whitelist registry.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Acme Systems Technologies"
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      Industry / Sector
                    </label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="e.g. Enterprise Cloud Computing"
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-1">
                        Official Domain *
                      </label>
                      <input
                        type="text"
                        required
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        placeholder="e.g. acmesystems-demo.com"
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-1">
                        Authorized HR Email Domain *
                      </label>
                      <input
                        type="text"
                        required
                        name="hrDomain"
                        value={formData.hrDomain}
                        onChange={handleChange}
                        placeholder="e.g. careers@acmesystems-demo.com"
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      Official Careers Page URL *
                    </label>
                    <input
                      type="text"
                      required
                      name="careersUrl"
                      value={formData.careersUrl}
                      onChange={handleChange}
                      placeholder="https://acmesystems-demo.com/careers"
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      Offer ID / Reference Number Format
                    </label>
                    <input
                      type="text"
                      name="offerIdFormat"
                      value={formData.offerIdFormat}
                      onChange={handleChange}
                      placeholder="e.g. ACM-2026-INT-[4 digits]"
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      Verification Method
                    </label>
                    <select
                      name="verificationMethod"
                      value={formData.verificationMethod}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                    >
                      <option value="Cryptographic Offer Registry + HR Verification Webhook" className="bg-neutral-900">
                        Cryptographic Offer Registry + HR Verification Webhook
                      </option>
                      <option value="Automated HR Signature Hash Match" className="bg-neutral-900">
                        Automated HR Signature Hash Match
                      </option>
                      <option value="Direct HR Placement Cell API Sync" className="bg-neutral-900">
                        Direct HR Placement Cell API Sync
                      </option>
                    </select>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-2 glow-white-sm"
                    >
                      <Send className="w-3.5 h-3.5 text-black" />
                      <span>SUBMIT REGISTRATION</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
