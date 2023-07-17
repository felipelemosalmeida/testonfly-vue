<template>
  <q-page class="">
    <q-card flat bordered class="my-card">
      <div class="q-pa-md">
        <div class="q-gutter-y-md column" style="max-width: 500px">
          <q-field standout label="Name" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline"  tabindex="0">{{ name }}</div>
            </template>
          </q-field>
          <q-field standout label="Email" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ email }}</div>
            </template>
          </q-field>
          <q-field standout label="Data Cadastro" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ data_cadastro }}</div>
            </template>
          </q-field>
        </div>
      </div>
    </q-card>
  </q-page>
</template>


<script>
import {format} from "date-fns";

export default {
  name: "Create",
  components: {},
  created() {
    this.loadDataUser()
  },
  data() {
    return {
      name: "",
      email: "",
      data_cadastro: ""
    };
  },
  methods: {
    async loadDataUser(){
      const response = await this.$axios.get("/me")
      this.name = response.data.data.name
      this.email = response.data.data.email
      this.data_cadastro = format(new Date(response.data.data.register_date), 'dd/MM/yyyy')
    }
  }
};
</script>
<style scoped>
.text-h6{
  margin-bottom: 30px;
}
</style>
