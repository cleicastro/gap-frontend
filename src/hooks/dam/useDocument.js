import Dam from '../../util/Dam';

export const useDocument = () => {
  function setDocument(data) {
    const {
      emissao,
      receita,
      docOrigem,
      infoAdicionais,
      juros,
      valorMulta,
      taxaExp,
      valorPrincipal,
      cod
    } = data;

    const dam = new Dam(
      emissao,
      receita,
      docOrigem,
      infoAdicionais,
      juros,
      valorMulta,
      taxaExp,
      valorPrincipal
    );
    const document = {
      cod,
      referencia: dam.referencia,
      emissao: dam.emissao,
      emissaoFormatDate: dam.dateTimeFormat,
      vencimento: dam.vencimento,
      receita: dam.receita,
      docOrigem: dam.docOrigem,
      infoAdicionais: dam.infoAdicionais,
      juros: dam.juros,
      valorMulta: dam.valorMulta,
      valorPrincipal: dam.valorPrincipal,
      taxaExp: dam.taxaExp,
      valorTotal: dam.valorTotal
    };
    return document;
  }
  return setDocument;
};
