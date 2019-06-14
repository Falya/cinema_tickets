import ReactDOM from 'react-dom';
import App from './components/App';
import './style/style.scss';
import { Provider } from 'react-redux';
import store from './redux/store/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
);
