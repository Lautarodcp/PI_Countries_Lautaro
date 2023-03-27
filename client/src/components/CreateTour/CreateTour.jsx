import React from "react";
import { Link } from "react-router-dom";
import "./CreateTour.css";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getCountries, getTours, postTour} from "../../redux/actions/index"

const CreateTour = ()=> {

    const ordenar = (country, dato) => {
        switch (dato) {
            case "tod":
                return country;
            case "az": 
            country.sort(function (a, b) {
                let countrya = a.name.toUpperCase();
                let countryb = b.name.toUpperCase();
                if (countrya < countryb) {return -1};
                if (countrya > countryb) {return 1};
                return 0;
            });
                 break;
            case "za": 
            country.sort(function (a, b) {
                let countrya = a.name.toUpperCase();
                let countryb = b.name.toUpperCase();
                if (countrya < countryb) {return 1};
                if (countrya > countryb) {return -1};
                return 0;
        });
        break;
            default:
                return 1;
            };
        return country;
    };

    const dispatch = useDispatch();
    const allCountries = useSelector(state=>state.countries);
    const allTours = useSelector(state=>state.tours);
    const orden = "az";
    const alfabeticCountri= ordenar(allCountries,orden);
   
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.substring(1);
      };

    useEffect (()=> {dispatch(getCountries())}, [dispatch]);
    useEffect (()=> {dispatch(getTours())}, [dispatch]);
   
    const [form, setForm] = useState ({
        name:"",
        difficulty: null,
        duration: "",
        season: "",
        countries:[],
    });

    

    //VALIDAR NOMBRE TOUR

    const validate = (form) =>{
        let constante = "/^[A-Za-z]+$/";
        let error={};
        let repeated = allTours.name.filter(name => name === form.name);

        if (!form.name) error.name ="Es necesario ingresar un nombre";
        else if (repeated.length) error.name = "El tour ya fue creado";
        else if (!constante.test(form.name)) error.name="El nombre del tour no es valido, no se permiten simbolos, espacios o numeros";
        return error;
    }
    //Manejadores
    const changeName = (e) => {
        setForm ({...form, name:e.target.value});
    };

    const changeDifficulty = (e) => {
        setForm ({...form, difficulty: e.target.value});
    };

    const changeDuration = (e) => {
        setForm ({...form, duration: e.target.value});
    };

    const changeSeason = (e) => {
        setForm ({...form, season: e.target.value});
    };
    
    const handlerSelectCountry = (e) => {
        setForm({
            ...form, 
            countries: [...new Set ([...form.countries, e.target.value])]
        })
    };

    const handlerDelete = (e) => {
        setForm({
            ...form,
            countries: form.countries.filter (c=>
                c!== e.target.value)
        })
    };

    const handlerSubmit = (e) =>{
       e.preventDefault();
       dispatch(postTour(form));
       setForm({
        name:"",
        difficulty: null,
        duration: "",
        season: "",
        countries:[],
       });
       alert(`El tour ${form.name} fue creado con exito`);
    };

    return (
        <div className="todo">
        <Link to="/home">
                <button>VOLVER A HOME</button>
        </Link>
        <div className="crear">
            <h2 >CREAR ACTIVIDAD</h2>
            <form className="formulario" onSubmit={handlerSubmit}>
                <div>
                    <label>Nombre: </label>
                    <input className="inputTour" value={form.name} key="name" type="text" onChange={changeName}/>
                </div>
                <div>
                    <label>Dificultad: </label>
                    <input className="inputTour" value={form.difficulty} key="difficulty" type="number" min={1} max={5} onChange={changeDifficulty}/>
                </div>
                <div>
                    <label>Duracion: </label>
                    <input className="inputTour" value={form.duration} key="duration" type="text" onChange={changeDuration}/>
                </div>
                <div>
                    <label>Estacion: </label>
                    <input className="inputTour" value={form.season} key="season" type="text" onChange={changeSeason}/>
                </div>
                <div>
                    <label htmlFor="pais">Seleccione 1 o mas paises</label>
                    <select id="pais" onChange={handlerSelectCountry}>
                     {
                        alfabeticCountri.map((c)=> 
                             <option value={c.name}> {capitalizeFirstLetter(c.name)} </option>
                        )
                     }
                    </select>
                    <div className={form.countries.length?"oki":null}>
                        {
                            form.countries.map( c=>
                                <div className="selec"> {capitalizeFirstLetter(c)}
                                    <button className="botonX" value={c} onClick={handlerDelete}>X</button>
                                 </div>
                            )
                        }
                    </div>
                </div>
                <button className="btnEnviar" type="submit" disable={!form.name || !form.difficulty || !form.duration || !form.season || !form.countries.length}>CREAR TOUR</button>
            </form>
        </div>
        </div>
    )
};

export default CreateTour;