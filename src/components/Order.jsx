import { useContext } from 'react'
import { formatPrice } from '../utils/helpers'
import { FishContext } from '../context/FishContext'

function Order() {
  const { state, dispatch } = useContext(FishContext)
  const { fishes, order } = state

  return (
    <div className="order-wrap">
      <h2>Orders</h2>
      <ul className="order">
        <li>123$</li>
      </ul>
      <div className="total">
        Total
        <strong>{formatPrice(8745)}</strong>
      </div>
    </div>
  )
}

export default Order
