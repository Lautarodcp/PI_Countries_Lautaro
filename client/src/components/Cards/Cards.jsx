import React from "react";
import Card from "../Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { getCountries } from "../../redux/actions";
import "./Cards.css";
import Pagination from "../Pagination/Pagination";

const Cards = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector ((state) => state.countries);
    
    const [currentPage, setCurrentPage] = useState(1); // pagina actual
    const [countryPerPage, setCountryPerPage] = useState(10); //paises x pagina
    const indexOfLastCountry = currentPage * countryPerPage; //index ultimo pais
    const indexOfFirstCountry = indexOfLastCountry - countryPerPage; //index primer pais
    const currentCountry = allCountries.slice(indexOfFirstCountry, indexOfLastCountry); // de todos los paises tomo solo lo que necesito

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }; // constante que tiene el numero de pagina 

    useEffect (()=> {
        dispatch(getCountries())
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1); // reiniciar la página actual cuando cambie el país actual
    }, [currentCountry]);
    
    return(
        <div className="cards">
            {
            currentCountry.map(
                (country) => <Card
                    key= {country.id}
                    id={country.id}
                    name={country.name}
                    img= {country.flag}
                    continent={country.continent}
                    population={country.population}
                    />
            )
            }
            <Pagination 
                countryPerPage={countryPerPage}
                allCountry={allCountries.length}
                paginado={paginado}
            />
        </div>
    )
};

export default Cards;