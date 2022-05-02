import { useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FishContext } from './context/FishContext'
import StorePicker from './pages/StorePicker'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import reducer from './context/reducer'

function App() {
  const [state, dispatch] = useReducer(reducer, {
    fishes: {},
    order: {},
    user: null,
  })

  return (
    <FishContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StorePicker />} />
          <Route path="/store/:storeID" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FishContext.Provider>
  )
}

export default App
