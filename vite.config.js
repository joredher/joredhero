import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Explicit rather than relying on Vite's own default, so it's a documented decision:
// no sourcemaps in the deployed build, so the original file structure and component
// names aren't casually browsable via DevTools' Sources tab.
export default defineConfig({ plugins: [react()], build: { sourcemap: false } });
