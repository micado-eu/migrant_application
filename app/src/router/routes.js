
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/documents', component: () => import('components/Documents.vue') },
      { path: '/services', component: () => import('components/Services.vue') },
      { path: '/flows', component: () => import('components/Flows.vue') },
      { path: '/notifications', component: () => import('components/Notifications.vue') },
      { path: '/map', component: () => import('components/Map.vue') }
    ]
  }/*,
  {
    path: '/documents',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Documents.vue') }
    ]
  },
  {
    path: '/services',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Services.vue') }
    ]
  },
  {
    path: '/flows',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Flows.vue') }
    ]
  },
  {
    path: '/notifications',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Notifications.vue') }
    ]
  },
  {
    path: '/map',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Map.vue') }
    ]
  },
  {
    path: '/chatbot',
//    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Chatbot.vue') }
    ]
  }
  */
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
