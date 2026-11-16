import React from 'react';
import { HeartHandshake, Eye, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustSection: React.FC = () => {
  const indicators = [
    {
      icon: <HeartHandshake className="text-sage-600" size={24} />,
      title: 'Family-First Design',
      description: 'Crafted to build healthy communication, trust, and understanding between parents and children.',
    },
    {
      icon: <Eye className="text-slateBlue-500" size={24} />,
      title: 'Transparent Device Permissions',
      description: 'Zero hidden surveillance. Every active permission is visible, reviewable, and consent-based on enrolled devices.',
    },
    {
      icon: <ShieldCheck className="text-sage-600" size={24} />,
      title: 'Privacy-Conscious Reporting',
      description: 'High-level aggregate insights and digital wellbeing summaries without intrusive private message extraction.',
    },
  ];

  return (
    <section className="py-14 bg-white/70 border-y border-ivory-300 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {indicators.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex items-start gap-4 p-4 rounded-2xl hover:bg-ivory-100/60 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-ivory-200/80 border border-charcoal-100/70 flex items-center justify-center shrink-0 shadow-xs">
                {item.icon}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base text-charcoal-800 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-charcoal-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
