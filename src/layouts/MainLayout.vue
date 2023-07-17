<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> Onfly App </q-toolbar-title>

        <q-btn @click="logoutAction" flat round dense icon="logout">&nbsp;&nbsp;Sair</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >

      <q-expansion-item
        expand-separator
        icon="perm_identity"
        label="Perfil"
        :caption="user.name"
      >
        <q-card>
          <q-card-section>
            <q-list>
              <EssentialLink
                v-for="link in linksUsers"
                :key="link.title"
                v-bind="link"
              />
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        icon="currency_exchange"
        label="Despesas"
      >
        <q-card>
          <q-card-section>
            <q-list>
              <EssentialLink
                v-for="link in linksExpenses"
                :key="link.title"
                v-bind="link"
              />
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>


    </q-drawer>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksUsers = [
  {
    title: "Ver Perfil",
    link: "/user/profile",
  },
];

const linksExpenses = [
  {
    title: "Cadastrar",
    link: "/expenses/create",
  },
  {
    title: "Listar",
    link: "/expenses",
  },
];

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  mounted() {
  },
  data() {
    return {
      leftDrawerOpen: false,
      linksUsers: linksUsers,
      linksExpenses: linksExpenses,
      user: JSON.parse(localStorage.getItem("user"))
    };
  },
  methods: {
    async logoutAction() {
      try {
        await this.$axios.post("/logout");

        // Limpa o access_token do usuário no local storage
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        // Redirecionar para outra página após o login
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style>
.form {
  width: 600px;
}
</style>
