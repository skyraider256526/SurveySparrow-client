import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  form: {
    textAlign: 'center',
    // fontSize: '2rem',
    marginTop: 20,
  },
  accountLogo: {
    fontSize: '6rem',
  },
  textField: {
    margin: '20px 0',
  },
  submitButton: {
    fontWeight: 900,
    letterSpacing: 7,
    color: theme.palette.primary.light,
    // padding: '0 20px',
    marginTop: 10,
  },
}));
