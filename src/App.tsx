import "./App.css"
import { Counter } from "./features/counter/Counter"
import logo from "./logo.svg"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
      </header>
    </div>
  )
}

export default App