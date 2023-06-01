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
