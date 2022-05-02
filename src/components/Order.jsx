import { useContext } from 'react'
import { formatPrice } from '../utils/helpers'
import { FishContext } from '../context/FishContext'
import { REMOVE_FROM_ORDER } from '../context/action.types'

function Order() {
  const { state, dispatch } = useContext(FishContext)
  const { fishes, order } = state

  const orderID = Object.keys(order)
  const total = orderID.reduce((prevTotal, key) => {
    const fish = fishes[key]
    const count = order[key]
    const isAvailable = fish && fish.status === 'available'
    if (isAvailable) {
      return prevTotal + (count * fish.price || 0)
    }
    return prevTotal
  }, 0)

  const removeFromOrder = key => {
    delete order[key]
    dispatch({
      type: REMOVE_FROM_ORDER,
      payload: order,
    })
  }

  const renderOrder = key => {
    const fish = fishes[key]
    const count = order[key]

    const removeButton = (
      <button aria-label="Remove fish" onClick={() => removeFromOrder(key)}>
        &times;
      </button>
    )

    if ((fish && fish.status === 'unavailable') || !fish) {
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : 'Fish'} is no longer available...😞
          {removeButton}
        </li>
      )
    }

    return (
      <li key={key}>
        <span>
          {count}lbs {fish.name}
          {removeButton}
        </span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }

  return (
    <div className="order-wrap">
      <h2>Orders</h2>
      <ul className="order">{orderID.map(renderOrder)}</ul>
      <div className="total">
        Total
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  )
}

export default Order
