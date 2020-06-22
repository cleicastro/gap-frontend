import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import { styles, DocDam, DocValuesDam } from './styles';

function SectionRight({ damValue }) {
  const {
    id,
    n_ref: nRef,
    emissao,
    vencimento,
    referencia,
    valor_principal: valorPrincipal,
    taxa_expedicao: taxaEpediente,
    valor_juros: valorJuros,
    valor_multa: Valormulta,
    valor_total: valorTotal
  } = damValue;
  const { sigla, cod } = damValue.receita;

  return (
    <View style={styles.section}>
      <View style={styles.sectionCabecalhoDAM}>
        <View style={styles.dam}>
          <Text styles={styles.titleDAM}>DAM</Text>
          <Text>DOCUMENTO DE ARRECADAÇÃO MUNICIPAL</Text>
          <Text>OPERADOR: USUÁRIO</Text>
        </View>
        <View style={styles.damNumero}>
          <Text styles={styles.titleDAM}> DAM N° </Text>
          <Text> {id} </Text>
        </View>
      </View>

      <View style={styles.docDAM}>
        <View style={styles.itemsBloc2}>
          <DocDam>INSC: -</DocDam>
        </View>
        <View style={styles.itemsBloc2}>
          <DocDam>DOC. ORIGEM: {nRef} </DocDam>
        </View>
      </View>

      <View style={styles.docDAM}>
        <View style={styles.itemsBloc2}>
          <DocDam>EMISSÃO</DocDam>
        </View>
        <View style={styles.itemsBloc2}>
          <DocDam>VENCIMENTO</DocDam>
        </View>
        <View style={styles.itemsBloc2}>
          <DocDam>PARCELA</DocDam>
        </View>
        <View style={styles.itemsBloc2}>
          <DocDam>REFERÊNCIA</DocDam>
        </View>
      </View>

      <View style={styles.docDAM}>
        <View style={styles.itemsBloc2}>
          <View style={styles.itemsLabelDAM}>
            <DocDam>
              {Intl.DateTimeFormat('pt-BR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: 'UTC'
              }).format(new Date(emissao))}
            </DocDam>
          </View>
        </View>
        <View style={styles.itemsBloc2}>
          <DocDam>
            {Intl.DateTimeFormat('pt-BR', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              timeZone: 'UTC'
            }).format(new Date(vencimento))}
          </DocDam>
        </View>
        <View style={styles.itemsBloc2}>
          <DocDam>Única</DocDam>
        </View>
        <View style={styles.itemsBloc2}>
          <DocDam> {referencia} </DocDam>
        </View>
      </View>

      <View style={styles.docDAM}>
        <View
          style={{ width: 76, textAlign: 'center', border: 1, paddingTop: 3 }}>
          <DocDam>CÓDIGO</DocDam>
        </View>
        <View style={styles.itemsBloc2}>
          <DocDam>DESCRIÇÃO</DocDam>
        </View>
        <View
          style={{ width: 76, textAlign: 'center', border: 1, paddingTop: 3 }}>
          <DocDam>VALOR (R$)</DocDam>
        </View>
      </View>

      <View style={styles.docDAM}>
        <View style={{ width: 76, textAlign: 'center', border: 1 }}>
          <DocValuesDam> {cod} </DocValuesDam>
        </View>
        <View style={styles.itemsBloc2}>
          <DocValuesDam>{sigla}</DocValuesDam>
          <DocDam>TAXA DE EXPEDIENTE</DocDam>
          <DocDam>IRRF</DocDam>
          <DocDam>JUROS</DocDam>
          <DocDam style={{ marginBottom: 25 }}>MULTA</DocDam>
        </View>

        <View style={{ width: 76, textAlign: 'right', border: 1, padding: 3 }}>
          <DocValuesDam>
            {Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(
              valorPrincipal
            )}
          </DocValuesDam>
          <View style={styles.itemsLabelDAM}>
            <DocDam>
              {Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(
                taxaEpediente
              )}
            </DocDam>
            <DocDam>0,00</DocDam>
            <DocDam>
              {Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(
                valorJuros
              )}
            </DocDam>
            <DocDam>
              {Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(
                Valormulta
              )}
            </DocDam>
          </View>
        </View>
      </View>

      <View style={styles.docDAM}>
        <DocDam
          style={{
            width: 228,
            border: 1,
            padding: 3,
            fontSize: 12
          }}>
          TOTAL A PAGAR
        </DocDam>
        <DocDam
          style={{
            width: 76,
            border: 1,
            padding: 4,
            textAlign: 'right',
            fontSize: 10,
            paddingTop: 5
          }}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(valorTotal)}
        </DocDam>
      </View>
    </View>
  );
}

export default SectionRight;
