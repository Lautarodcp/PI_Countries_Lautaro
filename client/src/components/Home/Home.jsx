import React from "react";
import "./Home.css";
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