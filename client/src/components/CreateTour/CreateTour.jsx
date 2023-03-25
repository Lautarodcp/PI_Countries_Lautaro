import React from "react";
import "./CreateTour.css";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getCountries, getTours, postTour } from "../../redux/actions/index"

const CreateTour = ()=> {

    const dispatch = useDispatch();
    const allCountries = useSelector(state=>state.countries);
    const allTours = useSelector(state=>state.tours);

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
    };

    return (
        <div className="crear">
            <h2>CREAR ACTIVIDAD</h2>
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
                <button type="submit">CREAR TOUR</button>
            </form>
        </div>
    )
};

export default CreateTour;