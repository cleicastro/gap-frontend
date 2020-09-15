import { StyleSheet } from '@react-pdf/renderer';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
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

// Create styles from PDF
const styles = StyleSheet.create({
  container: {
    // margin: -10,
    height: '100vh',
    position: 'fixed',
    width: '100%'
  },
  page: {
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  codeBar: {
    padding: 5,
    fontSize: 12,
    borderBottom: 1
  }
});
export { styles, useStyles };
