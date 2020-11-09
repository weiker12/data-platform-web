const CONFIG = {
  localhost: {
    // api: 'http://192.168.44.65:17090/online-classroom',
    // api: 'http://192.168.74.14:17090/online-classroom',
    // api: 'http://192.168.44.196:17090/online-classroom',
    api: 'http://localhost:8080', // 上朝本地
    // api: 'http://art-admin-dev.peilian.com/art-admin',
    // assetsRoot: 'https://tests001.pnlyy.com', // 静态资源域名
  },
  dev: {
    api: 'http://art-admin-dev.peilian.com/art-admin',
    // assetsRoot: 'https://tests001.pnlyy.com', // 静态资源域名
  },
  // pre: {
  //   api: 'https://online-classroom-pre.peilian.com/online-classroom',
  //   assetsRoot: 'https://mall-static.peilian.com',
  // },
  // online: {
  //   api: 'https://online-classroom-online.peilian.com/online-classroom',
  //   assetsRoot: 'https://mall-static.peilian.com',
  // },
  prod: {
    api: 'http://art-admin.xiaozhupainting.com/art-admin',
    // assetsRoot: 'https://mall-static.peilian.com',
  },
};

const host = window.location.host;
if (host.includes('art-system-dev.peilian.com')) {
  global.apiUrl = CONFIG.dev;
  // } else if (host.includes('cloud-admin-pre.peilian.com')) {
  //   global.apiUrl = CONFIG.pre;
  // } else if (host.includes('cloud-admin-online.peilian.com')) {
  //   global.apiUrl = CONFIG.online;
} else if (host.includes('art-system.xiaozhupainting.com')) {
  global.apiUrl = CONFIG.prod;
} else {
  global.apiUrl = CONFIG.localhost;
}

export const API_BASE_URL = global.apiUrl;

export const APP_URL_PREFIX = '';
