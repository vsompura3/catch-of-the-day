import { useContext } from 'react'
import { FishContext } from '../context/FishContext'
import { LOAD_FISHES, REMOVE_FISH } from '../context/action.types'
import sampleFishes from '../utils/sample-fishes'
import AddFishForm from './AddFishForm'
import { useParams } from 'react-router-dom'
import { ref, remove, set } from 'firebase/database'
import { db } from '../config/firebase.config'

function Inventory() {
  const { state, dispatch } = useContext(FishContext)
  const { fishes, order } = state
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

  const handleChange = (e, key) => {
    const fish = fishes[key]
    fish[e.target.name] = e.target.value
    const dbRef = ref(db, `${storeID}/fishes/${key}`)
    set(dbRef, fishes[key])
  }

  const deleteFish = key => {
    const dbRef = ref(db, `${storeID}/fishes/${key}`)
    remove(dbRef, fishes[key])
    delete fishes[key]
    // delete order[key]
    dispatch({
      type: REMOVE_FISH,
      payload: fishes,
    })
  }

  const renderInventory = key => {
    const fish = fishes[key]
    return (
      <div key={key} className="fish-edit">
        <input
          type="text"
          name="name"
          placeholder="Fish name"
          value={fish.name}
          onChange={e => handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          placeholder="Fish price"
          value={fish.price}
          onChange={e => handleChange(e, key)}
        />
        <select
          value={fish.status}
          name="status"
          onChange={e => handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          placeholder="Fish description"
          value={fish.desc}
          onChange={e => handleChange(e, key)}
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="Fish image"
          value={fish.image}
          onChange={e => handleChange(e, key)}
        />
        <button onClick={() => deleteFish(key)}>Remove Item</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Inventory</h2>
      {Object.keys(fishes).map(renderInventory)}
      <AddFishForm />
      <button onClick={loadSample}>Load Sample Fishes</button>
    </div>
  )
}

export default Inventory
