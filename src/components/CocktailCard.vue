<template>
  <router-link :to="{ name: 'CocktailView', params: { id: idDrink } }">
    <div class="cocktail-wrapper">
      <div class="cocktail-card-effect">
        <div class="cocktail-card">
          <figure>
            <img
              :src="strDrinkThumb"
              alt="Cocktail Thumbnail"
              class="cocktail-thumbnail"
            />
            <figcaption>
              <h2>{{ strDrink }}</h2>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "CocktailCard",
  props: {
    strDrink: String,
    strDrinkThumb: String,
    idDrink: String,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.cocktail-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 300px;
  height: 300px;
  // background-color: red;
}
.cocktail-card-effect {
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: $radius-95;
  &:before {
    content: "";
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100%;
    height: 100%;
    border-radius: $radius-95;
    border: 1px solid $accent-NeonPink;
    background: $card-gradient;
  }
}
.cocktail-card {
  position: relative;
  overflow: hidden;
  width: 250px;
  height: 250px;
  border-radius: $radius-95;
  box-shadow: $pink-NeonEffect;
  border: 1px solid $accent-NeonPink;
  border-top: none;
  border-left: none;
  background-color: $primary-Background;
  & > figure {
    position: relative;
    & > img {
      width: 100%;
      height: auto;
      border-radius: $radius-5;
    }

    & > figcaption {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 50px;
      padding-bottom: 20px;
      background-color: $primary-Background;
      border-radius: $radius-5;
      & > h2 {
        max-width: 200px;
        font-family: $titleFont;
        text-shadow: $whiteTitle-NeonEffect;
        font-size: 1.5rem;
        text-transform: capitalize;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}
</style>
