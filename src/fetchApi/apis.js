export const callMealApi = async (endpoint) => {
  const URL = `www.themealdb.com/api/json/v1/1/${endpoint}`;
  const data = await fetch(URL);
  const response = await data.json();
  return response;
};

export const callCockTailApi = async (endpoint) => {
  const URL = `www.thecocktaildb.com/api/json/v1/1/${endpoint}`;
  const data = await fetch(URL);
  const response = await data.json();
  return response;
};
