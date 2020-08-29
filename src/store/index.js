import { combineReducers } from 'redux';
import { damReducer } from './damReducer';
import { receitaReducer } from './receitaReducer';
import { contribuinteReducer } from './contribuinteReducer';
import { webServiceReducer } from './webServices';
import { copyAndEditReducer } from './copyAndEditReducer';
import { authReducer } from './loginRedux';
import { nfsaReducer } from './nfsaReducer';
import { alvaraReducer } from './alvaraFuncionamentoReducer';
import { formReducer } from './formReducer';

const mainReducer = combineReducers({
  dam: damReducer,
  receita: receitaReducer,
  contribuinte: contribuinteReducer,
  webservice: webServiceReducer,
  copyAndEdit: copyAndEditReducer,
  auth: authReducer,
  nfsa: nfsaReducer,
  alvaraFuncionamento: alvaraReducer,
  form: formReducer
});

export default mainReducer;
