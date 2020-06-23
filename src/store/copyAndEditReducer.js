const ACTIONS = {
  DATA_DAM: 'DATA_DAM',
  CLEAN_DAM_COPY: 'CLEAN_DAM_COPY',
  ERROR: 'ERRO_EDIT_COPY'
};

function dateInitialDocumento() {
  const toDay = new Date();
  const weekDay = toDay.getDay();
  let diasVencer = 5;

  if (weekDay === 1) {
    diasVencer = 7;
  } else if (weekDay === 2) {
    diasVencer = 6;
  }

  const referencia = Intl.DateTimeFormat('fr-CA', {
    year: 'numeric',
    month: '2-digit'
  }).format(toDay);

  const emissao = Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(toDay);

  const vencimento = Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(toDay.setDate(toDay.getDate() + diasVencer));

  const emissaoParseToFR = new Date(
    `${new Date().toString().split('GMT')[0]} UTC`
  )
    .toISOString()
    .split('.')[0]
    .replace('T', ' ');

  return {
    referencia,
    emissao,
    emissaoParseToFR,
    vencimento
  };
}

const {
  referencia,
  emissao,
  emissaoParseToFR,
  vencimento
} = dateInitialDocumento();

const INITIAL_STATE = {
  dataSave: {
    receitaInfo: {
      emissao: emissaoParseToFR,
      vencimento,
      status: ''
    },
    contribuinte: {
      nome: '',
      doc: '',
      endereco: '',
      cidade: '',
      uf: '',
      cep: '',
      bairro: ''
    },
    documento: {
      referencia,
      emissao,
      vencimento,
      receita: '',
      docOrigem: '',
      infoAdicionais: 'teste',
      valorPrincipal: 0,
      juros: 0.0,
      taxaExp: 0,
      valorTotal: 0,
      valorMulta: 0
    },
    itensPreview: [
      {
        item: '',
        valor: 0
      },
      {
        item: 'Taxa de expedição',
        valor: 0
      },
      {
        item: 'Juros',
        valor: 0.0
      }
    ]
  }
};

export const copyAndEditReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.DATA_DAM:
      return {
        ...state,
        dataSave: { ...state.dataSave, ...action.dataSave }
      };
    case ACTIONS.CLEAN_DAM_COPY:
      return {
        ...state,
        dataSave: { ...state }
      };
    default:
      return state;
  }
};

export const dataPrepareRequest = (data) => {
  const { documento, editData } = { ...data };
  const {
    emissaoParseToFR: emissaoNew,
    vencimento: vencimentoNew
  } = dateInitialDocumento();

  const receitaInfo = {
    vencimento: documento ? documento.vencimento : vencimentoNew,
    emissao: editData ? documento.emissao : emissaoNew,
    situacao: editData ? editData.situacao : ''
  };

  return (dispatch) => {
    try {
      dispatch({
        type: ACTIONS.DATA_DAM,
        dataSave: {
          ...data,
          receitaInfo
        }
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        error: {
          ...error.response.data,
          status: error.response.status
        }
      });
    }
  };
};

export const cleanData = () => {
  return (dispatch) => {
    try {
      dispatch({
        type: ACTIONS.CLEAN_DAM_COPY,
        dataSave: {}
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        error
      });
    }
  };
};
