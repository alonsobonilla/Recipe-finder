function addFavorite(meal) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];
    localStorage.setItem('favorites',JSON.stringify([...favorites, meal]));
}
function existRecipe(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];
    return favorites.some(favorite => favorite.idMeal === id);
}
function deleteFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];
    const newFavorites = favorites.filter(favorite => favorite.idMeal != id);
    localStorage.setItem('favorites',JSON.stringify(newFavorites));
}
export {addFavorite, existRecipe, deleteFavorite};