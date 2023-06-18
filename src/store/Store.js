import { createStore } from 'vuex';
import {adicionarProduto, buscarProdutos, excluirProduto} from '../corelib/api/ApiProdutos';

export default createStore({
    state() {
        return {
            produtos: [],
            loadingVisivel: false,
            modalVisivel: {
                exibir: false,
                mensagemTitulo: '',
                mensagem: ''
            }
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
            state.modalVisivel.exibir = visivel.exibir;
            state.modalVisivel.mensagemTitulo = visivel.mensagemTitulo;
            state.modalVisivel.mensagem = visivel.mensagem;
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
                const mensagem = {
                    exibir: true,
                    mensagemTitulo: 'sucesso',
                    mensagem: 'Produto Excluido com sucesso!'
                }
                commit('setModalVisivel', mensagem);
                await new Promise(resolve => setTimeout(resolve, 2000));
                const mensagemF = {
                    exibir: false,
                    mensagemTitulo: '',
                    mensagem: ''
                }
                commit('setModalVisivel', mensagemF);
            } catch (error) {
                commit('setLoadingVisivel', true);
                await new Promise(resolve => setTimeout(resolve, 2000));
                commit('setLoadingVisivel', false);
                commit('setModalVisivel', {exibir:true, mensagemTitulo:'erro',mensagem:error.response.data});
                await new Promise(resolve => setTimeout(resolve, 3000));
                commit('setModalVisivel', {exibir:false, mensagemTitulo:'',mensagem:''});
            }
        },
        async adicionarProduto({ commit, state }, novoProduto) {
            const produto = {
                Id: 0,
                Nome: novoProduto.nome,
                Descricao: novoProduto.descricao,
            }
            try {
                commit('setLoadingVisivel', true);
                await new Promise(resolve => setTimeout(resolve, 2000));
                const response = await adicionarProduto(produto);
                commit('setLoadingVisivel', false);
                const respId = response.data;
                produto.Id = respId;
                const mensagem = {
                    exibir: true,
                    mensagemTitulo: 'sucesso',
                    mensagem: 'Produto salvo com sucesso!'
                }
                commit('setModalVisivel', mensagem);
                await new Promise(resolve => setTimeout(resolve, 2000));
                const mensagemF = {
                    exibir: false,
                    mensagemTitulo: '',
                    mensagem: ''
                }
                commit('setModalVisivel', mensagemF);
                commit('setProduto', [...state.produtos, produto]);
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



