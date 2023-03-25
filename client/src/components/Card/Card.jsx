import React from "react";
import {Link} from "react-router-dom";
import "./Card.css";

//DEBE MOSTRAR SI O SI, al hacer click debe llevar a detalle
// Imagen de la bandera.
// Nombre.
// Continente.

const Card = ({name, id, img, continent, population}) => {
    const arrayStr = name.split(" ");
    for (let i=0; i<arrayStr.length; i++){
        arrayStr[i] = arrayStr[i].charAt(0).toUpperCase() + arrayStr[i].slice(1);
    }
    const nameMayu = arrayStr.join(" ");
    return (
        <div className="card">
                <div className="flag">
                <img src={img} alt="" />
                </div>
                <Link to={`/home/detail/${id}`}>
                <h2> {nameMayu} </h2>
                </Link>
                <p> Continente: {continent} </p>
        </div>
    )
};

export default Card;