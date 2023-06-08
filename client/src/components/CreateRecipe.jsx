import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipe } from "../redux/actions";
import "./style/createRecipe.css"

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
  //image
  if(!form.image){
    errors.image = "Image required";
  }
  //HealthScore 1-100
  if (!form.healthscore||form.healthscore < 1 || form.healthscore > 100) {
    errors.healthscore = "HealthScore valid between 1-100";
  }
  //Steps required
  if (!form.steps) {
    errors.steps = "Steps required";
  }
  if (!form.diets || form.diets.length === 0) {
    errors.diets = "Select at least one diet";
  }

  return errors;
};

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    healthscore: "",
    steps: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); // evita que el form se envie autom y se recargue la pag
    setErrors(validateForm(input)); // se valida el form
    if (Object.keys(errors).length < 1) {
      console.log(input);
      dispatch(postRecipe(input));
      alert("Recipe created");
      setInput({
        name: "",
        image: "",
        summary: "",
        healthscore: "",
        steps: "",
        diets: [],
      });
    } else {
      alert("There must be no errors in order to create the recipe");
    }
    history.push("/home");
  }
  console.log(Object.keys(errors).length);
  return (
    <div className="create-recipe-container">
      <div className="create-recipe-header">
        <Link to="/home">
          <button className="create-recipe-button">Home</button>
        </Link>
        <h1 className="create-recipe-title">Create Recipe</h1>
      </div>

      <div className="create-recipe-form">
        <form onSubmit={e => handleSubmit(e)}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Summary: </label>
            <textarea
              type="text"
              name="summary"
              value={input.summary}
              onChange={(e) => handleChange(e)}
            ></textarea>
            {errors.summary && <p>{errors.summary}</p>}
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="text"
              value={input.image}
              name="image"
              placeholder="Enter the url of the image"
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p>{errors.image}</p>}
          </div>
          <div className="form-group">
            <label>Health Score</label>
            <input
              type="text"
              value={input.healthscore}
              name="healthscore"
              placeholder="Enter the health score from 1 to 100"
              onChange={(e) => handleChange(e)}
            />
            {errors.healthscore && <p className='error'>{errors.healthscore}</p>}
          </div>
          <div className="form-group">
            <label>Steps: </label>
            <input
              type="text"
              value={input.steps}
              name="steps"
              placeholder="Enter the steps..."
              onChange={(e) => handleChange(e)}
            />
            {errors.steps && <p className='error'>{errors.steps}</p>}
          </div>
          <div className="form-group">
            <label>Diet Type:</label>
            {diets &&
              diets.map((e, index) => {
                return (
                  <label>
                    {e.name}
                    <input
                      key={index}
                      type="checkbox"
                      value={e.name}
                      onChange={(e) => handleCheck(e)}
                    />
                  </label>
                );
              })}
              {errors.diets && <p className='error'>{errors.diets}</p>}
                    
                <input type="submit" value="Crear Actividad" disabled={!input.name.trim().length > 0} />
          </div>
        </form>
        
      </div>
      
    </div>
  );
}
