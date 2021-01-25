class Tributos {
  constructor(
    baseCalc,
    aliquotaIss,
    inssPercente,
    pisPercente,
    taxaExp,
    confinsPercente,
    csllPercente,
    tableIR,
    tableINSS
  ) {
    this.baseCalc = Number(baseCalc);
    this.aliquotaIss = Number(aliquotaIss);
    this.inssPercente = Number(inssPercente);
    this.pisPercente = Number(pisPercente);
    this.taxaExp = Number(taxaExp);
    this.confinsPercente = Number(confinsPercente);
    this.csllPercente = Number(csllPercente);
    this.tableIR = tableIR;
    this.tableINSS = tableINSS;
  }

  calcTributsNfsa() {
    const valorISS = (this.baseCalc * this.aliquotaIss) / 100;
    const pisValor = (this.baseCalc * this.pisPercente) / 100;
    // const inssValor = (this.baseCalc * this.inssPercente) / 100;
    const csllValor = (this.baseCalc * this.csllPercente) / 100;
    const confinsValor = (this.baseCalc * this.confinsPercente) / 100;

    const tableIRSelected = this.tableIR.find((faixa) => {
      return this.baseCalc <= Number(faixa.ate);
    });
    const tableINSSSelected = this.tableINSS.find((faixa) => {
      return this.baseCalc <= Number(faixa.ate);
    });

    const auxTableINSS =
      tableINSSSelected || this.tableINSS[this.tableINSS.length - 1];
    const inssValorCalc = this.baseCalc * (Number(auxTableINSS.aliquota) / 100);
    let inssValor = 0.0;
    if (inssValorCalc > 751.98) {
      inssValor = 751.98;
    } else {
      inssValor =
        this.baseCalc * (Number(auxTableINSS.aliquota) / 100) -
        Number(auxTableINSS.deducao);
    }

    const auxTableIR = tableIRSelected || this.tableIR[this.tableIR.length - 1];
    const irValorCalc =
      (this.baseCalc - inssValor) * (Number(auxTableIR.aliquota) / 100);
    const irValor =
      (this.baseCalc - inssValor) * (Number(auxTableIR.aliquota) / 100) -
      Number(auxTableIR.deducao);

    const valorNF =
      this.baseCalc -
      irValor -
      valorISS -
      pisValor -
      inssValor -
      confinsValor -
      csllValor -
      this.taxaExp;

    return {
      valorDeducao: auxTableIR.deducao,
      irPercente: auxTableIR.aliquota,
      irValorCalc: irValorCalc.toFixed(2),
      irValor: irValor.toFixed(2),
      irValorView: irValor.toFixed(2),
      valorISS: valorISS.toFixed(2),
      pisValor: pisValor.toFixed(2),
      inssPercente: auxTableINSS.aliquota,
      inssValorCalc: inssValorCalc.toFixed(2),
      inssValorView: inssValor.toFixed(2),
      inssValor: inssValor.toFixed(2),
      confinsValor: confinsValor.toFixed(2),
      csllValor: csllValor.toFixed(2),
      valorNF: valorNF.toFixed(2)
    };
  }

  converterValorBrutoLiquid(tributs) {
    const {
      aliquotaIss,
      irPercente,
      pisPercente,
      inssPercente,
      confinsPercente,
      csllPercente,

      irValor,
      valorISS,
      taxaExp,
      baseCalculo,
      pisValor,
      inssValor,
      confinsValor,
      csllValor
    } = tributs;

    const allPercentsTaxs =
      Number(aliquotaIss) +
      Number(pisPercente) +
      Number(inssPercente) +
      Number(confinsPercente) +
      Number(csllPercente);
    const percentLiquid =
      (100 - (Number(irPercente) + Number(allPercentsTaxs))) / 100;

    const totalTaxs =
      Number(taxaExp) +
      Number(valorISS) +
      Number(irValor) +
      Number(pisValor) +
      Number(inssValor) +
      Number(confinsValor) +
      Number(csllValor);

    const difTax = (totalTaxs / percentLiquid).toFixed(2);
    const result = Number(baseCalculo) + Number(difTax);

    return result;
  }
}

export default Tributos;
