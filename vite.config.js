import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ pon aquí el NOMBRE EXACTO de tu repo:
const repo = 'maspan'

export default defineConfig({
  base: '/MasPan-Valladolid/', // ← tu repo
  plugins: [react()],
})

