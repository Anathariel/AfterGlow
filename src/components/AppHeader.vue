<template>
  <header>
    <figure class="burger-menu" @click="toggleMenu">
      <img src="@/assets/media/icons/burger-icon.svg" alt="Burger Menu Icon" />
    </figure>

    <figure class="header-logo">
      <img
        src="@/assets/media/logo/afterGlowFull.svg"
        alt="AfterGlow Full Logo"
      />
    </figure>
    <NavigationMenu :isOpen="isMenuOpen" @close-menu="closeMenu" />
  </header>
</template>

<script>
import NavigationMenu from "./AppMenu.vue";

export default {
  name: "AppHeader",
  components: {
    NavigationMenu,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    closeMenu() {
      this.isMenuOpen = false;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_reset.scss";
header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 150px;
  border-bottom: $neon-bottom-border;
  border-radius: $radius-5;

  .header-logo {
    grid-column: 2;
    justify-self: center;
    width: 150px;
  }

  .burger-menu {
    grid-column: 1;

    & > img {
      width: 50px;
    }
  }
}
</style>
