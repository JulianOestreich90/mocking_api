import {combineReducers} from 'redux';
import accordionReducer from './accordionReducer';
import innerAccordionReducer from "./innerAccordionReducer";
import signupReducer from "./signupReducer";
import loginReducer from "./loginReducer";
import readmeReducer from "./readmeReducer";
import {reducer as formReducer} from 'redux-form';


const reducers = {
    accordionReducer,
    innerAccordionReducer,
    signupReducer,
    loginReducer,
    readmeReducer,
    form: formReducer
};

export default combineReducers(reducers);