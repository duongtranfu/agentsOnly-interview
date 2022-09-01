import * as React from 'react';
import Box from '@mui/material/Box';
import TextFieldMUI from '@mui/material/TextField';
import { styled } from "@mui/material/styles";

const TextField = styled(TextFieldMUI)(() => ({
  ".MuiFormLabel-root": {
    fontWeight: 400,
    fontSize: 16,
    color: '#3A719B',
    fontFamily: "Montserrat",
    ".MuiFormLabel-asterisk": {
      color: 'red'
    }
  }
}))

export const ReferralTextBox = ({ Icon, inputProps, ...textFieldProps }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', borderBottom: '1px solid #3A719B' }}>
      {Icon && <Icon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
      <TextField
        InputProps={{
          disableUnderline: true,
          ...inputProps
        }}
        variant="standard"
        fullWidth
        {...textFieldProps}
      />
    </Box>
  );
}
