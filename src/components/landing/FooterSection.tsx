import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  Lock, 
  Github, 
  Twitter, 
  Linkedin 
} from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <div>
      {/* Pre-Footer Call to Action Banner */}
      <section className="bg-sage-600 text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-60 h-60 rounded-full bg-black/10 blur-xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium mb-4 backdrop-blur-xs">
            <ShieldCheck size={14} />
            Family Safety &amp; Digital Wellbeing
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Build a safer digital environment for your family.
          </h2>
          <p className="mt-4 text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of modern families who foster responsible digital habits through transparency and mutual trust.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/parent"
              className="px-8 py-3.5 rounded-xl bg-white text-sage-800 font-semibold text-sm shadow-soft hover:bg-ivory-100 transition-all flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/admin"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm transition-all"
            >
              Owner Admin Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Main Footer in Deep Muted Forest Green */}
      <footer className="bg-[#243730] text-ivory-300 pt-16 pb-12 border-t border-sage-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-sage-700/60">
            
            {/* Left: Brand & Description (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sage-500/20 text-sage-200 border border-sage-400/30 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <span className="font-heading font-bold text-lg text-white tracking-tight">
                  AegisFamily
                </span>
              </div>
              
              <p className="text-xs text-ivory-400/80 leading-relaxed max-w-sm">
                A thoughtfully designed platform to help parents stay informed, manage connected devices, and build healthier digital habits for the entire family.
              </p>

              <div className="pt-2 flex items-center gap-3 text-ivory-400">
                <a href="#github" className="p-2 rounded-lg bg-sage-800/60 hover:text-white transition-colors" aria-label="GitHub">
                  <Github size={15} />
                </a>
                <a href="#twitter" className="p-2 rounded-lg bg-sage-800/60 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter size={15} />
                </a>
                <a href="#linkedin" className="p-2 rounded-lg bg-sage-800/60 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin size={15} />
                </a>
              </div>
            </div>

            {/* Middle: Platform Links (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <p className="font-heading text-xs font-semibold text-white uppercase tracking-wider">
                Platform
              </p>
              <ul className="space-y-2 text-xs text-ivory-400">
                <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#compatibility" className="hover:text-white transition-colors">Compatibility</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><Link to="/child" className="hover:text-white transition-colors">Child Companion</Link></li>
              </ul>
            </div>

            {/* Right: Portals & Legal (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <p className="font-heading text-xs font-semibold text-white uppercase tracking-wider">
                Demonstration Portals
              </p>
              <ul className="space-y-2 text-xs text-ivory-400">
                <li>
                  <Link to="/parent" className="hover:text-white transition-colors flex items-center gap-1.5">
                    Parent Login Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1.5">
                    Owner Central Admin Panel
                  </Link>
                </li>
                <li>
                  <Link to="/child/enrollment" className="hover:text-white transition-colors flex items-center gap-1.5">
                    Simulated Device Enrollment
                  </Link>
                </li>
                <li><a href="#faq" className="hover:text-white transition-colors">Support &amp; FAQ</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Privacy Statement */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory-400/70">
            <div>
              &copy; {new Date().getFullYear()} AegisFamily Platform Inc. All rights reserved.
            </div>
            <div className="text-[11px] text-center md:text-right max-w-md">
              <span className="text-sage-300 font-medium">Privacy-Conscious Technology: </span>
              Zero covert tracking, no keystroke interception, and strictly consent-based family synchronization.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
