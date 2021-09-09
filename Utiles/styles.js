import { makeStyles } from '@material-ui/core';

const useStles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: '10px',
    textAlign: 'center',
  },
  section: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});

export default useStles;
