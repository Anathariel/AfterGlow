<template>
  <div class="searchbar-wrapper">
    <div class="searchbar">
      <img src="@/assets/media/icons/searchIcon.svg" alt="search icon" />
      <input
        type="text"
        v-model="searchTerm"
        @input="search"
        placeholder="Search . . ."
        name="cocktail-search"
        id="cocktail-searchbar"
        @keyup.enter="onEnterPressed"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";

export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    search: debounce(function () {
      this.$emit("search", this.searchTerm);
    }, 500),
    onEnterPressed() {
      this.$emit("search", this.searchTerm);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.searchbar-wrapper {
  display: inline-block;
  min-width: 250px;
  width: 80%;
  padding: 1px;
  background: $neon-LinearGradient;
  border-radius: $radius-180;

  &:hover .searchbar {
    box-shadow: $pink-NeonEffect;
  }

  & > .searchbar {
    position: relative;
    display: flex;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: center;
    min-width: 250px;
    width: 100%;
    padding: 16px;
    gap: 10px;
    border-radius: $radius-180;
    background-color: $primary-Background;

    & > input[type="text"] {
      color: $default-White;
      font-family: $lighterText;
      background-color: transparent;
      border: none;
      outline: transparent;
    }
  }
  // @media screen and (min-width: 1020px){}
}
</style>
