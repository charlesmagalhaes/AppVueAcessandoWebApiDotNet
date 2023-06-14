import { createStore } from 'vuex';
import { buscarProdutos } from '../corelib/api/ApiProdutos';

export default createStore({
    state() {
        return {
            produtos: []

        };
    },
    mutations: {
        setProduto(state, produtos) {
            state.produtos = produtos;
        },
    },
    actions: {
       async BuscarProdutos({ commit }) {
           try {
               const response = await buscarProdutos();
               commit('setProduto', response.data);
           } catch (error) {
               console.error(error);
           }
        },
    },
    getters: {
        getProdutos(state) {
            return state.produtos;
        },
    },
});


