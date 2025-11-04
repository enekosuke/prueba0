import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@aurora/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@aurora/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@/stores': path.resolve(__dirname, './stores'),
      '@/stores/*': path.resolve(__dirname, './stores/*'),
      '@/lib': path.resolve(__dirname, './lib'),
      '@/lib/*': path.resolve(__dirname, './lib/*'),
      '@/components': path.resolve(__dirname, './components'),
      '@/components/*': path.resolve(__dirname, './components/*')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts'
  }
});
