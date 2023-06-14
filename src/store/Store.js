import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            produtos: [
                {
                    Nome: 'Sabonete',
                    Descricao: '90g'
                }
            ]
        };
    }
});


