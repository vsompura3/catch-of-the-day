import { useContext, useEffect } from 'react'
import { FishContext } from '../context/FishContext'
import Header from '../components/Header'
import Inventory from '../components/Inventory'
import Order from '../components/Order'
import Fish from '../components/Fish'
import { onValue, ref } from 'firebase/database'
import { db } from '../config/firebase.config'
import { useParams } from 'react-router-dom'
import { ADD_FISH, ADD_FROM_LOCALSTORAGE } from '../context/action.types'

function Home() {
  const { state, dispatch } = useContext(FishContext)
  const { fishes, order } = state
  const { storeID } = useParams()

  useEffect(() => {
    const dbRef = ref(db, `${storeID}/fishes/`)
    const unsub = onValue(dbRef, snapshot => {
      const data = snapshot.val()
      dispatch({
        type: ADD_FISH,
        payload: data,
      })
    })
    return () => {
      unsub()
    }
  }, [storeID])

  useEffect(() => {
    const localStorageRef = JSON.parse(localStorage.getItem(`order-${storeID}`))
    if (localStorageRef) {
      dispatch({
        type: ADD_FROM_LOCALSTORAGE,
        payload: localStorageRef,
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(`order-${storeID}`, JSON.stringify(order))
  }, [order])

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="list-of-fishes">
          {Object.keys(fishes).map(key => (
            <Fish key={key} id={key} {...fishes[key]} />
          ))}
        </ul>
      </div>
      <Order />
      <Inventory />
    </div>
  )
}

export default Home
