import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchAllMeals = async () => {
  const res = await axios.get(`${BASE_URL}/search.php?s=`);
  return res.data.meals;
};

export const fetchMealById = async (id) => {
  const res = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  return res.data.meals[0];
};

export const fetchCategories = async () => {
  const res = await axios.get(`${BASE_URL}/list.php?c=list`);
  return res.data.meals;
};
