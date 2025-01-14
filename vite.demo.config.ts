import { defineConfig } from 'vite';
import * as path from 'node:path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist/demo',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        simple: path.resolve(__dirname, 'examples/simple-form.html'),
        step: path.resolve(__dirname, 'examples/step-form.html')
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
}); 