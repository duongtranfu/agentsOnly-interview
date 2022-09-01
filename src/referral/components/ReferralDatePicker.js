import * as React from 'react';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CakeIcon from '@mui/icons-material/Cake';
import Input from '@mui/material/Input';
import FormControlMUI from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { styled } from "@mui/material/styles";
import moment from 'moment';

const FormControl = styled(FormControlMUI)(() => ({
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

export const ReferralDatePicker = ({ inputPropOutter, onChange, ...datePickerProps }) => {
  return (
    <DatePicker
      {...datePickerProps}
      inputFormat='YYYY-MM-DD'
      components={{
        OpenPickerIcon: CakeIcon
      }}
      onChange={
        newValue => onChange(moment(newValue).format('YYYY-MM-DD'))
      }
      renderInput={({ inputRef, inputProps, InputProps }) => {
        return (
          <Box sx={{
            display: 'flex',
            alignItems: 'flex-end',
            borderBottom: '1px solid #3A719B',
            '.MuiInputAdornment-root': {
              width: 40,
              height: 40,
              margin: 0,
              '.MuiIconButton-root': {
                padding: 0
              }
            }
          }}>
            {InputProps?.endAdornment}
            <FormControl variant="standard" defaultValue={datePickerProps.value} fullWidth {...inputPropOutter}>
              <InputLabel htmlFor={inputPropOutter.name}>{inputPropOutter.label}</InputLabel>
              <Input
                ref={inputRef}
                {...inputProps}
                {...inputPropOutter}
                id={inputPropOutter.name}
                fullWidth
                disableUnderline={true}
                value={datePickerProps.value}
              />
            </FormControl>
          </Box>
        )
      }
      }
    />
  );
}
