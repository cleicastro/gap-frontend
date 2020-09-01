import React from 'react';
import { Text, View, Image } from '@react-pdf/renderer';

import logo from '../../../assets/logo.png';
import { styles, Observacao, TextRed, TitleDam, DocDam } from './styles';

function SectionLeft({ contribuinte, infoAdicionais }) {
  const {
    doc,
    nome,
    endereco,
    numero,
    bairro,
    cidade,
    uf,
    email
  } = contribuinte;

  return (
    <View style={styles.section}>
      <View style={styles.sectionCabecalho}>
        <Image src={logo} style={styles.logo} />
        <View style={styles.title}>
          <Text>Prefeitura Municipal de Irituia</Text>
          <Text>Secretaria Municipal de Finanças</Text>
          <Text>Departamento de Tributos</Text>
          <Text>CNPJ: 05.193.123/0001-00</Text>
        </View>
      </View>
      <View style={styles.idContribuinte}>
        <View style={styles.titleContribuinte}>
          <TitleDam>IDENTIFICAÇÃO DO CONTRIBUINTE</TitleDam>
        </View>
        <View style={styles.dataContribuinte}>
          <TitleDam>CPF/CNPJ: </TitleDam>
          <Text>{doc}</Text>
        </View>
        <View style={styles.dataContribuinte}>
          <TitleDam>NOME: </TitleDam>
          <Text style={{ maxWidth: 250 }}>{nome}</Text>
        </View>
        <View style={styles.dataContribuinte}>
          <TitleDam>ENDEREÇO: </TitleDam>
          <Text style={{ maxWidth: 228 }}>{`${endereco}, N°: ${numero}`}</Text>
        </View>
        <View style={styles.dataContribuinte}>
          <TitleDam>BAIRRO: </TitleDam>
          <Text> {bairro} </Text>
        </View>
        <View style={styles.dataContribuinte}>
          <TitleDam>MUNICÍPIO: </TitleDam>
          <Text>
            {cidade} / {uf}
          </Text>
        </View>
        <View style={styles.dataContribuinte}>
          <TitleDam>E-MAIL: </TitleDam>
          <Text> {email} </Text>
        </View>
      </View>
      <View style={styles.observacao}>
        <View style={styles.titleObs}>
          <Text> OBSERVAÇÃO </Text>
        </View>
        <Observacao>
          Pagável na SEFIN ou Banco do Brasil AG: 2144-X C/C: 27015-6 Sr.
          contribuinte, trazer comprovante de pagamento na SEFIN.
        </Observacao>
      </View>
      <View style={styles.rodape}>
        <DocDam style={{ maxWidth: 260, textAlign: 'justify' }}>
          {infoAdicionais}
        </DocDam>
      </View>
    </View>
  );
}

export default SectionLeft;
