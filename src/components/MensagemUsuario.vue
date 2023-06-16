<template>
  <div>
    <h1 style="text-align: center">{{ msg }}</h1>
    <div class="modal" :class="modalClasses" v-if="modalVisivel">
      <div class="modal-content">
        <p>{{ modalMensagem }}</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "MensagemUsuario"
}
</script>

<style scoped>

</style>