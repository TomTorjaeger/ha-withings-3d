import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(), // Packt das CSS direkt in die JS Datei
  ],
  build: {
    outDir: 'dist',
    minify: true,
    lib: {
      entry: 'index.tsx',
      formats: ['es'],
      fileName: 'withings-3d-card',
    },
    rollupOptions: {
      // Wir wollen keine externen Abhängigkeiten, alles soll in die eine Datei
      external: [], 
      output: {
        // Zwingt Vite dazu, keine Chunks zu erstellen
        manualChunks: undefined, 
        entryFileNames: 'withings-3d-card.js',
      },
    },
  },
  define: {
    'process.env': {} // Verhindert Fehler mit Libraries, die process.env erwarten
  }
});