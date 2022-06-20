// import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store/store';
import { fetchProducts } from './features/productsSlice';

store.dispatch(fetchProducts());

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  // </StrictMode>,
);
