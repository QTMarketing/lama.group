import React from 'react';
import { Clock, MapPin, Zap } from 'lucide-react';

export default function StatusBar() {
  const stats = [
    {
      icon: <Clock className="w-6 h-6 text-[#2E7D32]" />,
      text: "20+ Years in C-Store & Gas Station Solutions"
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#2E7D32]" />,
      text: "100+ Locations Operated in Texas"
    },
    {
      icon: <Zap className="w-6 h-6 text-[#2E7D32]" />,
      text: "8 Top Fuel Brands Trusted by Our Network"
    }
  ];

  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="max-w-[1680px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {stat.icon}
              </div>
              <p 
                className="text-[#2E7D32] font-bold text-lg md:text-xl text-center md:text-left"
                style={{ fontSize: '18px' }}
              >
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 