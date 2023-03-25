import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriName } from "../../redux/actions";
import "./SearchBar.css";

const SearchBar = () => {

    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const inputHandler = (e)=> {
        setInput(e.target.value)
    };

    const clickHandler = (e)=> {
        e.preventDefault();
        dispatch(getCountriName(input));
        console.log(input);
        setInput("");
    };
    return (
        <div className="searchbar">
            <button type="submit" onClick={clickHandler}>Buscar</button>
            <input type="text" onChange={inputHandler} value={input} />
        </div>
    )
};

export default SearchBar;