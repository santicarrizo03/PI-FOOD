import React, {useEffect}from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getDetail, resetDetail} from '../redux/actions/index'

export default function Detail(props) {
  const dispatch = useDispatch();
  const myRecipe = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    dispatch(resetDetail());
  }, [dispatch, props.match.params.id]);

  console.log(myRecipe);

  return (
    <div>
      
      <Link to="/home">
        <button>Go back home</button>
      </Link>
      
      {myRecipe.length > 0 ? (
        <div className="recipe-detail">
        <h5>id: {myRecipe[0].id}</h5>
        <h1>Name: {myRecipe[0].name}</h1>
        
        <img src={myRecipe[0].image} alt="" />
        
      <p className="summary">{myRecipe[0].summary}</p>
      <div>{myRecipe[0].steps?.map((e) =>{ return(
        <p key={e.number} className="diets">
          {e.steps}
        </p>
      )} )}</div>
      {/* <div className="container-diets">
        {Array.isArray(myRecipe[0].diets)?.map((diet) => (
          <button key={diet}>
            {diet.toUpperCase()}
          </button>
        ))}
      </div> */}
      </div>
      ) : (
        
         <p>Loading...</p>
      )}
      
    </div>
  );
}
