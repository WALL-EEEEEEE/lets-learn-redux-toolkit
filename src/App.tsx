import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { incremented, amountAdded } from './features/counter/counter-slice'
import { useFetchBreedsQuery } from './features/dogs/dogs-api-slice'
import './App.css'

function App() {
  const count = useAppSelector((state) => state.counter.value );
  const dispatch = useAppDispatch();
  const [ numberDogs, setNumberDogs ] = useState(10)
  const {data = [], isFetching } = useFetchBreedsQuery(numberDogs);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={ () => dispatch(amountAdded(5)) }>
          count is {count}
        </button>
        <div>
        
          <div>
              <p>Dogs to fetch</p>
              <select value={numberDogs} onChange={(e) => setNumberDogs(Number(e.target.value))}>
                <option value="10">10</option>
                <option value="5">5</option>
                <option value="8">8</option>
              </select>
          </div>

          <p>Number of dogs fetched: {data.length}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
                {
                data.map((breed) => (
                  <tr key={breed.id}>
                  <td>{breed.name}</td>
                  <td>
                    <img src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`} alt={breed.name} height={250} />
                  </td>
                  </tr>
                ))
                }

            </tbody>  
          </table>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
