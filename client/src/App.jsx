import { Routes, Route } from 'react-router';
import Footer from './components/Footer';
import FrontPage from './pages/FrontPage';
import DisplayGraphs from './pages/DisplayGraphs';
import { SWRConfig } from 'swr';

function App() {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <div className='h-svh flex flex-col bg-linear-to-t from-body-gradient-b to-body-gradient-t'>
        <div className='flex-1'>
          <Routes>
            <Route index element={<FrontPage />} />
            <Route path='package/*' element={<DisplayGraphs />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </SWRConfig>
  );
}

export default App;
