import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  dashboard: {
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    height: '80vh',
  },
  progress: {
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    top: '50%',
    left: '50%',
    textAlign: 'center',
  },
}));
