<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="container">
          <img src="/logo.jpg" alt="logo onfly" />
          <h4 class="title">Gestão de Despesas</h4>
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "AuthLayout",
  components: {},
  data() {
    return {};
  },
};
</script>
<style>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title{
  --text-opacity: 1;
  color: #24262d;
  color: rgba(36,38,45,var(--text-opacity));
  font-family: Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
}
</style>
