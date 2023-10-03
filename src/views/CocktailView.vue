<template>
  <section>
    <figure>
      <img
        :src="cocktail.strDrinkThumb"
        alt="Cocktail Thumbnail"
        class="cocktail-thumbnail"
      />
    </figure>
    <div class="cocktail-details">
      <h1>{{ cocktail.strDrink }}</h1>
      <div class="cocktail-tags-container">
        <p v-for="tag in tags" :key="tag">{{ tag }}</p>
        <p>{{ cocktail.strCategory }}</p>
        <p>{{ cocktail.strAlcoholic }}</p>
        <p>{{ cocktail.strIBA }}</p>
      </div>
      <div class="cocktail-ingredients-container">
        <h2>Ingredients</h2>
        <div class="list-ingredients">
          <figure
            v-for="ingredient in ingredients"
            :key="ingredient.name"
            class="list-item"
          >
            <img src="@/assets/media/icons/moon-stars.svg" />
            <figcaption class="info">
              <p>{{ ingredient.measure }} {{ ingredient.name }}</p>
            </figcaption>
          </figure>
        </div>
      </div>

      <p class="cocktail-instructions">{{ cocktail.strInstructions }}</p>
    </div>
  </section>
</template>

<script>
import { singleCocktailView } from "@/services/cocktailDb.js";

export default {
  name: "CocktailView",
  props: ["id"],
  data() {
    return {
      cocktail: {},
      strTags: "",
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const cocktailData = await singleCocktailView(id);
    this.cocktail = cocktailData.drinks[0];
  },
  computed: {
    ingredients() {
      const ingredients = [];
      let i = 1;
      let hasMoreIngredients = true;

      while (hasMoreIngredients) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;

        // Break the loop if there's no ingredient for this index
        if (
          !this.cocktail[ingredientKey] ||
          this.cocktail[ingredientKey] === ""
        ) {
          hasMoreIngredients = false;
          continue;
        }

        // Add to the list only if both ingredient and measure are not null and not empty strings
        if (
          this.cocktail[ingredientKey] !== null &&
          this.cocktail[ingredientKey] !== ""
        ) {
          ingredients.push({
            name: this.cocktail[ingredientKey],
            measure: this.cocktail[measureKey],
          });
        }

        i++;
      }

      return ingredients;
    },
    tags() {
      return this.cocktail.strTags ? this.cocktail.strTags.split(",") : [];
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 25px;
  padding: 20px;
  & > figure {
    & > img {
      border-radius: $radius-15;
      box-shadow: $white-NeonEffect;
    }
  }
  & > div.cocktail-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;
    min-width: 260px;
    width: 90%;
    padding: 25px 20px;
    border-radius: $radius-15;
    border: 2px solid $primary-DarkPurple;
    box-shadow: $purple-NeonEffect;
    & > h1 {
      font-size: 2.1rem;
      line-height: 1.75rem;
      text-shadow: $white-NeonEffect;
    }
    & > div.cocktail-tags-container {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      overflow-x: scroll;
      overflow-y: hidden;
      gap: 15px;
      height: 35px;
      max-width: 90%;
      width: fit-content;
      padding: 15px;
      border: 1px solid $accent-Purpleish;
      box-shadow: $purpleish-NeonEffect;
      border-radius: $radius-15;
      & > p {
        white-space: nowrap;
        font-size: 1.25rem;
        color: $accent-NeonPink;
        text-shadow: $pink-NeonEffect;
      }
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      // For Firefox
      scrollbar-width: none;
      // For IE
      -ms-overflow-style: none;
    }
    & > div.cocktail-ingredients-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-width: 650px;
      width: 90%;
      gap: 15px;
      padding: 20px;
      border: 1px solid $accent-NeonBlue;
      box-shadow: $blue-NeonEffect;
      border-radius: $radius-15;
      & > h2 {
        font-size: 1.25rem;
        line-height: 1.75rem;
        text-shadow: $white-NeonEffect;
      }
      & > div.list-ingredients {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        gap: 10px;
        width: 100%;
        height: fit-content;
        & > figure.list-item {
          display: flex;
          height: 30px;
          align-items: flex-end;
          gap: 10px;
          & > p {
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
        }
      }
    }
    & > p.cocktail-instructions {
      align-self: center;
      white-space: pre-line;
      word-wrap: break-word;
    }
  }

  @media screen and (min-width: 1020px) {
    flex-direction: row-reverse;
    gap: 35px;
    padding: 25px 15px;
    & > div.cocktail-details {
      justify-content: space-evenly;
      width: 50%;
      height: 75dvh;
      & > div.cocktail-ingredients-container {
        max-height: 650px;
        height: 100%;
      }
    }
  }
}
</style>
