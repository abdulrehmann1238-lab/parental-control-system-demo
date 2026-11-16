import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  BarChart3, 
  Hourglass, 
  Smartphone, 
  ShieldCheck 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <LayoutDashboard size={24} />,
      heading: 'Family Dashboard',
      description: "Access your family's connected-device overview in one organized place.",
      badge: 'Unified Overview',
      bgGlow: 'group-hover:bg-sage-100/80',
    },
    {
      icon: <MapPin size={24} />,
      heading: 'Location Sharing',
      description: 'View authorized location-sharing information and recent location updates.',
      badge: 'Transparent GPS',
      bgGlow: 'group-hover:bg-slateBlue-100/80',
    },
    {
      icon: <BarChart3 size={24} />,
      heading: 'Device Activity',
      description: 'Understand supported device activity through clear, organized reports.',
      badge: 'Aggregate Metrics',
      bgGlow: 'group-hover:bg-sand-200/80',
    },
    {
      icon: <Hourglass size={24} />,
      heading: 'Digital Wellbeing',
      description: 'Encourage healthier device habits through screen-time summaries and schedules.',
      badge: 'Healthy Habits',
      bgGlow: 'group-hover:bg-terracotta-100/80',
    },
    {
      icon: <Smartphone size={24} />,
      heading: 'Device Management',
      description: 'Manage enrolled devices, connection status, and family permissions.',
      badge: 'Multi-Device',
      bgGlow: 'group-hover:bg-sage-100/80',
    },
    {
      icon: <ShieldCheck size={24} />,
      heading: 'Account Security',
      description: 'Manage access, account settings, and privacy preferences.',
      badge: 'Enterprise Grade',
      bgGlow: 'group-hover:bg-slateBlue-100/80',
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Platform Capabilities
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-800 tracking-tight">
            Thoughtful Features for Modern Family Life
          </h2>
          <p className="mt-4 text-sm sm:text-base text-charcoal-500 leading-relaxed font-normal">
            Designed to empower parents with transparent insights while respecting children's privacy and autonomy.
          </p>
        </div>

        {/* Feature Cards Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white rounded-card-lg p-7 border border-charcoal-100 shadow-subtle hover:shadow-lift transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Custom Icon with animated background */}
                <div className={`w-13 h-13 w-12 h-12 rounded-2xl bg-ivory-200 text-sage-600 flex items-center justify-center transition-all duration-300 ${card.bgGlow} group-hover:scale-105 mb-6`}>
                  {card.icon}
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-md bg-ivory-200 text-[10px] font-semibold text-charcoal-600 uppercase tracking-wide mb-2.5">
                  {card.badge}
                </div>

                <h3 className="font-heading font-bold text-lg text-charcoal-800 tracking-tight mb-2">
                  {card.heading}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              {/* Decorative bottom hairline */}
              <div className="mt-6 pt-4 border-t border-ivory-200 flex items-center text-xs font-medium text-sage-600 group-hover:text-sage-700 transition-colors">
                <span>View platform demo &rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
