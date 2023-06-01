const initialState = {
  allRecipes: [],
  showedRecipes: [],
  diets: [],
  recipe: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        showedRecipes: action.payload,
        allRecipes: action.payload,
      };

    default:
      return state;
  }
}
