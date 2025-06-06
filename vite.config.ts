import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // reactRouter(),
    react(),
    tailwindcss(),
  ],
});
