import { GET_COUNTRIES } from "../actions";
import { GET_COUNTRY_NAME } from "../actions";
import { GET_TOURS } from "../actions";
import { POST_TOUR } from "../actions";
import { FILTER_BY_CONTINENTE } from "../actions";
import { FILTER_ALFABETICO } from "../actions";
import { FILTER_TOURS } from "../actions";
import { FILTER_POBLACION } from "../actions";

const initialState = {
    allcountries: [],
    countries: [],
    tours: [],
    filtros: 1
}

const ordenar = (country, dato) => {
    switch (dato) {
      case "tod":
        return 3;
      case "az": 
        return country.sort((a, b) => a.name.localeCompare(b.name));
      case "za": 
      return country.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return country;
    };
};

const ordenarPoblacion = (country, dato) => {
    console.log(country);
    switch (dato) {
        case "tod":
          return 3;
        case "az": 
          return country.sort((a, b) => a.population - b.population);
        case "za": 
        return country.sort((a, b) => b.population - a.population);
        default:
          return country;
      };
};


const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {...state, countries:action.payload, allcountries:action.payload,};
        case GET_COUNTRY_NAME:
            return {...state, countries:action.payload};
        case GET_TOURS:
            return {...state, tours:action.payload};
        case POST_TOUR:
            return {...state, tours:action.payload};
        case FILTER_BY_CONTINENTE:
            let allcountries = state.allcountries;
            let filterContinente = action.payload === "tod"? allcountries:
            allcountries.filter(c=> c.continent === action.payload)
            return {...state, countries:filterContinente};
        case FILTER_ALFABETICO:
            let allCountriesAlfabetico = state.countries;
            let result = ordenar(allCountriesAlfabetico, action.payload);
            if(result===3){
                return {...state, countries:allCountriesAlfabetico, filtros: state.filtros+1}
            } else {
                return {...state, countries: result, filtros: state.filtros+1}};
        case FILTER_POBLACION:
                let allCountriesPoblacion = state.countries;
                let resultado = ordenarPoblacion(allCountriesPoblacion, action.payload)
                if(resultado===3){
                    return {...state, countries:allCountriesPoblacion, filtros: state.filtros+1}
                } else {
                return {...state, countries: resultado, filtros: state.filtros+1}
            };
        case FILTER_TOURS:
            let allcountriesTours = state.allcountries;
            let filterTours = action.payload === "todos"?
            allcountriesTours.filter(c=>c.tours.length>0):
            allcountriesTours.filter(c=>c.tours.find(t=>t.name === action.payload));
            return {...state, countries: filterTours};
        default:
            return {...state};
    }
};

export default rootReducer;