import './App.css';
import DailyGraph from './components/DailyGraph/DailyGraph';
import useCommits from './hooks/useCommits';

function App() {
  const commits = useCommits('facebook/react', 2024, 'packages/react');

  return (
    <>
      <h1>Package Commits</h1>
      <input type='text' name='package' />
      <br />
      <DailyGraph
        weeks={commits[0] ? commits.length : 52}
        xStart={25}
        yStart={0}
        squareLength={15}
        padding={2}
        radius={3}
        commits={commits}
      />
    </>
  );
}

export default App;
