import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Search as SearchIcon } from '@material-ui/icons';

const SearchBookPage = (({ ...rest }) => {
  return (
    <TextField
      id="filled-start-adornment"
      placeholder='Pesquise por título ou autor'

      {...rest}
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
      }}
      fullWidth
      variant='outlined'
    />
  )
});

export default SearchBookPage;