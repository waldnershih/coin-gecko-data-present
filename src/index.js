import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './redux/store';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
);
