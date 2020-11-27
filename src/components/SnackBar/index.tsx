import React from 'react';
import { Snackbar as CustomSnack} from '@material-ui/core';
import { ISnackbar } from 'models';
import { Alert } from 'components';

const SnackBar = (props: ISnackbar) => {
  const { type, message, open, onClose } = props;

  const handleCloseSnack = (event: any, reason: string) => {
    if (reason === 'clickaway')
      return;
    onClose(false);
  };

  return (
    <CustomSnack data-testid='alert' open={open} autoHideDuration={3000} onClose={handleCloseSnack} >
      <Alert severity={type} onClose={handleCloseSnack} >
        {message}
      </Alert>
    </CustomSnack>
  )
}

export default SnackBar;