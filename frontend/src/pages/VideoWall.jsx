import React from 'react';

import Header from '../components/Header';

import TopLogo from '../components/videowallComp/TopLogo';
import CenterFrame from '../components/videowallComp/CenterFrame'; 
import UnderFrame from '../components/videowallComp/UnderFrame'; 
export default function VideoWall() {
  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-between p-4 overflow-hidden">
      {/* Logo Topo */}
      <Header />
      
      {/* Logo Topo */}
      <TopLogo />

      {/* Imagem Central em Moldura */}
      <CenterFrame />

      {/* Rodapé */}
      <UnderFrame />
    </div>
  );
}
