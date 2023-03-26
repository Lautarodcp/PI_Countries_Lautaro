import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { filterByContinente, filterAlfabetico, getTours,filterByTours } from "../../redux/actions";
import "./Filters.css";

const Filter = () =>{
    const dispatch = useDispatch();
    const allTours = useSelector ((state) => state.tours);

    useEffect (()=> {
        dispatch(getTours())
    }, []);

    const handlerFilterContinent = (e) =>{
        dispatch (filterByContinente(e.target.value))
    };

    const handlerFilterTours = (e) =>{
        dispatch (filterByTours(e.target.value))
    };

    const handlerFilterAlfabetico = (e) =>{
        dispatch (filterAlfabetico (e.target.value))
    } ;
    return (
        <div>
                <label htmlFor="alfabetico">Orden alfabetico</label>
                <select id="alfabetico" onChange={handlerFilterAlfabetico}>
                    <option value="tod">Seleccionar</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
                <label htmlFor="poblacion">Pablacion</label>
                <select id="poblacion">
                    <option value="menor">Menor a Mayor</option>
                    <option value="mayor">Mayor a Menor</option>
                </select>
                <label htmlFor="continente">Continente</label>
                <select id="continente" onChange={handlerFilterContinent}>
                    <option value="tod">Todos</option>
                    <option value="Africa">Africa</option>
                    <option value="Antartica">Antartica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europa</option>
                    <option value="North America">America del Norte</option>
                    <option value="South America">America del Sur</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <label htmlFor="tours">Tours</label>
                <select id="tours" onChange={handlerFilterTours}>
                        <option value="sel">Seleccionar</option>
                        <option value="todos">Todos</option>
                    {
                        allTours.map((t)=> 
                             <option value={t.name}> {t.name} </option>
                    )
                    }
                </select>
            </div>
    )
};

export default Filter;
