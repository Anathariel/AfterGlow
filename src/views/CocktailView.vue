<template>
  <div class="cocktail-details">
    <h1>{{ cocktail.strDrink }}</h1>
    <p>{{ cocktail.strTags }}</p>
    <p>{{ cocktail.strCategory }}</p>
    <p>{{ cocktail.strIBA }}</p>
    <p>{{ cocktail.strInstructions }}</p>
  </div>
</template>

<script>
import { singleCocktailView } from "@/services/cocktailDb.js";

export default {
  name: "CocktailView",
  props: ["id"],
  data() {
    return {
      cocktail: {},
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const cocktailData = await singleCocktailView(id);
    this.cocktail = cocktailData.drinks[0];
  },
};
</script>
