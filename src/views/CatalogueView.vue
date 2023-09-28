<template>
  <section>
    <div class="option-search">
      <!-- Category Links -->
      <h2>Categories</h2>
      <div class="cocktail-category-container">
        <router-link
          v-for="category in categories"
          :key="category.strCategory"
          :to="{
            name: 'CatalogueView',
            query: { filter: category.strCategory },
          }"
        >
          {{ category.strCategory }}
        </router-link>
      </div>

      <!-- Search Bar -->
      <AppSearchbar @search="searchCocktails" />
    </div>

    <div class="cocktails-container">
      <!-- Display Cocktails -->
      <CocktailCard
        v-for="cocktail in unifiedDrinks"
        :key="cocktail.idDrink"
        :strDrink="cocktail.strDrink"
        :strDrinkThumb="cocktail.strDrinkThumb"
        :idDrink="cocktail.idDrink"
      />
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
  getCategories,
} from "@/services/cocktailDb";
import CocktailCard from "@/components/CocktailCard.vue";
import AppSearchbar from "@/components/AppSearchbar.vue";

export default {
  components: {
    CocktailCard,
    AppSearchbar,
  },
  data() {
    return {
      unifiedDrinks: [],
      categories: [],
      loading: false,
    };
  },
  methods: {
    async searchCocktails(searchTerm) {
      this.loading = true;
      const [dataByName, dataByIngredient, dataByCategory] = await Promise.all([
        searchCocktailsByName(searchTerm),
        searchCocktailsByIngredient(searchTerm),
        searchCocktailsByCategory(searchTerm),
      ]);

      this.unifiedDrinks = [
        ...(dataByName?.drinks || []),
        ...(dataByIngredient?.drinks || []),
        ...(dataByCategory?.drinks || []),
      ];
      this.loading = false;
    },
    async fetchCocktailsByFilter() {
      this.loading = true;
      const filter = this.$route.query.filter;
      let data;

      switch (filter) {
        case "alcoholic":
          data = await searchCocktailsByAlcoholic();
          break;
        case "non-alcoholic":
          data = await searchCocktailsByNonAlcoholic();
          break;
        default:
          data = await searchCocktailsByCategory(filter);
          break;
      }

      this.unifiedDrinks = data?.drinks || [];
      this.loading = false;
    },
    async fetchCategories() {
      const data = await getCategories();
      this.categories = data?.drinks || [];
    },
  },
  watch: {
    "$route.query.filter": "fetchCocktailsByFilter",
  },
  mounted() {
    this.fetchCocktailsByFilter();
    this.fetchCategories();
  },
};
</script>

<style scoped lang="scss">
section {
  margin: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 50px;
}
@import "@/assets/scss/_variables.scss";
div.option-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 25px 50px;
  border: 1px solid $accent-Purpleish;
  box-shadow: $purpleish-NeonEffect;
  border-radius: $radius-15;
  & > div.cocktail-category-container {
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
    & > a {
      white-space: nowrap;
      font-size: 1.2rem;
      line-height: 1.7rem;
      color: $accent-NeonPink;
      text-shadow: $pink-NeonEffect;
      &:hover {
        color: $accent-Purpleish;
        text-shadow: $purpleish-NeonEffect;
      }
    }
  }
}
div.cocktails-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
