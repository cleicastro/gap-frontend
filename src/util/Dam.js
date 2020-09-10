class Dam {
  constructor(
    emissao,
    receita,
    docOrigem,
    infoAdicionais,
    juros,
    valorMulta,
    taxaExp,
    valorPrincipal
  ) {
    this.referencia = Intl.DateTimeFormat('fr-CA', {
      year: 'numeric',
      month: '2-digit'
    }).format(new Date(emissao));
    this.emissao = this.dateEmissao(new Date(emissao));
    this.vencimento = this.dateVencimento(new Date(emissao));
    this.receita = receita;
    this.docOrigem = docOrigem;
    this.infoAdicionais = infoAdicionais;
    this.juros = juros;
    this.valorMulta = valorMulta;
    this.valorPrincipal = valorPrincipal;
    this.taxaExp = taxaExp;
    this.valorTotal = this.calcValorTotal(
      juros,
      valorMulta,
      valorPrincipal,
      taxaExp
    );
  }

  dateVencimento(emissao) {
    const weekDay = emissao.getDay();
    let diasVencer = 5;
    if (weekDay === 1) {
      diasVencer = 7;
    } else if (weekDay === 2) {
      diasVencer = 6;
    }
    const newdate = emissao;
    const dateVencimentoAux = newdate.setDate(newdate.getDate() + diasVencer);

    return Intl.DateTimeFormat('fr-CA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(dateVencimentoAux));
  }

  dateEmissao(emissao) {
    if (emissao) {
      const dateValue = new Date(`${emissao.toString().split('GMT')[0]} UTC`)
        .toISOString()
        .split('.')[0];
      return dateValue;
    }
    return new Date();
  }

  calcValorTotal(juros, valorMulta, valorPrincipal, taxaExp) {
    const valorTotal =
      Number(juros) +
      Number(valorMulta) +
      Number(valorPrincipal) +
      Number(taxaExp);

    return valorTotal;
  }
}

export default Dam;
