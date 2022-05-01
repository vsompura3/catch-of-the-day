import { useContext, useEffect } from 'react'
import { FishContext } from '../context/FishContext'
import Header from '../components/Header'
import Inventory from '../components/Inventory'
import Order from '../components/Order'
import Fish from '../components/Fish'

function Home() {
  const { state, dispatch } = useContext(FishContext)
  const { fishes } = state
  console.log(state)
  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="list-of-fishes">
          {Object.entries(fishes).map(([key, fish]) => (
            <Fish key={key} {...fishes[key]} />
          ))}
        </ul>
      </div>
      <Order />
      <Inventory />
    </div>
  )
}

export default Home
