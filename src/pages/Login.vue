<template>
  <q-card class="login-card">
    <q-card-section>
      <q-banner v-if="error" inline-actions class="text-white bg-red">
        {{ errorMessage }}
      </q-banner>
      <q-input v-model="email" label="E-mail" type="email" />
      <q-input v-model="password" label="Senha" type="password" />
      <div class="content-button">
        <q-btn
          @click="redirectRegister"
          outline
          color="primary"
          label="Cadastrar"
        />
        <q-btn @click="loginAction" color="primary" label="Logar" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    async loginAction() {
      try {
        const response = await this.$axios.post("/login", {
          email: this.email,
          password: this.password,
        });
        // Armazenar token no Local Storage
        localStorage.setItem("access_token", response.data.token);
        const user = JSON.stringify(response.data)
        localStorage.setItem("user", user)

        // Redirecionar para outra página após o login
        this.$router.push("/dashboard");
      } catch (error) {
        // error.response.message
        this.error = true;
        this.errorMessage = "Falha na autenticação";
      }
    },
    redirectRegister() {
      this.$router.push("/cadastrar");
    },
  },
};
</script>

<style scoped>
.alert-danger {
  color:red;
}

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
