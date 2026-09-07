import React from "react";

const PreLoader = () => {
  return (
    <div className="fixed left-0 top-0 z-999999 flex h-screen w-screen items-center justify-center overflow-hidden bg-[#070b14]">
      <div className="relative flex h-28 w-28 items-center justify-center" aria-hidden="true">
        <div className="absolute h-16 w-16 animate-[spin_1.1s_linear_infinite] rounded-full border-4 border-blue/20 border-t-blue-light border-r-cyan-300 shadow-[0_0_28px_rgba(60,80,224,0.6)]" />
        <div className="absolute h-9 w-9 rounded-full border border-blue-light/30" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 animate-[zigzag-orbit_1.5s_ease-in-out_infinite] rounded-full bg-blue-light shadow-[0_0_14px_5px_rgba(81,101,246,0.7)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_4px_rgba(103,232,249,0.65)]" />
      </div>
    </div>
  );
};

export default PreLoader;
