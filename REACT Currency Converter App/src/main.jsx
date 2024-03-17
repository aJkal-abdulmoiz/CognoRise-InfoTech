import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CurrencyProvider from './context/CurrencyContext.jsx';
import Header from './components/Header';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrencyProvider>
    <Header/>
      <App />
    </CurrencyProvider>
  </React.StrictMode>,
)
