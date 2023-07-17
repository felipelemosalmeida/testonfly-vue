<template>
  <q-page class="">
    <q-card flat bordered class="my-card flex flex-center">
      <q-card-section class="form">
        <div class="text-h6">Editar Despesa</div>
        <q-banner v-if="error" inline-actions class="text-white bg-red">
          {{ errorMessage }}
        </q-banner>
        <q-form @submit="onSubmit()" @reset="onReset" method="put" class="q-gutter-md">
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
import {format} from "date-fns";

export default {
  name: "Create",
  components: {},
  created() {
    this.loadExpense()
  },
  data() {
    return {
      description: "",
      date: "",
      price: "",
      id: "",
      error: false,
      errorMessage:""
    };
  },
  methods: {
    async onSubmit() {
      try {
        const id = this.$router.currentRoute.params.id
        const response = await this.$axios.put("/expenses/"+id, {
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
    async loadExpense() {
      const id = this.$router.currentRoute.params.id
      const response = await this.$axios.get("/expenses/"+id)
      this.id = response.data.id
      this.description = response.data.description
      this.date = format(new Date(response.data.date), 'yyyy-MM-dd')
      this.price = response.data.price
    }
  },
};
</script>
<style scoped>
.text-h6{
  margin-bottom: 30px;
}
</style>
