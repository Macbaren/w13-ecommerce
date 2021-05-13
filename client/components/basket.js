import React from 'react'
import Head from './head'
import Header from './header'

const Basket = () => {
  return (
    <div>
      <Head title="Basket" />
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-yellow-800 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
          This is Basket component
        </div>
      </div>
    </div>
  )
}

Basket.propTypes = {}

export default React.memo(Basket)
