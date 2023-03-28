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
    }, [dispatch]);

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
        <div className="detail">
                <Link to="/home">
                    <button className="bthome">VOLVER A HOME</button>
                </Link>
            <div className="carta">
                <div className="flaggContainer">
                    <img src={country.flag} alt="" />
                    <h1 className="countryname"> {nameMayu} </h1>
                </div>
                 <div className="dataContainer">
                    <div className="info">
                         <h1>Informacion del pais</h1>
                            <p className="pimport"><strong>ID:</strong> {country.id} </p>
                            <p className="pimport"><strong>CONTINENTE:</strong> {country.continent} </p>
                            <p className="pimport">{country.capital?<p><strong>CAPITAL:</strong> {country.capital}</p>:<p>Capital: No hay informacion</p>}</p> 
                            <p className="pimport">{country.subRegion?<p><strong>SUBREGION:</strong> {country.subregion}</p>:<p><strong>SUBREGION:</strong> No hay informacion</p>}</p>
                            <p className="pimport">{country.area?<p><strong>AREA:</strong> {country.area} Km2</p>:<p>Area: No hay informacion</p>}</p>
                            <p className="pimport"><strong>POBLACION:</strong> {country.population} personas</p>
                    </div>
                    <div className="tours">
                        <h1>Tours</h1>
                            <p> {
                                    country.tours.length?
                                        country.tours.map(tour => 
                                            <div className={country.tours.length>1?"minitours":null}>
                                                <p className="pimport"><strong>NOMBRE:</strong> {tour.name}</p>
                                                <p className="pimport"><strong>DIFICULTAD:</strong> {tour.difficulty}</p> 
                                                <p className="pimport"><strong>DURACION:</strong> {tour.duration}</p>
                                                <p className="pimport"><strong>ESTACION:</strong> {tour.season}</p>
                                            </div>
                                        ):
                                        <div>
                                            <h4>No hay tours disponibles en este país</h4>
                                        </div>
                                }
                            </p>
                    </div>
                 </div>
            </div>
        </div>
    )
};

export default Detail;