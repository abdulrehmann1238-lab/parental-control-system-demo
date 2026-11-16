import React from 'react';
import { UserPlus, QrCode, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Create Your Account',
      subtitle: 'Parents create their family account',
      description: 'Set up your family profile in seconds, choose your preferred security tier, and establish baseline guidelines.',
      icon: <UserPlus size={22} className="text-sage-600" />,
    },
    {
      num: '02',
      title: 'Connect a Device',
      subtitle: 'Transparent setup & permission process',
      description: 'Enroll the child device through a visible companion flow where permissions are clearly explained and accepted.',
      icon: <QrCode size={22} className="text-slateBlue-500" />,
    },
    {
      num: '03',
      title: 'Manage Your Family',
      subtitle: 'Access authorized device information',
      description: 'Monitor device status, review aggregate screen-time reports, and coordinate family safety through one clean dashboard.',
      icon: <ShieldCheck size={22} className="text-sage-600" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-ivory-200/60 border-y border-ivory-300 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Simple 3-Step Setup
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-800 tracking-tight">
            How AegisFamily Works
          </h2>
          <p className="mt-4 text-sm sm:text-base text-charcoal-500 leading-relaxed font-normal">
            Transparent enrollment built with mutual respect and zero hidden surprises.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-sage-200 via-sage-400 to-sage-200 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-white rounded-card-lg p-8 border border-charcoal-100 shadow-soft flex flex-col items-center text-center relative"
              >
                {/* Step Number Badge */}
                <div className="w-16 h-16 rounded-2xl bg-ivory-100 border-2 border-sage-500/20 shadow-xs flex items-center justify-center mb-6 relative group">
                  <span className="font-heading font-extrabold text-lg text-sage-700">
                    {step.num}
                  </span>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-white border border-ivory-300 flex items-center justify-center shadow-xs">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-charcoal-800 tracking-tight">
                  {step.title}
                </h3>
                
                <p className="text-xs font-medium text-sage-600 mt-1 mb-3">
                  {step.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-normal">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
