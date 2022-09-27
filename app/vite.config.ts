import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


const reactDeps = ['react', 'react-router-dom', 'react-dom', 'react-error-boundary', 'react-router']
// https://sambitsahoo.com/blog/vite-code-splitting-that-works.html
import { dependencies } from './package.json';
function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (reactDeps.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: reactDeps,
          ...renderChunks(dependencies),
        },
      },
    },
  },
})
