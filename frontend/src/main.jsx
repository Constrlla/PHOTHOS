import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
{/*
  import './index.css'
  */}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
