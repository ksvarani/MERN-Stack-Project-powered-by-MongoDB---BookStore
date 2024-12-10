import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
    host: '0.0.0.0', // Allows access from network
    port: 5173,
  },
});
