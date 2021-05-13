import React from 'react'
import Head from './head'
import Header from './header'

const Main = () => {
  return (
    <div>
      <Head title="Main" />
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
          This is Main component
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
