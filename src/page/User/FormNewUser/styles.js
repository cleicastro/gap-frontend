const { makeStyles } = require('@material-ui/styles');

const usetyles = makeStyles(() => ({
  form: {
    display: 'flex',
    margin: '40px auto',
    maxWidth: 730,
    background: '#fff',
    borderRadius: 8,
    flexDirection: 'column'
  },
  btnSubmit: {
    height: 48
  },
  listErros: {
    color: '#fff',
    background: '#DAA520'
  }
}));

export default usetyles;
