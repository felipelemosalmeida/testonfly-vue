<template>
  <q-page class="">
    <q-card flat bordered class="my-card flex flex-center">
      <q-card-section class="form">
        <div class="text-h6">Cadastro de Despesa</div>
        <q-banner v-if="error" inline-actions class="text-white bg-red">
          {{ errorMessage }}
        </q-banner>
        <q-form @submit="onSubmit" @reset="onReset" method="post" class="q-gutter-md mt-2">
          <div class="text-h7">Descrição:</div>
          <q-input outlined v-model="description" type="text"></q-input>

          <div class="text-h7">Data:</div>
          <q-input outlined v-model="date" type="date"></q-input>

          <div class="text-h7">Preço:</div>
          <q-input outlined v-model="price" type="number" placeholder="R$"></q-input>

          <q-btn label="Salvar" type="submit" color="dark" />
          <q-btn @click="onReset" label="Limpar"  type="reset"  color="warning"/>
        </q-form>
      </q-card-section>
    </q-card>

  </q-page>
</template>


<script>
export default {
  name: "Create",
  components: {},
  data() {
    return {
      description: "",
      date: "",
      price: "",
      error: false,
      errorMessage:""
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await this.$axios.post("/expenses", {
          description: this.description,
          date: this.date,
          price: this.price,
        });

        this.$router.push("/expenses");

      } catch (error) {
        this.error = true
        this.errorMessage = error.response.data.message
      }
    },
    onReset() {
      this.description = "";
      this.date = "";
      this.price = "";
    },
  },
};
</script>
<style scoped>
.text-h6{
  margin-bottom: 30px;
}
</style>
