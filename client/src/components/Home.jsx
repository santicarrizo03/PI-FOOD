import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreated,
  filterRecipesByDiet,
  getDiets,
  getRecipes,
  orderByName,
  orderByHealthScore,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Recipe from "./Recipe";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./style/home.css";
import logo from "./style/img/sarten.png"

export default function Home() {
  const dispatch = useDispatch();//despachar acciones a los reducers para actualizar el estado global de la aplicacion
  const allRecipes = useSelector((state) => state.recipes); //me permite obtener la lista de recetas
  const allDiets = useSelector((state) => state.diets); // obtengo la lista de dietas
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9); // recetas por pagina
  const [order, setOrder] = useState(""); // estado local pra luego actualizar
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginado = (pageNumber) => { //mostrar los lementos acordes a la interfaz del usuario
    setCurrentPage(pageNumber);
  };

  const previousPage = () => { // ir a la pag anterior y verifica que no se la 1er pag
    if (currentPage !== 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  const nextPage = () => { // ir a pag sig y verifica que nop sea la ult
    if (currentPage !== Math.ceil(allRecipes.length / recipesPerPage)) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  useEffect(() => {//ejecuta una accion cuando el componente es montado oo disdpatch cambia
    dispatch(getRecipes());// se despachan estas dos acciones, hacen peticiones al servidor, recipes y diets, y se actualiza el esyado 
    dispatch(getDiets());
  }, [dispatch]);

  function handleFilterByDiet(e) {
    e.preventDefault();
    setCurrentPage(1); // establece la pag actual en 1
    dispatch(filterRecipesByDiet(e.target.value)); // me trae la accion del filter
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handlefilterCreated(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterCreated(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleOrderByName(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByName(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleOrderByHealthScore(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByHealthScore(e.target.value));
    setOrder(e.target.value);
  }

  function search(e){
    e.preventDefault();
    setCurrentPage(1)
  }

  return (
    <div>
      <div className="home-boton">
        <Link to="/">
        <img  className="logo" src={logo}alt="logo"/>
        </Link>
        <h1 className="title">Food Proyect</h1>
        <Link to="/recipe">
          <button className="create-boton">Create Recipe</button>
        </Link>
        
      </div>
      <div className="filter">
      <div className="filters">
        <select className="filter-select" onChange={(e) => handleOrderByName(e)}>
          <option>Order A-Z o Z-A</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <select className="filter-select" onChange={(e) => handleOrderByHealthScore(e)}>
          <option>Order by Health Score</option>
          <option value="bad">Major to minor</option>
          <option value="good">minor to major</option>
        </select>
        <select className="filter-select" onChange={(e) => handlefilterCreated(e)}>
          <option value="all">All</option>
          <option value="api">Api</option>
          <option value="db">Db</option>
        </select>
        <select className="filter-select" onChange={(e) => handleFilterByDiet(e)}>
          <option value="all">All Diet Types</option>
          {allDiets?.map((e, index) => {
            return (
              <option key={index} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="search-bar" onChange={(e) => search(e)}><SearchBar/></div>
      </div>
      
      
      
      <div className="cards">
        {currentRecipes?.map((e) => {
          return (
            <Recipe
              key={e.id}
              name={e.name}
              image={e.image}
              diets={e.diets}
              id={e.id}
            />
          );
        })}
      </div>
      <Paginado
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paginado={paginado}
        currentPage={currentPage}
        previousPage={previousPage}
        nextPage={nextPage}
        setRecipesPerPage={setRecipesPerPage}
        order={order}
      />
    </div>
  );
}
