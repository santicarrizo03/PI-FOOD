import React from "react";
import { Link } from "react-router-dom";
import "./style/landingPage.css"

export default function LandingPage(){
  return (
    <div className="principal">
      <h1>Welcome to PI-FOOD</h1>
      <Link to="/home">
        <button className="boton-inicio">Start</button>
      </Link>
    </div>
  )
}