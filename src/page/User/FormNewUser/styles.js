const { makeStyles } = require('@material-ui/styles');

const usetyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    margin: '40px auto',
    maxWidth: 730,
    // background: theme.palette.cammon.light,
    borderRadius: 8,
    flexDirection: 'column'
  },
  btnSubmit: {
    height: 48,
    marginTop: 24
  },
  listErros: {
    color: theme.palette.cammon.light,
    background: theme.palette.cammon.light
  }
}));

export default usetyles;
