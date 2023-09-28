<template>
  <div>
    <!-- Search Bar -->
    <AppSearchbar @search="searchCocktails" />

    <!-- Category Links -->
    <div>
      <h2>Categories</h2>
      <router-link
        v-for="category in categories"
        :key="category.strCategory"
        :to="{ name: 'CatalogueView', query: { filter: category.strCategory } }"
      >
        {{ category.strCategory }}
      </router-link>
    </div>

    <!-- Display Cocktails -->
    <div v-if="loading">Loading...</div>
    <div v-else>
      <CocktailCard
        v-for="cocktail in unifiedDrinks"
        :key="cocktail.idDrink"
        :strDrink="cocktail.strDrink"
        :strDrinkThumb="cocktail.strDrinkThumb"
        :idDrink="cocktail.idDrink"
      />
    </div>
  </div>
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
