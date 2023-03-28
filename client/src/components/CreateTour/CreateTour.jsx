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
    const difficulties = ["1", "2", "3", "4","5"];
    const season = ["verano", "otoño", "invierno", "primavera"];
   
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

    const [errors, setErrors] = useState({name:""});
    

    //VALIDAR NOMBRE TOUR

    const validate=(form)=>{
        let errors={};
        let name_repeated = allTours.filter(t => t.name === form.name);
        const constante = (/^[A-Za-z]+$/);
        if(!form.name) errors.name="Es necesario ingresar un nombre";
        else if(name_repeated.length) errors.name=`El tour ${form.name} ya fue creado`;
        else if(!constante.test(form.name))
        errors.name="El nombre del tour no es valido, no se permiten simbolos, espacios o numeros";
        return errors;
    }

    //Manejadores
    const changeName = (e) => {
        let value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        setForm ({...form, name:value});
        setErrors (validate({...form, name:value}));
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
       window.location.href = 'http://localhost:3000/home/create';
    };

    return (
        <div className="todo">
        <Link to="/home">
                <button className="btvolver">VOLVER A HOME</button>
        </Link>
        <div className="crear">
            <div className="titulocrear">
            <h2 >CREAR TOUR</h2>
            </div>

            <form className="formulario" onSubmit={handlerSubmit}>
            <div>
                <div>
                    <label>Nombre: </label>
                    <input required className="inputTour" value={form.name} key="name" type="text" onChange={changeName}/>
                    {errors.name &&<p className="danger">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="dificultad">Dificultad: </label>
                    {
                        <select id="dificultad" onChange={changeDifficulty} >
                        <option> Seleccione 1 </option>
                        {
                        difficulties.map( (d)=>
                            <option value={d}> {capitalizeFirstLetter(d)} </option>
                        )
                        }
                     </select>
                        
                    }
                </div>
                <div>
                    <label>Duracion: </label>
                    <input required className="inputTour" value={form.duration} key="duration" type="text" onChange={changeDuration}/>
                </div>
                <div>
                    <label htmlFor="estacion">Estacion: </label>
                     <select id="estacion" onChange={changeSeason} >
                        <option> Seleccione 1 </option>
                        {
                        season.map( (s)=>
                            <option value={s}> {capitalizeFirstLetter(s)} </option>
                        )
                        }
                     </select>
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
                <button className="btnEnviar" type="submit" disabled={errors.name  || !form.name || !form.difficulty || !form.duration || !form.season || !form.countries.length}>CREAR TOUR</button>
                {(errors.name  || !form.name || !form.difficulty || !form.duration || !form.season || !form.countries.length) && 
                    <p className="danger">Botón deshabilitado, uno o más campos están vacíos</p>}
            </div>
            </form>
        </div>
        </div>
    )
};

export default CreateTour;