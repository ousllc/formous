import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist/demo',
    emptyOutDir: true,
    copyPublicDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        simple: resolve(__dirname, 'examples/simple-form.html'),
        step: resolve(__dirname, 'examples/step-form.html')
      },
      output: {
        dir: 'dist/demo',
        entryFileNames: (chunkInfo) => {
          return `assets/[name].[hash].js`;
        },
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  publicDir: 'public'
}); 