<script setup>
  import MainPageView from "./views/MainPageView.vue";
</script>

<template>
  <MainPageView />
  <RouterView />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

nav {
  display: flex;
  gap: 1em;
}

.link {
  width: 100px;
  background: red;
  color: white;
  cursor: pointer;
}
</style>
