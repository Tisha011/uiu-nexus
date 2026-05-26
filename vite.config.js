import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/uiu-nexus/",  // এই লাইনটিই সবচেয়ে জরুরি
  plugins: [react()],
})