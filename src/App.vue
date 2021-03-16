<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <div class="container">
    <D3_DIV_Bar :data="[10, 20, 30, 40]"></D3_DIV_Bar>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import D3_DIV_Bar from "./components/D3_DIV_Bar.vue";

export default defineComponent({
  name: "App",
  components: {
    D3_DIV_Bar,
  },
});
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
</style>
