import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/components/home/HomeComponent'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/', name: 'Home', component: HomeComponent
        }
    ]
});