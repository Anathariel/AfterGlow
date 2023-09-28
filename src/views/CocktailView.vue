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
          <div
            v-for="ingredient in ingredients"
            :key="ingredient.name"
            class="ingredient-item"
          >
            <div class="icon">
              <img src="@/assets/media/icons/moon-stars.svg" />
            </div>
            <div class="info">
              <p>{{ ingredient.measure }} {{ ingredient.name }}</p>
            </div>
          </div>
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
  gap: 20px;
  padding: 5px 15px;
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
    border-radius: $radius-15;
    box-shadow: $purple-NeonEffect;
    padding: 15px;
    gap: 25px;
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
      gap: 20px;
      width: 250px;
      padding: 15px;
      border: 1px solid $accent-Purpleish;
      box-shadow: $purpleish-NeonEffect;
      border-radius: $radius-15;
      & > p {
        white-space: nowrap;
        font-size: 1.2rem;
        line-height: 1.7rem;
        color: $accent-NeonPink;
        text-shadow: $pink-NeonEffect;
      }
    }
    & > div.cocktail-ingredients-container {
      & > h2 {
        font-size: 1.25rem;
        line-height: 1.75rem;
        text-shadow: $white-NeonEffect;
      }
      & > div.list-ingredients {
        display: grid;
        grid-template-columns: 40px 1fr;
        & > div.ingredient-item {
          display: contents;
          & > div.icon,
          & > div.info {
            padding: 10px;
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
}
</style>
