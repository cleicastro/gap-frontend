import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: -20,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row'
  }
}));

export const Container = styled.div`
  min-height: 100vh;
  background: #cdcdcd;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: Column;
  font-family: sans-serif, Verdana, Geneva, Tahoma;
`;

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

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const LineHorizontal = styled.hr`
  color: black;
  width: 95%;
`;

export const Title = styled.h2`
  font-size: 1.3rem;
  margin: 20px 0;
`;
export const SubTitle = styled.span`
  line-height: 1.3rem;
  font-weight: bold;
  font-size: 0.9rem;
`;

export const ContainerBody = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 30px;
`;

export const ContainerFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 64px;
  font-size: 0.9rem;
  line-height: 1.3rem;
  span {
    text-align: center;
  }
`;
