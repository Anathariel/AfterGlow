<template>
  <main>
    <section class="hero-main">
      <div class="hero-CTA">
        <h1 data-text="Welcome,">Welcome,</h1>
        <p>
          Looking for the ultimate buzz? Unveil the glowing recipes that match
          your vibe by searching below.
        </p>
      </div>
      <figure class="main-figure">
        <img
          src="@/assets/media/cropped-hero-main.png"
          alt="Neon bottles main header"
        />
      </figure>
      <AppSearchbar @search="goToCatalogue" />
      <div class="stats">
        <figure>
          <img
            src="@/assets/media/icons/cocktail-icon.svg"
            alt=""
            class="icons"
          />
          <figcaption>
            <p>Total Drinks: <span class="span-cocktail">636</span></p>
          </figcaption>
        </figure>
        <figure>
          <img src="@/assets/media/icons/cart.svg" alt="" class="icons" />
          <figcaption>
            <p>Total Ingredients: <span class="span-ingredients">489</span></p>
          </figcaption>
        </figure>
      </div>
    </section>
    <section class="popular-drinks">
      <figure class="title-section">
        <img
          src="@/assets/media/icons/cocktail-icon.svg"
          alt="Pink Cocktail Icon"
        />
        <figcaption>
          <h2>our drinks,</h2>
        </figcaption>
      </figure>
      <div class="slider-container">
        <div ref="sliderRef" class="cocktail-container">
          <CocktailCard
            v-for="drink in popularDrinks"
            :key="drink.idDrink"
            :strDrink="drink.strDrink"
            :strDrinkThumb="drink.strDrinkThumb"
            :idDrink="drink.idDrink"
          />
        </div>
        <div class="container-buttons">
          <button
            @click="goToPrevCard"
            class="slider-button slider-button--left"
          >
            <img src="@/assets/media/icons/left-arrow.svg" alt="left arrow" />
          </button>
          <button
            @click="goToNextCard"
            class="slider-button slider-button--right"
          >
            <img src="@/assets/media/icons/right-arrow.svg" alt="right arrow" />
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import AppSearchbar from "@/components/AppSearchbar.vue";
import CocktailCard from "@/components/CocktailCard.vue";
import { getRandomCocktail } from "@/services/cocktailDb.js";

export default {
  components: {
    AppSearchbar,
    CocktailCard,
  },
  data() {
    return {
      popularDrinks: [],
    };
  },
  async created() {
    const fetchPromises = Array.from({ length: 5 }, () => getRandomCocktail());
    const dataObjects = await Promise.all(fetchPromises);
    this.popularDrinks = [].concat(...dataObjects.map((obj) => obj.drinks));
  },
  methods: {
    goToCatalogue(searchTerm) {
      this.$router.push({
        name: "CatalogueView",
        query: { filter: searchTerm },
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.hero-main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("@/assets/media/background/Bubble=Default.svg") center
      bottom / contain no-repeat;
    opacity: 0.3;
    z-index: -1;
  }

  .hero-CTA {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    max-width: 650px;
    padding: 30px 15px;
    gap: 15px;

    & > h1 {
      position: relative;
      font-size: 2.8rem;
      line-height: 4rem;
      font-family: $titleFont;
      &::before {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        color: $accent-NeonBlue;
        text-shadow: $white-NeonEffect;
      }
      color: transparent;
      background: $blue-LinearGradient;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    & > p {
      font-size: 0.9rem;
      text-transform: capitalize;
      font-family: $mediumText;
    }
  }

  .main-figure {
    & > img {
      max-width: 1456px;
      width: 100%;
      height: auto;
    }
  }

  .stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 320px;
    padding: 25px 15px;
    gap: 15px;

    & > figure {
      display: flex;
      gap: 10px;

      & > figcaption {
        & > p {
          font-size: 0.9rem;
          text-transform: capitalize;

          & > .span-cocktail {
            color: $accent-NeonPink;
          }

          & > .span-ingredients {
            color: $accent-NeonBlue;
          }
        }
      }
    }
  }

  // @media screen and (min-width: 1020px) {
  // }
}

.popular-drinks {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("@/assets/media/background/Bubble=ReversedFlip.svg") center
      top / contain no-repeat;
    opacity: 0.3;
    z-index: -1;
  }
  & > .title-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    & > img {
      filter: invert(36%) sepia(64%) saturate(2193%) hue-rotate(294deg)
        brightness(101%) contrast(87%);
    }
    & > figcaption > h2 {
      color: $default-White;
      background: $pink-LinearGradient;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      width: fit-content;
      text-shadow: $pink-NeonEffect;
      font-family: $titleFont;
      font-size: 1.8rem;
      line-height: 4rem;
      text-transform: capitalize;
    }
  }

  & > .slider-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    max-width: 650px;
    width: 100%;
    & > .cocktail-container {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      max-width: 650px;
      width: 100%;
      height: auto;
      overflow-x: auto;
      position: relative;
      &::before,
      &::after {
        content: "";
        flex: 1;
      }
    }
    & > .container-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      & > button > img {
        width: 50px;
      }
    }
  }
}
</style>
