const { Router } = require("express");
require("dotenv").config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
const {
  getAllRecipes,
  getApiRecipesId,
  getDbRecipesId,
} = require("./recipe.js");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", async function (req, res) {
  try {
    let { name } = req.query;
    const recipes = await getAllRecipes();
    if (name) {
      let fil;
    }
  } catch (error) {
    return res.status(404).json(error.messsage);
  }
});

module.exports = router;
