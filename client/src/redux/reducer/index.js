import { GET_COUNTRIES } from "../actions";
import { GET_COUNTRY_NAME } from "../actions";
import { GET_TOURS } from "../actions";
import { POST_TOUR } from "../actions";

const initialState = {
    countries: [],
    tours: []
}


const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {...state, countries:action.payload};
        case GET_COUNTRY_NAME:
            return {...state, countries:action.payload};
        case GET_TOURS:
            return {...state, tours:action.payload};
        case POST_TOUR:
            return {...state, tours:action.payload};
        default:
            return {...state};
    }
};

export default rootReducer;