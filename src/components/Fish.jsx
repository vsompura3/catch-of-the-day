import { formatPrice } from '../utils/helpers'
import { useContext } from 'react'
import { ADD_TO_ORDER } from '../context/action.types'
import { FishContext } from '../context/FishContext'

function Fish({ id, name, image, price, desc: description, status }) {
  const { dispatch } = useContext(FishContext)
  const isAvailable = status === 'available'

  const addToOrder = () => {
    dispatch({
      type: ADD_TO_ORDER,
      payload: id,
    })
  }

  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{description}</p>
      <button disabled={!isAvailable} onClick={addToOrder}>
        {isAvailable ? 'Add to Order' : 'Sold out'}
      </button>
    </li>
  )
}

export default Fish
