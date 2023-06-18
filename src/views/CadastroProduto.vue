<template>
  <div>
    <div style="margin-bottom: 12px">
      <form @submit.prevent="adicionarProduto">
        <h2>Cadastrar Produto</h2>
        <div>
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="novoProduto.nome" required>
        </div>
        <div>
          <label for="descricao">Descrição:</label>
          <input type="text" id="descricao" v-model="novoProduto.descricao" required>
        </div>
        <div>
          <label for="preco">Preço:</label>
          <input type="number" id="preco" v-model="novoProduto.preco" required>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>

    <table>
      <tr>
        <th>Nome</th>
        <th>Descrição</th>
        <th>Acao</th>
      </tr>
      <tbody>
      <tr v-for="produto in getProdutos" v-bind:key="produto.Id">
        <td>{{produto.Nome}}</td>
        <td>{{produto.Descricao}}</td>
        <td> <button @click="() => ExcluirProduto(produto.Id)" class="button">Excluir</button> </td>
      </tr>
      </tbody>

    </table>

  </div>

</template>

<script>
import { useStore } from 'vuex';
export default {
  name: 'CadastroProduto',
  props: {
    msg: String
  },
  data: () => {
    return {
      produtos: [],
      novoProduto: {
        nome: "",
        descricao: "",
        preco: 0,
      },
      modalVisivel: false,
      modalMensagem: "",
    }
  },
  computed: {
    getProdutos: function () {

      return this.$store.getters.getProdutos;
    }

  },

  methods: {

    async ExcluirProduto(produtoId) {
      try {
        await this.$store.dispatch('ExcluirProduto', produtoId);
      } catch (error) {
        console.error(error);
      }
    },
    async adicionarProduto() {
      try {
        await this.$store.dispatch('adicionarProduto', this.novoProduto);
        this.novoProduto.nome = '';
        this.novoProduto.descricao = '';
      } catch (error) {
        console.error(error);
      }
    },

  },

  created() {
    const store = useStore();
    store.dispatch('BuscarProdutos')
        .then(() => {
        })
        .catch((error) => {
          console.error(error);
        });
  }
}
</script>

<style scoped>
table {
  width: 900px;
  margin: 0 auto;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f5f5f5;
}

form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f7f7f7;
}

form h2 {
  margin-top: 0;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

form input[type="text"],
form input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

form button {
  background-color: #4caf50;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

form button:hover {
  background-color: #45a049;
}
.button {
  padding: 10px 20px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: red;
  border: none;
  border-radius: 15px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fff;
  padding: 5px;
  border-radius: 4px;
  max-width: 400px;
  text-align: center;
}

.modal p {
  margin-bottom: 0;
}

.modal-sucesso .modal-content {
  background-color: #5eba7d;
  color: #fff;
}

.modal-erro .modal-content {
  background-color: #e74c3c;
  color: #fff;
}

.success-icon {
  color: #5eba7d;
}

.error-icon {
  color: #e74c3c;
}



</style>

