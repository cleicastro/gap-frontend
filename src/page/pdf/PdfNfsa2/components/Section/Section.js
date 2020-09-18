import React from 'react';
import { Text, View, Image, Font } from '@react-pdf/renderer';
import logo from '../../../../../assets/logo.png';
import source from '../../fonts/Roboto/Roboto-Bold.ttf';

import { styles, Row, Column, TextValues, TextTitle } from './styles';

Font.register({
  family: 'Roboto',
  src: source
});

const formatConfig = {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  currencyDisplay: 'symbol'
};

const pathQRCode = window.location.href;

function Teste({ nfsa }) {
  const {
    id,
    dam,
    prestador,
    tomador,
    items_nfsa: itemsNFSA,
    valor_calculo: valorCalculo,
    valor_nota: valorNota,
    desconto_incodicional: descontoIncodicional,
    valor_deducao: valorDeducao,
    valor_iss: valorISS,
    aliquota_iss: aliquotaISS,
    pis_valor: pisValor,
    pis_percente: pisPercente,
    ir_valor: irValor,
    ir_percente: irPercente,
    inss_valor: inssValor,
    inss_percente: inssPercente,
    csll_percente: csllPercente,
    csll_valor: csllValor,
    confins_percente: confisPercente,
    confins_valor: confisValor
  } = nfsa;
  return (
    <View style={styles.section}>
      {/* header */}
      <View style={styles.gridContainer}>
        <Row style={{ flexGrow: 3, border: 1 }}>
          <Column style={{ marginLeft: 16 }}>
            <Image src={logo} style={styles.logo} />
          </Column>
          <Column>
            <View style={styles.gridCenter}>
              <Text style={styles.textCabecalho}>
                Prefeitura Municipal de Irituia
              </Text>
              <Text style={styles.textCabecalho}>
                Secretaria Municipal de Finanças
              </Text>
              <Text style={styles.textCabecalho}>Departamento de Tributos</Text>
              <Text style={styles.textCabecalho}>CNPJ: 05.193.123/0001-00</Text>
              <Text style={{ fontSize: 7, marginTop: 10 }}>
                NOTA FISCAL DE SERVIÇOS ELETRONICA - NFSe
              </Text>
            </View>
          </Column>
          <Column style={{ marginLeft: 16 }}>
            {/* <Image src={logo} style={styles.logo} /> */}
          </Column>
        </Row>
        <Row style={{ border: 1 }}>
          <View class={{ justifyContent: 'center' }}>
            <Column style={{ borderBottom: 1, padding: 0 }}>
              <TextTitle>Número da Nota:</TextTitle>
              <TextValues>{id}</TextValues>
            </Column>
            <Column style={{ borderBottom: 1, padding: 0 }}>
              <TextTitle>Data e Hora de Emissão:</TextTitle>
              <TextValues>
                {Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: false
                }).format(new Date(dam.emissao))}
              </TextValues>
            </Column>
            <View>
              <Row>
                <Column style={{ borderRight: 1, padding: 0, minHeight: 30 }}>
                  <TextTitle>Cód. Verificação:</TextTitle>
                  <TextValues />
                </Column>
                <Column style={{ padding: 0, minHeight: 30 }}>
                  <TextTitle>Recibo Provisório:</TextTitle>
                  <TextValues />
                </Column>
              </Row>
            </View>
          </View>
        </Row>
      </View>

      {/* participants (prestador/tomador) */}
      <View style={{ border: 1 }}>
        <Column>
          <TextTitle style={{ textAlign: 'center', fontFamily: 'Roboto' }}>
            PRESTADOR DE SERVIÇOS
          </TextTitle>
          <Row>
            <Column>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Nome/Razão Social: </TextTitle>
                <TextValues>{prestador.nome}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>CPF/CNPJ: </TextTitle>
                <TextValues>{prestador.doc}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Endereço: </TextTitle>
                <TextValues>{prestador.endereco}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Município: </TextTitle>
                <TextValues>{prestador.cidade}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Email: </TextTitle>
                <TextValues>{prestador.email}</TextValues>
              </View>
            </Column>
            <Column>
              <TextValues />
              <TextValues />
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>N°:</TextTitle>
                <TextValues>{prestador.numero}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>UF:</TextTitle>
                <TextValues>{prestador.uf}</TextValues>
              </View>
              <TextValues />
            </Column>
            <Column>
              <TextValues />
              <TextValues />
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Bairro:</TextTitle>
                <TextValues>{prestador.bairro}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>CEP:</TextTitle>
                <TextValues>{prestador.cep}</TextValues>
              </View>
              <TextValues />
            </Column>
          </Row>
        </Column>
      </View>
      <View style={{ border: 1 }}>
        <Column>
          <TextTitle style={{ textAlign: 'center', fontFamily: 'Roboto' }}>
            TOMADOR DE SERVIÇOS
          </TextTitle>
          <Row>
            <Column>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Nome/Razão Social: </TextTitle>
                <TextValues>{tomador.nome}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>CPF/CNPJ: </TextTitle>
                <TextValues>{tomador.doc}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Endereço: </TextTitle>
                <TextValues>{tomador.endereco}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Município: </TextTitle>
                <TextValues>{tomador.cidade}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Email: </TextTitle>
                <TextValues>{tomador.email}</TextValues>
              </View>
            </Column>
            <Column>
              <TextValues />
              <TextValues />
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>N°:</TextTitle>
                <TextValues>{tomador.numero}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>UF:</TextTitle>
                <TextValues>{tomador.uf}</TextValues>
              </View>
              <TextValues />
            </Column>
            <Column>
              <TextValues />
              <TextValues />
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Bairro:</TextTitle>
                <TextValues>{tomador.bairro}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>CEP:</TextTitle>
                <TextValues>{tomador.cep}</TextValues>
              </View>
              <TextValues />
            </Column>
          </Row>
        </Column>
      </View>

      {/* items */}
      <View style={styles.gridContainer}>
        <Row style={{ flexGrow: 3, border: 1 }}>
          <Column style={{ margin: 0, padding: 0 }}>
            <TextTitle style={{ textAlign: 'center', fontFamily: 'Roboto' }}>
              DISCRIMINAÇÃO
            </TextTitle>
          </Column>
        </Row>
      </View>
      <View style={styles.gridContainer}>
        <Row
          style={{
            flexGrow: 5,
            border: 1,
            minHeight: 220,
            alignItems: 'flex-start'
          }}>
          <Column>
            <TextValues>Item</TextValues>
            {itemsNFSA.map((item) => (
              <TextTitle key={item.id}>{item.descricao}</TextTitle>
            ))}
          </Column>
        </Row>
        <Row
          style={{
            flexGrow: 1,
            border: 1,
            minHeight: 220,
            alignItems: 'flex-start'
          }}>
          <Column>
            <TextValues>Qtde</TextValues>
            {itemsNFSA.map((item) => (
              <TextTitle key={item.id}>
                {Intl.NumberFormat('pt-BR', {
                  minimumFractionDigits: 2
                }).format(item.quantidade)}
              </TextTitle>
            ))}
          </Column>
        </Row>
        <Row
          style={{
            flexGrow: 1,
            border: 1,
            minHeight: 220,
            alignItems: 'flex-start'
          }}>
          <Column>
            <TextValues>Unitário R$</TextValues>
            {itemsNFSA.map((item) => (
              <TextTitle key={item.id}>
                {Intl.NumberFormat('pt-BR', {
                  minimumFractionDigits: 2
                }).format(item.valor)}
              </TextTitle>
            ))}
          </Column>
        </Row>
        <Row
          style={{
            flexGrow: 1,
            border: 1,
            minHeight: 220,
            alignItems: 'flex-start'
          }}>
          <Column>
            <TextValues>Total R$</TextValues>
            {itemsNFSA.map((item) => (
              <TextTitle key={item.id}>
                {Intl.NumberFormat('pt-BR', {
                  minimumFractionDigits: 2
                }).format(Number(item.valor) * Number(item.quantidade))}
              </TextTitle>
            ))}
          </Column>
        </Row>
      </View>

      {/* values 1 */}
      <View style={styles.gridContainer}>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>Total da Nota:</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(valorCalculo)}
            </TextValues>
          </Column>
        </Row>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>Desconto Incondicionado:</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(
                descontoIncodicional
              )}
            </TextValues>
          </Column>
        </Row>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>Total das deduções:</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(valorDeducao)}
            </TextValues>
          </Column>
        </Row>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>Base de cálculo:</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(valorCalculo)}
            </TextValues>
          </Column>
        </Row>
      </View>
      {/* values 2 */}
      <View style={styles.gridContainer}>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>PIS {`(${pisPercente}%)`}:</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(pisValor)}
            </TextValues>
          </Column>
        </Row>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>COFINS {`(${confisPercente}%)`}:</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(confisValor)}
            </TextValues>
          </Column>
        </Row>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>INSS {`(${inssPercente}%)`}:</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(inssValor)}
            </TextValues>
          </Column>
        </Row>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>IR {`(${irPercente}%)`}:</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(irValor)}
            </TextValues>
          </Column>
        </Row>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>CSLL {`(${csllPercente}%)`}:</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(csllValor)}
            </TextValues>
          </Column>
        </Row>
      </View>
      {/* values 3 */}
      <View style={styles.gridContainer}>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>Alíquota do ISS: (%)</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(aliquotaISS)}
            </TextValues>
          </Column>
        </Row>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>Valor do ISS:</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(valorISS)}
            </TextValues>
          </Column>
        </Row>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>Taxas:</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(
                dam.taxa_expedicao
              )}
            </TextValues>
          </Column>
        </Row>
        <Row style={{ flexGrow: 1, border: 1 }}>
          <Column style={{ aligItems: 'center', padding: 0, margin: 0 }}>
            <TextTitle>Valor Líquido:</TextTitle>
            <TextValues>
              {Intl.NumberFormat('pt-BR', formatConfig).format(valorNota)}
            </TextValues>
          </Column>
        </Row>
      </View>

      {/* footer 1 */}
      <View style={styles.gridContainer}>
        <Column style={{ margin: 0, padding: 0, flexGrow: 1, border: 1 }}>
          <TextTitle
            style={{ textAlign: 'center', fontFamily: 'Roboto', marginTop: 5 }}>
            OUTRAS INFORMAÇÕES
          </TextTitle>
          <Row>
            <Column style={{ flexGrow: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Competência da Nota Fiscal:</TextTitle>
                <TextValues>{dam.referencia}</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>ISS Retido:</TextTitle>
                <TextValues>Não</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Descrição da Atividade:</TextTitle>
                <TextValues> </TextValues>
              </View>
            </Column>
            <Column style={{ flexGrow: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Local da Prestação do Serviço:</TextTitle>
                <TextValues>Irituia</TextValues>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextTitle>Local de Incidência do Imposto:</TextTitle>
                <TextValues>Irituia</TextValues>
              </View>
            </Column>
          </Row>
          <Row>
            <Column>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <TextTitle>Tipo de serviço:</TextTitle>
                <TextValues />
              </View>
            </Column>
          </Row>
          <View style={{ marginTop: 10, alignItems: 'flex-end' }}>
            <TextTitle>Valide a nota por meio do QRCode</TextTitle>
            <Image
              src={`https://chart.googleapis.com/chart?cht=qr&chl=${pathQRCode}&chs=180x180&choe=UTF-8&chld=L|2`}
              style={styles.qrCode}
            />
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <TextTitle>Informações Adicionais:</TextTitle>
            <TextTitle> </TextTitle>
          </View>
        </Column>
      </View>
    </View>
  );
}

export default Teste;
