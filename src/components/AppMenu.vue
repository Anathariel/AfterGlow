<template>
  <div
    ref="navOverlay"
    class="nav-menu-overlay"
    v-if="isOpen"
    @click="handleOverlayClick"
  >
    <div class="title-menu">
      <h2>Find your cocktail</h2>
    </div>
    <nav>
      <li><a href="">With Alcohol</a></li>
      <li><a href="">Without Alcohol</a></li>
      <li><a href="">Our Categories</a></li>
      <li><a href="">By Ingredients</a></li>
    </nav>
    <figure @click="closeMenu" class="close-icon">
      <img src="@/assets/media/icons/closeIcon.svg" />
    </figure>
  </div>
</template>

<script>
import { nextTick } from "vue";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  name: "NavigationMenu",
  methods: {
    closeMenu() {
      this.$emit("close-menu");
    },
    handleOverlayClick(event) {
      // Prevent this event from propagating to document click handler
      event.stopPropagation();
    },
    handleClickOutside() {
      this.closeMenu();
    },
  },
  watch: {
    isOpen: function (newVal) {
      nextTick(() => {
        if (newVal && this.$refs.navOverlay) {
          this.$refs.navOverlay.classList.add("active");
          document.addEventListener("click", this.handleClickOutside);
        } else if (this.$refs.navOverlay) {
          this.$refs.navOverlay.classList.remove("active");
          document.removeEventListener("click", this.handleClickOutside);
        }
      });
    },
  },
  onMounted() {
    if (this.isOpen) {
      document.addEventListener("click", this.handleClickOutside);
    }
  },
  onBeforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";

.nav-menu-overlay {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  width: 320px;
  height: 100vh;
  text-align: center;
  background-color: $primary-Background;
  border-radius: $radius-15;

  & > div.title-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 150px;
    width: 275px;
    border-radius: $radius-5;
    color: $default-White;
    font-family: $titleFont;
    text-shadow: $whiteTitle-NeonEffect;
    border-bottom: 1px dotted $accent-NeonPink;

    & > h2 {
      font-size: 2rem;
      line-height: 2.8rem;
      text-transform: capitalize;
    }
  }

  & > nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 20px 5px;
    gap: 65px;

    & > li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 40px;
      padding: 10px;
      border-radius: $radius-5;
      border-bottom: $neon-bottom-border;
      & > a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: $default-White;
        font-size: 1.5rem;
        line-height: 1.5rem;
        text-transform: capitalize;
      }

      &:hover {
        background-color: $accent-NeonPink;
        box-shadow: $white-NeonEffect;
      }
    }
  }

  & > figure {
    flex: 0;
    & > img:hover {
      cursor: pointer;
      transform: scale(1.1);
      filter: drop-shadow(0 0 3.5px $default-White);
    }
  }
}
</style>
