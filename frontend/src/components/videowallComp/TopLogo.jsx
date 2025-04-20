// src/components/TopLogo.jsx
import React from 'react';
import logo from '../../assets/image.png'; 

export default function TopLogo() {
  return (
    <div className="w-full px-6 py-4 bg-white shadow flex justify-between items-center">
       {/* Logo Topo */}
        <div className="w-full flex justify-center mt-4">
            <img src={logo} alt="Logo" className="h-20 object-contain" />
        </div>
    </div>
  );
}