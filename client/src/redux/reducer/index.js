import { GET_COUNTRIES } from "../actions";
import { GET_COUNTRY_NAME } from "../actions";
import { GET_TOURS } from "../actions";
import { POST_TOUR } from "../actions";
import { FILTER_BY_CONTINENTE } from "../actions";
import { FILTER_ALFABETICO } from "../actions";
import { FILTER_TOURS } from "../actions";

const initialState = {
    allcountries: [],
    countries: [],
    tours: []
}

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
             return country;
        case "za": 
        country.sort(function (a, b) {
            let countrya = a.name.toUpperCase();
            let countryb = b.name.toUpperCase();
            if (countrya < countryb) {return 1};
            if (countrya > countryb) {return -1};
            return 0;
    });
    return country;
    };
};

const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {...state, countries:action.payload, allcountries:action.payload};
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
            let countriesAlfabet = ordenar(allCountriesAlfabetico, action.payload)
            console.log(countriesAlfabet);
            return {...state, countries: countriesAlfabet};
        case FILTER_TOURS:
            let allcountriesTours = state.countries;
            let filterTours = action.payload === "todos"?
            allcountriesTours.filter(c=>c.tours.length>0):
            allcountriesTours.filter(c=>c.tours.find(t=>t.name === action.payload));
            return {...state, filterTours};
        default:
            return {...state};
    }
};

export default rootReducer;