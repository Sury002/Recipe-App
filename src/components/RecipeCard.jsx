import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { isRecipeFavorite, toggleFavorite } from "../utils/localStorageUtils";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

export default function RecipeCard({ recipe }) {
  const [isFav, setIsFav] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsFav(isRecipeFavorite(recipe.idMeal));
  }, [recipe.idMeal]);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe.idMeal);
    setIsFav(!isFav);
  };

  return (
    <Link
      to={`/recipe/${recipe.idMeal}`}
      className="block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="relative">
          <img
            src={recipe.strMealThumb || "/placeholder-recipe.jpg"}
            alt={recipe.strMeal}
            className="w-full h-48 sm:h-56 object-cover"
            onError={(e) => {
              e.target.src = "/placeholder-recipe.jpg";
            }}
          />
          <button
            onClick={handleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-200 ${
              isFav
                ? "bg-red-500 text-white"
                : "bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-white"
            } ${isHovered ? "opacity-100" : "opacity-90"}`}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? (
              <HeartSolid className="h-5 w-5" />
            ) : (
              <HeartOutline className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="p-4 flex-grow">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
            {recipe.strMeal}
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {recipe.strCategory}
            </span>
            {recipe.strArea && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {recipe.strArea}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
