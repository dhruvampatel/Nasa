import dateReducer from './date';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    dateReducer: dateReducer
});

export default allReducers;