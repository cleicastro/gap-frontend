import React from 'react';
import {
  TextTitle,
  Text,
  TitleContribuinte,
  TextContainer,
  Row,
  RowItem,
  ColumnItem,
  ContainerTax
} from './styles';

const pathQRCode = window.location.href;
const formatConfig = {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  currencyDisplay: 'symbol'
};

const ContainerNFSA = ({ nfsa }) => {
  const {
    id,
    dam,
    prestador,
    tomador,
    items_nfsa: itemsNFSA,
    info_adicionais: infoAdicionais,
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
    <table border="1" cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td>
            <img
              src="/images/logos/logo.png"
              width="150"
              height="90"
              border="0"
              align="left"
              alt="logo"
              style={{ marginTop: 5 }}
            />
            <TextTitle>Prefeitura Municipal de Irituia</TextTitle>
            <TextTitle>Secretaria Municipal de Finanças</TextTitle>
            <TextTitle>Departamento de Tributos</TextTitle>
            <TextTitle>CNPJ: 05.193.123./0001-00</TextTitle>
            <Text style={{ marginTop: 7, textAlign: 'center', fontSize: 9 }}>
              NOTA FISCAL DE SERVIÇOS ELETRONICA - NFSe
            </Text>
          </td>
          <td>
            <TextContainer style={{ padding: 5 }}>
              Número da Nota:
            </TextContainer>
            <Text style={{ borderBottom: '1px solid', padding: 5 }}>{id}</Text>
            <TextContainer style={{ padding: 5 }}>
              Data e Hora de Emissão:
            </TextContainer>
            <Text style={{ borderBottom: '1px solid', padding: 5 }}>
              {Intl.DateTimeFormat('pt-BR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
              }).format(new Date(dam.emissao))}
            </Text>
            <TextContainer>Cód. Verificação:</TextContainer>
            <Text> </Text>
          </td>
        </tr>
        <tr>
          <td colSpan="2" style={{ padding: 5 }}>
            <TitleContribuinte>PRESTADOR DE SERVIÇOS</TitleContribuinte>
            <Text>
              CPF/CNPJ: <TextContainer>{prestador.doc}</TextContainer>
            </Text>
            <Text>
              NOME: <TextContainer>{prestador.nome}</TextContainer>
            </Text>
            <Text>
              ENDEREÇO:
              <TextContainer> {prestador.endereco}, </TextContainer>
              N°:
              <TextContainer> {prestador.numero}</TextContainer>
              BAIRRO: <TextContainer> {prestador.bairro}</TextContainer>
            </Text>
            <Text>
              MUNICÍPIO: <TextContainer>{prestador.cidade}</TextContainer>
              UF: <TextContainer>{prestador.uf}</TextContainer>
              CEP: <TextContainer>{prestador.cep}</TextContainer>
            </Text>
            <Text>
              E-MAIL: <TextContainer>{prestador.email} </TextContainer>
            </Text>
          </td>
        </tr>
        <tr>
          <td colSpan="2" style={{ padding: 5 }}>
            <TitleContribuinte>TOMADOR DE SERVIÇOS</TitleContribuinte>
            <Text>
              CPF/CNPJ: <TextContainer>{tomador.doc}</TextContainer>
            </Text>
            <Text>
              NOME: <TextContainer>{tomador.nome}</TextContainer>
            </Text>
            <Text>
              ENDEREÇO:
              <TextContainer> {tomador.endereco}, </TextContainer>
              N°:
              <TextContainer> {tomador.numero}</TextContainer>
              BAIRRO: <TextContainer> {tomador.bairro}</TextContainer>
            </Text>
            <Text>
              MUNICÍPIO: <TextContainer>{tomador.cidade}</TextContainer>
              UF: <TextContainer>{prestador.uf}</TextContainer>
              CEP: <TextContainer>{tomador.cep}</TextContainer>
            </Text>
            <Text>
              E-MAIL: <TextContainer>{tomador.email} </TextContainer>
            </Text>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <TitleContribuinte>DISCRIMINAÇÃO</TitleContribuinte>
          </td>
        </tr>
        <tr>
          <td>
            <ColumnItem style={{ padding: 5, minWidth: 450 }}>
              <TextContainer>Item</TextContainer>
              {itemsNFSA.map((item) => (
                <Text style={{ marginTop: 10 }} key={item.id}>
                  {item.descricao}
                </Text>
              ))}
            </ColumnItem>
          </td>
          <td>
            <RowItem>
              <ColumnItem
                style={{ borderRight: '1px solid', width: 70, padding: 5 }}>
                <TextContainer
                  style={{
                    display: 'block',
                    marginBottom: 10,
                    marginTop: 5
                  }}>
                  Qtd
                </TextContainer>
                {itemsNFSA.map((item) => (
                  <Text key={item.id}>
                    {Intl.NumberFormat('pt-BR', {
                      minimumFractionDigits: 2
                    }).format(item.quantidade)}
                  </Text>
                ))}
              </ColumnItem>
              <ColumnItem
                style={{ borderRight: '1px solid', width: 79, padding: 5 }}>
                <TextContainer
                  style={{
                    display: 'block',
                    marginBottom: 10,
                    marginTop: 5
                  }}>
                  Unitário R$
                </TextContainer>
                {itemsNFSA.map((item) => (
                  <Text key={item.id}>
                    {Intl.NumberFormat('pt-BR', {
                      minimumFractionDigits: 2
                    }).format(item.valor)}
                  </Text>
                ))}
              </ColumnItem>
              <ColumnItem style={{ width: 70, padding: 5 }}>
                <TextContainer
                  style={{
                    display: 'block',
                    marginBottom: 10,
                    marginTop: 5
                  }}>
                  Total R$
                </TextContainer>
                {itemsNFSA.map((item) => (
                  <Text key={item.id}>
                    {Intl.NumberFormat('pt-BR', {
                      minimumFractionDigits: 2
                    }).format(Number(item.valor) * Number(item.quantidade))}
                  </Text>
                ))}
              </ColumnItem>
            </RowItem>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <ContainerTax>
              <div style={{ padding: 5, width: 145 }}>
                <Text>Total da Nota:</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(
                    valorCalculo
                  )}
                </TextContainer>
              </div>
              <div style={{ padding: 5, width: 150 }}>
                <Text>Desconto Incondicionado:</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(
                    descontoIncodicional
                  )}
                </TextContainer>
              </div>
              <div style={{ padding: 5, width: 145 }}>
                <Text>Total das deduções:</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(
                    valorDeducao
                  )}
                </TextContainer>
              </div>
              <div style={{ padding: 5, width: 145 }}>
                <Text>Base de cálculo:</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(
                    valorCalculo
                  )}
                </TextContainer>
              </div>
            </ContainerTax>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <ContainerTax>
              <div style={{ padding: 5, width: 145 }}>
                <Text>PIS {`(${pisPercente}%)`}:</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(pisValor)}
                </TextContainer>
              </div>
              <div style={{ padding: 5, width: 145 }}>
                <Text>COFINS {`(${confisPercente}%)`}:</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(confisValor)}
                </TextContainer>
              </div>
              <div style={{ padding: 5, width: 145 }}>
                <Text>INSS {`(${inssPercente}%)`}:</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(inssValor)}
                </TextContainer>
              </div>
              <div style={{ padding: 5, width: 145 }}>
                <Text>IR {`(${irPercente}%)`}:</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(irValor)}
                </TextContainer>
              </div>
              <div style={{ padding: 5, width: 145 }}>
                <Text>CSLL {`(${csllPercente}%)`}:</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(csllValor)}
                </TextContainer>
              </div>
            </ContainerTax>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <ContainerTax>
              <div style={{ padding: 5, width: 145 }}>
                <Text>Alíquota do ISS: (%)</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(aliquotaISS)}
                </TextContainer>
              </div>
              <div style={{ padding: 5, width: 145 }}>
                <Text>Valor do ISS:</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(valorISS)}
                </TextContainer>
              </div>
              <div style={{ padding: 5, width: 145 }}>
                <Text>Taxas:</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(
                    dam.taxa_expedicao
                  )}
                </TextContainer>
              </div>
              <div style={{ padding: 5, width: 145 }}>
                <Text>Valor Líquido:</Text>
                <TextContainer>
                  {Intl.NumberFormat('pt-BR', formatConfig).format(valorNota)}
                </TextContainer>
              </div>
            </ContainerTax>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ padding: 5 }}>
            <TitleContribuinte>OUTRAS INFORMAÇÕES</TitleContribuinte>
            <Text>
              Competência da Nota Fiscal:{' '}
              <TextContainer>{dam.referencia}</TextContainer>
            </Text>
            <Row>
              <Text style={{ minWidth: 400 }}>
                ISS Retido: <TextContainer>Não</TextContainer>
              </Text>
              <Text>
                Local da Prestação do Serviço:{' '}
                <TextContainer>Irituia</TextContainer>
              </Text>
            </Row>
            <Row>
              <Text style={{ minWidth: 400 }}>
                Descrição da Atividade: <TextContainer> </TextContainer>
              </Text>
              <Text>
                Local de Incidência do Imposto:{' '}
                <TextContainer>Irituia</TextContainer>
              </Text>
            </Row>
            <Text style={{ marginTop: 5, marginBottom: 10 }}>
              Tipo de serviço:
            </Text>
            <Row style={{ justifyContent: 'space-between' }}>
              <Text>
                Informações Adicionais:{' '}
                <TextContainer> {infoAdicionais} </TextContainer>
              </Text>
              <Text>Valide a nota por meio do QRCode:</Text>
            </Row>
            <Row style={{ justifyContent: 'flex-end' }}>
              <img
                src={`https://chart.googleapis.com/chart?cht=qr&chl=${pathQRCode}&chs=180x180&choe=UTF-8&chld=L|2`}
                width="48"
                height="48"
                border="0"
                alt="qrcode"
              />
            </Row>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ContainerNFSA;
