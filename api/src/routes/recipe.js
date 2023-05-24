const axios = require("axios");
const { API_KEY } = process.env;
require("dotenv").config();
const { Recipe, Diet } = require("../db.js");

const getApiRecipes = async () => {
  let allRecipe = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  let recipes = await allRecipe.data.results.map((e) => {
    return {
      id: e.id,
      name: e.title,
      image: e.image,
      healthScore: e.healthScore,
      summary: e.summary,
      diets: e.diets,
      steps: e.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
    };
  });
  return recipes;
};

const getDbRecipes = async () => {
  let recipeDb = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return recipeDb;
};

const getApiRecipesId = async (idRecipe) => {
  return await axios.get(
    `https://api.spoonacular.com/recipes/${parseInt(
      idRecipe
    )}/information?apiKey=${API_KEY}`
  );
};

const getDbRecipesId = async function (id) {
  let dbRecipesId = await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dbRecipesId;
};

const getAllRecipes = async () => {
  try {
    const apiRecipes = await getApiRecipes();
    const dbRecipes = await getDbRecipes();
    const infoTotal = apiRecipes.concat(dbRecipes);
    return infoTotal;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getApiRecipes,
  getDbRecipes,
  getApiRecipesId,
  getDbRecipesId,
  getAllRecipes,
};
