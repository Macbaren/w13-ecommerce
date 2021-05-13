import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getItemsFromServer } from '../redux/reducers/items'

import Head from './head'
import Header from './header'
import ItemCard from './item-card'

const Main = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItemsFromServer())
  }, [])

  // const getListOfItems = useSelector((store) => {

  // })

  return (
    <div>
      <Head title="Main" />
      <Header />
      <div className="flex items-center justify-center h-screen">
        <ItemCard />
      </div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
