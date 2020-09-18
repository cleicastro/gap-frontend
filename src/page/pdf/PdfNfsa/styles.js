import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    background: '#cdcdcd',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'Column'
  },
  columnCenter: {
    textAlign: 'center',
    fontSize: 13,
    padding: 2
  },
  idContribuinte: {
    borderLeft: '1px solid #000000',
    borderRight: '1px solid #000000'
  }
}));

export const A4 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 21cm;
  min-height: 29.7cm;
  padding: 1rem;
  margin: 0.5rem auto;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  @media print {
    margin: 0;
    border: initial;
    border-radius: initial;
    width: initial;
    min-height: initial;
    box-shadow: initial;
    background: initial;
    page-break-after: always;
  }
`;

export const TextTitle = styled.span`
  text-align: center;
  display: block;
  font-weight: bold;
  font-family: sans-serif, Arial, Helvetica;
`;
export const Text = styled.span`
  display: block;
  line-height: 1rem;
  font-family: sans-serif, Arial, Helvetica;
  font-size: 0.8rem;
`;
export const TextContainer = styled.span`
  margin-right: 10px;
  font-weight: bold;
  font-family: sans-serif, Arial, Helvetica;
  font-size: 0.8rem;
`;

export const TitleContribuinte = styled.h5`
  font-family: sans-serif, Arial, Helvetica;
  justify-content: center;
  text-align: center;
  margin: 5px;
`;

export const MarcaDAgua = styled.div`
  position: absolute;
  text-align: center;
  opacity: 0.4;
  color: #ff0000;
  transform: rotate(-20deg);
  width: 250px;
  top: 400px;
  margin-left: 270px;
  border: 1px solid #ff0000;
`;

export const Row = styled.div`
  margin-top: 3px;
  margin-bottom: 3px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const RowItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 200px;
`;

export const ColumnItem = styled.div`
  min-height: 360px;
  flex-direction: column;
`;

export const ContainerTax = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    border-left: 1px solid;
  }
`;
