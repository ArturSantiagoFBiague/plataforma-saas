// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // <- permite acesso externo (ex: localhost)
    port: 3000,         // opcional, mas bom fixar
  },
});
