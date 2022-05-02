import { useContext } from 'react'
import { FishContext } from '../context/FishContext'
import {
  LOAD_FISHES,
  LOGIN_AND_LOGOUT,
  REMOVE_FISH,
} from '../context/action.types'
import sampleFishes from '../utils/sample-fishes'
import AddFishForm from './AddFishForm'
import { useParams } from 'react-router-dom'
import { ref, remove, set } from 'firebase/database'
import { auth, db, provider } from '../config/firebase.config'
import { signInWithPopup, GithubAuthProvider, signOut } from 'firebase/auth'

function Inventory() {
  const { state, dispatch } = useContext(FishContext)
  const { fishes, user } = state
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

  const renderLogin = () => {
    return (
      <nav className="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory.</p>
        <button className="github" onClick={authenticate}>
          Log In With GitHub
        </button>
        {/* <button className="twitter" onClick={authenticate}>
          Log In With Twitter
        </button> */}
        {/* <button
          className="facebook"
          onClick={authenticate('Facebook')}
        >
          Log In With Facebook
        </button> */}
      </nav>
    )
  }

  const authenticate = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const userDetails = result.user
        dispatch({
          type: LOGIN_AND_LOGOUT,
          payload: userDetails,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const logOut = () => {
    signOut(auth).then(() => {
      dispatch({
        type: LOGIN_AND_LOGOUT,
        payload: null,
      })
    })
  }

  if (!(user && user.uid)) {
    return <div>{renderLogin()}</div>
  }

  return (
    <div>
      <h2>Inventory</h2>
      <button onClick={logOut}>LogOut</button>
      {Object.keys(fishes).map(renderInventory)}
      <AddFishForm />
      <button onClick={loadSample}>Load Sample Fishes</button>
    </div>
  )
}

export default Inventory
