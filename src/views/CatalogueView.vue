<template>
  <AppSearchbar @search="(...args) => searchCocktails(...args)" />
  <h2>Cocktails</h2>
  <CocktailCard
    v-for="drink in drinksByName"
    :key="drink.idDrink"
    :strDrink="drink.strDrink"
    :strDrinkThumb="drink.strDrinkThumb"
    :idDrink="drink.idDrink"
  />

  <h2>Ingredients</h2>
  <CocktailCard
    v-for="drink in drinksByIngredient"
    :key="drink.idDrink"
    :strDrink="drink.strDrink"
    :strDrinkThumb="drink.strDrinkThumb"
    :idDrink="drink.idDrink"
  />

  <h2>Category</h2>

  <CocktailCard
    v-for="drink in drinksByCategory"
    :key="drink.idDrink"
    :strDrink="drink.strDrink"
    :strDrinkThumb="drink.strDrinkThumb"
    :idDrink="drink.idDrink"
  />
</template>

<script>
import AppSearchbar from "@/components/AppSearchbar.vue";
import CocktailCard from "@/components/CocktailCard.vue";
import { ref } from "vue";
import {
  searchCocktailsByName,
  searchCocktailsByIngredient,
  searchCocktailsByCategory,
} from "@/services/cocktailDb";

export default {
  components: {
    AppSearchbar,
    CocktailCard,
  },
  setup() {
    const drinks = ref([]);
    const drinksByName = ref([]);
    const drinksByIngredient = ref([]);
    const drinksByCategory = ref([]);

    const searchCocktails = async (searchTerm) => {
      console.log("Search term used:", searchTerm);

      const [dataByName, dataByIngredient, dataByCategory] = await Promise.all([
        searchCocktailsByName(searchTerm),
        searchCocktailsByIngredient(searchTerm),
        searchCocktailsByCategory(searchTerm),
      ]);

      if (dataByName && dataByName.drinks) {
        drinksByName.value = dataByName.drinks;
      }

      if (dataByIngredient && dataByIngredient.drinks) {
        drinksByIngredient.value = dataByIngredient.drinks;
      }

      if (dataByCategory && dataByCategory.drinks) {
        drinksByCategory.value = dataByCategory.drinks;
      }
    };

    return {
      drinks,
      drinksByName,
      drinksByIngredient,
      drinksByCategory,
      searchCocktails,
    };
  },
};
</script>
