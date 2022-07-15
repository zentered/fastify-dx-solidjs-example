import { defineConfig } from 'vite'
import viteSolid from 'vite-plugin-solid'
import unocss from 'unocss/vite'
import viteSolidFastifyDX from 'fastify-dx-solid/plugin'
import { join, dirname } from 'path'
import { presetAttributify, presetUno, presetTypography } from 'unocss'
import { fileURLToPath } from 'url'

const path = fileURLToPath(import.meta.url)
const root = join(dirname(path), 'src')

export default defineConfig({
  root: root,
  plugins: [
    viteSolid({ ssr: true }),
    viteSolidFastifyDX(),
    unocss({
      presets: [presetUno(), presetAttributify(), presetTypography()]
    })
  ],
  ssr: {
    noExternal: ['solid-app-router']
  }
})
