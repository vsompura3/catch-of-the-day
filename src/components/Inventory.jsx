import { useContext } from 'react'
import { FishContext } from '../context/FishContext'
import { LOAD_FISHES } from '../context/action.types'
import sampleFishes from '../utils/sample-fishes'
import AddFishForm from './AddFishForm'
import { useParams } from 'react-router-dom'
import { ref, set } from 'firebase/database'
import { db } from '../config/firebase.config'

function Inventory() {
  const { dispatch } = useContext(FishContext)
  const { storeID } = useParams()

  const loadSample = () => {
    dispatch({
      type: LOAD_FISHES,
      payload: sampleFishes,
    })
    Object.keys(sampleFishes).map(key => {
      const dbRef = ref(db, `${storeID}/fishes/${key}`)
      set(dbRef, sampleFishes[key])
    })
  }

  return (
    <div>
      <h2>Inventory</h2>
      <AddFishForm />
      <button onClick={loadSample}>Load Sample Fishes</button>
    </div>
  )
}

export default Inventory
