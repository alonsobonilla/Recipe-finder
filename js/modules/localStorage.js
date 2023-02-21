import { recipesContainer } from "./selectors.js";
import { showRecipes } from "./functions.js";

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

function getFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];
    if(favorites.length) {
        showRecipes(favorites);
    } else {
        const not = document.createElement('P');
        not.textContent = 'There isn\'t favorites';
        not.classList.add('fs-4','text-center','font-bold','mt-5');
        recipesContainer.appendChild(not);
    }
}
export {addFavorite, existRecipe, deleteFavorite, getFavorites};