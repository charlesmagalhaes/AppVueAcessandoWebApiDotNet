<template>
  <div class="home">
    <h1>Bem-vindo à Página Inicial</h1>
    <p>
      Este é o ponto de partida do nosso projeto Vue. Aqui você encontrará informações e recursos disponíveis neste sistema de cadastro de produtos.
    </p>
    <h2>Recursos Disponíveis</h2>
    <ul>
      <li>Cadastro de Produtos: Você pode adicionar novos produtos à lista de cadastro.</li>
      <li>Listagem de Produtos: Visualize a lista completa de produtos cadastrados.</li>
      <li>Detalhes do Produto: Veja informações detalhadas sobre cada produto.</li>
      <li>Edição e Exclusão de Produtos: Atualize ou remova produtos existentes.</li>
    </ul>
    <h2>Como Usar</h2>
    <p>
      Para começar, navegue pelos links na parte superior da página para acessar as diferentes funcionalidades do sistema. Clique em "Cadastro de Produtos" para adicionar um novo produto ou em "Listagem de Produtos" para ver todos os produtos cadastrados.
    </p>
    <p>
      Fique à vontade para explorar o sistema, adicionar, editar e excluir produtos conforme necessário. Se precisar de ajuda ou tiver alguma dúvida, consulte a página "About" para obter mais informações sobre o projeto.
    </p>
    <h2>Divirta-se!</h2>
    <p>
      Esperamos que você aproveite usar este sistema de cadastro de produtos. Sinta-se à vontade para experimentar e personalizar de acordo com suas necessidades. Aproveite sua experiência na página inicial!
    </p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home"
}
</script>

<style scoped>
.home {
  margin: 20px;
}
</style>