import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import store, { persistor } from './store/store';
import { fetchProducts } from './features/productsSlice';

store.dispatch(fetchProducts());

// React Comfy Store App
// Domain: dev-j492rsqg.us.auth0.com
// Client ID: 8VghFtcSUvnH5cnbcBHCnWfAbyL71MHr
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
  </Auth0Provider>,
);
