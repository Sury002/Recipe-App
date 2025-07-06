import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setRecipe(data.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-primary-light"></div>
      </div>
    );

  if (!recipe)
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Recipe not found
        </h2>
        <Link
          to="/"
          className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:w-1/2">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {recipe.strMeal}
                  </h1>
                  <div className="flex gap-4 mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {recipe.strCategory}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {recipe.strArea}
                    </span>
                  </div>
                </div>
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back
                </Link>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b pb-2">
                  Ingredients
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ingredients.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center bg-gray-50 dark:bg-gray-700 p-2 rounded"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {item.ingredient}
                      </span>
                      {item.measure && (
                        <span className="ml-2 text-gray-500 dark:text-gray-400">
                          ({item.measure.trim()})
                        </span>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Instructions
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              {recipe.strInstructions.split("\n").map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-gray-700 dark:text-gray-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {recipe.strYoutube && (
            <div className="p-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Video Tutorial
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={recipe.strYoutube.replace("watch?v=", "embed/")}
                  title="YouTube video"
                  allowFullScreen
                  className="w-full h-96 rounded-lg shadow"
                ></iframe>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
