import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CocktailView from "@/views/CocktailView.vue";
import CatalogueView from "@/views/CatalogueView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cocktail/:id",
    name: "CocktailView",
    component: CocktailView,
    props: true,
  },
  {
    path: "/catalogue",
    name: "CatalogueView",
    component: CatalogueView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
