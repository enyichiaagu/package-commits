import React from 'react';
import ReactDOM from 'react-dom/client';
import { DailyCommits } from './components/Graphs';
// import App from './App';
// import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <DailyCommits />
  </React.StrictMode>
);
