const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const { Recipe, Diet } = require("../db");
const { getAllRecipes, getApiId, getDataBaseId } = require("./recipe.js");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET|/recipes

router.get("/recipes", async (req, res) => {
  try {
    let { name } = req.query;
    const recipes = await getAllRecipes();
    console.log(recipes);
    if (name) {
      let filtered = recipes.filter((e) =>
        e.name.toLowerCase().includes(name.toString().toLowerCase())
      );
      console.log(filtered);
      if (name) {
        let recipe = filtered.map((e) => {
          return {
            id: e.id,
            image: e.image,
            name: e.name,
            diets:
              // typeof e.diets[0] === "string"
              //   ? e.diets
              //   : e.diets.map((e) => e.name)
              typeof e.diets[0] === "string"
                ? e.diets
                : e.diets.map((e) => e.name),
            
            healthScore: e.healthScore,
          };
        });
        return res.status(200).json(recipe);
      }
      return res.status(404).json("Recipe not found");
    } else {
      let recipe = recipes.map((e) => {
        return {
          id: e.id,
          image: e.image,
          name: e.name,
          diets:
            typeof e.diets[0] === "string"
              ? e.diets
              : e.diets.map((e) => e.name),
          
          healthScore: e.healthScore,
        };
      });
      return res.json(recipe);
    }
  } catch (error) {
    return res.status(404).json(error.messsage);
  }
});

//GET|/recipes/:idRecipes

router.get("/recipes/:id", async (req, res, next) => {
  const { id } = req.params;

  let validate = id.includes("-");
  try {
    if (validate) {
      let recipeDb = await getDataBaseId(id);
      return res.status(200).send(recipeDb);
    } else {
      let recipeApi = await getApiId(id);
      return res.status(200).send(recipeApi);
    }
  } catch (error) {
    next(error);
  }
});

// GET|/diets

router.get("/diets", async (req, res) => {
  let types = [
    "gluten free",
    "dairy free",
    "paleolithic",
    "lacto ovo vegetarian",
    "primal",
    "whole 30",
    "fodmap friendly",
    "ketogenic",
    "pescatarian",
    "vegan",
  ];
  types.forEach((e) => {
    Diet.findOrCreate({
      where: { name: e },
    });
  });
  let dietTypes = await Diet.findAll();
  return res.send(dietTypes);
});

//POST|

router.post("/recipes", async (req, res) => {
  const { name, summary, healthScore, image, steps, diets } = req.body;
});

module.exports = router;
