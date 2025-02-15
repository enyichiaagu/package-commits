import {
  DailyCommits,
  MonthlyCommits,
  genMockCommits,
} from './components/Graphs';

const commits = genMockCommits(7);

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
      <DailyCommits weeklyCommits={commits} />
      <MonthlyCommits weeklyCommits={commits} />
    </>
  );
}

export default App;
