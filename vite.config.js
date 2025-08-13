import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ pon aquí el NOMBRE EXACTO de tu repo:
const repo = '/MasPan-Valladolid/'

export default defineConfig({
  base: '/MasPan-Valladolid/', // ← tu repo
  plugins: [react()],
})

