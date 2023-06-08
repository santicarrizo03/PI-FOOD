const initialState = {
  allRecipes: [],
  recipes: [],
  diets: [],
  detail: {},
};

export default function reducer(state = initialState, action) {
  // toma el estado actual de la aplicación y una acción, y devuelve un nuevo estado actualizado según el tipo de acción.
  switch (action.type) {
    case "GET_RECIPES": // actualiza la lista de recetas y guarda una copia para poder filtrar despues
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case "GET_DIETS": //lista de dietas y guarda una copia 
      return {
        ...state,
        diets: action.payload,
      };
    case "GET_RECIPE_BY_NAME": // actualiza la lista de recetas basada en un filtro por nombre
      return {
        ...state,
        recipes: action.payload,
      };
    case "POST_RECIPE":
      return {
        ...state,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "RESET_DETAIL":
      return {
        ...state,
        detail: [],
      };
    //FILTERS
    case "FILTER_BY_DIET": // filtra por dieta
      const allRecipes = state.allRecipes;
      const recipesFiltered =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter((e) =>
              e.diets
                .toString()
                .toLowerCase()
                .includes(action.payload.toLowerCase())
            );
      return {
        ...state,
        recipes: recipesFiltered,
      };
    case "ORDER_BY_NAME":
      let orderedArr =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderedArr,
      };
    case "ORDER_BY_HEALTHSCORE":
      let orderedHealthArr =
        action.payload === "good"
          ? state.recipes.sort(function (a, b) {
              if (a.healthscore > b.healthscore) {
                return 1;
              }
              if (b.healthscore > a.healthscore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthscore > b.healthscore) {
                return -1;
              }
              if (b.healthscore > a.healthscore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderedHealthArr,
      };

    case "FILTER_BY_CREATED":
      const allReci = state.allRecipes;
      const recipesFilter =
        action.payload === "all"
          ? allReci
          : allReci.filter((e) =>
              e.diets
                .toString()
                .toLowerCase()
                .includes(action.payload.toLowerCase())
            );
      return {
        ...state,
        recipes: recipesFilter,
      };
    default:
      return state;
  }
}
