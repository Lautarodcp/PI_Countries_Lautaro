import React from "react";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import { getCountries } from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filters/Filters";
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
                <button className="bot" >CREAR TOUR</button>
            </Link>
            <Link className="elemento" to="/home" >
                <button className="bot" onClick={ e=>{handlerRefresh(e)}}>CARGAR TODOS</button>
            </Link>
            <Filter/>
            <SearchBar/>
        </div>
    )
};

export default Nav;