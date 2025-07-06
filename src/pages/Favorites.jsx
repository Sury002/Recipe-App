import { useEffect, useState } from "react";
import { getFavoriteRecipes } from "../utils/localStorageUtils";
import RecipeCard from "../components/RecipeCard";
import { motion } from "framer-motion";

export default function Favorites() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteIds = getFavoriteRecipes();

      const promises = favoriteIds.map((id) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        ).then((res) => res.json())
      );

      const results = await Promise.all(promises);
      const meals = results.map((r) => r.meals[0]);
      setRecipes(meals);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-primary mb-2 dark:text-primary-light"
          >
            My Favorite Recipes
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-300">
            {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} saved
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-primary-light"></div>
          </div>
        ) : recipes.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.idMeal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="w-full"
              >
                <RecipeCard recipe={recipe} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Save your favorite recipes to see them here
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
