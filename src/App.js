import './App.scss';
import MortgageCalculator from "./views/MortgageCalculator/";

function App() {
  const appTitle = "Mortgage Calculator";
  return (
    <div className="App">
      <header className="App-header">
        <h1>{appTitle}</h1>
      </header>
      <MortgageCalculator />
    </div>
  );
}

export default App;
