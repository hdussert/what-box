const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')
const path = require('path')

const projectRoot = __dirname
const monorepoRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// Metro only watches/resolves within projectRoot by default. Yarn workspaces
// hoist shared deps (and symlink @what-box/shared) up to the monorepo root's
// node_modules, so Metro needs to be told to look there too.
config.watchFolders = [monorepoRoot]
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
]

module.exports = withNativeWind(config, { input: './src/global.css' })
