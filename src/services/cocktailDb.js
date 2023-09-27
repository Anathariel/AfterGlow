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
  const data = await fetchData(`/search.php?s=${name}`);
  return data;
};

const searchCocktailsByIngredient = async (ingredient) => {
  const data = await fetchData(`/filter.php?i=${ingredient}`);
  return data;
};

const searchCocktailsByCategory = async (categories) => {
  const data = await fetchData(`/filter.php?c=${categories}`);
  return data;
};

const searchCocktailsByAlcoholic = async () => {
  const data = await fetchData(`/filter.php?a=Alcoholic`);
  return data;
};

const searchCocktailsByNonAlcoholic = async () => {
  const data = await fetchData(`/filter.php?a=Non_Alcoholic`);
  return data;
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
};
