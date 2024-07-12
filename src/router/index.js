import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/CategoriesPage.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/LoginPage.vue")
  },
  {
    path: '/faqs',
    name: 'faqs',
    component: () => import("@/views/FaqPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import("@/views/NewsPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: () => import("@/views/BlogPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/services',
    name: 'services',
    component: () => import("@/views/ServicesPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/sources',
    name: 'sources',
    component: () => import("@/views/SourcesPage.vue"),
    meta: { requiresAuth: true }
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!accessToken || !refreshToken) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
