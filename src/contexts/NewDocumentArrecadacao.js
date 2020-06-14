/* eslint-disable react/default-props-match-prop-types */
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const NewDocumentArrecadacaoContext = createContext();

const NewDocumentArrecadacaoProvider = ({
  children,
  isClosed,
  valuesInitial,
  listReceita
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [valuesDam, setValuesDam] = useState({ ...valuesInitial });
  const [selectedReceita, setSelectedReceita] = useState({
    ...valuesInitial.receita
  });

  useEffect(() => {
    if (isClosed) {
      setActiveStep(0);
      setValuesDam({});
      setSelectedReceita({});
    }
  }, [isClosed]);

  const [selectedContribuinte, setSelectedContribuinte] = useState({
    ...valuesInitial.contribuinte
  });

  function initialDocumento() {
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

    const dataInit = {
      receitaInfo: {
        emissao: emissaoParseToFR,
        vencimento,
        status: ''
      },
      contribuinte: { ...selectedContribuinte },
      documento: {
        referencia,
        emissao,
        vencimento,
        receita: selectedReceita.cod,
        docOrigem: valuesDam.n_ref,
        infoAdicionais: valuesDam.info_adicionais,
        valorPrincipal: valuesDam.valor_principal,
        juros: valuesDam.valor_juros,
        taxaExp: valuesDam.taxa_expedicao,
        valorTotal: valuesDam.valor_total,
        valorMulta: valuesDam.valor_multa
      },
      itensPreview: [
        {
          item: selectedReceita.descricao,
          valor: valuesDam.valor_principal
        },
        {
          item: 'Taxa de expedição',
          valor: valuesDam.taxa_expedicao
        },
        {
          item: 'Juros',
          valor: valuesDam.valor_juros
        }
      ]
    };
    return dataInit;
  }

  const [dataPreview, setDataPreview] = useState(initialDocumento());

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleDAM = (doc) => {
    const {
      vencimento,
      receita,
      juros,
      taxaExp,
      valorPrincipal
    } = doc.documento;

    setValuesDam((prev) => ({
      ...prev,
      ...doc
    }));
    setDataPreview((prev) => ({
      ...prev,
      ...doc,
      receitaInfo: {
        emissao: initialDocumento().receitaInfo.emissao,
        vencimento,
        status: ''
      },
      itensPreview: [
        {
          item: receita,
          valor: valorPrincipal
        },
        {
          item: 'Taxa de expedição',
          valor: taxaExp
        },
        {
          item: 'Juros',
          valor: juros
        }
      ]
    }));
  };

  const handleSelectReceita = (data) => {
    setSelectedReceita(data);
    setActiveStep(activeStep + 1);

    const {
      referencia,
      emissao,
      vencimento,
      docOrigem,
      infoAdicionais
    } = initialDocumento().documento;

    setValuesDam((prev) => ({
      documento: {
        referencia,
        emissao,
        vencimento,
        docOrigem,
        infoAdicionais,
        ...prev.documento,
        receita: data.cod,
        valorPrincipal: data.valor_fixo,
        taxaExp: data.valor_fixo > 0 ? 0 : 5,
        juros: 0.0,
        valorMulta: 0.0,
        valorTotal: data.valor_fixo > 0 ? data.valor_fixo : 5
      }
    }));

    setDataPreview((prev) => ({
      ...prev,
      documento: {
        referencia,
        emissao,
        vencimento,
        docOrigem,
        infoAdicionais,
        ...valuesDam.documento,
        receita: data.cod,
        valorPrincipal: data.valor_fixo,
        taxaExp: data.valor_fixo > 0 ? 0 : 5,
        juros: 0.0,
        valorMulta: 0.0,
        valorTotal: data.valor_fixo > 0 ? data.valor_fixo : 5
      },
      itensPreview: [
        {
          item: data.descricao,
          valor: data.valor_fixo
        },
        {
          item: 'Taxa de expedição',
          valor: data.valor_fixo > 0 ? 0 : 5
        },
        {
          item: 'Juros',
          valor: 0.0
        }
      ]
    }));
  };

  const handleSelectContribuinte = (data) => {
    setSelectedContribuinte(data);
    setDataPreview({
      ...dataPreview,
      contribuinte: {
        ...data
      }
    });
  };

  return (
    <NewDocumentArrecadacaoContext.Provider
      value={{
        isClosed,
        dataInitDocument: initialDocumento().documento,
        dataInitContribuinte: initialDocumento().contribuinte,
        valuesInitial,
        dataPreview,
        valuesDam,
        activeStep,
        listReceita,
        selectedReceita,
        selectedContribuinte,
        handleSelectContribuinte,
        handleSelectReceita,
        handleBack,
        handleNext,
        handleDAM
      }}>
      {children}
    </NewDocumentArrecadacaoContext.Provider>
  );
};

NewDocumentArrecadacaoProvider.defaultProps = {
  valuesInitial: {},
  listReceita: {}
};

NewDocumentArrecadacaoProvider.propTypes = {
  children: PropTypes.node,
  valuesInitial: PropTypes.object.isRequired,
  listReceita: PropTypes.array.isRequired
};

export default NewDocumentArrecadacaoProvider;
