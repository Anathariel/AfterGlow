const API_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

const fetchData = async (path) => {
  const url = `${API_BASE_URL}${path}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.drinks) {
      console.log("No drinks data found.");
      return null;
    }

    return data;
  } catch (error) {
    console.error(`An error occurred fetching data from ${url}:`, error);
    return null;
  }
};

const searchCocktailsByName = async (name) => {
  return await fetchData(`/search.php?s=${name}`);
};

const searchCocktailsByIngredient = async (ingredient) => {
  return await fetchData(`/filter.php?i=${ingredient}`);
};

const searchCocktailsByCategory = async (categories) => {
  return await fetchData(`/filter.php?c=${categories}`);
};

const searchCocktailsByAlcoholic = async () => {
  return await fetchData(`/filter.php?a=Alcoholic`);
};

const searchCocktailsByNonAlcoholic = async () => {
  return await fetchData(`/filter.php?a=Non_Alcoholic`);
};

const getCategories = async () => {
  return await fetchData(`/list.php?c=list`);
};

const singleCocktailView = async (id) => {
  const data = await fetchData(`/lookup.php?i=${id}`);
  return data;
};

const getRandomCocktail = async () => {
  const data = await fetchData("/random.php");
  return data;
};

export {
  searchCocktailsByName,
  searchCocktailsByIngredient,
  searchCocktailsByCategory,
  searchCocktailsByAlcoholic,
  searchCocktailsByNonAlcoholic,
  singleCocktailView,
  getRandomCocktail,
  getCategories,
};
