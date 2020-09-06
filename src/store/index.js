import { combineReducers } from 'redux';
import { receitaReducer } from './receitaReducer';
import { contribuinteReducer } from './contribuinteReducer';
import { webServiceReducer } from './webServices';
import { authReducer } from './loginRedux';
import { nfsaReducer } from './nfsaReducer';
import { themeReducer } from './themeReducer';
import { datePaymentDam } from './datePayDam';

const mainReducer = combineReducers({
  receita: receitaReducer,
  contribuinte: contribuinteReducer,
  webservice: webServiceReducer,
  auth: authReducer,
  nfsa: nfsaReducer,
  theme: themeReducer,
  datePayment: datePaymentDam
});

export default mainReducer;
