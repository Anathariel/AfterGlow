<template>
  <div class="searchbar-wrapper">
    <div class="searchbar">
      <img src="@/assets/media/icons/searchIcon.svg" alt="search icon" />
      <input
        type="text"
        v-model="searchTerm"
        @input="search"
        placeholder="Search . . ."
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
      console.log("Emitting search event with:", this.searchTerm);
      this.$emit("search", this.searchTerm);
    }, 300),
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.searchbar-wrapper {
  display: inline-block;
  width: 300px;
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
    width: 300px;
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
}
</style>
