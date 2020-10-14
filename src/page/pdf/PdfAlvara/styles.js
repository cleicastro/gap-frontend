import { makeStyles } from '@material-ui/styles';
import styled from 'styled-components';

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

export const ContainerAlvara = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: 12px #d3d3d3 solid;
  border-style: groove;
  width: 540px;
  min-height: 600px;
  padding: 36px;
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
`;

export const SubTitle = styled.span`
  font-size: 1.2rem;
`;

export const TextContainer = styled.span`
  line-height: 1.8rem;
  font-weight: bold;
  font-size: 1rem;
  margin-right: 5px;
`;

export const TextALvaraItem = styled.span`
  font-size: 0.8rem;
`;

export const TextValidate = styled.span`
  text-align: center;
  line-height: 1.8rem;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 22px;
`;

export const TextObs = styled.span`
  text-align: justify;
  line-height: 1.1rem;
  font-size: 0.8rem;
  margin-top: 22px;
`;

export const ContainerFooter = styled.div`
  display: flex;
  margin-top: 35px;
  justify-content: space-between;
  text-align: center;
`;
export const Assignature = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextFooter = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
  line-height: 1.4rem;
`;
