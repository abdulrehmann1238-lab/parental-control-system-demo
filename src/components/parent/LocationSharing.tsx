import React, { useState } from 'react';
import { 
  MapPin, 
  RefreshCw, 
  Battery, 
  Navigation, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Compass, 
  Crosshair, 
  Share2,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LocationSharing: React.FC = () => {
  const { familyMembers, selectedMemberId, setSelectedMemberId, refreshMockLocation } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeMember = familyMembers.find(m => m.id === selectedMemberId) || familyMembers[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshMockLocation(activeMember.id);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Map pin coordinates normalized onto our vector map canvas (600x400)
  // Emma is at Lincoln Park (center-right: x: 380, y: 170)
  // Noah is at Westside Athletics (center-left: x: 190, y: 240)
  const emmaCoords = { x: 390, y: 165 };
  const noahCoords = { x: 210, y: 235 };

  const activeCoords = activeMember.name === 'Emma' ? emmaCoords : noahCoords;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800 text-[10px] font-bold uppercase tracking-wider mb-1">
            <ShieldCheck size={12} />
            Authorized GPS Telemetry (Simulated)
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
            Family Location Sharing
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5 font-normal">
            Real-time safe zone tracking and arrival breadcrumbs with verified accuracy.
          </p>
        </div>

        {/* Member Selector Tabs & Refresh */}
        <div className="flex items-center gap-2">
          <div className="p-1 bg-white border border-charcoal-200 rounded-xl shadow-xs flex items-center">
            {familyMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelectedMemberId(member.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  selectedMemberId === member.id
                    ? 'bg-sage-600 text-white shadow-xs'
                    : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-100'
                }`}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span>{member.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh location signal"
            className="p-2.5 bg-white border border-charcoal-200 text-charcoal-700 hover:bg-ivory-100 rounded-xl shadow-xs transition-colors disabled:opacity-60"
          >
            <RefreshCw size={15} className={isRefreshing ? 'animate-spin text-sage-600' : ''} />
          </button>
        </div>
      </div>

      {/* Main Map View & Location Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Map Visual (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-card-lg border border-charcoal-200/80 shadow-subtle overflow-hidden flex flex-col justify-between relative min-h-[460px]">
          
          {/* Top Map Floating HUD */}
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-charcoal-100 shadow-soft flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-status-success animate-ping" />
            <div>
              <p className="text-[10px] text-charcoal-400 font-semibold uppercase">Tracking Target</p>
              <p className="text-xs font-bold text-charcoal-800 flex items-center gap-1">
                {activeMember.name} • {activeMember.currentMockLocation.landmark}
              </p>
            </div>
          </div>

          {/* Map Controls Floating Right */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
            <button className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md border border-charcoal-200 text-charcoal-700 flex items-center justify-center shadow-xs hover:bg-white text-sm font-bold">
              +
            </button>
            <button className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md border border-charcoal-200 text-charcoal-700 flex items-center justify-center shadow-xs hover:bg-white text-sm font-bold">
              -
            </button>
            <button
              onClick={handleRefresh}
              className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md border border-charcoal-200 text-charcoal-700 flex items-center justify-center shadow-xs hover:bg-white"
            >
              <Crosshair size={15} />
            </button>
          </div>

          {/* Custom Styled Vector Map Graphic */}
          <div className="relative w-full h-[400px] bg-[#E8EAE6] overflow-hidden select-none">
            <svg
              viewBox="0 0 600 400"
              className="w-full h-full object-cover"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background grid */}
              <defs>
                <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DCE0DA" strokeWidth="1" />
                </pattern>
                {/* Geofence radial gradient */}
                <radialGradient id="geofenceGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#58786B" stopOpacity="0.3" />
                  <stop offset="70%" stopColor="#58786B" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#58786B" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Waterway / Coastline on East (Right) */}
              <path
                d="M 520 0 Q 510 150 535 260 T 500 400 L 600 400 L 600 0 Z"
                fill="#D6E4EB"
              />
              <text x="545" y="190" fill="#7893A5" fontSize="10" transform="rotate(90 545 190)" fontWeight="600" opacity="0.8">
                LAKE SHORE BASIN
              </text>

              {/* Park Areas (Soft Sage) */}
              {/* Lincoln Park Area */}
              <rect x="330" y="80" width="130" height="180" rx="16" fill="#DCE7DE" />
              <text x="350" y="105" fill="#405E53" fontSize="10" fontWeight="bold" opacity="0.7">
                LINCOLN PARK
              </text>

              {/* West Athletics Park */}
              <rect x="140" y="180" width="120" height="120" rx="12" fill="#DCE7DE" />
              <text x="155" y="200" fill="#405E53" fontSize="9" fontWeight="bold" opacity="0.7">
                ATHLETICS FIELD
              </text>

              {/* Grid Roads & Avenues */}
              {/* Primary Avenue Horizontal */}
              <path d="M 0 160 L 520 160" stroke="#FFFFFF" strokeWidth="8" />
              <path d="M 0 160 L 520 160" stroke="#CCD2C9" strokeWidth="2" strokeDasharray="4 4" />
              <text x="20" y="153" fill="#949E9A" fontSize="9" fontWeight="500">Fullerton Pkwy</text>

              {/* Secondary Avenue Horizontal */}
              <path d="M 0 240 L 510 240" stroke="#FFFFFF" strokeWidth="7" />
              <text x="20" y="233" fill="#949E9A" fontSize="9" fontWeight="500">Belden Ave</text>

              <path d="M 0 320 L 500 320" stroke="#FFFFFF" strokeWidth="7" />
              <text x="20" y="313" fill="#949E9A" fontSize="9" fontWeight="500">Armitage Ave</text>

              {/* Vertical Streets */}
              <path d="M 120 0 L 120 400" stroke="#FFFFFF" strokeWidth="6" />
              <text x="125" y="30" fill="#949E9A" fontSize="9" fontWeight="500">Racine Ave</text>

              <path d="M 230 0 L 230 400" stroke="#FFFFFF" strokeWidth="6" />
              <text x="235" y="30" fill="#949E9A" fontSize="9" fontWeight="500">Sheffield Ave</text>

              <path d="M 350 0 L 350 400" stroke="#FFFFFF" strokeWidth="7" />
              <text x="355" y="30" fill="#949E9A" fontSize="9" fontWeight="500">Clark St</text>

              <path d="M 460 0 L 460 400" stroke="#FFFFFF" strokeWidth="6" />
              <text x="465" y="30" fill="#949E9A" fontSize="9" fontWeight="500">Lincoln Park W</text>

              {/* Geofence Circles */}
              <circle cx={emmaCoords.x} cy={emmaCoords.y} r="55" fill="url(#geofenceGlow)" stroke="#58786B" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={noahCoords.x} cy={noahCoords.y} r="55" fill="url(#geofenceGlow)" stroke="#58786B" strokeWidth="1" strokeDasharray="3 3" />

              {/* EMMA PIN (Lincoln Park) */}
              <g 
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedMemberId('FAM-01')}
              >
                {/* Pulse ring if active */}
                {selectedMemberId === 'FAM-01' && (
                  <circle cx={emmaCoords.x} cy={emmaCoords.y} r="22" fill="#58786B" opacity="0.3" className="animate-ping" />
                )}
                <circle cx={emmaCoords.x} cy={emmaCoords.y} r="16" fill="#FFFFFF" stroke="#58786B" strokeWidth="3" />
                <image
                  href="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                  x={emmaCoords.x - 12}
                  y={emmaCoords.y - 12}
                  height="24"
                  width="24"
                  clipPath="circle(12px at 12px 12px)"
                />
                {/* Pin Tooltip */}
                <rect x={emmaCoords.x - 35} y={emmaCoords.y - 32} width="70" height="16" rx="4" fill="#252B2A" />
                <text x={emmaCoords.x} y={emmaCoords.y - 21} fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Emma • 84%
                </text>
              </g>

              {/* NOAH PIN (West Athletics) */}
              <g 
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedMemberId('FAM-02')}
              >
                {selectedMemberId === 'FAM-02' && (
                  <circle cx={noahCoords.x} cy={noahCoords.y} r="22" fill="#7893A5" opacity="0.3" className="animate-ping" />
                )}
                <circle cx={noahCoords.x} cy={noahCoords.y} r="16" fill="#FFFFFF" stroke="#7893A5" strokeWidth="3" />
                <image
                  href="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
                  x={noahCoords.x - 12}
                  y={noahCoords.y - 12}
                  height="24"
                  width="24"
                  clipPath="circle(12px at 12px 12px)"
                />
                <rect x={noahCoords.x - 35} y={noahCoords.y - 32} width="70" height="16" rx="4" fill="#252B2A" />
                <text x={noahCoords.x} y={noahCoords.y - 21} fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Noah • 68%
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Map Info Footer */}
          <div className="p-4 bg-white border-t border-charcoal-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-charcoal-800">
                Current Safe Zone: {activeMember.currentMockLocation.landmark}
              </span>
              <span className="text-[11px] text-charcoal-400">
                Accuracy: &plusmn;{activeMember.currentMockLocation.accuracyMeters}m
              </span>
            </div>
            <div className="flex items-center gap-2 text-charcoal-500">
              <Clock size={13} />
              <span>Signal updated {activeMember.currentMockLocation.timestamp}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Location History & Status Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Target Card */}
          <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle space-y-4">
            <div className="flex items-center gap-3.5 pb-3 border-b border-ivory-200">
              <img
                src={activeMember.avatar}
                alt={activeMember.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-ivory-300"
              />
              <div>
                <h3 className="font-heading font-bold text-base text-charcoal-800">
                  {activeMember.name}'s Device
                </h3>
                <p className="text-xs text-charcoal-500">{activeMember.deviceName}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-charcoal-500">Verified Address:</span>
                <span className="font-semibold text-charcoal-800 text-right max-w-[170px] truncate" title={activeMember.currentMockLocation.address}>
                  {activeMember.currentMockLocation.address}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-charcoal-500">Battery Level:</span>
                <span className="font-bold text-sage-600 flex items-center gap-1">
                  <Battery size={13} />
                  {activeMember.currentMockLocation.batteryLevel}%
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-charcoal-500">Movement Velocity:</span>
                <span className="font-medium text-charcoal-700">
                  {activeMember.currentMockLocation.speedMph || 0} mph (Stationary)
                </span>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              className="w-full py-2 bg-ivory-200 hover:bg-ivory-300 text-charcoal-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} />
              <span>Ping Current Coordinates</span>
            </button>
          </div>

          {/* Recent Location Updates Timeline */}
          <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-charcoal-500 mb-3">
              Today's Arrival Timeline
            </h4>
            
            <div className="space-y-4 relative pl-3 border-l-2 border-sage-200">
              {activeMember.locationHistory.map((loc, idx) => (
                <div key={idx} className="relative text-xs">
                  <div className={`absolute -left-[19px] top-1 w-3 h-3 rounded-full border-2 border-white ${
                    idx === 0 ? 'bg-sage-600 ring-2 ring-sage-300' : 'bg-charcoal-400'
                  }`} />
                  <p className="font-bold text-charcoal-800">{loc.landmark}</p>
                  <p className="text-[11px] text-charcoal-500">{loc.address}</p>
                  <span className="text-[10px] text-charcoal-400 font-mono mt-0.5 inline-block">
                    {loc.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
