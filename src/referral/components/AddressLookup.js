import * as React from "react";
import Box from "@mui/material/Box";
import TextFieldMUI from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import throttle from "lodash/throttle";
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

const autocompleteService = { current: null };

export const AddressLookup = ({
  onChange,
  onBlur,
  ...otherProps
}) => {
  const [value, setValue] = React.useState(otherProps.value ?? '');
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  React.useEffect(() => {
    if (!otherProps.value) {
      setValue('');
    }
  }, [otherProps.value]);

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);
  const Icon = otherProps.Icon;
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', borderBottom: '1px solid #3A719B' }}>
      {Icon && <Icon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
      <Autocomplete
        id="google-map-demo"
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        fullWidth
        disableClearable={true}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        freeSolo
        value={value}
        onBlur={onBlur}
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          onChange(newValue.description);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => {
          return (
            <TextField 
              {...params} 
              variant="standard"
              label="Add a location" 
              fullWidth 
              InputProps={{
                disableUnderline: true,
                ...params.InputProps
              }}
              {...otherProps} />
          )
        }}
        renderOption={(props, option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings;

          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box
                    component={LocationOnIcon}
                    sx={{ color: "text.secondary", mr: 2 }}
                  />
                </Grid>
                <Grid item xs>
                  {matches?.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400
                      }}
                    >
                      {part.text}
                    </span>
                  ))}

                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
    </Box>
  );
}
