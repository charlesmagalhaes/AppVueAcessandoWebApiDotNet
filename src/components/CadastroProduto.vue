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
    <h1 style="text-align: center">{{ msg }}</h1>
    <div class="modal" :class="modalClasses" v-if="modalVisivel">
      <div class="modal-content">
        <p>{{ modalMensagem }}</p>
      </div>
    </div>


    <table>
      <tr>
        <th>Nome</th>
        <th>Descrição</th>
        <th>Acao</th>
      </tr>
      <tbody>
      <tr v-for="produto in produtos" v-bind:key="produto.Id">
        <td>{{produto.Nome}}</td>
        <td>{{produto.Descricao}}</td>
        <td> <button @click="() => excluirProduto(produto.Id)" class="button">Excluir</button> </td>
      </tr>
      </tbody>

    </table>

  </div>

</template>

<script>
import axios from 'axios';
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

  methods: {
    lista: (scope) => {
      axios.get(`https://localhost:44395/api/Produto`).then((res) => {
        console.log(res);
        scope.produtos = res.data;
      })
    },
    adicionarProduto() {
      const novoProduto = {
        Nome: this.novoProduto.nome,
        Descricao: this.novoProduto.descricao,
        Preco: this.novoProduto.preco
      };

      axios.post(`https://localhost:44395/api/Produto`, novoProduto)
          .then((res) => {
            console.log(res);
            this.produtos.push(novoProduto);
            this.novoProduto.nome = "";
            this.novoProduto.descricao = "";
            this.novoProduto.preco = 0;
            this.exibirModal("Produto cadastrado com sucesso!",true);
          })
          .catch((error) => {
            console.error(error);
          });
    },
    excluirProduto(produtoId) {
      axios.delete(`https://localhost:44395/api/Produto/${produtoId}`)
          .then((res) => {
            if(res.data.Sucesso){
              this.produtos = this.produtos.filter((produto) => produto.Id !== produtoId)
              this.exibirModal("Produto excluído com sucesso!",true);
            }else {
              this.exibirModal(res.data.MensagemErro,false);
            }

          })
          .catch((error) => {
            console.error(error);

          });
    },
    exibirModal(mensagem,sucesso) {
      this.modalVisivel = true;
      this.modalMensagem = mensagem;
      this.modalSucesso = sucesso;
      this.icone = sucesso ? "fa-check" : "fa-times";
      // Define um timer para fechar o modal após alguns segundos
      setTimeout(() => {
        this.modalVisivel = false;
        this.modalMensagem = "";
      }, 3000); // Tempo em milissegundos (3 segundos)

      // Adicionar classes CSS dinamicamente
      if (sucesso) {
        this.modalClasses = "modal modal-sucesso";
      } else {
        this.modalClasses = "modal modal-erro";
      }
    },


  },

  created() {
    this.lista(this);
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

