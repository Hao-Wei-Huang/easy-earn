import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    component: () => import('@/views/Frontend.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'stock/:id',
        name: 'Stock',
        component: () => import('@/views/Stock.vue'),
      },
      {
        path: 'screener',
        name: 'Screener',
        component: () => import('@/views/Screener.vue'),
      },
      {
        path: 'track',
        name: 'Track',
        component: () => import('@/views/Track.vue'),
      },
      {
        path: 'user-file',
        name: 'UserFile',
        component: () => import('@/views/UserFile.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: 'signup',
        name: 'Signup',
        component: () => import('@/views/Signup.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  linkExactActiveClass: 'active',
  // Pages are always top on the website.
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
