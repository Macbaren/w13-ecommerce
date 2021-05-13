import React from 'react'
import { Link } from 'react-router-dom'
import { history } from '../redux'

const Header = () => {
  return (
    <nav className="flex flex-col justify-center bg-green-800 text-white font-bold h-20 w-screen fixed select-none">
      <Link to="/">
        <div id="#brand-name" className="mt-2 px-4 py-1 hover:text-red-500">
          Macbaren Shop
        </div>
      </Link>
      <div className="flex justify-between px-2">
        <div>
          <button type="button" className="border p-1 hover:text-red-500">
            USD
          </button>
          <button type="button" className="border p-1 hover:text-red-500">
            EUR
          </button>
          <button type="button" className="border p-1 hover:text-red-500">
            CAD
          </button>
        </div>
        <div>
          <button type="button" id="sort-price" className="border p-1 hover:text-red-500">
            Sort by price
          </button>
          <button type="button" id="sort-name" className="border p-1 hover:text-red-500">
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
