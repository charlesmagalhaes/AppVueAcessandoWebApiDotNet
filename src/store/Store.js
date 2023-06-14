import { createStore } from 'vuex';
import axios from 'axios';

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
            axios.get('https://localhost:44395/api/Produto')
                .then((res) => {
                    commit('setProduto', res.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    getters: {
        getProdutos(state) {
            return state.produtos;
        },
    },
});


