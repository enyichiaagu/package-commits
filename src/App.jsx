import './App.css';
import DailyGraph from './components/DailyGraph/DailyGraph';
import { httpGetAllCommits } from './hooks/requests';

const commits = await httpGetAllCommits(
  'vitest-dev/vitest',
  'current',
  'packages/runner'
);

console.log(Array.from(commits.values()));

function App() {
  return (
    <>
      <h1>Package Commits</h1>
      <input type='text' name='package' />
      <br />
      <DailyGraph
        weeks={52}
        xStart={25}
        yStart={0}
        squareLength={12}
        padding={2}
        radius={2}
        commits={Array.from(commits.values())}
      />
    </>
  );
}

export default App;
