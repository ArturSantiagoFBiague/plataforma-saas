// src/components/TopLogo.jsx
import React from 'react';
import frameImage from '../../assets/puconha.png'; 

export default function CenterFrame() {
  return (
    <div className="flex-1 flex items-center justify-center">
        <div className="w-[300px] h-[300px] border-8 border-gray-300 rounded-2xl flex items-center justify-center shadow-xl">
          <img src={frameImage} alt="Imagem central" className="w-full h-full object-cover rounded-xl" />
        </div>
    </div>
  );
}