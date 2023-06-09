import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    try {
      const json = await axios("http://localhost:3001/recipes"); // realizo una peticion a la API para obtener todas las recetas
      return dispatch({//se utiliza para enviar esta acción al store, para que los reducers correspondientes puedan actualizar el estado global de la aplicación
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

export function getRecipeByName(name){
  return async function(dispatch){
      try {
          var json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
          return dispatch({
              type: 'GET_RECIPE_BY_NAME',
              payload: json.data
          })    
      } catch (error) {
          console.error(error);
      }   
  }
}

export function postRecipe(payload){
  return async function(dispatch) {
    try {
        var json = await axios.post(`http://localhost:3001/recipes`, payload);
        return dispatch({
            type: "CREATE_RECIPE",
            payload: json,
        })
    } catch (error) {
        console.log(error);
    }
}
}
export function getDetail(id){
  return async function(dispatch){
      try {
          let json = await axios.get(`http://localhost:3001/recipes/${id}`);
          return dispatch({
              type: 'GET_DETAIL',
              payload: json.data
          })
      } catch (error) {
          console.error(error);
      }
  }
}
export function resetDetail(){
  return (dispatch => {
    dispatch({
      type: 'RESET_DETAIL',
    })
  })
}


//Filters
export function filterRecipesByDiet(payload){
  return {
      type: 'FILTER_BY_DIET',
      payload
  }
}
export function orderByName(payload){
  return {
      type: 'ORDER_BY_NAME',
      payload
  }
}
export function orderByHealthScore(payload){
  return {
      type: 'ORDER_BY_HEALTHSCORE',
      payload
  }
}
export function filterCreated(payload){
  return {
      type: 'FILTER_BY_CREATED',
      payload
  }
}