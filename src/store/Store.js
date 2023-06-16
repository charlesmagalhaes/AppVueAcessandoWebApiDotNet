import { createStore } from 'vuex';
import {buscarProdutos, excluirProduto} from '../corelib/api/ApiProdutos';

export default createStore({
    state() {
        return {
            produtos: [],
            loadingVisivel: false,
            modalVisivel: false
        };
    },
    mutations: {
        setProduto(state, produtos) {
            state.produtos = produtos;
        },
        setLoadingVisivel(state, visivel) {
            state.loadingVisivel = visivel;
        },
        setModalVisivel(state, visivel) {
            state.modalVisivel = visivel;
        }
    },
    actions: {
        async BuscarProdutos({ commit }) {
            try {
                commit('setLoadingVisivel', true);
                await new Promise(resolve => setTimeout(resolve, 2000));
                const response = await buscarProdutos();
                if (response && response.data) {
                    commit('setProduto', response.data);
                } else {
                    // Código para lidar com a resposta vazia ou inválida
                }
            } catch (error) {
                console.error(error);
            } finally {
                commit('setLoadingVisivel', false);
            }
        },
        async ExcluirProduto({ dispatch, commit }, produtoId) {
            try {
                await excluirProduto(produtoId);
                await dispatch('BuscarProdutos');
                commit('setModalVisivel', true);
                await new Promise(resolve => setTimeout(resolve, 2000));
                commit('setModalVisivel', false);
            } catch (error) {
                console.error(error);
            }
        },

        loadingExibicao({ commit, state }) {
            commit('setLoadingVisivel', !state.loadingVisivel);
        },
        ModalVisivel({ commit, state }) {
            commit('setModalVisivel', !state.modalVisivel);
        },
    },
    getters: {
        getProdutos(state) {
            return state.produtos;
        },
        getLoading(state) {
            return state.loadingVisivel;
        },
        getModalVisivel(state) {
            return state.modalVisivel;
        }
    }
});



