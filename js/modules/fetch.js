import { showRecipeInfo, showRecipes, showCategories } from "./functions.js";

function getCategories() {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    
    fetch(url)
        .then(answer => answer.json())
        .then(data => showCategories(data.categories))
        .catch(error => console.log(error))
}

function getRecipes(e) {
    const category = e.target.value;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    fetch(url) 
        .then(answer => answer.json())
        .then(data => showRecipes(data.meals))
        .catch(error => console.log(error))
}

function getRecipeInfo(id) {
    const url =`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(url) 
        .then(answer => answer.json())
        .then(data => showRecipeInfo(data.meals[0]))
        .catch(error => console.log(error))
}

export { getCategories, getRecipes, getRecipeInfo }