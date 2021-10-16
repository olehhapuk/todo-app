import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';

import App from './components/App';

axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.querySelector('#root')
);
