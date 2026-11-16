import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Smartphone, 
  BatteryMedium, 
  Clock, 
  CheckCircle2, 
  Activity, 
  Wifi 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="overview" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Cinematic Ambient Background shapes */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-sage-100/50 rounded-full blur-[110px] pointer-events-none -z-10 animate-glow" />
      <div className="absolute top-40 right-10 w-[450px] h-[450px] bg-sand-200/60 rounded-full blur-[100px] pointer-events-none -z-10 animate-glow" style={{ animationDelay: '3s' }} />
      <div className="absolute -bottom-10 left-10 w-[380px] h-[380px] bg-slateBlue-100/60 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Subtle map grid vector overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#405E53 1px, transparent 1px), radial-gradient(#405E53 1px, #F8F8F5 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Tag / Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage-100 border border-sage-200/60 text-sage-700 text-[11px] font-semibold tracking-wider uppercase mb-5"
            >
              <ShieldCheck size={14} className="text-sage-600" />
              FAMILY DIGITAL SAFETY PLATFORM
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-charcoal-800 leading-[1.12] tracking-tight"
            >
              Stay Connected. <br />
              <span className="text-sage-600">Keep Your Family Safe.</span>
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-charcoal-500 leading-relaxed max-w-xl font-normal"
            >
              One thoughtfully designed platform to help parents stay informed, manage connected devices, and build healthier digital habits for the entire family.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Link
                to="/parent"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-medium text-sm shadow-soft hover:shadow-lift transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Explore Parent Dashboard</span>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              
              <button
                onClick={() => scrollTo('how-it-works')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/90 hover:bg-white text-charcoal-700 border border-charcoal-200/80 font-medium text-sm shadow-xs hover:shadow-soft transition-all duration-200 flex items-center justify-center"
              >
                Discover How It Works
              </button>
            </motion.div>

            {/* Features Bullet List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 pt-6 border-t border-ivory-300 w-full flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-charcoal-500"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-sage-600 shrink-0" />
                <span>Privacy-conscious design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-sage-600 shrink-0" />
                <span>Android &amp; iOS companion experience</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-sage-600 shrink-0" />
                <span>Family-centered controls</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Layered Visual Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Central Layer: Smartphone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-64 sm:w-72 bg-charcoal-900 rounded-[40px] p-3 shadow-modal border-4 border-charcoal-700 z-20"
            >
              {/* Dynamic Island / Notch */}
              <div className="w-24 h-4 bg-charcoal-800 rounded-full mx-auto mb-2.5 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-charcoal-950 mr-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-sage-500/80" />
              </div>

              {/* Phone Screen Interior */}
              <div className="bg-ivory-100 rounded-[30px] p-4 text-charcoal-800 flex flex-col gap-3 min-h-[460px] overflow-hidden">
                
                {/* Companion Top Status */}
                <div className="flex items-center justify-between text-[11px] text-charcoal-500 pt-1">
                  <span className="font-semibold text-charcoal-700">Emma's Phone</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi size={12} className="text-sage-600" />
                    <span>84%</span>
                    <BatteryMedium size={14} className="text-sage-600" />
                  </div>
                </div>

                {/* Companion Shield Badge */}
                <div className="bg-white rounded-2xl p-3 border border-charcoal-100/70 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sage-50 text-sage-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-charcoal-400 font-medium uppercase tracking-wider">Companion Status</p>
                    <p className="text-xs font-semibold text-charcoal-800 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-success inline-block"></span>
                      Protected &amp; Connected
                    </p>
                  </div>
                </div>

                {/* Screen Time Progress Card */}
                <div className="bg-white rounded-2xl p-3.5 border border-charcoal-100/70 shadow-xs">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-semibold text-charcoal-700">Daily Screen Time</span>
                    <span className="text-[11px] text-sage-600 font-medium">1h 15m left</span>
                  </div>
                  <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-sage-500 h-full w-[64%] rounded-full" />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-charcoal-400">
                    <span>Used: 2h 15m</span>
                    <span>Goal: 3h 30m</span>
                  </div>
                </div>

                {/* Location Sharing Card */}
                <div className="bg-white rounded-2xl p-3 border border-charcoal-100/70 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800">
                    <MapPin size={14} className="text-slateBlue-500" />
                    <span>Lincoln Park Center</span>
                  </div>
                  <p className="text-[10px] text-charcoal-400 mt-1 pl-5">
                    Safe zone active • Verified 4 min ago
                  </p>
                </div>

                {/* Transparency notice in phone */}
                <div className="mt-auto bg-sage-50 rounded-xl p-2.5 border border-sage-100 text-center">
                  <p className="text-[10px] text-sage-700 font-medium">
                    Consent-based family sync active
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 1: Family Safety Dashboard Snapshot (Top Left) */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-6 -left-6 sm:-left-12 z-30 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lift border border-charcoal-100/80 max-w-[210px] hidden sm:block animate-float-slow"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center font-semibold text-xs shrink-0">
                  EJ
                </div>
                <div>
                  <p className="text-xs font-semibold text-charcoal-800 leading-tight">Emma Jenkins</p>
                  <p className="text-[10px] text-status-success font-medium flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                    Online • iPhone 15
                  </p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-ivory-200 flex justify-between text-[10px] text-charcoal-500">
                <span>Screen time</span>
                <span className="font-semibold text-charcoal-800">2h 15m</span>
              </div>
            </motion.div>

            {/* Floating Card 2: Simulated Map Snapshot (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-4 sm:-right-10 z-30 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lift border border-charcoal-100/80 max-w-[220px] animate-float-delayed"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slateBlue-100 text-slateBlue-700 flex items-center justify-center shrink-0">
                  <MapPin size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-charcoal-400 font-medium uppercase tracking-wide">Live Shared Location</p>
                  <p className="text-xs font-semibold text-charcoal-800 truncate mt-0.5">Westside Athletics Field</p>
                  <p className="text-[10px] text-charcoal-500 mt-0.5">Noah • 2m ago</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 3: Digital Wellbeing Stat (Middle Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute top-28 -right-8 sm:-right-16 z-10 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-soft border border-charcoal-100/80 hidden md:flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-status-success" />
              <span className="text-[11px] font-medium text-charcoal-700">Bedtime schedule active</span>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
