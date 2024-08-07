import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // This allows access from all network interfaces
  },
});
