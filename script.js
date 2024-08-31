document.getElementById('recipe-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('recipe-name').value;
  const ingredients = document.getElementById('recipe-ingredients').value;
  const image = document.getElementById('recipe-image').files[0];

  const reader = new FileReader();
  reader.onload = function() {
      const recipe = {
          name,
          ingredients,
          image: reader.result
      };

      let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
      recipes.push(recipe);
      localStorage.setItem('recipes', JSON.stringify(recipes));

      displayRecipes();
  };
  reader.readAsDataURL(image);

  document.getElementById('recipe-form').reset();
});

function displayRecipes() {
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const recipesContainer = document.getElementById('recipes');
  recipesContainer.innerHTML = '';

  recipes.forEach(recipe => {
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe');

      const recipeImg = document.createElement('img');
      recipeImg.src = recipe.image;
      recipeDiv.appendChild(recipeImg);

      const recipeName = document.createElement('h2');
      recipeName.textContent = recipe.name;
      recipeDiv.appendChild(recipeName);

      const recipeIngredients = document.createElement('p');
      recipeIngredients.textContent = recipe.ingredients;
      recipeDiv.appendChild(recipeIngredients);

      recipesContainer.appendChild(recipeDiv);
  });
}

document.addEventListener('DOMContentLoaded', displayRecipes);

