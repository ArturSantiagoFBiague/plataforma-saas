// src/components/TopLogo.jsx
import React from 'react';
import qrCode from '../../assets/qrCode.png'; // imagem QR code (dummy)

export default function CenterFrame() {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-gray-100 rounded-t-3xl shadow-inner">
        <img src={qrCode} alt="QR Code" className="h-24 w-24 object-contain" />
        <p className="text-lg font-semibold text-gray-800 mx-auto absolute left-1/2 transform -translate-x-1/2">
          PucTech
        </p>
        <div className="w-24" /> {/* Espaço para alinhar visualmente o texto */}
      </div>
  );
}