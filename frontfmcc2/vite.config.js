import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173,      // Explicitly set the port (default is 5173)
    strictPort: false, // Exit if port is already in use
    open: true,      // Automatically open the app in the browser
  },
});