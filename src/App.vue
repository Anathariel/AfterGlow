<template>
  <AppHeader />
  <router-view />
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
  margin-top: 150px;
}
</style>
