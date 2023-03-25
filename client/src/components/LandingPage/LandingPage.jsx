import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const Landig = () => {
    return (
        <div className="landing">
            <h1 className="titulo">BIENVENIDOS AL MUNDO</h1>
                <Link to = "/home"> 
                    <button className="boton">INGRESAR</button>
                </Link>
        </div>
    )
};

export default Landig;