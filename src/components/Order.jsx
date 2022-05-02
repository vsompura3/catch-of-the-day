import { useContext, useRef } from 'react'
import { formatPrice } from '../utils/helpers'
import { FishContext } from '../context/FishContext'
import { REMOVE_FROM_ORDER } from '../context/action.types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

function Order() {
  const { state, dispatch } = useContext(FishContext)
  const { fishes, order, user } = state
  const nodeRef = useRef(null)

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
    const transitionOptions = {
      className: 'order',
      key,
      timeout: { enter: 250, exit: 250 },
    }

    const removeButton = (
      <button aria-label="Remove fish" onClick={() => removeFromOrder(key)}>
        &times;
      </button>
    )

    if ((fish && fish.status === 'unavailable') || !fish) {
      return (
        <CSSTransition nodeRef={nodeRef} {...transitionOptions}>
          <li ref={nodeRef} key={key}>
            Sorry, {fish ? fish.name : 'Fish'} is no longer available...😞
            {removeButton}
          </li>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition nodeRef={nodeRef} {...transitionOptions}>
        <li ref={nodeRef} key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                nodeRef={nodeRef}
                classNames="count"
                key={count}
                timeout={{ enter: 250, exit: 250 }}
              >
                <span ref={nodeRef}>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs - {fish.name}
            {removeButton}
          </span>
          <span className="price">{formatPrice(count * fish.price)}</span>
        </li>
      </CSSTransition>
    )
  }

  return (
    <div className="order-wrap">
      <h2>Orders</h2>
      {user && (
        <TransitionGroup component="ul" className="order">
          {orderID.map(renderOrder)}
        </TransitionGroup>
      )}
      <div className="total">
        Total
        <strong>{formatPrice(+`${user ? total : 0}`)}</strong>
      </div>
    </div>
  )
}

export default Order
