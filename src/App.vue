<template>
  <AppHeader />
  <main>
    <router-view />
  </main>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "HomeView",
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
#app {
  margin-top: 100px;
}
</style>
