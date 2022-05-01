import { useContext } from 'react'
import { FishContext } from '../context/FishContext'
import { LOAD_FISHES } from '../context/action.types'
import sampleFishes from '../utils/sample-fishes'
import AddFishForm from './AddFishForm'

function Inventory() {
  const { state, dispatch } = useContext(FishContext)

  const loadSample = () => {
    dispatch({
      type: LOAD_FISHES,
      payload: sampleFishes,
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
