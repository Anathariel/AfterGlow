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
      <p class="searchbar-info">
        Type here to search by the name of a cocktail or by ingredient!
      </p>
    </div>

    <div v-if="cocktails.length" class="cocktails-container">
      <CocktailCard
        v-for="cocktail in cocktails"
        :key="cocktail.idDrink"
        :strDrink="cocktail.strDrink"
        :strDrinkThumb="cocktail.strDrinkThumb"
        :idDrink="cocktail.idDrink"
      />
    </div>
    <div v-else>
      <p>Sorry, we couldn't find anything.</p>
    </div>
  </section>
</template>

<script>
import {
  searchCocktailsByName,
  searchCocktailsByIngredient,
  searchCocktailsByCategory,
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
      cocktails: [],
      categories: [],
      loading: false,
      searchTerm: "",
    };
  },
  methods: {
    async performSearch() {
      if (this.searchTerm) {
        await this.searchCocktails(this.searchTerm);
      }
    },
    async searchCocktails(searchTerm) {
      this.loading = true;
      const [dataByName, dataByIngredient, dataByCategory] = await Promise.all([
        searchCocktailsByName(searchTerm),
        searchCocktailsByIngredient(searchTerm),
        searchCocktailsByCategory(searchTerm),
      ]);

      this.cocktails = [
        ...(dataByName?.drinks || []),
        ...(dataByIngredient?.drinks || []),
        ...(dataByCategory?.drinks || []),
      ];
      this.loading = false;
    },
    async fetchCategories() {
      const data = await getCategories();
      this.categories = data?.drinks || [];
    },
  },
  watch: {
    "$route.query.filter": function (newFilter) {
      this.searchTerm = newFilter;
      this.performSearch();
    },
  },
  mounted() {
    this.searchTerm = this.$route.query.filter || "";
    this.performSearch();
    this.fetchCategories();
  },
};
</script>

<style scoped lang="scss">
section {
  margin: 25px 0;
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

p.searchbar-info {
  font-size: 0.75rem;
  line-height: 1.1rem;
  width: 300px;
  text-align: center;
}
</style>
