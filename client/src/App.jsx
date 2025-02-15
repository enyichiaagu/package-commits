// import { useState } from 'react';
import { DailyCommits } from './components/Graphs';

function App() {
  // const [searchText, setSearchText] = useState('');

  // const handleCheck = () => {
  //   const response = await fetch(`https:///api.github.com/repos/`)
  // };

  return (
    <>
      {/* <input
        type='text'
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      /> */}
      {/* <button onClick={handleCheck}>Check</button> */}
      <DailyCommits />
    </>
  );
}

export default App;
