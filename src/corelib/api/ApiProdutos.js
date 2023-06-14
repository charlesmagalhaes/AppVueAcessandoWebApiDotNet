import axios from 'axios';

export const buscarProdutos = () => {
    return axios.get('/Produto');
};

export const adicionarProduto = (novoProduto) => {
    return axios.post('/Produto', novoProduto);
};

export const excluirProduto = (produtoId) => {
    return axios.delete(`/Produto/${produtoId}`);
};

