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
import Paginado from "./Navbar";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector((state) => state.diets);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const [order, setOrder] = useState("");
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(allRecipes.length / recipesPerPage)) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  function handleFilterByDiet(e) {
    e.preventDefault();
    dispatch(filterRecipesByDiet(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handlefilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleOrderByHealthScore(e) {
    e.preventDefault();
    dispatch(orderByHealthScore(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleClick(e){
    e.preventDefault();
    dispatch(getRecipes());
    dispatch(getDiets());
}

  return (
    <div>
      <div>
        <Link to="/">
          <button>Landing Page</button>
        </Link>
        <h1>Food Proyect</h1>
        <Link to="/recipe">
          <button>Create Recipe</button>
        </Link>
      </div>
      <button onClick={e=>handleClick(e)}>Refresh</button>
      <div>
        <select onChange={(e) => handleOrderByName(e)}>
          <option>Order A-Z o Z-A</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <select onChange={(e) => handleOrderByHealthScore(e)}>
          <option>Order by Health Score</option>
          <option value="good">Major to minor</option>
          <option value="bad">minor to major</option>
        </select>
        <select onChange={(e) => handlefilterCreated(e)}>
          <option value="all">All</option>
          <option value="api">Api</option>
          <option value="db">Db</option>
        </select>
        <select onChange={(e) => handleFilterByDiet(e)}>
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
      <SearchBar></SearchBar>
      <div>
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
    </div>
  );
}
