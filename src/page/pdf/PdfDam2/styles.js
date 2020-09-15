import { StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: -20,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'row'
  }
}));

// Create styles from PDF
const styles = StyleSheet.create({
  container: {
    height: '100vh',
    width: '100vw',
    position: 'fixed'
  },
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10
  },
  campoDam: { flexDirection: 'row' },
  section: {
    flexGrow: 1
  },
  codeBar: {
    padding: 5,
    fontSize: 12,
    borderBottom: 1
  },
  sectionCabecalho: {
    flexDirection: 'row',
    border: 1,
    padding: 5,
    height: 75
  },
  logo: {
    height: 48,
    width: 48,
    marginRight: 20,
    alignContent: 'center'
  },
  title: {
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 12,
    lineHeight: 1.3
  },
  sectionCabecalhoDAM: {
    flexDirection: 'row',
    height: 75
  },
  dam: {
    border: 1,
    fontSize: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  damNumero: {
    border: 1,
    padding: 10,
    fontSize: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  idContribuinte: {
    flexDirection: 'column',
    border: 1,
    height: 130
  },
  titleContribuinte: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10
  },
  dataContribuinte: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 3,
    fontSize: 8
  },

  observacao: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    flexFlow: 'row',
    padding: 5,
    border: 1
  },
  titleObs: {
    alignItems: 'center',
    fontSize: 11
  },
  rodape: {
    height: 90,
    border: 1,
    padding: 5
  },
  docDAM: {
    flexDirection: 'row'
  },

  itemsBloc2: {
    alignItems: 'center',
    padding: 3,
    flex: 1,
    border: 1
  },
  itemsLabelDAM: {
    alignItems: 'stretch'
  },
  campoPago: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: 64,
    marginTop: 20,
    opacity: 0.4,
    // borderRadius: 10,
    border: 1,
    transform: 'rotate(-30deg)'
  }
});

const DocValuesDam = styled.Text`
  font-size: 9px;
  height: 93px;
`;
const DocDam = styled.Text`
  font-size: 9px;
`;

const TitleDam = styled.Text`
  font-weight: bold;
`;

const Observacao = styled.Text`
  flex-wrap: wrap;
  margin-top: 5px;
  max-width: 260px;
  font-size: 9px;
`;

const TextRed = styled.Text`
  color: #ff0000;
`;

const Rodape = styled.Text`
  font-size: 10px;
`;

const Pago = styled.Text`
  font-size: 50px;
  color: red;
`;

const DataPagamento = styled.Text`
  font-size: 9px;
  color: red;
`;

export {
  styles,
  Observacao,
  TextRed,
  Rodape,
  TitleDam,
  DocDam,
  DocValuesDam,
  Pago,
  DataPagamento,
  useStyles
};
