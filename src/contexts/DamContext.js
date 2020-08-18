import React, { createContext, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestDam } from '../store/damReducer';
import { requestReceita } from '../store/receitaReducer';

import {
  requestContribuinte,
  cleanDataContribuinte
} from '../store/contribuinteReducer';

export const DamContext = createContext();

function DamProvider(props) {
  const {
    children,
    listDam,
    requestDam: handleRequestDam,
    requestReceita: handleRequestReceita,
    handleOpenNewDam,
    openNewDam,

    selectedReceita,
    listReceita,
    handleSelectReceita
  } = props;
  const [showNewDam, setShowNewDam] = useState(openNewDam);
  const [dams, setDams] = useState([]);
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    handleRequestDam({ page: 1 });
    handleRequestReceita({ page: 1 });
  }, [handleRequestDam, handleRequestReceita]);

  useEffect(() => setShowNewDam(openNewDam), [openNewDam]);
  useEffect(() => setDams(listDam), [listDam]);
  useEffect(() => {
    if (listReceita.length > 0) {
      listReceita.filter(
        (r) => r.cod !== '1121250000' && r.cod !== '1113050101'
      );
      setReceitas(listReceita);
    }
  }, [listReceita]);

  const handleCloseNewDam = () => {
    handleOpenNewDam(false);
  };
  console.log(receitas);
  return (
    <DamContext.Provider
      value={{
        dams,
        handleCloseNewDam,
        showNewDam,
        selectedReceita,
        receitas,
        handleSelectReceita
      }}>
      {children}
    </DamContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  listDam: state.dam.listDam,
  listReceita: state.receita.listReceita,
  listContribuinte: state.contribuinte.listContribuinte,

  valuesFormDocumento: state.form.documento,
  calculatedTaxes: state.form.tributos,

  responseStatusDam: state.dam.alterStatusDam
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestDam,
      requestReceita,
      requestContribuinte,
      cleanDataContribuinte
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DamProvider);
