<template>
  <section class="hero-main">
    <div class="content-size">
      <div class="left-container">
        <div class="hero-CTA">
          <h1 data-text="Welcome,">Welcome,</h1>
          <p>
            Looking for the ultimate buzz? Unveil the glowing recipes that match
            your vibe by searching below.
          </p>
        </div>
        <div class="stats-nd-search">
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
                <p>
                  Total Ingredients: <span class="span-ingredients">489</span>
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <figure class="main-figure">
        <img
          src="@/assets/media/cropped-hero-main.png"
          alt="Neon bottles main header"
        />
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
    <div class="slider-wrapper">
      <div class="slider-container">
        <div
          ref="sliderRef"
          class="cocktail-container"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
        >
          <CocktailCard
            v-for="drink in popularDrinks"
            :key="drink.idDrink"
            :strDrink="drink.strDrink"
            :strDrinkThumb="drink.strDrinkThumb"
            :idDrink="drink.idDrink"
          />
        </div>
      </div>
      <div class="container-buttons">
        <button
          @click="goToPrevCard"
          :class="{ 'grey-out': leftButtonGreyedOut === true }"
          class="slider-button slider-button--left"
        >
          <img src="@/assets/media/icons/left-arrow.svg" alt="left arrow" />
        </button>
        <button
          @click="goToNextCard"
          :class="{ 'grey-out': rightButtonGreyedOut === true }"
          class="slider-button slider-button--right"
        >
          <img src="@/assets/media/icons/right-arrow.svg" alt="right arrow" />
        </button>
      </div>
    </div>
  </section>
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
      scrollPosition: null,
      maxScrollPosition: null,
      leftButtonGreyedOut: false,
      rightButtonGreyedOut: false,
      cardWidth: 300,
      startX: null,
      threshold: 100,
    };
  },
  mounted() {
    this.updateScrollPosition();
    this.$refs.sliderRef.addEventListener("scroll", this.updateScrollPosition);
  },
  async created() {
    const fetchPromises = Array.from({ length: 7 }, () => getRandomCocktail());
    const dataObjects = await Promise.all(fetchPromises);
    this.popularDrinks = [].concat(...dataObjects.map((obj) => obj.drinks));
    this.$nextTick(() => {
      this.updateScrollPosition(); // Update scroll state after data has been loaded
    });
  },
  methods: {
    goToCatalogue(searchTerm) {
      this.$router.push({
        name: "CatalogueView",
        query: { filter: searchTerm },
      });
    },
    goToPrevCard() {
      const slider = this.$refs.sliderRef;
      let newScrollPosition = slider.scrollLeft - this.cardWidth;
      if (newScrollPosition < 0) {
        newScrollPosition = 0;
      }
      slider.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    },
    goToNextCard() {
      const slider = this.$refs.sliderRef;
      let newScrollPosition = slider.scrollLeft + this.cardWidth;

      if (newScrollPosition >= slider.scrollWidth - slider.clientWidth) {
        newScrollPosition = slider.scrollWidth - slider.clientWidth;
      }

      slider.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });

      this.scrollPosition = newScrollPosition;
    },
    updateScrollPosition() {
      const slider = this.$refs.sliderRef;
      this.scrollPosition = slider.scrollLeft;
      this.maxScrollPosition = slider.scrollWidth - slider.clientWidth;

      this.$nextTick(() => {
        this.leftButtonGreyedOut = this.scrollPosition === 0;
        this.rightButtonGreyedOut =
          this.scrollPosition >= this.maxScrollPosition;
      });
    },
    handleTouchStart(e) {
      this.startX = e.touches[0].clientX;
    },
    handleTouchMove(e) {
      const touchX = e.touches[0].clientX;
      const distanceX = this.startX - touchX;

      if (Math.abs(distanceX) > this.threshold) {
        if (distanceX > 0) {
          this.goToNextCard();
        } else {
          this.goToPrevCard();
        }
        this.startX = null;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.hero-main {
  position: relative;
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
  & > .content-size {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    & > .left-container {
      & > .hero-CTA {
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
      & > .stats-nd-search {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 300px;
        margin: 0 auto;
        & > .stats {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
      }
    }
    & > .main-figure {
      & > img {
        max-width: 1456px;
        width: 100%;
        height: auto;
      }
    }
  }
  @media screen and (min-width: 1020px) {
    & > .content-size {
      flex-direction: row;
      & > .left-container {
        max-width: 600px;
        width: 100%;
        & > .hero-CTA {
          max-width: 450px;
        }
        & > .stats-nd-search {
          width: 100%;
          max-width: none;
          & > .stats {
            max-width: none;
            width: 100%;
            flex-direction: row;
            justify-content: space-evenly;
          }
        }
      }
      & > .main-figure {
        & > img {
          height: 80vh;
          width: auto;
        }
      }
    }
  }
}

.popular-drinks {
  width: 100%;
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

  & > .slider-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    & > .slider-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      max-width: 1000px;
      width: 100%;
      & > .cocktail-container {
        position: relative;
        overflow-x: hidden;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        max-width: 1000px;
        width: 100%;
        height: auto;
        transition: all 0.5s ease-in-out;
        &::before,
        &::after {
          content: "";
          flex: 1;
        }
      }
    }
    & > .container-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      & > button > img {
        width: 50px;
        filter: invert(26%) sepia(95%) saturate(7063%) hue-rotate(255deg)
          brightness(83%) contrast(90%) drop-shadow(0 0 5px $primary-NeonPurple);
      }
      .grey-out img {
        filter: invert(47%) sepia(43%) saturate(2%) hue-rotate(314deg)
          brightness(98%) contrast(85%);
        opacity: 0.5;
      }
    }
  }

  @media screen and (min-width: 1020px) {
    .slider-wrapper {
      width: 60%;
      margin: 0 auto;
      & > .container-buttons {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -20px;
        right: -20px;
        width: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > button {
          & > img {
            width: 100px;
            filter: invert(26%) sepia(95%) saturate(7063%) hue-rotate(255deg)
              brightness(83%) contrast(90%)
              drop-shadow(0 0 5px $primary-NeonPurple);
            &:hover {
              filter: invert(26%) sepia(95%) saturate(7063%) hue-rotate(255deg)
                brightness(83%) contrast(90%)
                drop-shadow(0 0 10px $default-grey);
            }
          }
          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
</style>
