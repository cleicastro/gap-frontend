import { combineReducers } from 'redux';
import { damReducer } from './damReducer';
import { receitaReducer } from './receitaReducer';
import { paramsReducer } from './paramsReducer';
import { contribuinteReducer } from './contribuinteReducer';

const mainReducer = combineReducers({
  dam: damReducer,
  receita: receitaReducer,
  paramsFilter: paramsReducer,
  contribuinte: contribuinteReducer
});

export default mainReducer;
