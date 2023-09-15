import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            auth: true
        }
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/views/AuthView.vue'),
        meta: {
            auth: false
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const requireAuth = to.meta.auth;

    if (requireAuth && store.getters['isAuthenticated']) {
        next();
    } else if (requireAuth && !store.getters['isAuthenticated']) {
        next({ name: 'auth' });
    } else {
        next();
    }
});

export default router;
