import { createStore } from 'vuex';
import { buscarProdutos } from '../corelib/api/ApiProdutos';

export default createStore({
    state() {
        return {
            produtos: [],
            loadingVisivel: false

        };
    },
    mutations: {
        setProduto(state, produtos) {
            state.produtos = produtos;
            this.commit('setAlterarExibicao', true);
        },
        setAlterarExibicao(state, exibir){
            state.loadingVisivel = exibir;
        },
        setLoadingVisivel(state, visivel) {
            state.loadingVisivel = visivel;
        },
    },
    actions: {
       async BuscarProdutos({ commit }) {
           try {
               commit('setLoadingVisivel', true);
               await new Promise(resolve => setTimeout(resolve, 1000));
               const response = await buscarProdutos();
               if (response && response.data) {
                   commit('setProduto', response.data);
               } else {
                  //codigo
               }
           } catch (error) {
               console.error(error);
           } finally {
               commit('setLoadingVisivel', false);
           }
        },
        alterExibicao({ commit,state }){
            commit('setProduto', !state.loadingVisivel);
        }
    },
    getters: {
        getProdutos(state) {
            return state.produtos;
        },
        getLoding(state) {
            return state.loadingVisivel;
        },
    },
});


