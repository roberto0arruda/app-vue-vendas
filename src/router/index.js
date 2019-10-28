import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/components/home/HomeComponent'
import LoginComponent from '@/components/login/LoginComponent'
import UsuariosComponent from '@/components/usuarios/UsuariosComponent'
import ProdutosComponent from '@/components/produtos/ProdutosComponent'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'Index', component: HomeComponent },
        { path: '/login', name: 'Login', component: LoginComponent},
        { path: '/usuarios', name: 'Usuarios', component: UsuariosComponent},
        { path: '/produtos', name: 'Produtos', component: ProdutosComponent}
    ]
});
