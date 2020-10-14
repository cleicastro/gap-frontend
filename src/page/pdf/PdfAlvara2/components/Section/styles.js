import { StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

// Create styles from PDF
const styles = StyleSheet.create({
  section: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center'
  },
  main: {
    padding: 26,
    border: '10px solid #A9A9A9',
    borderStyle: 'outset',
    borderLeftColor: 'grey',
    borderRadius: 5,
    width: '75%',
    marginTop: 30
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logo: {
    height: 64,
    width: 55,
    marginBottom: 10,
    alignContent: 'center'
  },
  qrCode: {
    height: 32,
    width: 32,
    alignContent: 'center'
  },
  gridCenter: {
    alignItems: 'center'
  },
  textCabecalho: {
    margin: 1,
    fontSize: 11,
    fontFamily: 'Roboto'
  }
});

const TextValues = styled.Text`
  font-size: 11px;
  margin: 2px;
  font-family: Roboto;
`;
const TextTitle = styled.Text`
  font-size: 12px;
  margin: 2px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Column = styled.View`
  flex-direction: column;
  padding: 1px;
`;
export { styles, Row, Column, TextValues, TextTitle };
