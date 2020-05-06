import { combineReducers } from 'redux';
import { damReducer } from './damReducer';
import { receitaReducer } from './receitaReducer';

const mainReducer = combineReducers({
  dam: damReducer,
  receita: receitaReducer
});

export default mainReducer;
