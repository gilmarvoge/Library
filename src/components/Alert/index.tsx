import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Alert; 