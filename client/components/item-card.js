import React from 'react'
import { useSelector } from 'react-redux'

const ItemCard = (props) => {
  const currency = useSelector((store) => store.items.currency)
  const rate = useSelector((store) => store.items.listOfRates)

  return (
    <div className="backdrop w-10/12 md:w-1/8 bg-white bg-opacity-10 rounded text-blue border border-white shadow-lg">
      <div className="w-full mb-3 pb-3 border-b border-1 border-white">
        <h3 className="card__title text-xl font-semibold text-shadow">{props.item.title}</h3>
      </div>
      <div>
        <img src={props.item.image} alt="image3" className="w-full h-48 object-cover mb-2" />
        <div className="mb-3 tracking-wide text-base text-shadow">
          <div className="card__price">price: {(props.item.price * rate[currency]).toFixed(2)}</div>
          <div className="currency">{currency}</div>
          <div className="card__product-amount">amount</div>
        </div>
        <button
          type="button"
          className="backdrop bg-blue bg-opacity-0 border border-blue px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-opacity-10 text-lg"
        >
          Add
        </button>
      </div>
    </div>
  )
}

ItemCard.propTypes = {}

export default React.memo(ItemCard)
