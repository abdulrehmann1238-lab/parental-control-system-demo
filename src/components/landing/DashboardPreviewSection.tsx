import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Smartphone, 
  MapPin, 
  Clock, 
  Battery, 
  Wifi, 
  CheckCircle2, 
  TrendingDown, 
  Activity 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { motion } from 'framer-motion';

const previewChartData = [
  { day: 'Mon', hours: 3.2 },
  { day: 'Tue', hours: 2.8 },
  { day: 'Wed', hours: 3.5 },
  { day: 'Thu', hours: 2.6 },
  { day: 'Fri', hours: 4.0 },
  { day: 'Sat', hours: 4.5 },
  { day: 'Sun', hours: 2.2 },
];

export const DashboardPreviewSection: React.FC = () => {
  return (
    <section className="py-24 bg-ivory-200/50 border-t border-ivory-300 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Interactive Dashboard Experience
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-800 tracking-tight">
            See the Platform in Action
          </h2>
          <p className="mt-4 text-sm sm:text-base text-charcoal-500 leading-relaxed font-normal">
            A unified, calming workspace designed to keep you informed with zero clutter.
          </p>
        </div>

        {/* Dashboard Preview Frame */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[24px] border border-charcoal-200/70 shadow-lift overflow-hidden"
        >
          {/* Mock Browser Header / Title Bar */}
          <div className="bg-ivory-100 px-6 py-3.5 border-b border-ivory-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-3 text-xs font-medium text-charcoal-500 font-mono hidden sm:inline">
                https://family.aegisplatform.io/dashboard
              </span>
            </div>
            <div className="text-xs font-semibold text-sage-700 bg-sage-100 px-2.5 py-0.5 rounded-full">
              Live Preview
            </div>
          </div>

          {/* Inner Dashboard Mock Grid */}
          <div className="p-6 sm:p-8 bg-ivory-50/60">
            
            {/* Top Stat Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-charcoal-100 shadow-xs">
                <span className="text-[11px] text-charcoal-400 uppercase font-medium">Family Members</span>
                <p className="text-xl font-bold font-heading text-charcoal-800 mt-1">2 Active</p>
                <span className="text-[10px] text-sage-600 font-medium">Emma &amp; Noah</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-charcoal-100 shadow-xs">
                <span className="text-[11px] text-charcoal-400 uppercase font-medium">Connected Devices</span>
                <p className="text-xl font-bold font-heading text-charcoal-800 mt-1">2 Enrolled</p>
                <span className="text-[10px] text-status-success font-medium">100% Synced</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-charcoal-100 shadow-xs">
                <span className="text-[11px] text-charcoal-400 uppercase font-medium">Today's Screen Time</span>
                <p className="text-xl font-bold font-heading text-charcoal-800 mt-1">3h 24m</p>
                <span className="text-[10px] text-status-success flex items-center gap-1 font-medium">
                  <TrendingDown size={11} /> 12% below target
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-charcoal-100 shadow-xs">
                <span className="text-[11px] text-charcoal-400 uppercase font-medium">Safety Status</span>
                <p className="text-xl font-bold font-heading text-sage-600 mt-1">All Safe</p>
                <span className="text-[10px] text-charcoal-500 font-medium">2 in recognized zones</span>
              </div>
            </div>

            {/* Middle Row: Family Devices + Screen Time Graph */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Device Cards & Activity */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Emma Card */}
                <div className="bg-white p-4 rounded-2xl border border-charcoal-100 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center font-bold text-xs">
                      EJ
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal-800">Emma (14)</h4>
                      <p className="text-[11px] text-charcoal-500">iPhone 15 Pro • 84%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] text-status-success font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                      Active
                    </span>
                    <p className="text-[10px] text-charcoal-400">Lincoln Park</p>
                  </div>
                </div>

                {/* Noah Card */}
                <div className="bg-white p-4 rounded-2xl border border-charcoal-100 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slateBlue-100 text-slateBlue-700 flex items-center justify-center font-bold text-xs">
                      NJ
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal-800">Noah (11)</h4>
                      <p className="text-[11px] text-charcoal-500">Galaxy S24 • 68%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] text-status-success font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                      Active
                    </span>
                    <p className="text-[10px] text-charcoal-400">Westside Athletics</p>
                  </div>
                </div>

                {/* Recent Event Item */}
                <div className="bg-white p-3.5 rounded-2xl border border-charcoal-100 shadow-xs flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-sage-50 text-sage-600 flex items-center justify-center shrink-0">
                    <MapPin size={15} />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-semibold text-charcoal-800 truncate">Safe Zone Arrival: Noah</p>
                    <p className="text-[10px] text-charcoal-400">Westside Athletics Field • 4:10 PM</p>
                  </div>
                </div>

              </div>

              {/* Right Column: Mini Chart */}
              <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-charcoal-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xs font-bold text-charcoal-800">Weekly Screen Time Activity</h4>
                      <p className="text-[11px] text-charcoal-500">Daily average: 3.2 hours / child</p>
                    </div>
                    <span className="text-[11px] font-semibold text-sage-600 bg-sage-50 px-2.5 py-1 rounded-md">
                      Healthy Target Met
                    </span>
                  </div>

                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={previewChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#737C78' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#737C78' }} axisLine={false} tickLine={false} />
                        <Tooltip 
                          formatter={(value: any) => [`${value} hrs`, 'Screen Time']}
                          contentStyle={{ backgroundColor: '#252B2A', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                        />
                        <Bar dataKey="hours" fill="#58786B" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-ivory-200 flex items-center justify-between text-[11px] text-charcoal-500">
                  <span>Bedtime schedule starts at 9:00 PM</span>
                  <span className="font-medium text-sage-600">Quiet Hours: Active tonight</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Callout Bar */}
          <div className="bg-white p-6 border-t border-ivory-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-heading font-bold text-base text-charcoal-800">
                Ready to explore the full dashboard?
              </h4>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Interact with live mock maps, customizable screen-time goals, and exportable reports.
              </p>
            </div>
            <Link
              to="/parent"
              className="px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white font-medium text-xs rounded-xl shadow-soft hover:shadow-lift transition-all flex items-center gap-2 shrink-0"
            >
              <span>Explore Interactive Dashboard</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
