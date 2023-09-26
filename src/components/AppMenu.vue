<template>
  <div ref="navOverlay" class="nav-menu-overlay" v-if="isOpen">
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
      <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="cross"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.6367 11.72C24.7257 11.631 24.7964 11.5254 24.8447 11.4091C24.8929 11.2928 24.9178 11.1681 24.9179 11.0422C24.918 10.9163 24.8932 10.7917 24.8451 10.6753C24.797 10.559 24.7265 10.4532 24.6375 10.3641C24.5485 10.2751 24.4429 10.2044 24.3266 10.1561C24.2103 10.1079 24.0857 10.083 23.9597 10.0829C23.8338 10.0828 23.7092 10.1076 23.5928 10.1557C23.4765 10.2038 23.3707 10.2743 23.2817 10.3633L17.5 16.145L11.72 10.3633C11.5401 10.1834 11.2961 10.0823 11.0417 10.0823C10.7872 10.0823 10.5432 10.1834 10.3633 10.3633C10.1834 10.5432 10.0824 10.7872 10.0824 11.0416C10.0824 11.2961 10.1834 11.5401 10.3633 11.72L16.145 17.5L10.3633 23.28C10.2742 23.3691 10.2036 23.4748 10.1554 23.5912C10.1072 23.7076 10.0824 23.8323 10.0824 23.9583C10.0824 24.0843 10.1072 24.209 10.1554 24.3254C10.2036 24.4418 10.2742 24.5476 10.3633 24.6366C10.5432 24.8165 10.7872 24.9176 11.0417 24.9176C11.1676 24.9176 11.2924 24.8928 11.4088 24.8446C11.5252 24.7964 11.6309 24.7257 11.72 24.6366L17.5 18.855L23.2817 24.6366C23.4616 24.8163 23.7055 24.9172 23.9597 24.917C24.214 24.9169 24.4578 24.8157 24.6375 24.6358C24.8172 24.4559 24.918 24.212 24.9179 23.9577C24.9177 23.7035 24.8166 23.4597 24.6367 23.28L18.855 17.5L24.6367 11.72Z"
          fill="#F8F8F8"
        />
        <defs>
          <filter
            id="filter0_d_10_12040"
            x="-5"
            y="-5"
            width="45"
            height="45"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.972549 0 0 0 0 0.972549 0 0 0 0 0.972549 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_10_12040"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_10_12040"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
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
  },
  watch: {
    isOpen: function (newVal) {
      nextTick(() => {
        if (newVal && this.$refs.navOverlay) {
          this.$refs.navOverlay.classList.add("active");
        } else if (this.$refs.navOverlay) {
          this.$refs.navOverlay.classList.remove("active");
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_reset.scss";

.nav-menu-overlay {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
    height: 100px;
    width: 275px;
    border-radius: $radius-15;
    color: $default-White;
    font-family: $titleFont;
    text-shadow: $whiteTitle-NeonEffect;
    border-bottom: 1px dotted $accent-NeonPink;

    & > h2 {
      font-size: 2.1875rem;
      line-height: 2.8125rem;
      text-transform: capitalize;
    }
  }

  & > nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 22px 8px;
    gap: 65px;

    & > li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 45px;
      padding: 15px;
      border-radius: $radius-5;
      border-bottom: $neon-bottom-border;
      & > a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: $default-White;
        font-size: 1.5625rem;
        line-height: 1.5rem;
        text-transform: capitalize;
      }

      &:hover {
        background-color: $accent-NeonPink;
        box-shadow: $white-NeonEffect;
      }
    }
  }

  & > figure > svg:hover {
    cursor: pointer;
  }

  .close-icon:hover .cross {
    filter: drop-shadow($white-NeonEffect);
    border-radius: $radius-180;
  }
}
</style>
