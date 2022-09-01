import { Referral } from './referral/Referral';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Referral />
      </LocalizationProvider>
    </div>
  );
}

export default App;
