import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import IngredientFilter from "../components/IngredientFilter";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let url = "";

      if (selectedIngredient) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`;
      } else {
        url =
          searchTerm.trim() !== ""
            ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
            : `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        let filtered = data.meals || [];

        if (!selectedIngredient && selectedCategory !== "") {
          filtered = filtered.filter(
            (meal) => meal.strCategory === selectedCategory
          );
        }

        setRecipes(filtered);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedCategory, selectedIngredient]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-2 dark:text-primary-light">
            Recipe Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover delicious recipes from around the world
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FilterBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <IngredientFilter
                selectedIngredient={selectedIngredient}
                setSelectedIngredient={setSelectedIngredient}
              />
            </div>
          </div>

          {(selectedCategory || selectedIngredient) && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                setSelectedCategory("");
                setSelectedIngredient("");
              }}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Clear Filters
            </motion.button>
          )}
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-primary-light"></div>
          </div>
        ) : recipes.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.idMeal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                layout
              >
                <RecipeCard recipe={recipe} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
