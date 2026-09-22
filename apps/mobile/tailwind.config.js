// Pinned to Tailwind v3 (unlike apps/web, which is on v4) - the stable
// NativeWind 4.x release only supports v3; v4 support is NativeWind 5, still
// a release candidate as of writing.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
}
