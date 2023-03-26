import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriName } from "../../redux/actions";
import "./SearchBar.css";

const SearchBar = () => {
    const allCountries = useSelector ((state) => state.countries);
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const inputHandler = (e)=> {
        setInput(e.target.value)
    };

    const clickHandler = (e)=> {
        e.preventDefault();
        let filter = [];
        let long = input.length;
    for (let country of allCountries){
        if(country["name"].substring(0,long).toLowerCase() === input.toLowerCase()) filter.push(country);
    }
    if(filter.length === 0) {
        alert("No se encontró ningún país con el nombre: " + input);
        setInput("");
    }
    else {
        dispatch(getCountriName(input));
        console.log(input);
        setInput("");
    };
    };
    return (
        <div className="searchbar">
            <button type="submit" onClick={clickHandler}>Buscar</button>
            <input type="text" onChange={inputHandler} value={input} />
        </div>
    )
};

export default SearchBar;