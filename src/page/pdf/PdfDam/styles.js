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
    padding: 10px 20px;
    border: initial;
    border-radius: initial;
    background: white;
    page-break-after: always;
  }
`;

export const TextTitle = styled.span`
  display: block;
  font-weight: bold;
  font-family: sans-serif, Arial, Helvetica;
`;
export const Text = styled.span`
  display: block;
  line-height: 1rem;
  font-family: sans-serif, Arial, Helvetica;
  font-size: 0.7rem;
`;
export const TextContainer = styled.span`
  margin-right: 10px;
  font-weight: bold;
  font-family: sans-serif, Arial, Helvetica;
  font-size: 0.7rem;
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
  top: 200px;
  margin-left: 270px;
  border: 1px solid #ff0000;
`;
