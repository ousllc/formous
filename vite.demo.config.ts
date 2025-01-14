import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist/demo',
    rollupOptions: {
      input: {
        main: './index.html',
        simple: './examples/simple-form.html',
        step: './examples/step-form.html'
      }
    }
  }
}); 