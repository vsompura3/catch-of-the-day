import { formatPrice } from '../utils/helpers'

function Fish({ name, image, price, desc: description, status }) {
  const isAvailable = status === 'available'

  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{description}</p>
      <button disabled={!isAvailable}>
        {isAvailable ? 'Add to Order' : 'Sold out'}
      </button>
    </li>
  )
}

export default Fish
