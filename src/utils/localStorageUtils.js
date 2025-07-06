const FAVORITES_KEY = "favoriteRecipes";

export function getFavoriteRecipes() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveFavoriteRecipes(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isRecipeFavorite(id) {
  const favorites = getFavoriteRecipes();
  return favorites.includes(id);
}

export function toggleFavorite(id) {
  let favorites = getFavoriteRecipes();
  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
  } else {
    favorites.push(id);
  }
  saveFavoriteRecipes(favorites);
}
