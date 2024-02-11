import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routing } from '../../routes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useSetupAxios } from '../../services';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

const queryClient = new QueryClient();

function App() {
  useSetupAxios();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <HashRouter basename="/">
          <div>
            <Routing />
            <ToastContainer />
          </div>
        </HashRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
