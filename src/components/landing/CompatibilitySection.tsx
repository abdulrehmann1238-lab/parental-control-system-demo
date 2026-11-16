import React from 'react';
import { Smartphone, Apple, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const CompatibilitySection: React.FC = () => {
  return (
    <section id="compatibility" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Cross-Platform Support
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-800 tracking-tight">
            Designed for iOS &amp; Android Ecosystems
          </h2>
          <p className="mt-4 text-sm sm:text-base text-charcoal-500 leading-relaxed font-normal">
            Optimized for platform-specific capabilities with zero reliance on intrusive root exploits or jailbreaking.
          </p>
        </div>

        {/* 2 Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Android Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-card-lg p-8 border border-charcoal-100 shadow-soft hover:shadow-lift transition-all"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-sage-50 text-sage-600 border border-sage-100 flex items-center justify-center">
                <Smartphone size={30} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-charcoal-800">
                  Android Companion Experience
                </h3>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Compatible with Android 10, 11, 12, 13, and 14
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {[
                { title: 'Device Enrollment', desc: 'Fast, secure enrollment with transparent consent validation.' },
                { title: 'Supported Permission Management', desc: 'Standard Android UsageStats, Location, and Notification access.' },
                { title: 'Device Status & Diagnostics', desc: 'Battery level, connection strength, sync state, and OS updates.' },
                { title: 'Screen Time & Usage Quotas', desc: 'Enforces schedule reminders and customizable quiet hours.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-ivory-100/60 border border-ivory-200">
                  <CheckCircle2 size={16} className="text-sage-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-charcoal-800">{item.title}</h4>
                    <p className="text-[11px] text-charcoal-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* iPhone Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-card-lg p-8 border border-charcoal-100 shadow-soft hover:shadow-lift transition-all"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-slateBlue-100 text-slateBlue-700 border border-slateBlue-200 flex items-center justify-center">
                <Apple size={30} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-charcoal-800">
                  iOS Companion Experience
                </h3>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Compatible with iOS 16, 17, and iPadOS
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {[
                { title: 'Supported Family Safety Features', desc: 'Full adherence to Apple Screen Time API & Family Sharing guidelines.' },
                { title: 'Transparent Permission Management', desc: 'Always-On or While Using location verification with user consent.' },
                { title: 'Device Status & Sync', desc: 'Real-time battery percentage, network telemetry, and safe zone alerts.' },
                { title: 'Bedtime & Downtime Sync', desc: 'Scheduled digital wellbeing breaks aligned with iOS focus modes.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-ivory-100/60 border border-ivory-200">
                  <CheckCircle2 size={16} className="text-slateBlue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-charcoal-800">{item.title}</h4>
                    <p className="text-[11px] text-charcoal-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Responsible Engineering Disclosure Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 p-5 rounded-2xl bg-ivory-200/80 border border-charcoal-200/60 flex items-start gap-3.5"
        >
          <Shield size={20} className="text-sage-600 shrink-0 mt-0.5" />
          <div className="text-xs text-charcoal-600 leading-relaxed">
            <span className="font-semibold text-charcoal-800">Operating System Compatibility Note: </span>
            Available capabilities strictly adhere to official Apple and Google operating-system APIs and safety frameworks. 
            We do not engage in unauthorized spyware techniques, keystroke recording, or private message interception. All device features are transparent and consent-driven.
          </div>
        </motion.div>

      </div>
    </section>
  );
};
