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
        <p>Loading...</p>
      ) : (
        <div className="recipe-detail">
          <h5>id: {myRecipe.id}</h5>
          <h1>Name: {myRecipe.name}</h1>
          
          <img src={myRecipe.image} alt="" />
          
        <p className="summary" dangerouslySetInnerHTML={{ __html: myRecipe.summary }} />
        {myRecipe.steps?.map((e) => (
          <p key={e.number} className="diets">
            <strong>{e.number}</strong> - {e.step}
          </p>
        ))}
        <div className="container-diets">
          {myRecipe.diets?.map((diet) => (
            <button key={diet}>
              {diet.toUpperCase()}
            </button>
          ))}
        </div>
        </div>
        
      )}
      
    </div>
  );
}
