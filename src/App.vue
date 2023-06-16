<template>
  <div id="app" style="margin-top: 50px">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/cadastroprodutos">Cadastro de Produtos</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
    <main>
      <router-view></router-view>
    </main>
    <MensagemUsuario v-if="getModalVisivel"></MensagemUsuario>
    <LoadingX v-if="getLogin"></LoadingX>
  </div>
</template>


<script>
//import CadastroProduto from "@/views/CadastroProduto";
import LoadingX from "@/components/LoadingX";
import MensagemUsuario from "@/components/MensagemUsuario";

export default {
  name: 'App',
  components: {
    MensagemUsuario,
    LoadingX,
    //CadastroProduto
  },
  data: () => {
    return {
      loadingVisivel: false
    }
  },
  computed: {
    getLogin(){
      return this.$store.getters.getLoading;
    },
    getModalVisivel() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.$store.getters.getModalVisivel;
    }
  },

  methods: {
    exibirLoading(i) {
      this.loadingVisivel = i;
    },
    fecharLoading(i) {
      this.loadingVisivel = i;
    }
  }
}
</script>


<style scoped>


ul {
  position: fixed;
  top: 0;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}
</style>
