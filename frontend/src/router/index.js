import { createRouter, createWebHashHistory } from 'vue-router';
import Start from '../views/Start.vue';
import Ringing from '../views/Ringing.vue';
import Connected from '../views/Connected.vue';
import Answered from '../views/Answered.vue';
import Settings from '../views/Settings.vue';
import Failed from '../views/Failed.vue';
const routes = [
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
    },
    {
        path: '/',
        name: 'start',
        component: Start,
    },
    {
        path: '/ringing',
        name: 'ringing',
        component: Ringing,
        props: true,
    },
    {
        path: '/connected',
        name: 'connected',
        component: Connected,
    },
    {
        path: '/answered',
        name: 'answered',
        component: Answered,
    },
    {
        path: '/failed',
        name: 'failed',
        component: Failed,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    next();
    if (['ringing', 'connected', 'answered', 'failed'].includes(to.name))
        if (!to.params?.forwarded) router.replace('/');
});

export default router;
