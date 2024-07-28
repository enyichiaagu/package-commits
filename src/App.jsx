import './App.css';
import DailyGraph from './components/DailyGraph/DailyGraph';

function App() {
  return (
    <>
      <h1>Package Commits</h1>
      <DailyGraph
        weeks={52}
        xStart={25}
        yStart={0}
        squareLength={12}
        padding={2}
        radius={2}
      />
    </>
  );
}

export default App;
