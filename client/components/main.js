import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getItemsFromServer, getRatesFromServer } from '../redux/reducers/items'

import Head from './head'
import Header from './header'
import ItemCard from './item-card'

const Main = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItemsFromServer())
    dispatch(getRatesFromServer())
  }, [])

  const getListOfItems = useSelector((store) => {
    return store.items.listOfItems
  })

  return (
    <div className="h-full">
      <Head title="Main" />
      <Header />
      <div className="flex flex-wrap h-screen">
        {getListOfItems.map((item) => {
          return (
            <div key={item.id}>
              <ItemCard item={item} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
