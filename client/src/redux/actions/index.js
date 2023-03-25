import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_NAME = "GET_COUNTRY_NAME";
export const GET_TOURS = "GET_TOURS";
export const POST_TOUR = "POST_TOUR";


export function getCountries () {
    return async function (dispatch) {
        const json = await axios.get ("http://localhost:3001/countries");
        return dispatch ({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
};

export function getCountriName (name) {
    return async function (dispatch) {
        try {
            const json = await axios.get (`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: GET_COUNTRY_NAME,
                payload: json.data
            })
        } catch (error) {
            return dispatch({
                type: GET_COUNTRY_NAME,
                payload: error.message
            })
        }
    }
};

export function getTours () {
    return async function (dispatch) {
        const json = await axios.get ("http://localhost:3001/tours");
        return dispatch ({
            type: GET_TOURS,
            payload: json.data
        })
    }
};

export function postTour (form) {
        return async function (dispatch){
            await axios.post("http://localhost:3001/tours", form);
            return dispatch ({type:POST_TOUR, payload:form})
        }
};
