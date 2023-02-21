import { listCategories, modal, recipesContainer } from "./selectors.js";
import { getRecipeInfo } from "./fetch.js";
import { addFavorite, existRecipe, deleteFavorite } from "./localStorage.js"

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
        recipeContent.classList.add('col-md-4', 'justify-content-center');

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
    const modalFooter = document.querySelector('.modal-footer');

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
    modalBody.appendChild(listGroup);

    cleanHtml(modalFooter);
    const btnFavorito = document.createElement('BUTTON');
    btnFavorito.classList.add('btn','btn-danger','col');
    btnFavorito.textContent = existRecipe(idMeal) ? 'Delete Favorite' : 'Add Favorite';
    btnFavorito.onclick = function() {
        if(!existRecipe(idMeal)) {
            addFavorite({
                idMeal,
                strMealThumb,
                strMeal
            });
            btnFavorito.textContent = 'Delete Favorite';
            showToast('Added Recipe');
            return;
        } 
        deleteFavorite(idMeal);
        btnFavorito.textContent = 'Add Favorite';
        showToast('Deleted Recipe');
    }

    const btnCerrar = document.createElement('BUTTON');
    btnCerrar.classList.add('btn','btn-secondary','col');
    btnCerrar.textContent = 'Close';
    btnCerrar.onclick = function() {
        modal.hide();
    }
    modalFooter.appendChild(btnFavorito);
    modalFooter.appendChild(btnCerrar);
    modal.show();

}

function cleanHtml(nodo) {
    while(nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }
}

function iterator(texto, recipeInfo) {
    const result = [];
    for(let i=1; i<=20; i++) {
        const content = recipeInfo[`${texto}${i}`];
        if(content !== '' && content !== null){
            result.push(content);
        }
    }
    return result;
}

function showToast(message) {
    const toastDiv = document.querySelector('#toast');
    const toastBody = document.querySelector('.toast-body');
    const toast = new bootstrap.Toast(toastDiv);
    toastBody.textContent = message;
    toast.show();
}
export { showRecipeInfo, showRecipes, showCategories }