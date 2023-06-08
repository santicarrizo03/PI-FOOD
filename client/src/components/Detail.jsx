import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail } from "../redux/actions/index";
import "./style/detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const myRecipe = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    dispatch(resetDetail());
  }, [dispatch, props.match.params.id]);

  console.log(myRecipe);

  return (
    <div className="recipe-details">
      <Link to="/home">
        <button className="go-home-button">Go back home</button>
      </Link>

      {myRecipe.length > 0 ? (
        <div className="recipe-content">
          <h1>Name: {myRecipe[0].name}</h1>

          <img src={myRecipe[0].image} alt="" />
          <p>{myRecipe[0].healthscore}</p>
          <div className="summary">
            <strong>Summary</strong>
            <p dangerouslySetInnerHTML={{ __html: myRecipe[0].summary }} />
          </div>
          <div className="diets">
            <p><strong> Diets Types:</strong></p>
            {
              <p className="detail-type">
                {!myRecipe[0].createdInDb
                  ? myRecipe[0].diets.map((e) => e + ", ")
                  : myRecipe[0].diets?.map((e) => e.name + " ")}
              </p>
            }
          </div>
          <div className="steps">
            <p>
              <strong>Steps</strong>
            </p>
            <ul>
              {Array.isArray(myRecipe[0].steps)
                ? myRecipe[0].steps.map((e, index) => (
                    <li>{e.number + ". " + e.step}</li>
                  ))
                : myRecipe[0].steps}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
