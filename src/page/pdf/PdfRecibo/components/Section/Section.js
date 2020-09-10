import React from 'react';
import { Text, View, Image, Font } from '@react-pdf/renderer';
import extenso from 'extenso';
import logo from '../../../../../assets/logo.png';
import source from '../../fonts/Roboto/Roboto-Bold.ttf';

import { styles, Row, Column, TextValues, TextTitle } from './styles';

Font.register({
  family: 'Roboto',
  src: source
});

function Teste({ nfsa }) {
  const {
    dam,
    prestador,
    items_nfsa: items,
    valor_calculo: valorCalculo,
    valor_nota: valorNota,
    valor_iss: valorISS,
    inss_valor: valorINSS,
    ir_valor: irValor
  } = nfsa;
  return (
    <View style={styles.section}>
      {/* header */}
      <View style={styles.gridContainer}>
        <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Column>
            <View style={styles.gridCenter}>
              <Image src={logo} style={styles.logo} />
              <Text style={styles.textCabecalho}>
                Prefeitura Municipal de Irituia
              </Text>
              <Text style={styles.textCabecalho}>
                Secretaria Municipal de Finanças
              </Text>
              <Text style={styles.textCabecalho}>
                Tesouraria da Prefeitura Municipal de Irituia
              </Text>
              <Text style={styles.textCabecalho}>CNPJ: 05.193.123/0001-00</Text>
            </View>
          </Column>
        </Row>
      </View>

      {/* participants (prestador/tomador) */}
      <View style={{ borderTop: 1 }}>
        <Column>
          <TextTitle
            style={{
              textAlign: 'center',
              fontFamily: 'Roboto',
              marginTop: 30,
              fontSize: 16
            }}>
            RECIBO
          </TextTitle>
          <TextValues
            style={{
              marginTop: 20,
              marginBottom: 20,
              fontSize: 12
            }}>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(valorCalculo)}
          </TextValues>
          <TextTitle style={{ textAlign: 'justify' }}>
            {`Recebi do(a) Prefeitura Municipal de Irituia a importância de R$ ${Intl.NumberFormat(
              'pt-BR',
              {
                style: 'currency',
                currency: 'BRL'
              }
            ).format(valorCalculo)} (${extenso(
              Intl.NumberFormat('pt-BR').format(valorCalculo),
              {
                mode: 'currency'
              }
            ).toUpperCase()}), Referente a ${
              items[0].descricao
              }. Sendo pago conforme demostrativo abaixo.`}
          </TextTitle>
        </Column>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40
        }}>
        <Column>
          <Row>
            <Column>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <TextTitle>Valor Total: </TextTitle>
                <TextValues>
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(valorCalculo)}
                </TextValues>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <TextTitle>ISSQN: </TextTitle>
                <TextValues>
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(valorISS)}
                </TextValues>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <TextTitle>INSS: </TextTitle>
                <TextValues>
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(valorINSS)}
                </TextValues>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <TextTitle>IRRF: </TextTitle>
                <TextValues>
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(irValor)}
                </TextValues>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <TextTitle>Taxa de Expediente: </TextTitle>
                <TextValues>
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(dam.taxa_expedicao)}
                </TextValues>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderTop: 1,
                  justifyContent: 'space-between',
                  marginTop: 10
                }}>
                <TextTitle>Valor à receber: </TextTitle>
                <TextValues>
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(valorNota)}
                </TextValues>
              </View>
            </Column>
          </Row>
        </Column>
      </View>

      <View>
        <Row style={{ marginTop: 40, lineHeight: 3 }}>
          <Column>
            <TextTitle>E por ser verdade assino o presente:</TextTitle>
            <TextTitle>
              Irituia - PA, _______ de ______________________ de ________.
            </TextTitle>
          </Column>
        </Row>
      </View>
      <View>
        <Row
          style={{ marginTop: 40, alignItems: 'center', textAlign: 'center' }}>
          <Column>
            <TextTitle>
              _______________________________________________
            </TextTitle>
            <TextTitle>{prestador.nome} </TextTitle>
            <TextTitle>{prestador.doc}</TextTitle>
            <TextTitle>{`${prestador.banco} Ag.: ${prestador.agencia} ${prestador.tipoConta} Conta: ${prestador.conta}`}</TextTitle>
          </Column>
        </Row>
      </View>
    </View>
  );
}

export default Teste;
