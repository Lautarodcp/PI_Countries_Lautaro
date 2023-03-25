import React from "react";
import Card from "../Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { getCountries } from "../../redux/actions";
import "./Cards.css";

const Cards = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector ((state) => state.countries);

    useEffect (()=> {
        dispatch(getCountries())
    }, []);
    
    return(
        <div className="cards">
            {
            allCountries.map(
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
        </div>
    )
};

export default Cards;