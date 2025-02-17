import Footer from './components/Footer';
// import FrontPage from './pages/FrontPage';
import DisplayGraphs from './pages/DisplayGraphs';

function App() {
  return (
    <div className='h-svh flex flex-col bg-linear-to-t from-body-gradient-b to-body-gradient-t'>
      <div className='flex-1'>
        {/* <FrontPage /> */}
        <DisplayGraphs />
      </div>
      <Footer />
    </div>
  );
}

export default App;
