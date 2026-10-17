/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { InternshipCheckerPage } from './pages/InternshipCheckerPage';
import { JobCheckerPage } from './pages/JobCheckerPage';
import { UpiCheckerPage } from './pages/UpiCheckerPage';
import { SmsCheckerPage } from './pages/SmsCheckerPage';
import { ReportScamPage } from './pages/ReportScamPage';
import { CollegeDashboardPage } from './pages/CollegeDashboardPage';
import { VerifiedEmployersPage } from './pages/VerifiedEmployersPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#000000] text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/internship-scam" element={<InternshipCheckerPage />} />
            <Route path="/job-offer-scam" element={<JobCheckerPage />} />
            <Route path="/upi-scam" element={<UpiCheckerPage />} />
            <Route path="/sms-scam" element={<SmsCheckerPage />} />
            <Route path="/report-scam" element={<ReportScamPage />} />
            <Route path="/college-dashboard" element={<CollegeDashboardPage />} />
            <Route path="/verified-employers" element={<VerifiedEmployersPage />} />
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
