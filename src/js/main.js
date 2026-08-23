/**
 * NutriPlan - Main Entry Point
 *
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

import {
  getApi,
  allAreas,
  allCategories,
  getByarea,
  getByCategory,
  getById,
  getProduct,
  getProductByBarcode,
} from "./api/mealdb.js";

// getApi();

// allAreas();
// allCategories();

const loading = document.getElementById("app-loading-overlay");
const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("section");
const searchInput = document.getElementById("search-input");
const searchFiltersSection = document.getElementById("search-filters-section");
const mealCategoriesSection = document.getElementById(
  "meal-categories-section",
);
const allRecipesSection = document.getElementById("all-recipes-section");
const mealDetails = document.getElementById("meal-details");
const productsSection = document.getElementById("products-section");
const foodlogSection = document.getElementById("foodlog-section");
const recipesGrid = document.getElementById("recipes-grid");
const categoriesGrid = document.getElementById("categories-grid");
const mealDetailSection = document.getElementById("meal-details");
const mealDetailsHeroSection = document.getElementById(
  "meal-details-hero-section",
);
const instructions = document.getElementById("instructions");
const ingredients = document.getElementById("ingredients");
const logMealBtn = document.getElementById("log-meal-btn");
const nutritionFactsContainer = document.getElementById(
  "nutrition-facts-container",
);

const productSearchInput = document.getElementById("product-search-input");
const productSearchBtn = document.getElementById("search-product-btn");
const barcodeInput = document.getElementById("barcode-input");
const lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
const productGrid = document.getElementById("products-grid");

let currentArea = ``;
let currentId = "";

//Start Handel SideBar And Links
window.addEventListener("load", () => {
  sections.forEach((section) => section.classList.add("hidden"));

  searchFiltersSection.classList.remove("hidden");
  mealCategoriesSection.classList.remove("hidden");
  allRecipesSection.classList.remove("hidden");
});

navLinks.forEach((link) => {
  if (link.id === "meals") {
    link.addEventListener("click", () => {
      sections.forEach((section) => section.classList.add("hidden"));

      searchFiltersSection.classList.remove("hidden");
      mealCategoriesSection.classList.remove("hidden");
      allRecipesSection.classList.remove("hidden");
    });
  } else if (link.id === "product") {
    link.addEventListener("click", () => {
      sections.forEach((section) => section.classList.add("hidden"));

      productsSection.classList.remove("hidden");
    });
  } else if (link.id === "food") {
    link.addEventListener("click", () => {
      sections.forEach((section) => section.classList.add("hidden"));
      foodlogSection.classList.remove("hidden");
    });
  }
});

//End  Handel SideBar And Links

allAreas().then((data) => {
  if (data.error) {
    recipesGrid.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-exclamation" data-prefix="fas" data-icon="circle-exclamation" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-192a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.6 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"></path></svg></i>
            </div>
            <p class="text-gray-500 text-lg">Failed to load recipe details. Please try again.</p>
        </div>`;
  } else {
    dispalyAllAreas(data);
  }
});

getApi().then((data) => {
  if (data.error) {
    recipesGrid.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-exclamation" data-prefix="fas" data-icon="circle-exclamation" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-192a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.6 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"></path></svg></i>
            </div>
            <p class="text-gray-500 text-lg">Failed to load recipe details. Please try again.</p>
        </div>`;
  } else {
    allRecipes(data.results);
  }
});
// Search
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  console.log(query);

  if (query.length === 0) {
    getApi("chicken").then((data) => {
      allRecipes(data.results);
    });
    return;
  }

  getApi(query).then((data) => {
    allRecipes(data.results);
  });
});

function dispalyAllAreas(data) {
  let areas = `   <button
              class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all"
            >
              All Recipes
            </button>`;
  for (let index = 0; index < data.results.length; index++) {
    let info = data.results[index];

    areas += `
     <button
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            >
              ${info.name}
            </button>
    `;
  }
  document.getElementById("areas").innerHTML = areas;

  const buttons = document.querySelectorAll("#areas button");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const area = btn.textContent.trim() || "All Recipes";
      console.log("Clicked area:", area);
      currentArea = area;

      if (area !== "All Recipes") {
        getByarea(currentArea).then((data) => {
          allRecipes(data.results);
        });
      } else {
        console.log("Show all recipes");
        getApi().then((data) => {
          allRecipes(data.results);
        });
      }
    });
  });
}

function allRecipes(data) {
  let recipes = ``;
  for (let index = 0; index < data.length; index++) {
    recipes += `<div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="${data[index].id}">
              <div class="relative h-48 overflow-hidden">
                <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${data[index].thumbnail}" alt="Teriyaki Chicken Casserole" loading="lazy">
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                    ${data[index].category}
                  </span>
                  <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                    ${data[index].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  ${data[index].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${data[index].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="mr-1 text-emerald-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils" data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"></path></svg></i>
                    ${data[index].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="mr-1 text-blue-500" data-fa-i2svg=""><svg class="svg-inline--fa fa-globe" data-prefix="fas" data-icon="globe" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"></path></svg></i>
                    ${data[index].area}
                  </span>
                </div>
              </div>
            </div>`;
  }
  recipesGrid.innerHTML = recipes;
  document.getElementById("recipes-count").textContent =
    `Showing ${data.length} ${currentArea} recipes`;

  const recipeCard = document.querySelectorAll(".recipe-card");
  recipeCard.forEach((card) => {
    card.addEventListener("click", () => {
      const target = card.dataset.mealId;
      currentId = target;

      sections.forEach((section) => section.classList.add("hidden"));
      mealDetailSection.classList.remove("hidden");

      getById(currentId).then((data) => {
        console.log("mealData:", data);

        const mealData = data.result;

        getMealDetails(mealData);
      });
    });
  });
}

function dispalyAllCategories(data) {
  let category = ``;
  for (let index = 0; index < data.results.length - 2; index++) {
    let info = data.results[index];

    category += `
      <div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${data.results[index].name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${data.results[index].name}</h3>
                </div>
              </div>
            </div>
    `;
  }
  categoriesGrid.innerHTML = category;

  const buttons = document.querySelectorAll(".category-card");

  buttons.forEach((btn) => {
    // console.log(btn.dataset.category);
    btn.addEventListener("click", () => {
      const category = btn.dataset.category || "Chicken";
      console.log("Clicked area:", category);

      if (category !== "Chicken") {
        const currentCategory = category;
        getByCategory(currentCategory).then((data) => {
          allRecipes(data.results);
        });
      } else {
        console.log("hhhh");
      }
    });
  });

  //   buttons.forEach((btn) => {
  //     btn.addEventListener("click", () => {
  //       const category = btn.dataset.category || "Chicken";
  //       console.log("Clicked area:", category);
  //       currentCategory = category;

  //       if (category !== "Chicken") {
  //         getByCategory(currentArea).then((data) => {
  //           allRecipes(data.results);
  //         });
  //       } else {
  //         console.log("Show all recipes");
  //         getApi().then((data) => {
  //           allRecipes(data.results);
  //         });
  //       }
  //     });
  //   });
}

function getMealDetails(meal) {
  // Hero
  mealDetailsHeroSection.innerHTML = `
    <div class="relative h-80 md:h-96">
              <img
                src="${meal.thumbnail}"
                alt="${meal.name}"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${meal.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${meal.area}</span
                  >
                  <span
                    class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full"
                    >Casserole</span
                  >
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${meal.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">485 cal/serving</span>
                  </span>
                </div>
              </div>
            </div>
    `;

  // instructions
  let cartonaInstructions = ``;

  for (let index = 0; index < meal.instructions.length; index++) {
    cartonaInstructions += `
    <div
                      class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div
                        class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                      >
                        ${index + 1}
                      </div>
                      <p class="text-gray-700 leading-relaxed pt-2">
                        ${meal.instructions[index]}
                      </p>
                    </div>
    `;
  }
  instructions.innerHTML = cartonaInstructions;

  // Ingredients
  let cartonaIngredients = ``;
  document.getElementById("ingredients-counts").innerHTML =
    `${meal.ingredients.length} items`;
  document.querySelector("iframe").setAttribute("src", `${meal.youtube}`);
  console.log(meal.youtube);

  for (let index = 0; index < meal.ingredients.length; index++) {
    cartonaIngredients += `
 <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900"> ${meal.ingredients[index].measure}
                    </span>${meal.ingredients[index].ingredient}
                  </div>
    `;
  }
  ingredients.innerHTML = cartonaIngredients;

  // Log Meal Btn
  logMealBtn.addEventListener("click", () => {
    const mealToLog = {
      id: meal.id,
      name: meal.name,
      thumbnail: meal.thumbnail,
      calories: meal.calories || 420,
      protein: meal.protein || 28,
      carbs: meal.carbs || 45,
      fats: meal.fats || 12,
      date: new Date().toLocaleDateString(),
    };

    saveMealToStorage(mealToLog);
  });

  function saveMealToStorage(item) {
    let currentLog = JSON.parse(localStorage.getItem("nutriPlanLog")) || [];

    currentLog.push(item);

    localStorage.setItem("nutriPlanLog", JSON.stringify(currentLog));

    alert(`Added ${item.name} to Log!`);
  }

  //   Back Link
  document.getElementById("back-to-meals-btn").addEventListener("click", () => {
    mealDetailSection.classList.add("hidden");
    searchFiltersSection.classList.remove("hidden");
    mealCategoriesSection.classList.remove("hidden");
    allRecipesSection.classList.remove("hidden");
  });

  //   nutritionFacts Section
  //   getProduct().then((data) => {
  //     nutritionFacts(data);
  //   });
}

// function nutritionFacts(data) {
//   let cartona = ``;
//   let info = data.results[3];
//   console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", info);
//   for (let index = 0; index < data.length; index++) {
//     let item = data;

//     console.log(item);
//     console.log("nutritionFacts", item);

//     cartona += `
//     fffffffffffffffff
//         <p class="text-sm text-gray-500 mb-4">Per serving</p>

//                   <div
//                     class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
//                   >
//                     <p class="text-sm text-gray-600">Calories per serving</p>
//                     <p class="text-4xl font-bold text-emerald-600">485</p>
//                     <p class="text-xs text-gray-500 mt-1">Total: 1940 cal</p>
//                   </div>

//                   <div class="space-y-4">
//                     <div class="flex items-center justify-between">
//                       <div class="flex items-center gap-2">
//                         <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
//                         <span class="text-gray-700">Protein</span>
//                       </div>
//                       <span class="font-bold text-gray-900">42g</span>
//                     </div>
//                     <div class="w-full bg-gray-100 rounded-full h-2">
//                       <div
//                         class="bg-emerald-500 h-2 rounded-full"
//                         style="width: 84%"
//                       ></div>
//                     </div>

//                     <div class="flex items-center justify-between">
//                       <div class="flex items-center gap-2">
//                         <div class="w-3 h-3 rounded-full bg-blue-500"></div>
//                         <span class="text-gray-700">Carbs</span>
//                       </div>
//                       <span class="font-bold text-gray-900">52g</span>
//                     </div>
//                     <div class="w-full bg-gray-100 rounded-full h-2">
//                       <div
//                         class="bg-blue-500 h-2 rounded-full"
//                         style="width: 17%"
//                       ></div>
//                     </div>

//                     <div class="flex items-center justify-between">
//                       <div class="flex items-center gap-2">
//                         <div class="w-3 h-3 rounded-full bg-purple-500"></div>
//                         <span class="text-gray-700">Fat</span>
//                       </div>
//                       <span class="font-bold text-gray-900">8g</span>
//                     </div>
//                     <div class="w-full bg-gray-100 rounded-full h-2">
//                       <div
//                         class="bg-purple-500 h-2 rounded-full"
//                         style="width: 12%"
//                       ></div>
//                     </div>

//                     <div class="flex items-center justify-between">
//                       <div class="flex items-center gap-2">
//                         <div class="w-3 h-3 rounded-full bg-orange-500"></div>
//                         <span class="text-gray-700">Fiber</span>
//                       </div>
//                       <span class="font-bold text-gray-900">4g</span>
//                     </div>
//                     <div class="w-full bg-gray-100 rounded-full h-2">
//                       <div
//                         class="bg-orange-500 h-2 rounded-full"
//                         style="width: 14%"
//                       ></div>
//                     </div>

//                     <div class="flex items-center justify-between">
//                       <div class="flex items-center gap-2">
//                         <div class="w-3 h-3 rounded-full bg-pink-500"></div>
//                         <span class="text-gray-700">Sugar</span>
//                       </div>
//                       <span class="font-bold text-gray-900">12g</span>
//                     </div>
//                     <div class="w-full bg-gray-100 rounded-full h-2">
//                       <div
//                         class="bg-pink-500 h-2 rounded-full"
//                         style="width: 24%"
//                       ></div>
//                     </div>
//                   </div>

//                   <div class="mt-6 pt-6 border-t border-gray-100">
//                     <h3 class="text-sm font-semibold text-gray-900 mb-3">
//                       Vitamins & Minerals (% Daily Value)
//                     </h3>
//                     <div class="grid grid-cols-2 gap-3 text-sm">
//                       <div class="flex justify-between">
//                         <span class="text-gray-600">Vitamin A</span>
//                         <span class="font-medium">15%</span>
//                       </div>
//                       <div class="flex justify-between">
//                         <span class="text-gray-600">Vitamin C</span>
//                         <span class="font-medium">25%</span>
//                       </div>
//                       <div class="flex justify-between">
//                         <span class="text-gray-600">Calcium</span>
//                         <span class="font-medium">4%</span>
//                       </div>
//                       <div class="flex justify-between">
//                         <span class="text-gray-600">Iron</span>
//                         <span class="font-medium">12%</span>
//                       </div>
//                     </div>
//                   </div>
//         `;
//   }

//   console.log(cartona);
//   nutritionFactsContainer.innerHTML = cartona;
// }

allCategories().then((data) => {
  dispalyAllCategories(data);
});

//////////////////////////////////Product

productSearchBtn.addEventListener("click", () => {
  console.log(productSearchInput.value);
  const query = productSearchInput.value.trim();
  console.log(query);

  if (query.length === 0) {
    getProduct("nutella").then((data) => {
      allProduct(data.results);
    });
    return;
  }

  getProduct(query).then((data) => {
    allProduct(data.results);
  });
});

function allProduct(data) {
  let product = ``;
  for (let index = 0; index < data.length; index++) {
    product += `
     <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${data[index].image}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score A
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    2
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${data[index].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                   ${data[index].name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>350 kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${Number(data[index].nutrients.protein).toFixed(2)}</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${Number(data[index].nutrients.carbs).toFixed(2)}</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${Number(data[index].nutrients.fat).toFixed(2)}</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${Number(data[index].nutrients.sugar).toFixed(2)}</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>

              
    
    
    
   `;
  }
  productGrid.innerHTML = product;
  //   document.getElementById("products-count").textContent =
  //     ` Found ${data.length} products for  " ${data[0].brand} "`;

  //
}

lookupBarcodeBtn.addEventListener("click", () => {
  console.log(barcodeInput.value);
  const query = barcodeInput.value.trim();
  console.log(query);

  //   if (query.length === 0) {
  //     getProductByBarcode("nutella").then((data) => {
  //       allProduct(data.results);
  //     });
  //     return;
  //   }

  getProductByBarcode(query).then((data) => {
    allProductBarcode(data);
  });
});

function allProductBarcode(data) {
  const info = data.result;

  console.log(info);
  let product = ``;
  product += `
     <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${info.barcode}"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${info.image}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score A
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    2
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${info.brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                   ${info.name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>350 kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${info.nutrients.protein}</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${info.nutrients.carbs}</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${info.nutrients.fat}</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${info.nutrients.sugar}</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>

              
    
    
    
   `;
  productGrid.innerHTML = product;
  //   document.getElementById("products-count").textContent =
  //     ` Found ${data.length} products for  " ${data[0].brand} "`;

  //
}
