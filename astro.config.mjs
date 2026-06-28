import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// App siswa = full client-side (fetch ke BACKEND pakai JWT di localStorage).
// Tidak butuh SSR → output static, paling simpel buat deploy.
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: { enabled: false },
  server: { port: 1235 },
});
