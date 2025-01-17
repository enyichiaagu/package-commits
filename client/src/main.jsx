import React from 'react';
import ReactDOM from 'react-dom/client';
import { genMockCommits, DailyCommits } from './components/Graphs';
// import App from './App';
// import './index.css';
const commits = genMockCommits();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <DailyCommits weeklyCommits={commits} />
  </React.StrictMode>
);
