import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Link
      to="/"
      className="flex items-center justify-center bg-green-800 hover:text-red-500 text-white font-bold h-12 w-screen fixed select-none"
    >
      Macbaren Shop
    </Link>
  )
}

Header.propTypes = {}

export default React.memo(Header)
