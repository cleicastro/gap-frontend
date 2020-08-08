import { StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

// Create styles from PDF
const styles = StyleSheet.create({
  section: {
    display: 'flex',
    flexGrow: 1,
    margin: 5
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logo: {
    height: 48,
    width: 48,
    marginRight: 20,
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
  font-size: 9px;
  margin: 2px;
  font-family: Roboto;
`;
const TextTitle = styled.Text`
  font-size: 10px;
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
