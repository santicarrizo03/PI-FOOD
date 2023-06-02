import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    try {
      const json = await axios("http://localhost:3001/recipes");
      return dispatch({
        type: "GET_RECIPES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/diets");
    return dispatch({
      type: "GET_DIETS",
      payload: json.data,
    });
  };
}
