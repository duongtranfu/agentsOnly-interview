import Accordion from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';

export const CustomAccordion = styled(Accordion)(() => ({
  borderRadius: 6,
  marginBottom: 8,
  '&:before': {
    display: 'none',
  }
}));