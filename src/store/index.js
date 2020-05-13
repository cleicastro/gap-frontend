import { combineReducers } from 'redux';
import { damReducer } from './damReducer';
import { receitaReducer } from './receitaReducer';
import { paramsReducer } from './paramsReducer';

const mainReducer = combineReducers({
  dam: damReducer,
  receita: receitaReducer,
  paramsFilter: paramsReducer
});

export default mainReducer;
