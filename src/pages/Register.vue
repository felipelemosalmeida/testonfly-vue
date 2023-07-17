<template>
  <q-card class="login-card">
    <q-card-section>
      <q-banner v-if="error" inline-actions class="text-white bg-red">
        {{ errorMessage }}
      </q-banner>
      <q-input v-model="name" label="Nome" />
      <q-input v-model="email" label="E-mail" type="email" />
      <q-input v-model="password" label="Senha" type="password" />
      <q-input
        v-model="password_confirmation"
        label="Confirmar senha"
        type="password"
      />
      <div class="content-button">
        <q-btn @click="redirectLogin" outline color="primary" label="Logar" />
        <q-btn @click="registerAction" color="primary" label="Cadastrar" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "Register",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      error: false,
      errorMessage:""
    };
  },
  methods: {
    async registerAction() {
      try {
        const response = await this.$axios.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });

        // Armazenar token no Local Storage
        localStorage.setItem("access_token", response.data.data.token);
        const user = JSON.stringify(response.data.data)
        localStorage.setItem("user", user)

        // Redirecionar para outra página após o login
        this.$router.push("/dashboard");
      } catch (error) {
        this.error = true
        this.errorMessage = error.response.data.message
      }
    },
    redirectLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.login-card {
  width: 400px;
  margin: 0 auto;
  border: 1px solid #000;
}

.content-button {
  margin: 10px 0px;
  text-align: end;
  display: flex;
  justify-content: space-between;
}
</style>
