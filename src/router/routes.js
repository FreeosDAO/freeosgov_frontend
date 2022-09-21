const routes = [
  {
    path: '/',
    component: () => import('layouts/IntroLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/Index.vue') }
      // CHANGE BACK TO INDEX
      { path: '', component: () => import('layouts/MainLayout.vue') }
    ]
  },
  {
    path: '/',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/activities', component: () => import('pages/Activities.vue') },
      { path: '/claim', component: () => import('pages/Claim.vue') },
      { path: '/stake', component: () => import('pages/StakeAndUnstake.vue') },
      { path: '/re-register', component: () => import('pages/Re-register.vue') },
      { path: '/transfer', component: () => import('pages/Transfer.vue') },
      { path: '/mint', component: () => import('pages/Convert.vue') },
      { path: '/info', component: () => import('pages/Info.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]


export default routes
