import { useLocation } from 'react-router-dom';

export default function TopNav() {
  const location = useLocation();
  
  return (
    <div className="w-full flex justify-between items-center text-sm font-mono">
      {/* LEFT: Current Section Name */}
      <div className="text-[#fcd535] tracking-widest uppercase">
        {location.pathname.replace('/', '') || 'SYSTEM'}
      </div>

      {/* RIGHT: Status Text Only (NO ICONS) */}
      <div className="flex items-center gap-6 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-gray-300">NET_ONLINE</span>
        </div>
        <div>UID: 001_FOUNDER</div>
      </div>
    </div>
  );
}
