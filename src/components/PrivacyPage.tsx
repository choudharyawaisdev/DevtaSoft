import React, { useEffect } from 'react';
import { Shield, ArrowLeft, Calendar, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#FF6B00] font-bold text-sm mb-8 transition-colors cursor-pointer select-none group bg-transparent border-none p-0"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        {/* Executive Header Card */}
        <div className="bg-gradient-to-br from-[#0B132B] via-[#0D152A] to-[#162244] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#00C2CC]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-[#FF6B00] tracking-wider uppercase mb-3">
                <Shield className="w-4 h-4 text-[#FF6B00]" />
                <span>Security & Trust Policy</span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-2">
                Privacy Policy
              </h1>
              <p className="text-slate-300 text-sm font-medium">
                How we protect, govern, and respect your personal data.
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shrink-0 self-start sm:self-auto">
              <Calendar className="w-4 h-4 text-[#00C2CC]" />
              <span className="text-xs font-bold text-slate-200">Last Updated: August 2026</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 space-y-12">
          
          {/* Section 1 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full" />
              <span>1. Information We Collect</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              DevtaSoft collects various types of information to provide and improve our services, optimize user interfaces, and maintain active cyber-security safeguards.
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-[#0D152A] uppercase tracking-wider mb-1">A. Personal Information You Provide</h4>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  We collect names, email addresses, phone numbers, billing/invoicing details, company names, and project requirements when you fill out contact forms, schedule consultations, or purchase custom software solutions.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0D152A] uppercase tracking-wider mb-1">B. Information Collected Automatically</h4>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  When you access our platform, we automatically gather device indicators including IP addresses, browser specifications, OS types, referring URLs, screen parameters, and clickstream user behavior metrics.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#00C2CC] rounded-full" />
              <span>2. How We Use Your Data</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium mb-3">
              We process personal information under valid legal bases including contract performance, legitimate interests, and direct user consent:
            </p>
            <ul className="list-disc list-inside text-slate-600 text-sm sm:text-base leading-relaxed font-medium ml-2 space-y-2">
              <li>To design, develop, test, and deploy custom software products or services.</li>
              <li>To communicate active updates regarding project milestones, deliverables, and service outages.</li>
              <li>To analyze site performance, execute behavioral mapping, and upgrade our service architectures.</li>
              <li>To prevent fraudulent attempts, safeguard secure portals, and enforce server security policies.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full" />
              <span>3. Sharing & Disclosing Information</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              We hold a strict policy regarding user privacy. DevtaSoft will never sell, lease, or rent your database info to marketing networks. We only disclose information under these specific scenarios:
            </p>
            <ul className="list-disc list-inside text-slate-600 text-sm sm:text-base leading-relaxed font-medium mt-3 ml-2 space-y-2">
              <li>With certified sub-processors and cloud service infrastructure providers (such as hosting partners, database backups, and payment gateways) operating under confidentiality agreements.</li>
              <li>To protect against legal liability, address emergency security breaches, or comply with lawful subpoenas from state authorities.</li>
              <li>During business transformations, mergers, acquisitions, or restructuring, where user data constitutes an asset.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#00C2CC] rounded-full" />
              <span>4. Data Security Standards</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              DevtaSoft enforces multi-layered technical and administrative safeguards. We encrypt all sensitive communication using SSL/TLS (HTTPS) tunnels, implement firewall rules to isolate database endpoints, and enforce automated IP locking mechanisms on authentication servers to mitigate credential stuffing and brute-force events.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full" />
              <span>5. Cookies & Tracking Technologies</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              We deploy cookies, local storage, and analytical pixels to remember preferences, analyze layout performance, and customize visual settings:
            </p>
            <ul className="list-disc list-inside text-slate-600 text-sm sm:text-base leading-relaxed font-medium mt-3 ml-2 space-y-2">
              <li><strong>Essential Cookies:</strong> Required to access user portals and run basic security components.</li>
              <li><strong>Analytics Cookies:</strong> Gather anonymous navigation statistics to track page speed and layouts.</li>
              <li><strong>Preference Cookies:</strong> Store UI settings such as night mode states or language options.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#00C2CC] rounded-full" />
              <span>6. Data Retention Policy</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              We retain personal data only for as long as necessary to fulfill the purposes outlined in this Policy, manage active customer accounts, or comply with legal audit protocols. Once the retention period ends, personal data is permanently deleted or irreversibly anonymized.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full" />
              <span>7. GDPR & CCPA Rights</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium mb-3">
              Depending on your location, you possess standard privacy rights regarding your data:
            </p>
            <ul className="list-disc list-inside text-slate-600 text-sm sm:text-base leading-relaxed font-medium ml-2 space-y-2">
              <li><strong>Right to Access:</strong> Ask for copy records of all personal data held.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate information.</li>
              <li><strong>Right to Erasure:</strong> Request permanent deletion of records ("Right to be Forgotten").</li>
              <li><strong>Right to Restrict Processing:</strong> Request suspension of data operations.</li>
              <li><strong>Right to Portability:</strong> Obtain data structured in common machine-readable formats.</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#00C2CC] rounded-full" />
              <span>8. International Data Transfers</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              As a global developer, DevtaSoft transfers and stores data inside cloud servers located in multiple jurisdictions. We utilize standard contractual clauses (SCCs) to ensure equivalent security safeguards are applied by our database hostings, wherever they process data.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full" />
              <span>9. Children's Privacy Protection</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Our website is designed for corporate businesses and adult professionals. We do not intentionally collect or process data from individuals under 13 years of age. If we identify that any underage user has provided personal details, we will immediately purge the record from our database.
            </p>
          </div>

          {/* Contact Section */}
          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-extrabold text-lg text-[#0D152A] mb-1">
                Have questions or feedback?
              </h4>
              <p className="text-[#6B7280] text-sm font-semibold">
                Our support team is happy to answer any questions about our privacy policies.
              </p>
            </div>
            <a
              href="mailto:devtasoftofficial@gmail.com"
              className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E05B00] text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Support</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
