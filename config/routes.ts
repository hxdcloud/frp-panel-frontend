export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  }, // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: '/dashboard',
    component: './Dashboard',
  },
  {
    name: '代理列表',
    icon: 'table',
    path: '/proxies',
    routes: [
      {
        path: '/proxies/tcp',
        name: 'TCP',
        component: './frps/proxies/Tcp',
      },
      {
        path: '/proxies/udp',
        name: 'UDP',
        component: './frps/proxies/Udp',
      },
      {
        path: '/proxies/http',
        name: 'HTTP',
        component: './frps/proxies/Http',
      },
      {
        path: '/proxies/https',
        name: 'HTTPS',
        component: './frps/proxies/Https',
      },
      {
        path: '/proxies/stcp',
        name: 'STCP',
        component: './frps/proxies/Stcp',
      },
      {
        path: '/proxies/sudp',
        name: 'SUDP',
        component: './frps/proxies/Sudp',
      },
      {
        path: '/proxies/xtcp',
        name: 'XTCP',
        component: './frps/proxies/Xtcp',
      },
      {
        path: '/proxies/tcpmux',
        name: 'TCPMUX',
        component: './frps/proxies/Tcpmux',
      },
    ],
  },
  {
    name: 'frpc列表',
    icon: 'profile',
    path: '/frpc/list',
    component: './frpc/List',
  },
  {
    name: 'frps配置',
    icon: 'form',
    path: '/frps/config',
    component: './frps/Config',
  },
  {
    component: './404',
  },
];
