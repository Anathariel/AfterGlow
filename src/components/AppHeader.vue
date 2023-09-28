<template>
  <header>
    <figure class="burger-menu" @click.stop="toggleMenu">
      <img src="@/assets/media/icons/burger-icon.svg" alt="Burger Menu Icon" />
    </figure>

    <figure class="header-logo">
      <router-link to="/">
        <img
          src="@/assets/media/logo/afterGlowFull.svg"
          alt="AfterGlow Full Logo"
        />
      </router-link>
    </figure>
    <div class="empty-space"></div>
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
@import "@/assets/scss/_variables.scss";
header {
  z-index: 999;
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
  border-bottom: $neon-bottom-border;
  border-radius: $radius-5;
  background-color: $primary-Background;

  .header-logo {
    width: 150px;
    filter: drop-shadow(0 0 3.5px $accent-NeonPink);
  }

  .burger-menu {
    flex: 1;
    margin-left: 25px;

    & > img {
      width: 50px;
    }
    &:hover {
      cursor: pointer;
      filter: drop-shadow(0 0 3.5px $accent-NeonPink);
    }
  }
  .empty-space {
    flex: 1;
  }
}
</style>
