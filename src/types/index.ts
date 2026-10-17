export type VerificationStatusType = 'VERIFIED' | 'UNVERIFIED' | 'POTENTIAL_SCAM';
export type RiskLevelType = 'LOW' | 'MEDIUM' | 'HIGH';
export type EmployerConfirmationStatus = 'EMPLOYER_CONFIRMED' | 'NOT_EMPLOYER_CONFIRMED';

export interface SignalCheck {
  id: string;
  name: string;
  passed: boolean; // true = good/legit, false = suspicious/scam
  severity: 'safe' | 'warning' | 'danger';
  detail: string;
}

export interface VerificationResult {
  id: string;
  category: 'internship' | 'job' | 'upi' | 'sms';
  targetTitle: string;
  status: VerificationStatusType;
  riskLevel: RiskLevelType;
  employerStatus: EmployerConfirmationStatus;
  employerName?: string;
  matchedEmployer?: {
    name: string;
    domain: string;
    careersUrl: string;
    verificationMethod: string;
  };
  reasons: string[];
  signals: SignalCheck[];
  recommendedAction: string;
  officialVerificationUrl?: string;
  timestamp: string;
  inputSummary: Record<string, string>;
  suspiciousHighlights?: string[]; // for SMS/text highlighting
}

export interface DemoPreset {
  id: string;
  title: string;
  label: string;
  badge: 'Safe' | 'Unverified' | 'Scam';
  badgeColor: 'emerald' | 'amber' | 'rose';
  formData: Record<string, string>;
  expectedResult: VerificationResult;
}

export interface VerifiedEmployer {
  id: string;
  name: string;
  industry: string;
  domain: string;
  careersUrl: string;
  offerIdFormat: string;
  verificationMethod: string;
  registeredDate: string;
  verifiedInternshipsCount: number;
  badge: 'Employer Registered (Demo)';
  hrDomain: string;
}

export interface ScamReportEntry {
  id: string;
  scamType: 'Internship Fraud' | 'Fake Job Offer' | 'UPI Money Request' | 'Suspicious SMS / Phishing';
  targetName: string;
  phone?: string;
  email?: string;
  domain?: string;
  upiId?: string;
  amountRequested?: string;
  description: string;
  dateReported: string;
  status: 'Added to Demo Intelligence' | 'Flagged' | 'Active Alert';
}

export interface SuspiciousRecruiterLog {
  id: string;
  recruiter: string;
  company: string;
  contact: string;
  contactType: 'Phone' | 'Email' | 'UPI' | 'Telegram';
  risk: 'HIGH' | 'MEDIUM' | 'LOW';
  reports: number;
  status: 'Blacklisted' | 'Under Review' | 'Active Alert';
  lastSeen: string;
  scamModus: string;
}
