import {defineConfig} from 'umi';

export default defineConfig({
  alias: {
    utils: '@/common/utils',
  },
  hash: true,
  antd: {
    compact: true,
  },
  dva: {
    immer: true,
    hmr: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/data-platform': {
      target: '192.168.74.127:8080',
      changeOrigin: true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
  routes: [
    {
      path: '/',
      component: '@/pages/home',
      routes: [
        {
          path: '/admin',
          component: '@/pages/frame/index',
          routes: [
            {
              path: '/admin/api',
              component: '@/pages/api',
            },
            {
              path: '/admin/source',
              component: '@/pages/source',
            },
          ],
        },
        {
          path: '/login',
          component: '@/pages/login',
        },
      ],
    },
  ],
});
