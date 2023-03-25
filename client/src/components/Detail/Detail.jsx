import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { getCountries } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./Detail.css";

const Detail = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector ((state) => state.countries);

    useEffect (()=> {
        dispatch(getCountries())
    }, []);

    const url = window.location.href;
    const id = url.substring(34)

    const country = allCountries.find(c=>c.id === id);
    
    const arrayStr = country.name.split(" ");
    for (let i=0; i<arrayStr.length; i++){
        arrayStr[i] = arrayStr[i].charAt(0).toUpperCase() + arrayStr[i].slice(1);
    }
    const nameMayu = arrayStr.join(" ");
    console.log(country);
    return (
        <div>
            <Link to="/home">
                <button>VOLVER A HOME</button>
            </Link>
        <div className="detail">
                <div className="flag">
                <img src={country.flag} alt="" />
                </div>
                <h2> {nameMayu} </h2>
                <p>Id: {country.id} </p>
                <p>Continente: {country.continent} </p>
                <p>Capital: {country.capital} </p> 
                <p>{country.subRegion?<p>Subregion:{country.subregion}</p>:<p>{null}</p>}</p>
                <p>{country.area?<p>Area:{country.area}</p>:<p>{null}</p>}</p>
                <p>Poblacion : {country.population} </p>
                <p>Tours: {country.tours} </p>
        </div>
        </div>
    )
};

export default Detail;