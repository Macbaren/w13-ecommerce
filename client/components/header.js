import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { history } from '../redux'
import { setCurrency, sortItems } from '../redux/reducers/items'

const Header = () => {
  const dispatch = useDispatch()
  const onClick = (e) => dispatch(setCurrency(e.target.textContent))

  const [priсeDirection, setPriceDirection] = useState(true)
  const [titleDirection, setTitleDirection] = useState(true)

  const getPriceDirection = (priсeDir) => {
    const currDir = priсeDir ? '0-9' : '9-0'
    setPriceDirection(!priсeDirection)
    return currDir
  }

  const getTitleDirection = (titleDir) => {
    const currDir = titleDir ? 'a-z' : 'z-a'
    setTitleDirection(!titleDirection)
    return currDir
  }

  return (
    <nav className="flex flex-col justify-center bg-green-800 text-white font-bold h-20 w-screen select-none">
      <Link to="/">
        <div id="#brand-name" className="mt-2 px-4 py-1 hover:text-red-500">
          Macbaren Shop
        </div>
      </Link>
      <div className="flex justify-between px-2">
        <div>
          <button
            type="button"
            className="border p-1 hover:text-red-500"
            onClick={(e) => onClick(e)}
          >
            USD
          </button>
          <button
            type="button"
            className="border p-1 hover:text-red-500"
            onClick={(e) => onClick(e)}
          >
            EUR
          </button>
          <button
            type="button"
            className="border p-1 hover:text-red-500"
            onClick={(e) => onClick(e)}
          >
            CAD
          </button>
        </div>
        <div>
          <button
            type="button"
            id="sort-price"
            className="border p-1 hover:text-red-500"
            onClick={() => dispatch(sortItems('price', getPriceDirection(priсeDirection)))}
          >
            Sort by price
          </button>
          <button
            type="button"
            id="sort-name"
            className="border p-1 hover:text-red-500"
            onClick={() => dispatch(sortItems('title', getTitleDirection(titleDirection)))}
          >
            Sort by name
          </button>
        </div>
        <div className="flex justify-between px-2">
          <button
            type="button"
            className="border p-1 hover:text-red-500"
            id="order-count"
            onClick={() => history.push('/basket')}
          >
            Basket
          </button>
          <div className="p-1 hover:text-red-500">Sum</div>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {}

export default React.memo(Header)
