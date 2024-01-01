import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import { preload } from 'swr';
import { getCollections, collectionsUrlEndpoint } from './api/collectionApi.jsx';

// preload(collectionsUrlEndpoint, getCollections);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>,
)
