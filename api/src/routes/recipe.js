const axios = require("axios");
const { API_KEY, URL } = process.env;
require('dotenv').config()
const { Recipe, Diet } = require("../db.js");

const getApiRecipes = async function () {
  let allRecipe = await axios.get(`${URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

  let recipes = await allRecipe.data.results.map(e =>{
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      healthScore: e.healthScore,
      summary: e.summary,
      diets: e.diets,
      steps: e.analyzed[0]?.steps.map(e => {
        return {
          number: e.number,
          step: e.step
        }
      })
    }
  })
  return recipes
}

const getDbRecipes = async function () {
  let recipeDb = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })
  return recipeDb
}

const getApiRecipesId = async function (idRecipe) {
  return await axios.get(`${URL}/recipes/${parseInt(idRecipe)}/information?apiKey=${API_KEY}`)
}

const getDbRecipesId = async function (id) {
  let dbRecipesId = await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
  return dbRecipesId
}

const getAllRecipes = async function () {
  const apiRecipes = await getApiRecipes
  const dbRecipes = await getDbRecipes
  let recipes =[]
  if(apiRecipes) recipes = recipes.concat(apiRecipes)
  if(dbRecipes) recipes = recipes.concat(dbRecipes);
  return recipes
}

module.exports = {
  getApiRecipes,
  getDbRecipes,
  getApiRecipesId,
  getDbRecipesId,
  getAllRecipes,
}
