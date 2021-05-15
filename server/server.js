/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile } = require('fs').promises

require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

const urlData = `${__dirname}/data/data.json`

server.get('/api/v1/items', async (req, res) => {
  const data = await readFile(urlData, { encoding: 'utf8' })
    .then((text) => JSON.parse(text))
    .catch((err) => err)
  const result = data.filter((_, ind) => ind < 31)
  res.json(result)
})

server.get('/api/v1/items/:type/:direction', async (req, res) => {
  const { type, direction } = req.params
  const data = await readFile(urlData, { encoding: 'utf8' })
    .then((text) => JSON.parse(text))
    .catch((err) => err)

  const result = data
    .sort((a, b) => {
      return type === 'price' && direction === '0-9'
        ? a.price - b.price
        : type === 'price' && direction === '9-0'
        ? b.price - a.price
        : type === 'title' && direction === 'a-z'
        ? a.title.localeCompare(b.title)
        : type === 'title' && direction === 'z-a'
        ? b.title.localeCompare(a.title)
        : data
    })
    .filter((_, ind) => ind < 31)
  res.json(result)
})

server.get('/api/v1/rates', async (req, res) => {
  const rate = await axios
    .get('https://api.ratesapi.io/api/latest?base=USD&symbols=EUR,CAD,USD')
    .then(({ data }) => data.rates)
  res.json(rate)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
