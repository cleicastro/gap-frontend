import { combineReducers } from 'redux';
import { damReducer } from './damReducer';
import { receitaReducer } from './receitaReducer';
import { contribuinteReducer } from './contribuinteReducer';
import { webServiceReducer } from './webServices';
import { copyAndEditReducer } from './copyAndEditReducer';

const mainReducer = combineReducers({
  dam: damReducer,
  receita: receitaReducer,
  contribuinte: contribuinteReducer,
  webservice: webServiceReducer,
  copyAndEdit: copyAndEditReducer
});

export default mainReducer;
