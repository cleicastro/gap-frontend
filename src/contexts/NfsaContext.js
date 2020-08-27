import React, { createContext, useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestNfsa, saveNFSA, editNFSA } from '../store/nfsaReducer';

import {
  requestContribuinte,
  cleanDataContribuinte
} from '../store/contribuinteReducer';
import { calcTributsNFSA, liquidToGrossNFSA } from '../store/formReducer';

export const NfsaContext = createContext();

function NfsaProvider(props) {
  const {
    children,
    requestNfsa: handleRequestNfsa,
    saveNFSA: serviceSaveNFSA,
    editNFSA: serviceEditNFSA,
    calcTributsNFSA: handleCalcTributs,
    liquidToGrossNFSA: handleLiquidToGross,
    handleOpenNewNfsa,
    openNewNfsa,
    listNfsa,
    insertedNFSA,
    updateNFSA,
    calculatedTaxes,
    valuesFormDocumento,
    responseStatusDam,
    valueTotal
  } = props;
  const [showReview, setReviewShow] = useState(false);
  const [showNewNfsa, setShowNewNfsa] = useState(openNewNfsa);
  const [participantes, setParticipantes] = useState({});
  const [valueFormTributos, setValuesFormTributos] = useState({
    ...calculatedTaxes,
    taxaExp: valuesFormDocumento.taxaExp
  });
  const [valueFormItems, setValuesFormItems] = useState([]);
  const [valueFormOriginTributos, setValueFormOriginTributos] = useState(null);
  const [dataLoadNFSA, setDataLoadNFSA] = useState(null);
  const [actionFormNFSA, setActionFormNFSA] = useState('new');

  const itensSkeletron = [];
  for (let i = 0; i < 10; i++) {
    itensSkeletron.push(i);
  }

  useEffect(() => {
    handleRequestNfsa({ page: 1 });
  }, [handleRequestNfsa]);

  useEffect(() => {
    const baseCalculo = Number(calculatedTaxes.baseCalculo || 0);

    function updateValueItems(items, total) {
      const { quantidade } = items[0];

      const result = baseCalculo / Number(quantidade);
      const newBaseCalc = result.toFixed(2) * 3;

      // recalcula caso haja dizima períodica
      if (total !== newBaseCalc) {
        const { aliquotaIss, taxaExp } = calculatedTaxes;
        handleCalcTributs(
          {
            baseCalculo: newBaseCalc,
            aliquotaIss,
            valorISS: (newBaseCalc * aliquotaIss) / 100,
            irPercente: 0,
            irValor: 0,
            taxaExp
          },
          true
        );
      }
      return [{ ...items[0], valor: result.toFixed(2) }];
    }

    if (baseCalculo > 0) {
      setValuesFormItems((items) => {
        const total = items.reduce(
          (acc, act) => acc + Number(act.quantidade) * Number(act.valor),
          0
        );
        return total !== baseCalculo ? updateValueItems(items, total) : items;
      });

      setValuesFormTributos(calculatedTaxes);
    }
  }, [calculatedTaxes, handleCalcTributs]);

  useEffect(() => setShowNewNfsa(openNewNfsa), [openNewNfsa]);

  const handleCloseNewNfsa = () => {
    handleOpenNewNfsa(false);
    setReviewShow(false);
    setValuesFormItems([]);
    setParticipantes({});
    setValuesFormTributos({});
    setActionFormNFSA('new');
  };

  const handleSelecetedNfsa = (data) => {
    setReviewShow(true);
    setDataLoadNFSA(data);
    setValuesFormItems(data.items_nfsa);
    setParticipantes({
      idPrestador: data.prestador.id,
      nomePrestador: data.prestador.nome,
      docPrestador: data.prestador.doc,
      enderecoPrestador: data.prestador.endereco,
      cidadePrestador: data.prestador.cidade,
      ufPrestador: data.prestador.uf,
      cepPrestador: data.prestador.cep,
      bairroPrestador: data.prestador.bairro,

      idTomador: data.tomador.id,
      nomeTomador: data.tomador.doc,
      docTomador: data.tomador.doc,
      enderecoTomador: data.tomador.endereco,
      cidadeTomador: data.tomador.cidade,
      ufTomador: data.tomador.uf,
      cepTomador: data.tomador.cep,
      bairroTomador: data.tomador.bairro
    });
    setValuesFormTributos({
      aliquotaIss: Number(data.aliquota_iss),
      irValor: Number(data.ir_valor),
      taxaExp: Number(data.dam.taxa_expedicao),
      valorISS: Number(data.valor_iss),
      valorNF: Number(data.valor_calculo),
      valorTotal: Number(data.dam.valor_total)
    });
  };

  const handleAddItem = (data) => {
    setValuesFormItems(data);
    const baseCalculo = data.reduce(
      (accumator, currentValue) =>
        accumator + currentValue.quantidade * currentValue.valor,
      0
    );
    const { aliquotaIss } = valueFormTributos;
    const { taxaExp } = valuesFormDocumento;
    if (baseCalculo > 0) {
      handleCalcTributs(
        {
          baseCalculo,
          aliquotaIss,
          valorISS: (baseCalculo * aliquotaIss) / 100,
          irPercente: 0,
          irValor: 0,
          taxaExp
        },
        true
      );
    }
  };

  const handleCalculationBasis = (data, selectedConverter) => {
    if (selectedConverter) {
      setValueFormOriginTributos((value) => value || valueFormTributos);
      const { baseCalculo, irPercente, irValor, valorISS, aliquotaIss } = data;
      const { taxaExp } = valueFormTributos;

      handleCalcTributs(
        {
          baseCalculo: Number(baseCalculo),
          irPercente: Number(irPercente),
          irValor: Number(irValor),
          valorISS: Number(valorISS),
          aliquotaIss: Number(aliquotaIss),
          taxaExp: Number(taxaExp)
        },
        false
      );
    } else {
      handleLiquidToGross(valueFormOriginTributos);
    }
  };

  const handleSaveNFSA = () => {
    const { idPrestador, idTomador } = participantes;
    if (actionFormNFSA !== 'edit') {
      serviceSaveNFSA(
        valueFormItems,
        { ...valueFormTributos, idPrestador, idTomador },
        valuesFormDocumento
      );
    } else {
      serviceEditNFSA(
        valueFormItems,
        { ...valueFormTributos, idPrestador, idTomador },
        { ...valuesFormDocumento, id: dataLoadNFSA.dam.id },
        dataLoadNFSA.id
      );
    }
  };

  const handleEditNFSA = () => {
    handleOpenNewNfsa(true);
    setReviewShow(false);
    setActionFormNFSA('edit');
  };

  const handleCopyNFSA = () => {
    handleOpenNewNfsa(true);
    setReviewShow(false);
    setActionFormNFSA('copy');

    // remove o id da lista dos itens para serem adicionados como novo item.
    setValuesFormItems((item) => {
      const newItem = item.map((value) => {
        const { descricao, quantidade, valor } = value;
        return {
          descricao,
          quantidade,
          valor
        };
      });
      return newItem;
    });
  };

  const { convertLiquid } = valueFormTributos;
  return (
    <NfsaContext.Provider
      value={{
        handleSelecetedNfsa,
        setReviewShow,
        handleCloseNewNfsa,
        setParticipantes,
        handleAddItem,
        handleCalculationBasis,
        handleSaveNFSA,
        setValueFormOriginTributos,
        handleEditNFSA,
        handleCopyNFSA,
        actionFormNFSA,
        handleAlterStatusDAM: false,
        responseStatusDam,
        participantes,
        convertLiquid,
        valueFormItems,
        valueFormTributos,
        valuesFormDocumento,
        listNfsa,
        showNewNfsa,
        itensSkeletron,
        valueTotal,
        showReview,
        insertedNFSA,
        updateNFSA,
        dataLoadNFSA
      }}>
      {children}
    </NfsaContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  listNfsa: state.nfsa.listNfsa,
  insertedNFSA: state.nfsa.newNFSA,
  updateNFSA: state.nfsa.updateNFSA,

  valueTotal: state.nfsa.listNfsa.reduce(
    (acc, act) => acc + Number(act.valor_nota),
    0
  ),
  errorNFSA: state.nfsa.error,
  listContribuinte: state.contribuinte.listContribuinte,

  valuesFormDocumento: state.form.documento,
  calculatedTaxes: state.form.tributos
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestNfsa,
      saveNFSA,
      editNFSA,
      requestContribuinte,
      cleanDataContribuinte,
      calcTributsNFSA,
      liquidToGrossNFSA
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NfsaProvider);
