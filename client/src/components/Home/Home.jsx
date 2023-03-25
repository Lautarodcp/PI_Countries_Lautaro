import React from "react";
import "./Home.css";
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import Nav from "../Nav/Nav";

const Home = () => {
    return (
        <div className="home">
            <Nav/>
            <Cards/>
        </div>
    )
};

export default Home;