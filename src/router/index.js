import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/components/home/HomeComponent'
import LoginComponent from '@/components/login/LoginComponent'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'Index', component: HomeComponent },
        { path: '/login', name: 'Login', component: LoginComponent}
    ]
});
