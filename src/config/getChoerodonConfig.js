import fs from 'fs';
import autoprefixer from 'autoprefixer';

const defaultConfig = {
  port: 9090,
  output: './dist',
  htmlTemplate: 'index.template.html',
  devServerConfig: {},
  postcssConfig: {
    plugins: [
      autoprefixer({
        browsers: [
          'last 2 versions',
          'Firefox ESR',
          '> 1%',
          'ie >= 8',
          'iOS >= 8',
          'Android >= 4',
        ],
      }),
    ],
  },
  babelConfig(config, mode, env) {
    return config;
  },
  webpackConfig(config, mode, env) {
    return config;
  },
  enterPoints(mode, env) {
    return {};
  },
  entryName: 'index',
  root: '/',
  routes: null,
  local: true,
  server: '',
  clientid: 'localhost',
  webSocketServer: 'http://localhost:8080',
  titlename: 'Choerodon | 汉得应用开发平台',
  favicon: 'favicon.ico',
  dashboard: false,
  guide: false,
  proxyTarget: 'http://localhost:8080',
  distBasePath: './src/main/resources/lib',
  htmlPath: './src/main/resources/WEB-INF/view',
  homePath: undefined,
  menuTheme: 'light',
  resourcesLevel: ['site', 'user'],
  apimGateway: 'http://apim.example.com',
};

export default function getChoerodonConfig(configFile) {
  const customizedConfig = fs.existsSync(configFile) ? require(configFile) : {};
  return Object.assign({}, defaultConfig, customizedConfig);
}
