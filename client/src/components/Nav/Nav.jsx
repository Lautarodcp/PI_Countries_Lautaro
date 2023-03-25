import React from "react";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import { getCountries } from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import "./Nav.css"

const Nav = () =>{
    const dispatch = useDispatch();

    const handlerRefresh = (e) => {
        e.preventDefault();
        dispatch(getCountries());
    };

    return (
        <div className="nav">
            <Link className="elemento" to="/home/create" >
                <button>CREAR TOUR</button>
            </Link>
            <Link className="elemento" to="/home" >
                <button onClick={ e=>{handlerRefresh(e)}}>CARGAR TODOS</button>
            </Link>
            <div>
                <label htmlFor="alfabetico">Orden alfabetico</label>
                <select id="alfabetico">
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
                <label htmlFor="poblacion">Pablacion</label>
                <select id="poblacion">
                    <option value="menor">Menor a Mayor</option>
                    <option value="mayor">Mayor a Menor</option>
                </select>
                <label htmlFor="continente">Continente</label>
                <select id="continente">
                    <option value="afr">Africa</option>
                    <option value="ant">Antartica</option>
                    <option value="asi">Asia</option>
                    <option value="eur">Europa</option>
                    <option value="nort">America del Norte</option>
                    <option value="sur">America del Sur</option>
                    <option value="oce">Oceania</option>
                </select>
                <label htmlFor="tours">Tours</label>
                <select id="tours">
                    <option value="">desconozco</option>
                </select>
            </div>
            <SearchBar/>
        </div>
    )
};

export default Nav;