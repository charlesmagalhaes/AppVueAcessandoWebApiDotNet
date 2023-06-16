import { createRouter, createWebHistory } from 'vue-router';
import CadastroProduto from "@/views/CadastroProduto";
import About from "@/views/About";
import Home from "@/views/Home";


const routes = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/cadastroprodutos',
            component: CadastroProduto,
        },
        {
            path: '/about',
            component: About,
        }
    ],
});

// Verificar a rota atual
console.log(routes.currentRoute.value.path);

// Verificar se a rota atual corresponde a um determinado caminho
console.log(routes.currentRoute.value.path === '/cadastroprodutos');

export default routes;


