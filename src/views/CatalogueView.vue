<template>
  <section>
    <div class="option-search">
      <!-- Category Links -->
      <div class="cocktail-category-container">
        <router-link
          v-for="category in categories"
          :key="category.strCategory"
          :to="`/catalogue?filter=category:${category.strCategory}`"
        >
          {{ category.strCategory }}
        </router-link>
      </div>
      <!-- Search Bar -->
      <AppSearchbar @search="performSearch" />
    </div>

    <!-- Search Results or Ingredients List -->
    <div class="search-container">
      <template v-if="isIngredientsQuery">
        <h2>Ingredients</h2>
        <div class="ingredient-list">
          <router-link
            v-for="ingredient in ingredients"
            :key="ingredient"
            :to="`/catalogue?filter=ingredient:${ingredient}`"
            @click="searchByIngredient(ingredient)"
          >
            <figure class="ingredient-item">
              <img
                :src="`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`"
                :alt="`${ingredient} image`"
              />
              <figcaption>
                {{ ingredient }}
              </figcaption>
            </figure>
          </router-link>
        </div>
      </template>
      <template v-else>
        <CocktailCard
          v-for="cocktail in cocktails"
          :key="cocktail.idDrink"
          :strDrink="cocktail.strDrink"
          :strDrinkThumb="cocktail.strDrinkThumb"
          :idDrink="cocktail.idDrink"
        />
      </template>
    </div>
  </section>
</template>

<script>
import {
  searchCocktailsByName,
  searchCocktailsByIngredient,
  searchCocktailsByCategory,
  searchCocktailsByAlcoholic,
  searchCocktailsByNonAlcoholic,
  searchCocktailsByOptionalAlcohol,
  getCategories,
  getIngredientsList,
} from "@/services/cocktailDb";
import debounce from "lodash.debounce";
import CocktailCard from "@/components/CocktailCard.vue";
import AppSearchbar from "@/components/AppSearchbar.vue";

export default {
  components: {
    CocktailCard,
    AppSearchbar,
  },
  data() {
    return {
      cocktails: [],
      categories: [],
      loading: false,
      searchTerm: "",
      ingredients: [],
    };
  },
  computed: {
    isIngredientsQuery() {
      return this.$route.query.filter === "ingredient";
    },
  },
  methods: {
    performSearch: debounce(async function (searchTerm) {
      this.searchTerm = searchTerm;
      this.loading = true;

      if (!this.searchTerm) {
        // Default behavior (fetch cocktails by name)
        const data = await searchCocktailsByName("A");
        this.cocktails = data?.drinks || [];
      } else if (this.searchTerm.toLowerCase().startsWith("category:")) {
        // Handle category search
        const category = this.searchTerm.replace("category:", "");
        const data = await searchCocktailsByCategory(category);
        this.cocktails = data?.drinks || [];
      } else if (this.searchTerm.toLowerCase() === "alcoholic") {
        const data = await searchCocktailsByAlcoholic();
        this.cocktails = data?.drinks || [];
      } else if (this.searchTerm.toLowerCase() === "non-alcoholic") {
        const data = await searchCocktailsByNonAlcoholic();
        this.cocktails = data?.drinks || [];
      } else if (this.searchTerm.toLowerCase() === "optional-alcohol") {
        const data = await searchCocktailsByOptionalAlcohol();
        this.cocktails = data?.drinks || [];
      } else if (this.$route.query.filter === "ingredient") {
        // Fetch ingredients when the filter is "ingredient"
        const data = await getIngredientsList();
        if (data && data.drinks) {
          this.ingredients = data.drinks.map((drink) => drink.strIngredient1);
        } else {
          this.ingredients = [];
        }
      } else {
        // Assume it's a search by name if no specific prefix is detected
        const data = await searchCocktailsByName(this.searchTerm);
        this.cocktails = data?.drinks || [];
      }

      this.loading = false;
    }),

    async fetchCategories() {
      const data = await getCategories();
      this.categories = data?.drinks || [];
    },
    async searchByIngredient(ingredient) {
      if (this.loading) return;
      this.loading = true;
      try {
        const data = await searchCocktailsByIngredient(ingredient);
        this.cocktails = data?.drinks || [];
      } catch (error) {
        console.error("Error searching cocktails by ingredient:", error);
        this.cocktails = [];
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    "$route.query.filter": function (newFilter) {
      if (this.loading) return;
      this.searchTerm = newFilter;
      this.performSearch(newFilter);
    },
  },
  mounted() {
    if (this.loading) return;
    this.searchTerm = this.$route.query.filter || "";
    this.performSearch(this.searchTerm);
    this.fetchCategories();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";
section {
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  & > div.option-search {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    gap: 20px;
    padding: 20px;
    border: 1px solid $accent-Purpleish;
    box-shadow: $purpleish-NeonEffect;
    border-radius: $radius-15;
    & > div.cocktail-category-container {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      overflow-x: scroll;
      gap: 20px;
      width: 200px;
      padding: 20px;
      border: 1px solid $accent-Purpleish;
      box-shadow: $purpleish-NeonEffect;
      border-radius: $radius-15;
      & > a {
        white-space: nowrap;
        font-size: 1.2rem;
        line-height: 1.5rem;
        color: $accent-NeonPink;
        text-shadow: $pink-NeonEffect;
        &:hover {
          color: $accent-Purpleish;
          text-shadow: $purpleish-NeonEffect;
        }
      }
    }
  }
  & > div.search-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    & > .ingredient-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
    & > figure.ingredient-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & > figcaption {
        width: 80%;
        text-align: center;
        word-break: break-word;
      }
    }
  }
  @media screen and (min-width: 1020px) {
    & > div.option-search {
      width: 50%;
      & > div.cocktail-category-container {
        width: 80%;
      }
    }
  }
}
</style>
