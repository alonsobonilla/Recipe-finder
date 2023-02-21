import { listCategories } from "./modules/selectors.js";
import { getCategories, getRecipes } from "./modules/fetch.js";
//Main event
document.addEventListener('DOMContentLoaded', initApp);
//Events
listCategories.addEventListener('change', getRecipes);

//Main function
function initApp() {
    getCategories();
}