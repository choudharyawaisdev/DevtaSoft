import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, Mail, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TermsPage: React.FC = () => {
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
                <FileCheck className="w-4 h-4 text-[#FF6B00]" />
                <span>Agreement Terms & Conditions</span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-2">
                Terms & Conditions
              </h1>
              <p className="text-slate-300 text-sm font-medium">
                Our operations guidelines, code regulations, and customer contracts.
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
              <span>1. Agreement to Terms</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              By accessing, browsing, or utilizing the DevtaSoft website or deploying our software products (including REPOSTSEO, Editpad, AllMath, etc.), you confirm that you have read, understood, and agreed to be legally bound by these Terms and Conditions. If you do not accept these provisions, you must immediately cease accessing our website and utilizing our development services.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#00C2CC] rounded-full" />
              <span>2. User Accounts & Security</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              To request consultation details or manage ongoing software developments, you may be required to register credentials. You are solely responsible for maintaining the confidentiality of your login details. DevtaSoft reserves the right to suspend accounts or lock IP access if we discover malicious activity, suspicious verification patterns, or account sharing.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full" />
              <span>3. Intellectual Property Rights</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Unless otherwise declared under a specific software consulting contract, all assets displayed on this platform—including raw codebases, design systems, vectors, illustrations, texts, icons, logos, and custom 3D animations—are the exclusive property of DevtaSoft and protected by global copyright and trademark treaties. You are prohibited from harvesting, decompiling, or recreating our designs without written clearance from our management.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#00C2CC] rounded-full" />
              <span>4. Acceptable Conduct & Abuse Policies</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              You agree not to use DevtaSoft's website or services for unlawful actions. Prohibited behaviors include:
            </p>
            <ul className="list-disc list-inside text-slate-600 text-sm sm:text-base leading-relaxed font-medium mt-3 ml-2 space-y-2">
              <li>Running automated crawlers, scrapers, or web spiders that overload our database layers.</li>
              <li>Injecting Trojan horses, malware payloads, or scripts targeting client credentials.</li>
              <li>Launching denial-of-service (DDoS) requests or attempting unauthorized server penetration testing.</li>
              <li>Rebranding our proprietary products to sell or distribute to third-party marketplaces.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full" />
              <span>5. Payments, Billings & Milestones</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Services provided by DevtaSoft are subject to custom consulting agreements and scope specifications:
            </p>
            <ul className="list-disc list-inside text-slate-600 text-sm sm:text-base leading-relaxed font-medium mt-3 ml-2 space-y-2">
              <li>Project payments are structured around specific milestones (e.g. Wireframe Approval, Beta Release, Final Delivery).</li>
              <li>Invoices are payable within the terms specified in the service agreement (typically 14-30 business days).</li>
              <li>Subscriptions to DevtaSoft proprietary web tools are billed in advance on a recurring monthly or annual basis.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#00C2CC] rounded-full" />
              <span>6. Disclaimer of Warranties</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              DevtaSoft provides its software platforms, custom integrations, and website materials on an "as-is" and "as-available" basis without representations or warranties of any kind. We do not guarantee that our software will be entirely bug-free, run continuously without server maintenance, or resolve specific revenue metrics.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full" />
              <span>7. Limitation of Liability</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              To the maximum extent permitted by applicable law, DevtaSoft, its directors, and its engineering leads shall not be liable for any indirect, special, incidental, consequential, or punitive damages—including lost profits, server data corruption, or business interruption—arising out of your use of or inability to use our platforms, even if advised of the possibility of such damages.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#00C2CC] rounded-full" />
              <span>8. Indemnification</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              You agree to defend, indemnify, and hold harmless DevtaSoft and its subsidiaries from and against any claims, liabilities, damages, judgments, losses, costs, or expenses (including reasonable attorneys' fees) arising out of your violation of these Terms and Conditions or your misuse of our custom software deployments.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full" />
              <span>9. Governing Law & Jurisdiction</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              These Terms and Conditions shall be governed by, and construed in accordance with, the laws of the jurisdiction in which DevtaSoft operates, without regard to its conflict of law principles. Any dispute arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the local courts.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#00C2CC] rounded-full" />
              <span>10. Termination Policy</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              We reserve the right, without notice and at our sole discretion, to terminate your permission to use this website, lock database access, or terminate active subscriptions in the event of a breach of these Terms. All provisions of these Terms which by their nature should survive termination shall survive (including intellectual property ownership, disclaimers, and limitation of liability).
            </p>
          </div>

          {/* Contact Section */}
          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-extrabold text-lg text-[#0D152A] mb-1">
                Have questions or feedback?
              </h4>
              <p className="text-[#6B7280] text-sm font-semibold">
                Our support team is happy to answer any questions about our agreement terms.
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
