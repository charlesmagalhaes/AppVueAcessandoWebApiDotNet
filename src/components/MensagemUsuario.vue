<template>
  <div>
    <div class="modal" :class="exibirModal()">
      <div class="modal-content">
        <p>{{ getModalVisivel.mensagem }}</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "MensagemUsuario",
  data: () => {
    return {
      modalClasses: String
    }
  },

  computed: {
    getModalVisivel() {
      return this.$store.getters.getModalVisivel;
    }
  },
  methods: {
    exibirModal() {
      if(this.getModalVisivel.mensagemTitulo == 'sucesso'){
        return this.modalClasses = "modal modal-sucesso";
      } else{
        return this.modalClasses = "modal modal-erro";
      }
    },
  }

}
</script>

<style scoped>
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
</style>