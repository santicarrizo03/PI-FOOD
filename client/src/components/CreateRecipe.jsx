import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

let validName = (str) => {
  let string = /^[a-zA-Z\s]+$/; //caracteres alfabeticos y espacios en blanco
  return string.test(str); //retorna valor booleano que indica si existe o no el patron buscado
};

const validateForm = (form) => {
  let errors = {};

  //name required
  if (!form.name) {
    errors.name = "Name required";
  }
  //solo caracteres alfabeticos
  if (form.name && !validName(form.name)) {
    errors.name = "Name invalid";
  }
  //summary required
  if (!form.summary) {
    errors.summary = "Summary required";
  }
  //Score 1-100
  if (form.score < 1 || form.score > 100) {
    errors.score = "Score valid between 1-100";
  }
  //HealthScore 1-100
  if (form.healthScore < 1 || form.healhtScore > 100) {
    errors.healthScore = "HealthScore valid between 1-100";
  }
  //Steps required
  if (!form.steps) {
    errors.steps = "Steps required";
  }
  if (!form.diets.length) {
    errors.diets = "Select at least one diet";
  }

  return errors;
};

export default function createRecipe() {
  return (
    <div>
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <h1>Create Recipe</h1>
      </div>

      <div>
        <form action="">
          <div>
            <label htmlFor="">Name: </label>
            <input type="text" name="name" value={input.name}></input>
          </div>
          <div>
            <label htmlFor="">Summary: </label>
            <textarea
              type="text"
              name="summary"
              value={input.summary}
            ></textarea>
          </div>
          <div>
            <label htmlFor=""></label>
          </div>
        </form>
      </div>
    </div>
  );
}
