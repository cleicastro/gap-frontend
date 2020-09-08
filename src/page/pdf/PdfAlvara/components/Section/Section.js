import React from 'react';
import { View, Image, Font } from '@react-pdf/renderer';
import logo from '../../../../../assets/logo.png';
import source from '../../fonts/Roboto/Roboto-Bold.ttf';

import { styles, Row, Column, TextValues, TextTitle } from './styles';

Font.register({
  family: 'Roboto',
  src: source
});

function Teste({ alvara }) {
  const {
    atividade_principal: atividadePrincipal,
    atividade_secundaria_I: atividadeSecundariaI,
    atividade_secundaria_II: atividadeSecundariaII,
    bairro,
    cidade,
    endereco,
    numero,
    uf,
    inscricao_municipal: inscricaoMunicipal,
    nome_fantasia: nomeFantasia
  } = alvara;
  const {
    contribuinte: { nome, doc, id }
  } = alvara.dam;
  return (
    <View style={styles.section}>
      <View style={styles.main}>
        <View style={styles.gridContainer}>
          <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Column>
              <View style={styles.gridCenter}>
                <Image src={logo} style={styles.logo} />
                <TextTitle
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 16
                  }}>
                  ALVARÁ
                </TextTitle>
                <TextTitle
                  style={{
                    marginTop: 15,
                    marginBottom: 15,
                    fontSize: 10
                  }}>
                  FUNCIONAMENTO
                </TextTitle>
              </View>
            </Column>
          </Row>
        </View>

        {/* participants (prestador/tomador) */}
        <View>
          <Column style={{ lineHeight: 1.6 }}>
            <TextValues style={{ textAlign: 'justify' }}>
              Nome ou Razão Social: {nome}
            </TextValues>
            <TextValues style={{ textAlign: 'justify' }}>
              Nome Fantasia: {nomeFantasia}
            </TextValues>
            <TextValues style={{ textAlign: 'justify' }}>
              CPF/CNPJ: {doc}
            </TextValues>
            <TextValues style={{ textAlign: 'justify' }}>
              Atividade Principal: {atividadePrincipal}
            </TextValues>
            <TextValues style={{ textAlign: 'justify' }}>
              Atividade Secundária I: {atividadeSecundariaI}
            </TextValues>
            <TextValues style={{ textAlign: 'justify' }}>
              Atividade Secundária II: {atividadeSecundariaII}
            </TextValues>
            <TextValues style={{ textAlign: 'justify' }}>
              Inscrição Municipal: {inscricaoMunicipal}
            </TextValues>
            <TextValues style={{ textAlign: 'justify' }}>
              Cad. Econômico: {id}
            </TextValues>
            <TextValues style={{ textAlign: 'justify' }}>
              Endereço: {endereco} Nº: {numero}
            </TextValues>
            <TextValues style={{ textAlign: 'justify' }}>
              Bairro: {bairro} {cidade}/{uf}
            </TextValues>
          </Column>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10
          }}>
          <Row>
            <Column>
              <TextValues>Validade: 01/01/2020 a 31/12/2020</TextValues>
            </Column>
          </Row>
        </View>

        <View>
          <Column>
            <TextTitle
              style={{ textAlign: 'justify', fontSize: 8, marginTop: 10 }}>
              OBS: Funcionar dentro das normas estabelecidas por Lei Municipal
              Nº 240/00.
            </TextTitle>
            <Row>
              <TextTitle style={{ textAlign: 'justify', marginTop: 10 }}>
                Recomenda-se aos senhores proprietários de sons automotivos,
                bares e outras fontes sonoras, atendam aos limites da emissão
                sonora, de acordo com a lei nº 351/2011, sob pena de incorrer em
                ato de infração à legislação ambiental.
              </TextTitle>
            </Row>
          </Column>
        </View>
        <Row style={{ marginTop: 20 }}>
          <View style={{ justifyContent: 'center' }}>
            <Column>
              <TextTitle>__________________________</TextTitle>
              <TextValues style={{ marginLeft: 8 }}>
                Carmelina de Nazaré M. da Costa
              </TextValues>
              <TextValues style={{ marginLeft: 20 }}>
                Prefeita Municipal de Irituia
              </TextValues>
            </Column>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Column>
              <TextTitle>__________________________</TextTitle>
              <TextValues style={{ marginLeft: 20 }}>
                Cleidiane Carvalho Gomes
              </TextValues>
              <TextValues style={{ marginLeft: 10 }}>
                Secretária Municipal de Finanças
              </TextValues>
            </Column>
          </View>
        </Row>
      </View>
    </View>
  );
}

export default Teste;
