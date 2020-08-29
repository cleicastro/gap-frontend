import React, { createContext, useState, useEffect, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Axios from 'axios';
import { useForm } from 'react-hook-form';

import {
  requestContribuinte,
  saveContribuinte,
  updateContribuinte,
  cleanDataContribuinte
} from '../store/contribuinteReducer';
import {
  requestReceitaWS,
  requestCorreiosCEP,
  cleanDataSearch
} from '../store/webServices';

export const ContribuinteContext = createContext();

const ContribuinteProvier = ({
  children,
  requestContribuinte: handleRequestContribuinte,
  saveContribuinte: handleSaveContribuinte,
  updateContribuinte: handleUpdateContribuinte,
  requestReceitaWS: handleSearchCNPJ,
  requestCorreiosCEP: handleSearchCEP,
  cleanDataContribuinte: handleCleanData,
  cleanDataSearch: handleCleanSearchWebservice,
  listContribuinte,
  updateDataContribuinte,
  newDataContribuinte,
  pagination,
  empresaResponse,
  enderecoResponse
}) => {
  const initialValueContribuinte = {
    tipo: 'PF',
    doc: '',
    nome: '',
    docEstadual: '',
    im: '',
    docEmissao: '',
    docOrgao: '',
    telefone: '',
    email: '',
    cep: '',
    uf: '',
    cidade: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    banco: '',
    agencia: '',
    conta: '',
    variacao: '',
    tipoConta: ''
  };
  const [contribuinte, setContribuinte] = useState(initialValueContribuinte);
  const [isDisbledForm, setIsDisabledForm] = React.useState(false);
  const [order, setOrder] = useState('id');
  const [sort, setSort] = useState(false);
  const [params, setParams] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isProgress, setIsProgress] = useState(false);
  const timerToClearSomewhere = useRef(false);

  const steps = [
    'Informações Pessoais',
    'Cadastro de Alvará',
    'Endereço',
    'Dados Bancários'
  ];
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  const { register, getValues, control, handleSubmit } = useForm({
    defaultValues: initialValueContribuinte
  });

  useEffect(() => {
    const tokenContribuinte = Axios.CancelToken.source();
    function request(token) {
      return handleRequestContribuinte(
        {
          ...params,
          order,
          sort,
          page: 1
        },
        token.token
      );
    }
    if (Object.keys(params).length !== 0) {
      timerToClearSomewhere.current = setTimeout(() => {
        request(tokenContribuinte);
      }, 500);
    } else {
      request(tokenContribuinte);
    }

    return () => {
      tokenContribuinte.cancel('Request cancell');
      clearTimeout(timerToClearSomewhere.current);
    };
  }, [handleRequestContribuinte, order, sort, params]);

  useEffect(() => {
    if (updateDataContribuinte.status === 200) {
      setOpenSnackbar(false);
      setIsProgress(false);
      handleCleanSearchWebservice();
    }
  }, [handleCleanSearchWebservice, updateDataContribuinte]);

  useEffect(() => {
    if (newDataContribuinte === 201) {
      // handleCleanData();
      setActiveStep(0);
      setIsDisabledForm(false);
      setContribuinte(initialValueContribuinte);
      setOpenSnackbar(false);
      setIsProgress(false);
      handleCleanSearchWebservice();
    }
  }, [
    handleCleanSearchWebservice,
    initialValueContribuinte,
    newDataContribuinte
  ]);

  function setPagination() {
    const tokenContribuinte = Axios.CancelToken.source();
    if (pagination.current_page < pagination.last_page) {
      handleRequestContribuinte(
        {
          ...params,
          order,
          sort,
          page: Number(pagination.current_page) + 1
        },
        tokenContribuinte.token
      );
    }
  }

  function handleOrderSort(campo, isDefaultOrder) {
    if (campo === order) {
      setSort((isSort) => !isSort);
    } else {
      setSort((isSort) => (isDefaultOrder ? true : !isSort));
      setOrder(campo);
    }
  }

  function handleParams(event) {
    const { id, value } = event.target;
    setParams((prev) => ({ ...prev, [id]: value }));
  }

  function changeValuesContribuinte(value) {
    setContribuinte((prev) => ({ ...prev, ...value }));
  }

  function handleSelectedContribuinte(value) {
    setContribuinte({ ...value });
    setIsDisabledForm(true);
  }

  function handleResetContribuinte() {
    setActiveStep(0);
    handleCleanData();
    setIsDisabledForm(false);
    setContribuinte(initialValueContribuinte);
  }

  function handleDisabledForm() {
    setIsDisabledForm(false);
    handleCleanData();
  }

  function searchCNPJ(value) {
    handleSearchCNPJ(value);
  }
  function searchCEP(value) {
    handleSearchCEP(value);
  }

  function handleNext() {
    setActiveStep(activeStep + 1);
    changeValuesContribuinte({ ...contribuinte, ...getValues() });
  }

  function handleBack() {
    setActiveStep(activeStep - 1);
    changeValuesContribuinte({ ...contribuinte, ...getValues() });
  }

  function salvarContribuinte(data) {
    setOpenSnackbar(true);
    setIsProgress(true);
    if (data.id) {
      setIsDisabledForm(true);
      handleUpdateContribuinte(data.id, data);
    } else {
      handleSaveContribuinte(data);
    }
  }

  function onSubmit(values) {
    console.log(values);
    salvarContribuinte({ ...contribuinte, ...values });
  }

  return (
    <ContribuinteContext.Provider
      value={{
        handleSelectedContribuinte,
        handleResetContribuinte,
        handleOrderSort,
        handleParams,
        setPagination,
        setOpenSnackbar,
        salvarContribuinte,
        requestCorreiosCEP,
        handleDisabledForm,
        changeValuesContribuinte,
        register,
        handleSubmit,
        searchCNPJ,
        searchCEP,
        getValues,
        onSubmit,
        handleNext,
        handleBack,
        activeStep,
        steps,
        isLastStep,
        empresaResponse,
        enderecoResponse,
        control,
        handleUpdateContribuinte,
        listContribuinte,
        updateDataContribuinte,
        order,
        sort,
        params,
        isDisbledForm,
        contribuinte,
        pagination,
        openSnackbar,
        isProgress
      }}>
      {children}
    </ContribuinteContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  listContribuinte: state.contribuinte.listContribuinte,
  updateDataContribuinte: state.contribuinte.updateDataContribuinte,
  newDataContribuinte: state.contribuinte.newDataContribuinte,
  pagination: state.contribuinte.pagination,
  empresaResponse: state.webservice.empresa,
  enderecoResponse: state.webservice.endereco
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestContribuinte,
      saveContribuinte,
      updateContribuinte,
      requestReceitaWS,
      requestCorreiosCEP,
      cleanDataContribuinte,
      cleanDataSearch
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContribuinteProvier);
