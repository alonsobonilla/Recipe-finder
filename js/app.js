//Main event
document.addEventListener('DOMContentLoaded', initApp);

//Selectors
const listCategories = document.querySelector('#categorias');
const recipesContainer = document.querySelector('#resultado');
const modal = new bootstrap.Modal('#modal',{});
//Events
listCategories.addEventListener('change', getRecipes);
//Main function
function initApp() {
    getCategories();
}

//Functions
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

function showCategories(categories = []) {

    categories.forEach(category => {
        const {strCategory} = category;
        const option = document.createElement('OPTION');
        option.value = strCategory;
        option.textContent = strCategory;
        
        listCategories.appendChild(option);
    })
}

function showRecipes(recipes = []) {
    cleanHtml(recipesContainer);

    const heading = document.createElement('H2');
    heading.classList.add('text-center','text-black','my-5p');
    heading.textContent = recipes.length ? 'Results' : 'No results';
    recipesContainer.append(heading);

    recipes.forEach(recipe => {
        const { idMeal, strMeal, strMealThumb } = recipe;

        const recipeContent = document.createElement('DIV');
        recipeContent.classList.add('col-md-4');

        const recipeCard = document.createElement('DIV');
        recipeCard.classList.add('card','mb-4');
        
        const recipeImage = document.createElement('IMG');
        recipeImage.classList.add('card-img-top');
        recipeImage.alt = `Image of the recipe ${strMeal}`;
        recipeImage.src = strMealThumb;

        const recipeCardBody = document.createElement('DIV');
        recipeCardBody.classList.add('card-body');

        const recipeHeading = document.createElement('H3');
        recipeHeading.classList.add('card-title','mb-3');
        recipeHeading.textContent = strMeal;

        const recipeButton = document.createElement('BUTTON');
        recipeButton.classList.add('btn','btn-danger','w-100');
        recipeButton.textContent = 'Show Recipe';
        // recipeButton.dataset.bsTarget = "#modal";
        // recipeButton.dataset.bsToggle = "modal";
        recipeButton.onclick = function() {
            getRecipeInfo(idMeal);
        };

        recipeCardBody.append(recipeHeading);
        recipeCardBody.append(recipeButton);
        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeCardBody);
        recipeContent.append(recipeCard);
        recipesContainer.appendChild(recipeContent);
    });
}

function showRecipeInfo(recipeInfo = []) {
    const { idMeal, strInstructions, strMeal, strMealThumb } = recipeInfo;
    const ingredients = iterator('strIngredient',recipeInfo);
    const measures = iterator('strMeasure', recipeInfo);

    const modalTitle = document.querySelector('.modal .modal-title');
    const modalBody = document.querySelector('.modal .modal-body');
    

    modalTitle.textContent = strMeal;
    modalBody.innerHTML = 
    `
        <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}"/>
        <h3 class="my-3">Instructions</h3>
        <p>${strInstructions}</p>
        <h3 class="my-3">Ingredients and quantities</h3>
    `

    const listGroup = document.createElement('UL');
    listGroup.classList.add('list-group');
    for(let i=0; i<ingredients.length; i++) {
        const ingredient = document.createElement('LI');
        ingredient.classList.add('list-group-item');
        ingredient.textContent = `${ingredients[i]} - ${measures[i]}`;
        listGroup.appendChild(ingredient);
    }
    console.log(listGroup);
    modalBody.appendChild(listGroup);
    modal.show();

}

function cleanHtml(nodo) {
    while(nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }
}

function iterator(texto, recipeInfo) {
    const result = [];
    let ctr = 0;
    let content;
    do {
        ctr++;
        content = recipeInfo[`${texto}${ctr}`];
        if(content != '')
            result.push(content);
    } while (content != '');

    return result;
}
