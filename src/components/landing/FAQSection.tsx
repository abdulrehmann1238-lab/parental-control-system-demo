import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How does the platform work?',
    answer: 'AegisFamily connects parent accounts with enrolled child devices through a transparent companion application. The platform coordinates aggregate screen-time statistics, authorized location signals, and digital wellbeing schedules while respecting privacy boundaries and operating system security models.',
  },
  {
    question: 'Which devices are supported?',
    answer: 'The platform supports modern iOS (iOS 16, 17, and iPadOS) and Android devices (Android 10 through 14). Both operating systems operate using their standard, approved background permissions without requiring rooting or jailbreaking.',
  },
  {
    question: 'How are child devices enrolled?',
    answer: 'Enrollment takes place through an open, 5-step transparent setup on the child’s device. Parents initiate the link via QR code or setup key, and the child reviews and authorizes each requested permission (such as Screen Time and Location Sharing) with clear, understandable explanations.',
  },
  {
    question: 'Can parents manage multiple devices?',
    answer: 'Yes! Depending on your subscription plan, parents can connect from 1 up to 10 devices per family account. Each child can have their own personalized rules, schedules, and location-sharing preferences.',
  },
  {
    question: 'How does location sharing work?',
    answer: 'Location sharing provides authorized check-ins and safe zone notifications using platform GPS APIs. Updates occur periodically in the background when permitted, giving parents confidence that their family members have safely arrived at school, practice, or home.',
  },
  {
    question: 'What information is available?',
    answer: 'Parents can view device connection health (battery, network sync), high-level app category screen-time breakdowns (e.g. Education, Games, Social), aggregate communication activity (total volume without message reading), and authorized location breadcrumbs.',
  },
  {
    question: 'How are privacy and permissions handled?',
    answer: 'Privacy and trust are our fundamental core values. The platform never extracts private text messages, never records keystrokes, and never intercepts phone calls. Child devices clearly display all active permissions so that trust between family members remains intact.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Got Questions?
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-800 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-charcoal-500 leading-relaxed font-normal">
            Everything you need to know about our privacy-first parental control architecture.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-charcoal-100/80 shadow-subtle overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 hover:bg-ivory-100/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-sm sm:text-base text-charcoal-800">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full bg-ivory-200 text-charcoal-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-sage-600 bg-sage-50' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-charcoal-500 leading-relaxed border-t border-ivory-200/60 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
