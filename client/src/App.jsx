// import {
//   DailyCommits,
//   MonthlyCommits,
//   genMockCommits,
// } from './components/Graphs';
import Footer from './components/Footer';
import FrontPage from './pages/FrontPage';

// const commits = genMockCommits(7);

function App() {
  return (
    <div className='h-svh flex flex-col bg-linear-to-t from-body-gradient-b to-body-gradient-t'>
      <div className='flex-1'>
        <FrontPage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
