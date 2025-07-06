import { useEffect, useState } from "react";

export default function IngredientFilter({
  selectedIngredient,
  setSelectedIngredient,
}) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) => res.json())
      .then((data) => {
        const topIngredients = data.meals.slice(0, 50);
        setIngredients(topIngredients);
      });
  }, []);

  return (
    <div className="mb-6">
      <select
        value={selectedIngredient}
        onChange={(e) => setSelectedIngredient(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">Filter by Ingredient</option>
        {ingredients.map((ing, index) => (
          <option key={index} value={ing.strIngredient}>
            {ing.strIngredient}
          </option>
        ))}
      </select>
    </div>
  );
}
