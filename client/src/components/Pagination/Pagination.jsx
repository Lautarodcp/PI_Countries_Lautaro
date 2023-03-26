//10 paises por pagina
import React from "react";
import "./Pagination.css"

const Pagination = ({countryPerPage, allCountry, paginado}) =>{
    const pageNumbers = [];

    for (let i=1; i<= Math.ceil(allCountry/countryPerPage); i++){
        pageNumbers.push(i); //recorro y guardo los numeros para saber cantidad de paginas
    };

    return (
        <nav className="paginado">
            <ul className="ulul">
                {pageNumbers && 
                pageNumbers.map(n => {
                    return (
                    <li className="lili" key={n}>
                    <a className="elemento" onClick={()=> paginado(n)}> {n} </a>
                    </li>
                    )
                })}
            </ul>
        </nav>
    )
};

export default Pagination;