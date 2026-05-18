import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        {/* Animated Rings */}
        <div className="absolute w-24 h-24 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute w-24 h-24 border-t-4 border-[#C41E24] rounded-full animate-spin"></div>
        
        {/* Inner Logo Placeholder/Icon */}
        <div className="relative">
          <div className="w-12 h-12 bg-[#C41E24] rounded-xl flex items-center justify-center animate-pulse">
             <span className="text-white font-black text-xl">F</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center gap-2">
        <h2 className="text-xl font-black text-[#1A1A1A] tracking-tighter uppercase">Fact NG</h2>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-[#C41E24] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-[#C41E24] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-[#C41E24] rounded-full animate-bounce"></div>
        </div>
      </div>

      <p className="absolute bottom-10 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
        Design & Excellence
      </p>
    </div>
  );
};

export default LoadingScreen;
