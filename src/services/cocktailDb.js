const fetchData = async (url) => {
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
    console.error("An error occurred:", error);
    return null;
  }
};

export const searchCocktailsByName = async (name) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const data = await fetchData(url);
  return data;
};

export const searchCocktailsByIngredient = async (ingredient) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const data = await fetchData(url);
  return data;
};
